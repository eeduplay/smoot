chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Smoot it!";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context}); 
});

function onClickHandler(info, tab) {
    var sText = info.selectionText;
    var re = /(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)\s?(exa|peta|tera|giga|mega|kilo|hecto|deca|deci|centi|mili|micro|nano|pico|femto|atto|zepto|yotta|[yzafpnumcdhkKMGTPEZY])?(miles|mi|(in(ch)|feet|ft|A|yard|yd|fathom|furlong|rod|league|chain|altuve|parsec|beard\s?-?second|smoot|light\s?-?year|m(eters)?))e?s?/i;
    var parsedExpression = sText.match(re);
    var value = parsedExpression[1];
    var prefix = parsedExpression[4];
    var unit = parsedExpression[5];
    
    let requestURL = 'https://smootthenorth.ue.r.appspot.com/query?unit='+ prefix + unit + '&value=' + value;
    let request = new XMLHttpRequest();
    request.open('GET',requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const bounds = request.response;
        var topBoundValue = bounds["tvalue"];
        var botBoundValue = bounds["bvalue"];
        var topName = bounds["tname"];
        var botName = bounds["bvalue"];

        alert("Top Bound: " + topBoundValue + topName + "\nBottom Bound: " + botBoundValue + botName);
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);