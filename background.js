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

    var conversion_dict = {

        'da': Math.pow(10,1),
        'h': Math.pow(10,2),
        'k': Math.pow(10,3),
        'M': Math.pow(10,6),
        'G': Math.pow(10,9),
        'T': Math.pow(10,12),
        'P': Math.pow(10,15),
        'E': Math.pow(10,18),
        'Z': Math.pow(10,21),
        'Y': Math.pow(10,24),
        'c': Math.pow(10,-2),
        'm': Math.pow(10,-3),
        'u': Math.pow(10,-6),
        'n': Math.pow(10,-9),
        'p': Math.pow(10,-12),
        'f': Math.pow(10,-15),
        'a': Math.pow(10,-18),
        'z': Math.pow(10,-21),
        'y': Math.pow(10,-24),
        'A': 100*Math.pow(10,-12),
        'in': 25.4*Math.pow(10,-3),
        'ft': .3048,
        'yd': .9144,
        'mile': 1609.344,
        'league': 4800,
        'fathom': 1.8288,
        'chain': 20.1168,
        'rod': 5.0292,
        'furlong': 201.168,
        'potrzebie': 2.2633485*Math.pow(10,-3),
        'altuve': 1.65,
        'parsec': 3.086*Math.pow(10,16),
        'beard-second': Math.pow(10,-9),
        'smoot': 1.7018,
    }

    parsed[1] = parsed[1] * conversion_dict[parsed[5]];

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