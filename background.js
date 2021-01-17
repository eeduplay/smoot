chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Smoot it!";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context}); 
});

function onClickHandler(info, tab) {
    let sText = info.selectionText;
    var parsedExpression = stringParser(sText);
    queryRequest(parsedExpression[5],parsedExpression[6],parsedExpression[1]);
}

function stringParser(value_unit) {
    let re = /(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)\s?(hundred|thousand|million|billion|trillion|quadrillion)?\s?(yotta|zotta|exa|peta|tera|giga|mega|kilo|hecto|deca|deci|centi|mili|micro|nano|pico|femto|atto|zepto|yocto|[yzafpnumcdhkKMGTPEZY])?(miles|mi|(in(ch)|feet|ft|A|yard|yd|fathom|furlong|rod|league|chain|altuve|parsec|beard\s?-?second|smoot|light\s?-?year|m(eters)?))e?s?/i;
    let parsed = value_unit.match(re);

    if (typeof parsed[4] === 'undefined') {
        parsed[4] = 'undefined';
    }
    var quantity_values = {
        'undefined': 1,
        'hundred': 100,
        'thousand': 1000,
        'million': 1000000,
        'billion':1000000000,
        'trillion':1000000000000,
        'quadrillion':1000000000000,
    };
    parsed[1] = parsed[1] * quantity_values[parsed[4]];
//parsed 4 is quantity, parsed 5 is prefix, parsed 6 is unit
    
    if (typeof parsed[5] === 'undefined') {
        parsed[5] = 'undefined';
    }

    var prefix_dict = {
        'undefined':1,
        'd': Math.pow(10,-1),
        'deci': Math.pow(10,-1),
        'h': Math.pow(10,2),
        'hecto': Math.pow(10,2),
        'k': Math.pow(10,3),
        'kilo': Math.pow(10,3),
        'M': Math.pow(10,6),
        'mega': Math.pow(10,6),
        'G': Math.pow(10,9),
        'giga': Math.pow(10,9),
        'T': Math.pow(10,12),
        'tera': Math.pow(10,12),
        'P': Math.pow(10,15),
        'peta': Math.pow(10,15),
        'E': Math.pow(10,18),
        'exa': Math.pow(10,18),
        'Z': Math.pow(10,21),
        'zotta': Math.pow(10,21),
        'Y': Math.pow(10,24),
        'yotta': Math.pow(10,24),
        'c': Math.pow(10,-2),
        'centi': Math.pow(10,-2),
        'm': Math.pow(10,-3),
        'milli': Math.pow(10,-3),
        'u': Math.pow(10,-6),
        'micro': Math.pow(10,-6),
        'n': Math.pow(10,-9),
        'nano': Math.pow(10,-9),
        'p': Math.pow(10,-12),
        'pico': Math.pow(10,-12),
        'f': Math.pow(10,-15),
        'femto': Math.pow(10,-15),
        'a': Math.pow(10,-18),
        'atto': Math.pow(10,-18),
        'z': Math.pow(10,-21),
        'zepto': Math.pow(10,-21),
        'y': Math.pow(10,-24),
        'yocto': Math.pow(10,-24)
    };
    
    var unit_dict = {
        'undefined':1,
        'm': 1,
        'meter':1,
        'meters':1,
        'in': 25.4*Math.pow(10,-3),
        'inch': 25.4*Math.pow(10,-3),
        'ft': .3048,
        'feet': .3048,
        'yd': .9144,
        'yard': .9144,
        'mile': 1609.344,
        'mi': 1609.344,
        'A': 100*Math.pow(10,-12),
        'league': 4800,
        'fathom': 1.8288,
        'chain': 20.1168,
        'rod': 5.0292,
        'furlong': 201.168,
        'potrzebie': 2.2633485*Math.pow(10,-3),
        'altuve': 1.65,
        'parsec': 3.086*Math.pow(10,16),
        'beard-second': Math.pow(10,-9),
        'smoot': 1.7018
    };

    parsed[1] = parsed[1] * unit_dict[parsed[6]] * prefix_dict[parsed[5]];
    //parsed 4 is quantity, parsed 5 is prefix, parsed 6 is unit
    return parsed;
}

function queryRequest(prefix,unit,value) {
    // let requestURL = 'http://74.56.190.15:8080/query?unit='+ prefix + unit + '&value=' + value;
    let requestURL = 'http://74.56.190.15:8080/query?value=' + value + '&unit=m';
    let request = new XMLHttpRequest();
    request.open('GET',requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const bounds = request.response;

        chrome.runtime.sendMessage({
            msg: "values", 
            data: {
                query_value: value,
                top_value: bounds['tvalue'],
                top_units: bounds['tname'],
                bot_value: bounds['bvalue'],
                bot_units: bounds['bname']
            }
        });
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);