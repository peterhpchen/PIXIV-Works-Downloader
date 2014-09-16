$(document).ready(function() {
    var enlargeIconUrl = chrome.extension.getURL("image/enlarge.png");
    var imageItem = $(".image-item");
    imageItem.find("img").bind({
        mouseenter : function() {
            var $this = $(this);
            var position = $this.position();
            var enlargeElement = $("<img>", {
                src : enlargeIconUrl,
                class : "overlay icon",
                id : "enlarge",
                });
            $this.after(enlargeElement);

            //width() : element
            //outerWidth() : (border + padding)*2 + element
            //outerWidth(true) : (margin + border + padding)*2 + element
            var left = position.left + ( $this.outerWidth(true) - $this.outerWidth() )/2 + $this.outerWidth() - enlargeElement.outerWidth(true);
            enlargeElement.css({ 
                "top" : position.top, 
                "left" : left,
            });

            enlargeElement.bind({
                mouseleave : function() {
                    $(this).remove();
                }
            });
        },
        mouseleave : function() {
            console.log("mouseleave"); 
            var $this = $(this);
            //if mouse on #enlarge, don't remove #enlarge
            if(!$("#enlarge").is(":hover")) {
                $("#enlarge").remove();
            }
        }
    });
});
