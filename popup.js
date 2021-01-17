chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "values") {
            document.getElementById('input').innerHTML = request.data.query_value + " " + request.data.query_units;
        }
    }
);