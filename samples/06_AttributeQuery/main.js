$(document).ready(function() {
/***********************
 * a. 載入模組
 ***********************/
/// a1. 從 Openlayers 中載入模組
var Map = ol.Map; 
var View = ol.View;
var {fromLonLat} = ol.proj;

/// a2. 從 ol-layer-NLSCLayer.js 載入國土測繪中心圖層模組
var NLSCLayer = ol.layer.NLSCLayer; 

/// a3. 從 ol-arcgis-tasks.js 載入查詢模組
var {Query, QueryTask, Constants} = ol.arcgis.tasks;


/***********************
 * b. 建立地圖
 ***********************/
// 建立地圖控制器 MapView
var mapView = new View({
    center: new fromLonLat([121.537056, 25.046219]),
    zoom  : 13
});

// 建立地圖容器
var map = new Map({
    target: 'map',
    view  : mapView
});


/***********************
 * c. 加入圖層
 ***********************/
/// c1. 載入國土測繪中心圖磚作為底圖
var nlscLayer = new NLSCLayer('EMAP01');
map.addLayer(nlscLayer);


/***********************
 * c. 屬性查詢
 ***********************/
// 欲查詢的圖層網址
var schoolLayerUrl = "https://services6.arcgis.com/UsLrDOKX8FxYPd3f/ArcGIS/rest/services/%e5%8f%b0%e7%81%a3%e5%ad%b8%e6%a0%a1%e5%88%86%e5%b8%83/FeatureServer/0";

// 建立屬性下拉選單內容
var queryTask = new QueryTask(schoolLayerUrl);
    queryTask.executeForFields(funcs.createFieldsMenu, funcs.errHandler);

// 建立屬性值下拉選單內容
$('#field').on('change', function (evt){
    var field = $(this).val();

    var query = new Query();
        query.f = 'json';
        query.returnGeometry = false;
        query.outFields = ['*'];
        query.groupByFieldsForStatistics = [field];
        query.outStatistics = [{
            "statisticType":"count",
            "onStatisticField": field,
            "outStatisticFieldName":"countOF" + field
        }];
        query.outSR = 102100

    var queryTask = new QueryTask(schoolLayerUrl);

    queryTask.execute(query, funcs.createValuesMenu, funcs.errHandler);

}, funcs.errHandler);


});