chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Smoot it!";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context}); 
});

function onClickHandler(info, tab) {
    var sText = info.selectionText;
    var url = "https://www.google.com/search?q=" + encodeURIComponent(sText); 
    window.open(url, '_blank');
}

chrome.contextMenus.onClicked.addListener(onClickHandler);