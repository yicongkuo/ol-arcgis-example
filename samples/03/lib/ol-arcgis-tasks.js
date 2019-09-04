(function (global, $){
    // 載入openlayers 模組
    var EsriJSON = ol.format.EsriJSON;

    // 命名空間
    var namespace = function (ns_string) {
        var parts = ns_string.split('.'), 
            parent = global,
            i;
        if (parts[0] === "global") {
            parts = parts.slice(1);       
        }

        for (i = 0; i < parts.length; i++){
            // 若沒有這物件沒有這個屬性 則視為空物件
            if (typeof parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

    /**
     * Query
     */
    var Query = function (){
         /* 
         * <params> Object
         *     geometry      : <arcgis Geometry> geometry instance
         *     geometryType  : <arcgis Geometry Type>
         *     inSR          : <string> EPSG Code,  The spatial reference of the input geometry.
         *     where         : <string>
         *     spatialRel    : <string> esriSpatialRelIntersects | esriSpatialRelContains | esriSpatialRelCrosses | esriSpatialRelEnvelopeIntersects | esriSpatialRelIndexIntersects | esriSpatialRelOverlaps | esriSpatialRelTouches | esriSpatialRelWithin
         *     returnGeometry: <boolean> 
         *     outSR         : <string> EPSG Code,  The spatial reference of the output geometry.
         *     outFields     : <string> '*' or 'field1', 'field2', 'field3'
         *     f             : <string> return format,  'json' or
         */
        var params = [
            'geometry', 'geometryType', 'inSR', 
            'where', 'spatialRel', 'returnGeometry', 
            'outSR', 'outFields', 'f'
        ];

        for (i in params){
            this[ params[i] ] = undefined;
        }
    };

    var QueryTask = function (url){
        this.url = url;
    };

    QueryTask.prototype = {
        endpoint: function (Query){
            return this.url + '/query?' + this._queryUri(Query);
        },        
        execute: function (Query, callback, errback) {
            var endpoint = this.endpoint(Query);

            var result = $.post(endpoint);
                result.done(callback);
                result.fail(errback);

            return result; 
        },
        executeForFields: function(callback, errback) {
            var endpoint = this.url + '?f=json';

            var result = $.post(endpoint);
                result.done(callback);
                result.fail(errback);

            return result;
        },
        _queryUri: function (Query){
            var uri = '';
            var geometryUri = this._geometryUri(Query.geometry);
            var whereUri =  this._whereUri(Query.where);

            for (key in Query) {
                if (key !== 'geometry' && key !== 'where' )
                    uri += ( key+'='+JSON.stringify(Query[key])+'&' );
            }
           
            return  uri.replace(/\"/g,"").replace('[',"").replace(']',"")
                        + geometryUri + '&' + whereUri ;
        },
        _geometryUri: function (geometry){
            if(geometry)
               return 'geometry=' + encodeURIComponent(JSON.stringify(geometry));            
            return 'geometry=';
        },
        _whereUri:  function (where){
            if(where)
                return 'where=' + where;
            else
                return 'where=';
        }
    };

    var Constants = {        
        GeometryType:{
            'point'      : 'esriGeometryPoint',
            'polyline'   : 'esriGeometryPolyline',
            'polygon'    : 'esriGeometryPolygon',
            'extent'     : 'esriGeometryEnvelope',
            'multipoint' : 'esriGeometryMultipoint'
        },
        SpatialRelation:{
            'intersect': 'esriSpatialRelIntersects', 
            'contain': 'esriSpatialRelContains',
            'crosse': 'esriSpatialRelCrosses',
            'envelopeIntersect': 'esriSpatialRelEnvelopeIntersects', 
            'indexIntersect': 'esriSpatialRelIndexIntersects',
            'overlap': 'esriSpatialRelOverlaps', 
            'touche': 'esriSpatialRelTouches', 
            'within': 'esriSpatialRelWithin'
        }       
    };

    /**
     * Export Modules
     */
    var tasks = namespace('global.ol.arcgis.tasks');
        tasks.Query = Query;
        tasks.QueryTask = QueryTask;
        tasks.Constants = Constants;

}(window, jQuery));