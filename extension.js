$(document).ready(function() {
    var enlargeIconUrl = chrome.extension.getURL("image/enlarge.png");
    var imageItem = $(".image-item");
    imageItem.find("img").bind({
        mouseenter : function(event) {
            var $this = $(this);
            var position = $this.offset();
            var enlargeElement = $("<img>", {
                src : enlargeIconUrl,
                class : "overlay icon",
                id : "enlarge",
                title : "Enlarge",
                //'data-url' : $this.parents('.work').attr('href')
                });
            $('body').append(enlargeElement);
            //width() : element
            //outerWidth() : (border + padding)*2 + element
            //outerWidth(true) : (margin + border + padding)*2 + element
            var top = position.top;
            var left = position.left + $this.outerWidth() - enlargeElement.outerWidth(true);
            enlargeElement.css({ 
                "top" : top, 
                "left" : left,
            });
            enlargeElement.hover(
                function() {
                    var $this = $(this);
                    $this.css("opacity", 1.0);
                },
                function() {
                    $(this).remove();
                }
            ).click(event.target, function(event) {
                var $this = $(this);
                var $target = $(event.data);
                var href = $target.closest('a').attr('href');
                var initialTop = $target.top;
                var initialLeft = $target.left;
                var initialWidth = $target.width();
                var initialHeight = $target.height();
                $.get(href, function(data) {
                    var $parsed = $('<div>').append(data);
                    var medienSrc = $parsed.find('.works_display').children('a').children('img').attr('src');
                    var bigSrc = medienSrc.replace('_m', '');
                    $target.attr('src', medienSrc);
                });
                $target.css({
                    'position' : 'fixed',
                    'z-index' : 10000,
                    //'width' : window.innerWidth,
                    //'height' : window.innerHeight,
                    'top' : Math.floor((window.innerHeight - initialHeight)/2),
                    'left' : Math.floor(( window.innerWidth - initialWidth)/2)
                });
                $('body').append(
                    $('<div>')
                        .attr('id', 'shadow')
                        .css({
                            'position' : 'fixed',
                            'background-color' : 'Black',
                            'opacity' : 0.3,
                            'top' : 0,
                            'left' : 0,
                            'height' : window.innerHeight,
                            'width' : window.innerWidth,
                            'z-index' : 9999
                        })
                        .click({'target' : $target, 'initialTop' : initialTop, 'initialLeft' : initialLeft}, function(event) {
                            var $target = event.data.target;
                            var initialTop = event.data.initialTop;
                            var initialLeft = event.data.initialLeft;
                            $target.css({
                                'position' : 'static',
                                'width' : initialWidth,
                                'height' : initialHeight,
                                'top' : initialTop,
                                'left' : initialLeft
                            });
                            $(this).remove();
                        })
                );
                $this.remove();

                event.preventDefault();
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
