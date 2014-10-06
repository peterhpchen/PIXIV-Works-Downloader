$(document).ready(function() {

    var iconUrl = {
        enlarge : chrome.extension.getURL("image/enlarge.png"),
        cross : chrome.extension.getURL("image/cross.png"),
        loading : chrome.extension.getURL("image/loading.gif"),
        download : chrome.extension.getURL("image/download.png"),
        multiDownload : chrome.extension.getURL("image/multiDownload.png"),
        up : chrome.extension.getURL("image/arrows/up.png"),
        down : chrome.extension.getURL("image/arrows/down.png"),
        left : chrome.extension.getURL("image/arrows/left.png"),
        right : chrome.extension.getURL("image/arrows/right.png")
    }; //end iconUrl

    var $box = $("<div>", {
        id : "box"
    });

    var $boxClose = $("<img>", {
        title : "Close",
        id : "boxClose",
        class : "icon overlay boxController manga single ugoira",
        src : iconUrl.cross
    });

    var $boxDownloadLink = $("<a>", {
        id : "boxDownloadLink",
        class : "manga single ugoira"
    });

    var $boxDownload = $("<img>", {
        title : "Download",
        id : "boxDownload",
        class : "icon overlay boxController manga single ugoira",
        src : iconUrl.download
    });

    var $boxMultiDownload = $("<img>", {
        id : "boxMultiDownload",
        class : "icon overlay boxController manga ugoira",
        src : iconUrl.multiDownload
    });

    var $boxLoading = $("<img>", {
        id : "boxLoading",
        src : iconUrl.loading
    });

    var $boxTitle = $("<div>", {
        id : "boxTitle",
        class : "manga single ugoira"
    });

    var $boxLeft = $("<div>", {
        id : "boxLeft",
        class : "manga single ugoira"
    });

    var $boxLeftIcon = $("<img>", {
        id : "boxLeftIcon",
        class : "icon overlay boxController manga single ugoira",
        src : iconUrl.left 
    });

    var $boxRight = $("<div>", {
        id : "boxRight",
        class : "manga single ugoira"
    });

    var $boxRightIcon = $("<img>", {
        id : "boxRightIcon",
        class : "icon overlay boxController manga single ugoira",
        src : iconUrl.right
    });

    var $boxUp = $("<div>", {
        id : "boxUp",
        class : "multiPicture manga"
    });

    var $boxUpIcon = $("<img>", {
        id : "boxUpIcon",
        class : "icon overlay boxController manga",
        src : iconUrl.up
    });

    var $boxDown = $("<div>", {
        id : "boxDown",
        class : "multiPicture manga"
    });

    var $boxDownIcon = $("<img>", {
        id : "boxDownIcon",
        class : "icon overlay boxController manga",
        src : iconUrl.down
    });

    var $boxContent = $("<div>", {
        id : "boxContent"
    });

    var $boxShadow = $("<div>", {
        id : "boxShadow"
    }).css({
        height : window.innerHeight,
        width : window.innerWidth,
    });

    var $enlarge = $("<img>", {
        src : iconUrl.enlarge,
        class : "overlay icon",
        id : "enlarge",
        title : "Enlarge"
    });

    //function sets

    setBox = function() {
        $("body").append( 
            $box.append(
                $boxClose
            ).append(
                $boxDownloadLink.append(
                    $boxDownload
                )
            ).append(
                $boxMultiDownload
            ).append(
                $boxLoading
            ).append(
                $boxTitle
            ).append(
                $boxLeft.append(
                    $boxLeftIcon
                ) //end div#boxleft append
            ).append(
                $boxRight.append(
                    $boxRightIcon
                ) //end div#boxleft append
            ).append(
                $boxUp.append(
                    $boxUpIcon
                ) //end div#boxleft append
            ).append(
                $boxDown.append(
                    $boxDownIcon
                ) //end div#boxleft append
            ).append(
                $boxContent
            ) //end div#box append
        ) //end body append box
        .append(
            $boxShadow
        ) //end body append boxShadow
        .append(
            $enlarge
        ); //end body append enlarge
    }; //end setBox

    initialEnlarge = function($enlarge) {
        $enlarge.css({
            "display" : "none",
            "opacity" : 0.4
        }).unbind();
    }; //end initialEnlarge

    setThumbnail = function() {
         
        var $layoutThumbnails = $("._layout-thumbnail"); //get div._layout-thumbnail (img.thumbnail 's parent)
        var $thumbnails = $("._thumbnail"); //get img._thumbnail (small picture)

        $layoutThumbnails.hover(
            function(event) {
                var $this = $(this); //thumbnail

                var nextHref = $this.closest("li").next(".image-item").children(".work").attr("href");
                var prevHref = $this.closest("li").prev(".image-item").children(".work").attr("href");
                var detailHref = $this.closest('a').attr('href'); //picture link

                //width() : element
                //outerWidth() : (border + padding)*2 + element
                //outerWidth(true) : (margin + border + padding)*2 + element
                var offsetOfThumbnail = $this.offset(); //absolute position
                var enlargeTop = offsetOfThumbnail.top;
                var enlargeLeft = offsetOfThumbnail.left + $this.outerWidth() - $enlarge.outerWidth(true);
                $enlarge.css({
                    "display" : "inline",
                    "top" : enlargeTop,
                    "left" : enlargeLeft
                }).attr({
                    "data-previd" : urlParam(prevHref, "illust_id"),
                    "data-currentid" : urlParam(detailHref, "illust_id"),
                    "data-nextid" : urlParam(nextHref, "illust_id")
                });

                setEnlargeEvent($enlarge, $this);
            },
            function() {
                $enlarge = $("#enlarge");
                //if mouse on #enlarge, don't remove #enlarge
                if(!$enlarge.is(":hover")) {
                    initialEnlarge($enlarge);
                }
            }); //end hover
    }; //end setThumbnail

    urlParam = function(url, name) {
        var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(url);
       return results[1] || 0;
    }; //end urlParam

    $.download = function(mode) {
        var $boxImg = $("#boxImg");
        var src = $boxImg.attr("src").replace("c/600x600/img-master/", "img-original/");
        if(mode === "manga") {
            if(src.indexOf("1200x1200") === -1) {
                src = src.replace("_p", "_big_p");
            }
        }
        src = src.replace("c/1200x1200/img-master/", "img-original/");
        var bigSrc = src.substring(0, src.lastIndexOf("_")) + src.substring(src.lastIndexOf("."));

                console.log(bigSrc);
        $boxDownloadLink.attr({
            href : bigSrc,
            download : ""
        });
    }; //end $.download

    getBlobUrlFromPng = function(url) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "blob";

        req.onload = function(event) {
            var blob = req.response;
            var url = URL.createObjectURL(blob);
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
               // reader.result contains the contents of blob as a typed array
            var zip = new JSZip();

            zip.file("test.png", reader.result, {base64 : true});

            var content = zip.generate({type : "blob"});

            saveAs(content, "test.zip");

            });
            reader.readAsArrayBuffer(blob);

        }; //end req.onload

        req.send();
    }; //end getBlobUrlFromPng

    $.addImgToZip = function(zip, imgLink, number) {
        var deferred = $.Deferred();

        var req = new XMLHttpRequest();
        req.open("GET", imgLink, true);
        req.responseType = "blob";

        req.onload = function(event) {
            var blob = req.response;
            console.log(blob.type);
            var url = URL.createObjectURL(blob);
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
               // reader.result contains the contents of blob as a typed array

                zip.file("p" + number + ".png", reader.result, {base64 : true});
                deferred.resolve(zip);
            });
            reader.readAsArrayBuffer(blob);

        }; //end req.onload

        req.send();

        return deferred;
    }; //end addImgToZip

    generateZip = function(zip) {
        var content = zip.generate({type : "blob"});

        saveAs(content, "test.zip");

    }; //end generateZip

    $.multiDownload = function(page) {
        var $boxImg = $("#oxImg");
        var results = new RegExp("[p](\\d+)").exec($boxImg.attr("src"));
        var currentPage = results[1];
        var src = $boxImg.attr("src").replace("c/600x600/img-master/", "img-original/");
            if(src.indexOf("1200x1200") === -1) {
                src = src.replace("_p", "_big_p");
            }
        src = src.replace("c/1200x1200/img-master/", "img-original/");
        var bigSrc = src;
        if(src.lastIndexOf("_m") !== -1) {
            bigSrc = src.substring(0, src.lastIndexOf("_m")) + src.substring(src.lastIndexOf("."));
        }
        
        var imgLinks = [bigSrc];

        for(var i = 1; i < parseInt(page); i++) {
            imgLinks.push(bigSrc.replace("_p0", "_p" + i));
        } //end if

        var zip = new JSZip();
        var deferreds = [];

        for(var key in imgLinks) {
            console.log(imgLinks[key]);
            deferreds.push( $.addImgToZip(zip, imgLinks[key], key));
        }

        $.when.apply(null, deferreds).done(generateZip);
    }; //end $.multiDownload

    $.moveToNextPicture = function() {
    }; //end moveToNextPicture

    getDetailByAjax = function(href) {

            //get medien picture by ajax
            $.get(href, function(data) {

                //parse web to get medien source
                var $parsed = $("<div>").append(data);
                var detailHref = $parsed.find('.works_display').children('a').attr('href');
                var mode = urlParam(detailHref, "mode");
                var medienSrc = $parsed.find('.works_display').children('a').children('div').children('img').attr('src');
                if(mode === "manga") {
                    if(medienSrc.indexOf("600x600") === -1) {
                        medienSrc = medienSrc.replace("_m", "_p0");
                    } else {
                        medienSrc = medienSrc.replace("600x600", "1200x1200");
                    }
                    var results = new RegExp("(\\d+)").exec($parsed.find('.ui-expander-target').children('.meta').children('li:nth-child(2)')[0].innerText);
                    var page = results[1];
                    //$("#boxDownIcon").css({display : "inline"});
                }
                //end parse web to get medien source

                var $boxImg = $("#boxImg");
                
                //when #boxImg's src change, change top, left, height and width
                $boxImg.attr('src', medienSrc).load(function() {

                    $this = $(this); //boxImg

                    //get initial picture size
                    var medienPicture = new Image();
                    medienPicture.src = $this.attr("src");
                    //end get initial picture size

                    var maxWidth = window.innerWidth - 100;
                    var maxHeight = window.innerHeight - 100;
                    
                    var ImgWidth = medienPicture.width;
                    var ImgHeight = medienPicture.height;

                    if(maxWidth < ImgWidth) {
                        ImgHeight = ImgHeight*maxWidth/ImgWidth;
                        ImgWidth = maxWidth;
                    }
                    if(maxHeight < ImgHeight) {
                        ImgWidth = ImgWidth*maxHeight/ImgHeight;
                        ImgHeight = maxHeight;
                    }

                    //We have to get gap of size between thumbnail and medien picture
                    var topOffsetFromBeforeToAfter = (ImgHeight - $this.height())/2;
                    var leftOffsetFromBeforeToAfter = (ImgWidth - $this.width())/2;

                    $boxLoading.css({
                        display : "none",
                    }); //boxLoading icon disable

                    //animate box and boxImg
                    $box.animate({
                        top : "-=" + topOffsetFromBeforeToAfter,
                        left : "-=" + leftOffsetFromBeforeToAfter,
                        height : ImgHeight,
                        width : ImgWidth
                    }, {
                        step : function(now, fx) {
                           if(fx.prop === "height") {
                               $boxImg.css({
                                    height : now
                               });
                           }
                           if(fx.prop === "width") {
                               $boxImg.css({
                                    width : now
                               });
                           }
                        },
                        complete : function() {
                            $boxClose.css({display : "inline"});
                            //$('#boxDownload').css({display : "inline"}).unbind().click($.download);
                            $boxDownload.css({display : "inline"}).unbind();
                            $.download(mode);
                            $('#boxUp, #boxDown').unbind();

                            if(mode === "manga") {
                                $boxMultiDownload.unbind().click(page, function(event) {
                                    $.multiDownload(event.data);
                                }).css({display : "inline"});
                                $('#boxUp, #boxDown').css({display : "inline"}).hover(
                                        function() {
                                            $(this).children().css({display : "inline"});
                                        },function() {
                                            $(this).children().css({display : "none"});
                                        }
                                ).click({"page" : page}, function(event) {
                                    var page = event.data.page;
                                    var $boxImg = $('#boxImg');
                                    var results = new RegExp("[p](\\d+)").exec($boxImg.attr("src"));
                                    var currentPage = results[1];

                                    var nextPage = currentPage;
                                    if($(this).attr("id") === "boxUp") {
                                        nextPage = currentPage - 1;
                                        if(parseInt(currentPage) === 0) {
                                            nextPage = page - 1;
                                        }
                                    } else if($(this).attr("id") === "boxDown") {
                                        nextPage = parseInt(currentPage) + 1;
                                        if(parseInt(nextPage) === parseInt(page)) {
                                            nextPage = "0";
                                        }
                                    }

                                    var medienSrc = $boxImg.attr("src").replace("p" + currentPage, "p" + nextPage);

                                    $boxImg.css({display : "none"});
                                    $boxImg.attr("src", medienSrc).load(function() {
                                        $boxImg.css({display : "inline"});
                                        $.download("manga");
                                    });
                                });
                            }
                        }
                    }); //end box animate
                }); //end #boxImg load
            });
            //end get medien picture by ajax

    }; //end getDetailByAjax

    $.boxClose = function(event) {
                var $box = event.data.box;
                var thumbnailWidth= event.data.thumbnailWidth;
                var thumbnailHeight = event.data.thumbnailHeight;
                var initialBoxTop = event.data.initialBoxTop;
                var initialBoxLeft = event.data.initialBoxLeft;
                var $controller = $(".boxController");
                $controller.css({display : "none"});
                $box.delay(1).animate({
                    'width' : thumbnailWidth,
                    'height' : thumbnailHeight,
                    'top' : initialBoxTop,
                    'left' : initialBoxLeft 
                }, {
                    step : function(now, fx) {
                        if(fx.prop === "width") {
                            $("#boxImg").css({
                                width : now
                            });
                        }
                        if(fx.prop === "height") {
                            $("#boxImg").css({
                                height : now
                            });
                        }
                    },
                    complete : function() {
                        $boxShadow.css("display", "none");
                        $box.css({
                            display : "none",
                            width : "auto",
                            height : "auto"
                        });
                        $("html").css({overflow : "auto"}); //enable scroll bar
                        $("#boxImg").remove();
                    }
                }); //end box animate
    }; //end $.boxClose

    setEnlargeEvent = function($enlarge, $layoutThumbnails) {

        $enlarge.hover(
            function() {
                $(this).css("opacity", 1.0);
            },
            function() {
                initialEnlarge($(this));
            }
        ).click($layoutThumbnails, function(event) {

            var $this = $(this); //enlargeIcon
            var $thumbnail = $(event.data).children('._thumbnail'); //thumbnail

            var href = $thumbnail.closest('a').attr('href'); //picture link

            //get thumbnail coordinate, width and height
            var thumbnailTop = $thumbnail.offset().top;
            var thumbnailLeft = $thumbnail.offset().left;
            var thumbnailWidth = $thumbnail.width();
            var thumbnailHeight = $thumbnail.height();
            //end get thumbnail coordinate, width and height

            $("html").css({overflow : "hidden"}); //disable scroll bar

            //set thumbnail for box
            $boxContent
                .append($("<img>", {
                    id : "boxImg",
                    src : $thumbnail.attr('src')
                }).css({
                    'height' : thumbnailHeight,
                    'width' : thumbnailWidth
                }));
            //end set thumbnail for box

            getDetailByAjax(href);

            $(".boxController").css({display : 'none'}); //button display none

            //set box initial value
            var initialBoxLeft = thumbnailLeft - ($box.outerWidth(true) - $box.width())/2 + ($thumbnail.outerWidth() - thumbnailWidth)/2;
            var initialBoxTop = thumbnailTop - ($box.outerHeight(true) - $box.height())/2 + ($thumbnail.outerHeight() - thumbnailHeight)/2;
            $box.css({
                'top' : initialBoxTop,
                'left' : initialBoxLeft,
                'display' : 'inline',
                'position' : 'absolute'
            });
            //end set box initial value

            $boxClose.unbind().click({'box' : $box, 'thumbnailWidth' : thumbnailWidth, 'thumbnailHeight' : thumbnailHeight, 'initialBoxTop' : initialBoxTop, 'initialBoxLeft' : initialBoxLeft}, $.boxClose);

            //set boxshadow. When click boxShadow, disable box and boxShadow
            $boxShadow.css({display : "inline"}).unbind()
            .click({'box' : $box, 'thumbnailWidth' : thumbnailWidth, 'thumbnailHeight' : thumbnailHeight, 'initialBoxTop' : initialBoxTop, 'initialBoxLeft' : initialBoxLeft}, $.boxClose); //end boxShadow click

            //set boxLoading initial position
            var initialBoxLoadingLeft = $boxLoading.position().top + ($box.width() - $boxLoading.width())/2;
            var initialBoxLoadingTop = $boxLoading.position().left + ($box.height() - $boxLoading.height())/2;
            $boxLoading.css({display : "inline"})
                .css({
                    top : "50%",
                    left : "50%"
                }).css({
                    top : $boxLoading.position().top - $boxLoading.height()/2,
                    left : $boxLoading.position().left - $boxLoading.width()/2,
                });
            //end set boxLoading initial position

            //move box to centered
            $box.animate({
                top : $(document).scrollTop() + (window.innerHeight - $box.outerHeight(true))/2,
                left : $(document).scrollLeft() + (window.innerWidth - $box.outerWidth(true))/2
            });
            
            initialEnlarge($this);
            event.preventDefault();
        });
    };

    setEnlarge = function(IconUrl) {
        $("body").append(
            $("<img>", {
                src : IconUrl.enlarge,
                class : "overlay icon",
                id : "enlarge",
                title : "Enlarge",
                display : "none"
                })
        );
    }; //end setEnlarge

    //end function sets
    
    setBox();
    setThumbnail();

    $(window).resize(function() {
        $boxShadow.css({
            width : window.innerWidth,
            height : window.innerHeight
        });

        $box.css({
            top : $(document).scrollTop() + (window.innerHeight - $box.outerHeight(true))/2,
            left : $(document).scrollLeft() + (window.innerWidth - $box.outerWidth(true))/2
        }); //end box animate
    }); //end window resize

    //$(window).scroll(function() {
    //    var $box = $('#box');
    //    $box.css({
    //        top : $(document).scrollTop() + (window.innerHeight - $box.outerHeight(true))/2,
    //        left : $(document).scrollLeft() + (window.innerWidth - $box.outerWidth(true))/2
    //    }); //end box animate
    //}); //end window scroll
});
