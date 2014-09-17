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
            var top = position.top + parseInt($this.css("border-width"));
            var left = position.left + ( $this.outerWidth(true) - $this.outerWidth() )/2 + $this.outerWidth() - parseInt($this.css("border-width")) - enlargeElement.outerWidth(true);
            enlargeElement.css({ 
                "top" : top, 
                "left" : left,
            });

            enlargeElement.bind({
                mouseenter : function() {
                    var $this = $(this);
                    $this.css("opacity", 1.0);
                },
                mouseleave : function() {
                    $(this).remove();
                },
                click : function(event) {
                    var $this = $(this);
                    //var href = $this.parents('.work').attr('href');
                    var href = "http://i2.pixiv.net/img-zip-ugoira/img/2014/09/15/20/51/11/46000573_ugoira1920x1080.zip";
                    $.get(href, function(data) {
                        //var $parsed = $('<div>').append(data);
                        //var src = $parsed.find('.works_display').children('a').children('img').attr('src');
                        //var bigSrc = src.replace('_m', '');
                        //$('body').append(

                        //    $("<img>", { src : bigSrc })
                        //);
                        alert(data);
                    });
                    //alert(src);
                    event.preventDefault();
                }
            });
        },
        mouseleave : function() {
            var $this = $(this);
            //if mouse on #enlarge, don't remove #enlarge
            if(!$("#enlarge").is(":hover")) {
                $("#enlarge").remove();
            }
        }
    });
});
