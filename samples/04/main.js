$(document).ready(function() {    
    // 從 Openlayers 中載入模組
    var Map = ol.Map; 
    var View = ol.View;
    var VectorSource = ol.source.Vector;
    var VectorLayer = ol.layer.Vector;
    var {fromLonLat} = ol.proj;
    var EsriJSON = ol.format.EsriJSON;
    
    // 從 ol-layer-NLSCLayer.js 載入國土測繪中心圖層模組
    var NLSCLayer = ol.layer.NLSCLayer; 

    // 從 ol-ext 載入DrawRegular
    var DrawRegular = ol.interaction.DrawRegular;


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

    // 載入國土測繪中心圖磚作為底圖
    var nlscLayer = new NLSCLayer('EMAP01');
    map.addLayer(nlscLayer);


});