chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Smoot it!";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context}); 
});

function onClickHandler(info, tab) {
    var sText = info.selectionText;
    var re = /(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)\s?(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion)?\s?(exa|peta|tera|giga|mega|kilo|hecto|deca|deci|centi|mili|micro|nano|pico|femto|atto|zepto|yotta|[yzafpnumcdhkKMGTPEZY])?(miles|mi|(in(ch)|feet|ft|A|yard|yd|fathom|furlong|rod|league|chain|altuve|parsec|beard\s?-?second|smoot|light\s?-?year|m(eters)?))e?s?/gi;
    var info = sText.match(re);
    var myNum = info[1];
    var quantity = info[4]
    var prefix = info[5];
    var unit = info[6];
    alert('The number is ' + myNum + '\nThe quantity is ' + quantity + '\nThe prefix is ' + prefix + '\nThe unit is ' +unit);
    return myNum, quantity, prefix, unit;
}

chrome.contextMenus.onClicked.addListener(onClickHandler);