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
        right : chrome.extension.getURL("image/arrows/right.png"),
        play : chrome.extension.getURL("image/play.png"),
        pause : chrome.extension.getURL("image/pause.png")
    }; //end iconUrl

    var $box = $("<div>", {
        id : "box"
    });

    var $boxClose = $("<img>", {
        title : "Close",
        id : "boxClose",
        class : "icon overlay boxController manga big ugoira_view",
        src : iconUrl.cross
    });

    var $boxDownload = $("<img>", {
        title : "Download",
        id : "boxDownload",
        class : "icon overlay boxController manga big ugoira_view",
        src : iconUrl.download
    });

    var $boxMultiDownload = $("<img>", {
        id : "boxMultiDownload",
        class : "icon overlay boxController manga ugoira_view",
        src : iconUrl.multiDownload
    });

    var $boxLoading = $("<img>", {
        id : "boxLoading",
        class : "boxDashboard",
        src : iconUrl.loading
    });

    var $boxTitle = $("<div>", {
        id : "boxTitle",
        class : "boxDashboard overlay"
    });

    var $boxLeft = $("<div>", {
        id : "boxLeft",
        class : "buttonZone manga big ugoira_view boxController"
    });

    var $boxLeftIcon = $("<img>", {
        title : "Left",
        id : "boxLeftIcon",
        class : "arrowIcon icon overlay manga big ugoira_view",
        src : iconUrl.left 
    });

    var $boxRight = $("<div>", {
        id : "boxRight",
        class : "buttonZone manga big ugoira_view boxController"
    });

    var $boxRightIcon = $("<img>", {
        title : "Right",
        id : "boxRightIcon",
        class : "arrowIcon icon overlay manga big ugoira_view",
        src : iconUrl.right
    });

    var $boxUp = $("<div>", {
        id : "boxUp",
        class : "buttonZone multiPicture boxController manga"
    });

    var $boxUpIcon = $("<img>", {
        title : "Up",
        id : "boxUpIcon",
        class : "arrowIcon icon overlay manga",
        src : iconUrl.up
    });

    var $boxDown = $("<div>", {
        id : "boxDown",
        class : "buttonZone multiPicture boxController manga"
    });

    var $boxDownIcon = $("<img>", {
        title : "Down",
        id : "boxDownIcon",
        class : "arrowIcon icon overlay manga",
        src : iconUrl.down
    });

    var $boxContent = $("<div>", {
        id : "boxContent"
    });

    var $boxImg = $("<img>", {
        id : "boxImg"
    });

    var $boxUgoira = $("<div>", {
        id : "boxUgoira",
        class : "buttonZone boxController ugoira_view",
    });

    var $boxUgoiraIcon = $("<img>", {
        title : "Pause",
        id : "boxUgoiraIcon",
        class : "icon overlay ugoira_view",
        src : iconUrl.pause
    });

    var $boxPage = $("<div>", {
        id : "boxPage",
        class : "boxDashboard overlay manga"
    });

    var $boxType = $("<div>", {
        id : "boxType",
        class : "boxDashboard overlay manga ugoira_view big"
    });

    var $boxProgress = $("<canvas>", {
        id : "boxProgress",
        class : "boxDashboard"
    }).attr({
        width : "30px",
        height : "30px"
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
                $boxDownload
            ).append(
                $boxMultiDownload
            ).append(
                $boxProgress
            ).append(
                $boxLoading
            ).append(
                $boxTitle
            ).append(
                $boxPage
            ).append(
                $boxType
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
                $boxContent.append(
                    $boxImg
                )
            ).append(
                $boxUgoira.append(
                    $boxUgoiraIcon
                )
            ) //end div#box append
        ) //end body append box
        .append(
            $boxShadow
        ) //end body append boxShadow
        .append(
            $enlarge
        ); //end body append enlarge
    }; //end setBox

    initialEnlarge = function() {
        $enlarge.css({
            "display" : "none",
            "opacity" : 0.4
        });
    }; //end initialEnlarge

    setThumbnail = function($thumbnail) {
         
        $thumbnail.hover(
            function(event) {
                var $this = $(this); //thumbnail

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
                    "data-current" : $this.attr("data-count")
                });

            },
            function() {
                //if mouse on #enlarge, don't remove #enlarge
                if(!$enlarge.is(":hover")) {
                    initialEnlarge();
                }
            }); //end hover
    }; //end setThumbnail

    urlParam = function(url, name) {
        var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(url);
        if(results === null) {
            return null;
        } else {
            return results[1];
        }
    }; //end urlParam

    getBigSrc = function(src, mode) {
        var bigSrc = "";
        if(mode === "big") {
            if(src.indexOf("600x600") === -1) {
                bigSrc = src.replace("_m", ""); //older type
            } else {
                //newer type
                bigSrc = src.replace("c/600x600/img-master/", "img-original/");
                bigSrc = bigSrc.replace("_master1200", "");
            }
        } else if(mode === "manga") {
            if(src.indexOf("1200x1200") === -1) {
                bigSrc = src.replace("_p", "_big_p"); //older type
            } else {
                //newer type
                bigSrc = src.replace("c/1200x1200/img-master/", "img-original/");
                bigSrc = bigSrc.replace("_master1200", "");
            }
        }
        return bigSrc;
    }; //end getBigSrc

    getNumberX = function(percent) {
        var x = 5;
        if(percent < 10) { 
            x = 12;
        } else if(percent < 100) {
            x = 8;
        }
        return x;
    }; //end getNumberX

    initialProgress = function(buttonLeft, buttonTop) {
        $boxProgress.css({
            display : "inline",
            left : buttonLeft,
            top: buttonTop
        });

        var canvas = $boxProgress[0];
        var context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height); //clean canvas

        //center
        var circleX = canvas.width / 2;
        var circleY = canvas.height / 2;

        var r = 14; //radius

        var startAngle = 0 * Math.PI; //right : 0, down : 0.5, left : 1, up : 1.5
        var endAngle = 2 * Math.PI;
        
        var clockwise = false; //false : clockwise, true: anticlockwise

        var numberX = getNumberX(0);

        context.beginPath();
        context.lineWidth = 2;
        context.arc(circleX, circleY, r, startAngle, endAngle, clockwise);

        context.fillStyle = "#FFFFFF";
        context.fill();
        context.strokeStyle = "#FFFFFF";
        context.stroke();

        context.font = "10pt";
        context.fillStyle = "#009900";
        context.fillText(0, numberX, 20);
        
    }; //end initialProgress

    currentProgress = function(proportion) {
        var canvas = $boxProgress[0];
        var context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height); //clean canvas

        //center
        var circleX = canvas.width / 2;
        var circleY = canvas.height / 2;

        var r = 14; //radius

        var startAngle = 1.5 * Math.PI; //right : 0, down : 0.5, left : 1, up : 1.5
        var endAngle = (1.5 + 2 * proportion) * Math.PI;
        
        var clockwise = false; //false : clockwise, true: anticlockwise
        
        var percent = parseInt(proportion * 100);

        var numberX = getNumberX(percent);

        context.lineWidth = 2;

        //background 
        context.beginPath();

        context.arc(circleX, circleY, r, 0, 2 * Math.PI, clockwise);

        context.fillStyle = "#FFFFFF";
        context.fill();
        context.strokeStyle = "#FFFFFF";
        context.stroke();

        //progress
        context.beginPath();
        context.arc(circleX, circleY, r, startAngle, endAngle, clockwise);

        context.strokeStyle = "#009900";
        context.stroke();

        context.font = "10pt";
        context.fillStyle = "#009900";
        context.fillText(percent, numberX, 20);
    }; //end currentProgress

    $.download = function() {
        abortAllAsyncStuff();
        var $this = $(this);
        var position = $this.position();
        var left = position.left;
        var top= position.top;
        initialProgress(left, top);

        var mode = $boxContent.attr("data-mode");
        var src = $boxImg.attr("src");

        var bigSrc = "";
        if(mode === "ugoira_view") {
            var gif = new GIF();
            asyncStuff.push(gif);
            for(var key in imgs) {
                var img = new Image();
                img.src = imgs[key].url;
                gif.addFrame(img, {delay : imgs[key].delay});
            }
            gif.on("progress", function(percent) {
                currentProgress(percent);
            });
            gif.on('finished', function(blob) {
                var dataType = blob.type.substring(blob.type.indexOf("/") + 1);
                var downloadIllustId = illustIdList[parseInt($boxContent.attr("data-now"))];
                saveAs(blob, downloadIllustId + "." + dataType);
                $boxProgress.fadeOut();
            });
            gif.render();
        } else {
            bigSrc = getBigSrc(src, mode);
            $.when(getBlobAndDoubleCheck(bigSrc)).done(function(blob) {
                if(blob === undefined) {
                    return false;
                }
                if(blob.size) {
                    var dataType = blob.type.substring(blob.type.indexOf("/") + 1);
                    var downloadIllustId = illustIdList[parseInt($boxContent.attr("data-now"))];
                    saveAs(blob, downloadIllustId + "." + dataType);
                    $boxProgress.fadeOut();
                } else {
                    //white flag
                }
            });
        }
    }; //end $.download

    getBlobAndDoubleCheck = function(url) {
        var deferred = $.Deferred();
        $.when(getBlob(url)).done(function(blob) {
            if(blob === undefined) {
                deferred.resolve();
                return false;
            }
            if(!blob.size) {
                var mimeType = url.substring(url.lastIndexOf("."));
                if(mimeType === ".jpg") {
                    url = url.replace(mimeType, ".png");
                } else {
                    url = url.replace(mimeType, ".jpg");
                }

                $.when(getBlob(url)).done(function(blob) {
                    deferred.resolve(blob);
                });
            } else {
                deferred.resolve(blob);
            }
        });
        return deferred;
    }; //end getBlobAndDoubleCheck

    getBlob = function(url) {
        var deferred = $.Deferred();
        var req = new XMLHttpRequest();
        asyncStuff.push(req);

        req.open("GET", url, true);
        req.responseType = "blob";

        req.onprogress = function(event) {
            if(event.lengthComputable) {
                var percentComplete = event.loaded/event.total;

                if($boxProgress.position().left === $boxMultiDownload.position().left && $boxContent.attr("data-mode") === "manga") {
                    var page = $boxContent.attr("data-allpage");
                    if(percentComplete === 1) {
                        pageCount++;
                    }
                    percentComplete = pageCount / page;
                }
                currentProgress(percentComplete);
            }
        };

        req.onabort = function() {
            deferred.resolve();
            return false;
        };

        req.onload = function(event) {
            var blob = req.response;
            deferred.resolve(blob);
        }; //end req.onload

        req.send();

        return deferred;
    }; //end getBlob

    $.addImgToZip = function(zip, imgLink, number) {
        var deferred = $.Deferred();

        $.when(getBlobAndDoubleCheck(imgLink)).done(function(blob) {
            if(blob === undefined) {
                deferred.resolve();
                return false;
            }
            if(blob.size) {
                var dataType = blob.type.substring(blob.type.indexOf("/") + 1);
                var reader = new FileReader();
                asyncStuff.push(reader);
                reader.onload = function() {
                    // reader.result contains the contents of blob as a typed array
                    zip.file("p" + number + "." + dataType, reader.result, {base64 : true});
                    deferred.resolve(zip);
                };
                reader.onabort = function() {
                    deferred.resolve();
                    return false;
                };
                reader.readAsArrayBuffer(blob);
            } else {
                deferred.resolve(zip);
            }
        });

        return deferred;
    }; //end addImgToZip

    checkZip = function(zip, imgLinks) {
        var mimeType = ".jpg";
        for(var key in imgLinks) {
            var name = imgLinks[key].substring(imgLinks[key].indexOf("_p") + 1, imgLinks[key].lastIndexOf("."));
            name = name + mimeType;
            if(zip.files[name] === undefined) {
                name = name.replace(mimeType, ".jpeg");
                mimeType = ".jpeg";
                if(zip.files[name] === undefined) {
                    name = name.replace(mimeType, ".png");
                    mimeType = ".png";
                    if(zip.files[name] === undefined) {
                        name = name.replace(mimeType, ".jpg");
                        mimeType = ".jpg";
                        if(zip.files[name] === undefined) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }; //checkZip

    $.multiDownload = function() {
        abortAllAsyncStuff();
        var $this = $(this);
        var position = $this.position();
        var left = position.left;
        var top= position.top;
        initialProgress(left, top);

        pageCount = 0;

        var mode = $boxContent.attr("data-mode");
        var currentPage = $boxContent.attr("data-page");
        var page = $boxContent.attr("data-allpage");
        var src = $boxImg.attr("src");
        var bigSrc = "";

        if(mode === "manga") {
            bigSrc = getBigSrc(src, "manga");
            bigSrc = bigSrc.replace("_p" + currentPage, "_p0");

            var imgLinks = [bigSrc];

            for(var i = 1; i < parseInt(page); i++) {
                imgLinks.push(bigSrc.replace("_p0", "_p" + i));
            } //end if

            var zip = new JSZip();
            var deferreds = [];

            for(var key in imgLinks) {
                deferreds.push( $.addImgToZip(zip, imgLinks[key], key));
            }

            $.when.apply(null, deferreds).done(function(zip) {
                if(!checkZip(zip, imgLinks)) {
                    return false;
                }
                var content = zip.generate({type : "blob"});

                var downloadIllustId = illustIdList[parseInt($boxContent.attr("data-now"))];
                saveAs(content, downloadIllustId + ".zip");

                $boxProgress.fadeOut();
            });
        } else {
            //ugoira
            bigSrc = bigUgoiraZipSrc;
            $.when(getBlobAndDoubleCheck(bigSrc)).done(function(blob) {
                if(blob === undefined) {
                    return false;
                }
                if(blob.size) {
                    var dataType = blob.type.substring(blob.type.indexOf("/") + 1);
                    var downloadIllustId = illustIdList[parseInt($boxContent.attr("data-now"))];
                    saveAs(blob, downloadIllustId + "." + dataType);
                    $boxProgress.fadeOut();
                } else {
                    //white flag
                }
            });
        }
    }; //end $.multiDownload

    getTitleInitialWidth = function() {
        var titleInitialWidth = $boxTitle.attr("data-initialwidth");
        var gap = ($boxTitle.position().left + $boxTitle.outerWidth(true)) - ($boxDownload.position().left);
        if($boxContent.attr("data-mode") === "manga" || $boxContent.attr("data-mode") === "ugoira_view") {
            gap += 30; //have multidownload
        }
        if(titleInitialWidth < 30) {
            titleInitialWidth = 30;
        } else if(gap > 0) {
            titleInitialWidth -= gap;
        }
        return titleInitialWidth;
    }; //end getTitleInitialWidth

    doSomethingAfterboxResize = function() {
        $("." + $boxContent.attr("data-mode")).css("display", "inline");
        var titleInitialWidth = getTitleInitialWidth();
        $boxTitle.attr({
            "data-initialwidth" : titleInitialWidth
        }).css({
            display : "inline",
            height : "30px",
            width : titleInitialWidth
        });
        $(".arrowIcon").css("display", "none");
        $boxUgoiraIcon.css("display", "none");
        if($boxContent.attr("data-mode") === "ugoira_view") {
            if(ifBoxClose) {
                return false;
            } else if($boxContent.attr("data-new") === "true") {
                timeoutID = window.setTimeout(changeImage, imgs[0].delay);
                $boxContent.attr("data-new", false);
            }
        }
    }; //end doSomethingAfterboxResize

    getImgSize = function() {
        //get initial picture size
        var medienPicture = new Image();
        medienPicture.src = $boxImg.attr("src");
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

        return {
            width : ImgWidth,
            height : ImgHeight
        };
    }; //end getImgSize

    boxResize = function() {
        var nowNum = $boxContent.attr("data-now");
        var $thumbnail = $("._layout-thumbnail[data-count=" + nowNum + "]").children(); //thumbnail
        var $this = $(this);
        if($thumbnail.attr("src") === $this.attr("src")) {
            return false;
        }

        var imgSize = getImgSize();
        var ImgWidth = imgSize.width;
        var ImgHeight = imgSize.height;

        //We have to get gap of size between thumbnail and medien picture
        var topOffsetFromBeforeToAfter = (ImgHeight - $this.height())/2;
        var leftOffsetFromBeforeToAfter = (ImgWidth - $this.width())/2;

        $boxLoading.css({
            display : "none",
        }); //boxLoading icon disable

        if(!(topOffsetFromBeforeToAfter || leftOffsetFromBeforeToAfter)) {
            if($boxContent.attr("data-new") === "true") {
                doSomethingAfterboxResize();
            }
            return false;
        }

        if($boxContent.attr("data-new") === "false" && $boxContent.attr("data-mode") === "ugoira_view") {
            return false;
        }

        //animate box and boxImg
        $box.animate({
            top : "-=" + topOffsetFromBeforeToAfter,
            left : "-=" + leftOffsetFromBeforeToAfter,
            height : ImgHeight,
            width : ImgWidth
        }, {
            step : function(now, fx) {
               if(fx.prop === "height") {
                   $this.css({
                        height : now
                   });
               }
               if(fx.prop === "width") {
                   $this.css({
                        width : now
                   });
               }
            },
            complete : function() {
                doSomethingAfterboxResize();
            }
        });
    }; //end boxResize

    getPageNum = function(current, page, method) {
        //Substraction
        var num = current;
        if(method === 0) {
            num--;
            if(num < 0) {
                num = page - 1;
            }
        } else {
            //Addition
            num++;
            if(num >= page) {
                num = 0;
            }
        }
        return num; 
    }; //end getPageNum
    
    getJsonFromScript = function(script, name) {
        var data = script.replace(/\s*=\s*/g, "=");
        var results = new RegExp(name + "=([^;]*)").exec(data);
        if(results === null) {
            return null;
        } else {
            return results[1];
        }
    }; //end getJsonFromScript

    setBoxDashboardAndController = function(data) {
        
        //parse web to get medien source
        var $parsed = $("<div>").append(data);
        var $aElement = $parsed.find('.works_display').find('a');
        var detailHref = $aElement[$aElement.length - 1].href;
        var mode = urlParam(detailHref, "mode");
        $boxContent.attr("data-mode", mode);
        var medienSrc = $parsed.find('.works_display').children('a').children('div').children('img').attr('src');
        var detailScript = $parsed.find("#wrapper").children("script")[0].innerText;
        var title = $.parseJSON(getJsonFromScript(detailScript, "pixiv.context.illustTitle"));
        var id = $.parseJSON(getJsonFromScript(detailScript, "pixiv.context.illustId"));
        var name = $.parseJSON(getJsonFromScript(detailScript, "pixiv.context.userName"));
        var userId = $.parseJSON(getJsonFromScript(detailScript, "pixiv.context.userId"));
        $boxTitle.html("<span class='bolder'>" + title + "</span>");
        var titleInitialWidth = $boxTitle.width();
        $boxTitle.html(
                "<span class='bolder'>" + title + "</span><br>" +
                "ID : " + id + "<br>" +
                "NAME : " + name + "<br>" +
                "USER ID : " + userId
        );
        var titleAfterHeight = $boxTitle.height();
        var titleAfterWidth = $boxTitle.width();
        $boxTitle.attr({
            "data-afterheight" : titleAfterHeight,
            "data-initialwidth" : titleInitialWidth,
            "data-afterwidth" : titleAfterWidth
        });

        if(mode === "big") {
            $boxType.html("<span class='bolder'>Single</span>");
        } else if(mode === "manga") {
            $boxType.html("<span class='bolder'>Multiple</span>");
            if(medienSrc.indexOf("600x600") === -1) {
                medienSrc = medienSrc.replace("_m", "_p0");
            } else {
                medienSrc = medienSrc.replace("600x600", "1200x1200");
            }
            var results = new RegExp("(\\d+)").exec($parsed.find('.work-info').find('.meta').children('li:nth-child(2)')[0].innerText);
            var page = results[1];
            $boxContent.attr({
                "data-page" : 0,
                "data-allpage" : page
            });
            $boxPage.html("1&nbsp;/&nbsp;" + page);
        } else if(mode === "ugoira_view") {
            $boxType.html("<span class='bolder'>Animate</span>");
            var ugoiraDetailData = $.parseJSON(getJsonFromScript(detailScript, "pixiv.context.ugokuIllustData"));
            var bigUgoiraData = $.parseJSON(getJsonFromScript(detailScript, "pixiv.context.ugokuIllustFullscreenData"));
            bigUgoiraZipSrc = bigUgoiraData.src;

            imgs = ugoiraDetailData.frames;
            var mimeType = ugoiraDetailData.mime_type;

            var zipSrc = ugoiraDetailData.src;

            var req = new XMLHttpRequest();
            asyncStuff.push(req);
            req.open("GET", zipSrc, true);
            req.responseType = "blob";

            req.onload = function(event) {
                var blob = req.response;
                var dataType = blob.type.substring(blob.type.indexOf("/") + 1);
                var reader = new FileReader();
                asyncStuff.push(reader);
                reader.onload = function() {
                    // reader.result contains the contents of blob as a typed array
                    var zipFile = new JSZip(reader.result);
                    for(var key in imgs) {
                        var uint8 = zipFile.files[imgs[key].file].asUint8Array();
                        var blob = new Blob([uint8], {type : mimeType});
                        var url = URL.createObjectURL(blob);
                        imgs[key].url = url;
                    }
                    $boxContent.attr("data-ugoiranext", 1);
                    $boxImg.attr("src", imgs[0].url);
                };
                reader.readAsArrayBuffer(blob);
                }; //end req.onload

            req.send();
            return false;
        }

        $boxImg.attr("src", medienSrc);
    }; //end setBoxDashBoardAndController

    function changeImage() {
        var next = $boxContent.attr("data-ugoiranext");
        $boxImg.attr("src", imgs[next].url);
        $boxContent.attr("data-ugoiranext", getPageNum(next, imgs.length, 1));
        timeoutID = window.setTimeout(changeImage, imgs[next].delay);
    }

    mangaPage = function() {
        abortAllAsyncStuff();
        $boxContent.attr("data-new", true);
        $(".boxDashboard").css("display", "none");
        $(".boxController").css("display", "none");
        initialBoxLoading();
        var $this = $(this);
        var nowSrc = $boxImg.attr("src");
        var nowPage = $boxContent.attr("data-page");
        var allPage = $boxContent.attr("data-allpage");
        var newPage = 0;
        if($this.attr("id") === "boxUp") {
            newPage = getPageNum(nowPage, allPage, 0);
        } else {
            newPage = getPageNum(nowPage, allPage, 1);
        }
        var newSrc = nowSrc.replace("_p" + nowPage, "_p" + newPage);
        $boxImg.attr("src", newSrc);
        $boxContent.attr("data-page", newPage);
        var humanPage = parseInt(newPage) + 1;
        $boxPage.html(humanPage + "&nbsp;/&nbsp;" + allPage);
    }; //end mangaPageEvent

    setPageMangaEvent = function() {
        $boxUp.click(mangaPage);
        $boxDown.click(mangaPage);
    }; //end setPageManga

    getDetailByAjax = function(href) {

            //get medien picture by ajax
            $.get(href, function(data) {
                setBoxDashboardAndController(data);
            });
            //end get medien picture by ajax

    }; //end getDetailByAjax

    getInitialBoxPosition = function($thumbnail) {
        
        var thumbnailOffset = $thumbnail.offset();

        var initialBoxLeft = thumbnailOffset.left - ($box.outerWidth(true) - $box.width())/2 + ($thumbnail.outerWidth() - $thumbnail.width())/2;
        var initialBoxTop = thumbnailOffset.top - ($box.outerHeight(true) - $box.height())/2 + ($thumbnail.outerHeight() - $thumbnail.height())/2;

        return {
            left : initialBoxLeft,
            top : initialBoxTop
        };
    }; //end getInitialBoxPosition

    abortAllAsyncStuff = function() {
        while(asyncStuff.length) {
            var stuff = asyncStuff.pop();
            stuff.abort();
        }
    }; //abortAllAsyncStuff

    $.boxClose = function(event) {
        abortAllAsyncStuff();
        ifBoxClose = true;
        if($boxContent.attr("data-mode") === "ugoira_view") {
            window.clearTimeout(timeoutID);
            $boxUgoiraIcon.attr("src", iconUrl.pause);
        }
        $boxTitle.css({
            width : "",
            height : ""
        });

        var num = $boxContent.attr("data-now");
        var $thumbnail = $("._layout-thumbnail[data-count=" + num + "]");
        var initialBoxPosition = getInitialBoxPosition($thumbnail);
        var $controller = $(".boxController");
        var $dashboard = $(".boxDashboard");
        $controller.css({display : "none"});
        $dashboard.css({display : "none"});
        $box.delay(1).animate({
            'width' : $thumbnail.width(),
            'height' : $thumbnail.height(),
            'top' : initialBoxPosition.top,
            'left' : initialBoxPosition.left
        }, {
            step : function(now, fx) {
                $controller.css({display : "none"});
                $dashboard.css({display : "none"});
                if(fx.prop === "width") {
                    $boxImg.css({
                        width : now
                    });
                }
                if(fx.prop === "height") {
                    $boxImg.css({
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
                $("html").unbind();
            }
        }); //end box animate
    }; //end $.boxClose

    setBoxCloseEvent = function() {
        $boxClose.click($.boxClose);
        $boxShadow.click($.boxClose);
    }; //end setBoxCloseEvent

    initialBox = function() {

        ifBoxClose = false;
        var nowNum = $boxContent.attr("data-now");
        var $thumbnail = $("._layout-thumbnail[data-count=" + nowNum + "]").children(); //thumbnail

        $("html").css({overflow : "hidden"}); //disable scroll bar
        $(".boxController").css({display : 'none'}); //button display none
        $(".boxDashboard").css({display : "none"});

        $box.css({width : "", height : ""}); //initial box
        $boxImg
            .attr("src", $thumbnail.attr("src"))
            .css({
                "height" : $thumbnail.height(),
                "width" : $thumbnail.width()
            });

        var initialBoxPosition = getInitialBoxPosition($thumbnail);
        $box.css({
            "top" : initialBoxPosition.top,
            "left" : initialBoxPosition.left,
            "display" : "inline",
            "position" : "absolute"
        });

        initialBoxLoading();

        $boxShadow.css({display : "inline"});

        //move box to centered
        $box.animate({
            top : $(document).scrollTop() + (window.innerHeight - $box.outerHeight(true))/2,
            left : $(document).scrollLeft() + (window.innerWidth - $box.outerWidth(true))/2
        });

    }; //end initialBox

    initialBoxLoading = function() {
        
        //set boxLoading initial position
        $boxLoading.css({display : "inline"})
            .css({
                top : "50%",
                left : "50%"
            }).css({
                top : $boxLoading.position().top - $boxLoading.height()/2,
                left : $boxLoading.position().left - $boxLoading.width()/2,
            });
        //end set boxLoading initial position

    }; //end initialBoxLoading

    setEnlargeEvent = function() {

        $enlarge.hover(
            function() {
                $(this).css("opacity", 1.0);
            },
            function() {
                initialEnlarge();
            }
        ).click(function() {
            $("html").bind("mousewheel", function() {
                return false;
            });

            var $this = $(this); //enlargeIcon
            var currentNum = $this.attr("data-current");

            var href = "/member_illust.php?mode=medium&illust_id=" + illustIdList[currentNum]; //picture link

            $boxContent.attr({
                "data-new" : true,
                "data-now" : currentNum
            });

            initialBox();

            getDetailByAjax(href);
            
            initialEnlarge();
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

    pageBox = function() {
        abortAllAsyncStuff();
        if($boxContent.attr("data-mode") === "ugoira_view") {
            window.clearTimeout(timeoutID);
            $boxUgoiraIcon.attr("src", iconUrl.pause);
        }
        $boxContent.attr("data-new", true);
        $(".boxController").css("display", "none");
        $(".boxDashboard").css("display", "none");
        $boxTitle.css({
            width : "",
            height : ""
        });
        $this = $(this);
        if($this.attr("id") === "boxRight") {
            $boxContent.attr("data-now", getPageNum($boxContent.attr("data-now"), illustIdList.length, 1));
        } else {
            $boxContent.attr("data-now", getPageNum($boxContent.attr("data-now"), illustIdList.length, 0));
        }
        initialBoxLoading();

        var href = "/member_illust.php?mode=medium&illust_id=" + illustIdList[$boxContent.attr("data-now")]; //picture link
        getDetailByAjax(href);
    }; //end pageBox

    setBoxPageEvent = function() {
        $boxLeft.click(pageBox);
        $boxRight.click(pageBox);
    }; //end setBoxPageEvent

    setArrowsEvent = function() {
        $(".buttonZone").hover(
            function() {
                $this = $(this);
                $("#" + $this.attr("id") + "Icon").css("display", "inline");
            }, function() {
                $this = $(this);
                $("#" + $this.attr("id") + "Icon").css("display", "none");
        });
    }; //end setArrowsEvent

    setDownloadEvent = function() {
        $boxDownload.click($.download);
        $boxMultiDownload.click($.multiDownload);
    };

    setUgoiraEvent = function() {
        $boxUgoira.click(function() {
            var $this = $(this);
            if($boxUgoiraIcon.attr("src") === iconUrl.pause) {
                window.clearTimeout(timeoutID);
                $boxUgoiraIcon.attr("src", iconUrl.play);
            } else {
                changeImage();
                $boxUgoiraIcon.attr("src", iconUrl.pause);
            }
        }); //end click
    }; //end setUgoiraEvent

    setTitleEvent = function() {
        $boxTitle.hover(function() {
            $this = $(this);
            $this.animate({
                height : $this.attr("data-afterheight"),
                width : parseInt($this.attr("data-afterwidth")) + 30
            });
        }, function() {
            $this = $(this);
            $this.animate({
                height : "30px",
                width : $this.attr("data-initialwidth")
            });
        }); //end hover
    }; //end setTitleEvent

    setResizeHandler = function() {
        $(window).resize(function() {
            $boxShadow.css({
                width : window.innerWidth,
                height : window.innerHeight
            });

            var imgSize = getImgSize();

            $box.css({
                width : imgSize.width,
                height : imgSize.height,
                top : $(document).scrollTop() + (window.innerHeight - $box.outerHeight(true))/2,
                left : $(document).scrollLeft() + (window.innerWidth - $box.outerWidth(true))/2
            }); //end box animate

            $boxImg.css({
                width : imgSize.width,
                height : imgSize.height
            });
        }); //end window resize
    }; //end setResizeHandler

    traversalThumbnails = function() {
        var layoutThumbnails = $("._layout-thumbnail");
        var count = illustIdList.length;
        for(var i = count; i < layoutThumbnails.length; i++) {
            var $layoutThumbnail = $(layoutThumbnails[i]);
            var illustId = urlParam($layoutThumbnail.parent("a").attr("href"), "illust_id");
            if(illustId) {
                $layoutThumbnail.attr("data-count", count);
                count++;
                illustIdList.push(illustId);
                setThumbnail($layoutThumbnail);
            }
        }
    }; //end traversalThumbnails

    setBoxLoadEvent = function() {
        $boxImg.load(boxResize);
    }; //end setBoxLoadEvent

    setScrollEvent = function() {
        $(window).scroll(function() {
            var listLength = illustIdList.length;
            if(listLength < $("._layout-thumbnail").length) {
                traversalThumbnails();
            }
        });
    }; //end setScrollEvent
    //end function sets

    var asyncStuff = [];

    var ifBoxClose = true;

    var pageCount = 0; //multiDownload counter

    //ugoira animate 
    var timeoutID = 0;
    var imgs = [];
    var bigUgoiraZipSrc = "";

    //illust id list
    var illustIdList = [];

    traversalThumbnails();
    setBox();
    setEnlargeEvent();
    setBoxCloseEvent();
    setBoxPageEvent();
    setPageMangaEvent();
    setArrowsEvent();
    setDownloadEvent();
    setUgoiraEvent();
    setTitleEvent();
    setResizeHandler();
    setBoxLoadEvent();
    setScrollEvent();

});
