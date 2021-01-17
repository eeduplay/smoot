chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Smoot it!";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context}); 
});

function onClickHandler(info, tab) {
    let sText = info.selectionText;
    var parsedExpression = stringParser(sText);
    var value_bounds = queryRequest(parsedExpression[4],parsedExpression[5],parsedExpression[1]);

    chrome.runtime.sendMessage({
        msg: "values", 
        data: {
            query_value: parsedExpression[1],
            query_units: parsedExpression[4] + parsedExpression[5],
            // top_value: value_bounds['tvalue'],
            // top_units: value_bounds['tname'],
            // bot_value: value_bounds['bvalue'],
            // bot_units: value_bounds['bname']
        }
    });
}

function stringParser(value_unit) {
    let re = /(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)\s?(exa|peta|tera|giga|mega|kilo|hecto|deca|deci|centi|mili|micro|nano|pico|femto|atto|zepto|yotta|[yzafpnumcdhkKMGTPEZY])?(miles|mi|(in(ch)|feet|ft|A|yard|yd|fathom|furlong|rod|league|chain|altuve|parsec|beard\s?-?second|smoot|light\s?-?year|m(eters)?))e?s?/i;
    let parsed = value_unit.match(re);

    return parsed;
}

function queryRequest(prefix,unit,value) {
    var bounds;
    let requestURL = 'https://smootthenorth.ue.r.appspot.com/query?unit='+ prefix + unit + '&value=' + value;
    let request = new XMLHttpRequest();
    request.open('GET',requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        bounds = request.response;
    }
    return bounds;
}

chrome.contextMenus.onClicked.addListener(onClickHandler);