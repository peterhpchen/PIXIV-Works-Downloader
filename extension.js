$(document).ready(function() {
    var enlargeIconUrl = chrome.extension.getURL("image/enlarge.png");
    $(".image-item").find("img").attr("src", enlargeIconUrl);
    //$(".image-item").addClass("canDownload");
});
