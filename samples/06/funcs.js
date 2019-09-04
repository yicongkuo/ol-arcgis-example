(function (global, $){

/// 從 ol-arcgis-tasks.js 載入查詢模組
var {Query, QueryTask, Constants} = ol.arcgis.tasks;

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

function createFieldsMenu(response){
    $('#field').empty();
    var fields = JSON.parse(response).fields;
    fields.forEach(function (field){
        var fieldName  = field.name;
        var fieldAlias = field.alias;

        var optionHTML = '<option value="' + fieldName + '">' + fieldAlias + '</option>';
        $('#field').append(optionHTML);
    });    
}

function createValuesMenu(response){
    $('#value').empty();
    var field = $('#field').val();
    var values = JSON.parse(response).features;

    values.forEach(function (value){
        var attr  = value.attributes[field];

        var optionHTML = '<option value="' + attr + '">' + attr + '</option>';
        $('#value').append(optionHTML);
    });        
}

// 輸出
var funcs = namespace('global.funcs');
    funcs.createFieldsMenu = createFieldsMenu;
    funcs.createValuesMenu = createValuesMenu;



}(window, jQuery));