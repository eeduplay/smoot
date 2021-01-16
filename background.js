chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Smoot it!";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context}); 
});

function onClickHandler(info, tab) {
    var sText = info.selectionText;
    var re = /(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)\s?(exa|peta|tera|giga|mega|kilo|hecto|deca|deci|centi|mili|micro|nano|pico|femto|atto|zepto|yotta|[yzafpnumcdhkKMGTPEZY])?(miles|mi|(in(ch)|feet|ft|A|yard|yd|fathom|furlong|rod|league|chain|altuve|parsec|beard\s?-?second|smoot|light\s?-?year|m(eters)?))e?s?/i;
    var info = sText.match(re);
    console.log(info);
    var myNum = info[0];
    var prefix = info[3];
    var unit = info[4];
    return myNum, prefix, unit;
}

chrome.contextMenus.onClicked.addListener(onClickHandler);