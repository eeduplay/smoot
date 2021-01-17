chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "values") {
            var uval = request.data.top_value;
            var lval = request.data.bot_value;
            var tickwidth = 300*(request.data.query_value-lval)/(uval-lval);
            document.getElementById('input').innerHTML = request.data.query_value + " m";
            document.getElementById('maintick').setAttribute('style', "width: "+tickwidth+"px");
            document.getElementById('lowerName').innerHTML = request.data.bot_units;
            document.getElementById('lowerValue').innerHTML = lval;
            document.getElementById('upperName').innerHTML = request.data.top_units;
            document.getElementById('upperValue').innerHTML = uval;
        }
    }
);