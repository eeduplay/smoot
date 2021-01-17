chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Smoot it!";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context}); 
});

function onClickHandler(info, tab) {
    let sText = info.selectionText;
    var parsedExpression = stringParser(sText);
    var value_bounds = queryRequest(parsedExpression[5],parsedExpression[6],parsedExpression[1]);

    chrome.runtime.sendMessage({
        msg: "values", 
        data: {
            query_value: parsedExpression[1],
            query_units: parsedExpression[5] + parsedExpression[6],
            // top_value: value_bounds['tvalue'],
            // top_units: value_bounds['tname'],
            // bot_value: value_bounds['bvalue'],
            // bot_units: value_bounds['bname']
        }
    });
}

function stringParser(value_unit) {
    let re = /(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)\s?(hundred|thousand|million|billion|trillion|quadrillion)?\s?(exa|peta|tera|giga|mega|kilo|hecto|deca|deci|centi|mili|micro|nano|pico|femto|atto|zepto|yotta|[yzafpnumcdhkKMGTPEZY])?(miles|mi|(in(ch)|feet|ft|A|yard|yd|fathom|furlong|rod|league|chain|altuve|parsec|beard\s?-?second|smoot|light\s?-?year|m(eters)?))e?s?/i;
    let parsed = value_unit.match(re);

    var quantity_values = {
        'undefined': 1,
        'hundred': 100,
        'thousand': 1000,
        'million': 1000000,
        'billion':1000000000,
        'trillion':1000000000000,
        'quadrillion':1000000000000,
    }
    parsed[1] = parsed[1] * quantity_values[parsed[4]];
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