const FIND = /(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)\s?(exa|peta|tera|giga|mega|kilo|hecto|deca|deci|centi|mili|micro|nano|pico|femto|atto|zepto|yotta|[yzafpnumcdhkKMGTPEZY])?(miles|mi|(in(ch)|feet|ft|A|yard|yd|fathom|furlong|rod|league|chain|m(eters)?))((e)?s)?/;
const REPLACE_WITH = "UNIT FOUND AND REPLACED";
const regex = new RegExp(FIND,"gi");
const contents = document.querySelectorAll('p,li,span,h1,h2,h3,h4,h5,h6');
for(const snippet of contents){
    snippet.textContent = snippet.textContent.replace(regex,REPLACE_WITH);
}