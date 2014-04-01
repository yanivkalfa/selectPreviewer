/*
 * @ jQuery plugin app
 */
(function($){
    $.fn.selectPreview = function(opts)
    {
        $(this).each(function(){
            var s = {
                obj : $(this),
                oVars : {
                    sourceSelect : {
                        style :{
                            width:0
                        },
                        attr : {
                            class : ""
                        },
                        options : []
                    },
                    lastValue : "",
                    timeOut : 0,
                    startFlag : false,
                    iframeFocus : false
                },
                oDef : {
                    "imgBGColor" : "black",
                    "showImg" :  true,
                    "showText" : true,
                    "optExit" : "",
                    "optEnter" : "",
                    "srcImgWidth" : "20px",
                    "srcImgHeight" : "20px",
                    "prevWinLinkWidth" : "300px",
                    "prevWinLinkHeight" : "300px",
                    "prevWinImgWidth" : "auto",
                    "prevWinImgHeight" : "auto",
                    "prevWinWaitTime" : 0
                },
                oBinds : {
                    selectCopy : "",
                    imgHolder : $('<div class="imgHolder"></div>'),
                    previewerSelect : '.previewerSelect',
                    previewerSelectedOption : '.previewerSelectedOption',
                    previewerArrow : '.previewerArrow',
                    previewerOptionsWrap : '.previewerOptionsWrap',
                    previewerOption : '.previewerOption',
                    prevWinHolder : $('<div class="prevWinHolder displayNone"></div>'),
                    bgBorderShadow : $('<div class="bgBorderShadow"></div>'),
                    prevIFrame : $('<iframe class="prevIFrame"></iframe>'),
                    prevImgHold : $('<img class="prevImgHold">'),
                    loader : $('<img class="loader" src="http://www.buildingenergycontrol.com/wp-content/plugins/buildingenergycontrol/images/ajax-loader.gif">')
                },
                oFns : {
                    init : function(){
                        s.obj.wrap('<div class="previewerWrap"></div>');
                        s.oBinds.selectCopy = s.obj.parent('.previewerWrap');
                        s.oBinds.selectCopy.append(s.oBinds.imgHolder);
                        s.obj.hide();
                        s.oFns.collectInfo();
                    },

                    collectInfo : function(){
                        var img, results = 0, options = s.obj.find('option').length ,  siteHostName = s.oFns.getHostName(), a;
                        s.oBinds.imgHolder.html('');
                        s.oVars.sourceSelect.style.width = s.obj.width();
                        s.oVars.sourceSelect.attr.class = s.obj.attr('class');
                        s.obj.find('option').each(function(iIndex, oNode){
                            s.oVars.sourceSelect.options.push({
                                "value" : oNode.value,
                                "selected" : oNode.selected,
                                "innerHTML" : oNode.innerHTML,
                                "disabled" : oNode.disabled,
                                "type" : ""
                            });

                            a = $('<a>', { href:oNode.value } )[0];
                            if(typeof a.hostname !== "undefined"  && a.hostname !="" && a.hostname != siteHostName){
                                img = $('<img src="' + oNode.value + '" />');
                                s.oBinds.imgHolder.append(img);
                                img.error (function(){
                                    results++;
                                    s.oVars.sourceSelect.options[iIndex].type = "link";
                                    if(options === results){
                                        s.oBinds.imgHolder.html('');
                                        s.oFns.createSelect();
                                    }
                                }).load(function(){
                                        results++;
                                        s.oVars.sourceSelect.options[iIndex].type = "img";
                                        if(options === results){
                                            s.oBinds.imgHolder.html('');
                                            s.oFns.createSelect();
                                        }
                                    });
                            }else{
                                options--;
                                if(options === results){
                                    s.oBinds.imgHolder.html('');
                                    s.oFns.createSelect();
                                }
                                s.oVars.sourceSelect.options[iIndex].type = "text";
                            }
                        });
                    },

                    createSelect : function(){
                        var i,c = 0,previewerSelect, optionLeft = $('<div class="optionLeft"></div>'),optionLeftClone,
                            selectedOption,arrow, ul,li, img,opText,TextBg, imgBg ,ori, clear = $('<div class="clear"></div>'), option, selectedId = 0;
                        ul = $('<ul class="previewerOptionsWrap previewerClosed" ></ul>');
                        if(s.oVars.sourceSelect.options.length > 0){
                            for(i = 0; i < s.oVars.sourceSelect.options.length; i++){
                                c = 0;
                                option = s.oVars.sourceSelect.options[i];
                                if(option.type == "img"){
                                    optionLeftClone = optionLeft.clone(true);
                                    if(s.oDef.showImg){
                                        img = $('<img src="' + option.value + '">').css({
                                            "width" : s.oDef.srcImgWidth,
                                            "height" : s.oDef.srcImgHeight,
                                            "backgroundColor": s.oDef.imgBGColor
                                        });
                                        optionLeftClone.append(img);
                                        c++;
                                    }

                                    if(s.oDef.showText){
                                        opText = $('<span class="opText"></span>').text(option.innerHTML);
                                        optionLeftClone.append(opText);
                                        c++;
                                    }

                                    if(c === 0){
                                        opText = $('<span class="opText"></span>').text(option.innerHTML);
                                        optionLeftClone.append(opText);
                                    }

                                    switch(c){
                                        case 2:
                                            ori = "left";
                                            break;
                                        case 1:
                                            ori = "left";
                                            if(s.oDef.showImg){
                                                ori = "center";
                                            }
                                            break;
                                        case 0:
                                            ori = "left";
                                            break;
                                    }

                                    li = $('<li class="previewerOption el_over_ws"></li>').css({ "textAlign": ori });
                                    li.append(optionLeftClone);
                                    li.css({
                                        "height" : s.oDef.srcImgHeight
                                    })
                                }else{
                                    li = $('<li class="previewerOption el_over_ws"></li>');
                                    optionLeftClone = optionLeft.clone(true);
                                    optionLeftClone.text(option.innerHTML);
                                    li.append(optionLeftClone);
                                }
                                li.data(option);
                                if(option.selected){
                                    li.addClass('selected');
                                    selectedId = i;
                                }


                                if(option.disabled){
                                    li.removeClass('selected').addClass('disabled');
                                }
                                ul.append(li);
                            }
                        }
                        previewerSelect = $('<div class="previewerSelect"></div>');
                        s.oBinds.selectCopy.append(previewerSelect);
                        arrow = $('<span class="previewerArrow state-normal">&#9660;</span>');
                        previewerSelect.append(arrow, clear.clone(true));
                        selectedOption = $('<span class="previewerSelectedOption el_over_ws"></span>').width(s.oVars.sourceSelect.style.width-arrow.width());
                        if(typeof s.oVars.sourceSelect.options[selectedId] !== "undefined"){
                            selectedOption.text(s.oVars.sourceSelect.options[selectedId].innerHTML);
                        }
                        previewerSelect.prepend(selectedOption);
                        s.oBinds.prevWinHolder.append(s.oBinds.bgBorderShadow);
                        s.oBinds.selectCopy.append(clear.clone(true), ul.width(previewerSelect.width()), s.oBinds.prevWinHolder);
                        s.oBinds.selectCopy.width(previewerSelect.outerWidth());
                    },

                    getHostName : function(){
                        var a = $('<a>', { href:document.URL } )[0];
                        var host = a.hostname;
                        a = null;
                        return host;
                    },

                    bindControls : function(){
                        // hover - add classes
                        s.oBinds.selectCopy.off('mouseover').on('mouseover',function(){
                            $(this).find(s.oBinds.previewerArrow).addClass('state-hover').removeClass('state-normal');
                            $(this).find(s.oBinds.previewerSelect).addClass('state-hover').removeClass('state-normal');
                        }).off('mouseout').on('mouseout' ,function(){
                                var ul = $(this).find(s.oBinds.previewerOptionsWrap);
                                if(!ul.hasClass('previewerOpened')){
                                    $(this).find(s.oBinds.previewerArrow).addClass('state-normal').removeClass('state-hover');
                                    $(this).find(s.oBinds.previewerSelect).addClass('state-normal').removeClass('state-hover');
                                }
                            });

                        //  open select
                        s.oBinds.selectCopy.off('click').on('click' ,function(e){
                            var ul = $(this).find(s.oBinds.previewerOptionsWrap);
                            ul.addClass('previewerOpened').removeClass('previewerClosed');
                            ul.find(s.oBinds.previewerOption).each(function(i,oNode){
                                $(oNode).removeClass('selected');
                                if($(oNode).data('selected')){
                                    $(oNode).addClass('selected');
                                }
                            });
                            ul.attr('tabindex', -1).focus();
                        });

                        // close select
                        s.oBinds.selectCopy.off('focusout', s.oBinds.previewerOptionsWrap).on('focusout', s.oBinds.previewerOptionsWrap ,function(e){
                            if(!s.oVars.iframeFocus){
                                var ul = $(this);
                                ul.addClass('previewerClosed').removeClass('previewerOpened');
                                s.oBinds.selectCopy.mouseout();
                            }
                        });

                        // select an option
                        s.oBinds.selectCopy.off('click', s.oBinds.previewerOption).on('click', s.oBinds.previewerOption ,function(e){
                            e.stopPropagation();
                            var ul = $(this).parent(s.oBinds.previewerOptionsWrap), value, innerHTML;
                            if(!$(this).data('selected') && !$(this).data('disabled')){
                                ul.find(s.oBinds.previewerOption).data('selected', false);
                                $(this).data('selected', true);
                                value = $(this).data("value");
                                innerHTML = $(this).data("innerHTML");
                                s.obj.val(value);
                                s.obj.change();
                                s.oBinds.selectCopy.find(s.oBinds.previewerSelectedOption).text(innerHTML);
                            }

                            ul.addClass('previewerClosed').removeClass('previewerOpened');
                            s.oBinds.selectCopy.mouseout();
                        });

                        // hovering over options
                        s.oBinds.selectCopy.off('mouseenter', s.oBinds.previewerOption).on('mouseenter', s.oBinds.previewerOption ,function(){
                            if(!$(this).data('disabled')){
                                var ul = $(this).parent(s.oBinds.previewerOptionsWrap), openPrev;
                                if(!$(this).hasClass('selected')){
                                    ul.find(s.oBinds.previewerOption).removeClass('selected');
                                    $(this).addClass('selected');
                                }

                                if(s.oDef.prevWinWaitTime > 0){
                                    $(this).append(s.oBinds.loader);
                                }
                                openPrev = s.oFns.openPrev.bind(this);
                                s.oVars.timeOut = setTimeout(openPrev, s.oDef.prevWinWaitTime * 1000);

                            }
                        }).off('mouseleave', s.oBinds.previewerOption).on('mouseleave', s.oBinds.previewerOption ,function(){
                                if(!$(this).data('disabled')){
                                    clearTimeout(s.oVars.timeOut);
                                    s.oFns.closePrev(this);
                                }
                            });
                    },

                    openPrev : function(){
                        var type, cssObj, height, width, value;
                        type = $(this).data('type');
                        value = $(this).data('value');

                        if (type == "img") {
                            s.oBinds.prevImgHold.css({
                                "width" : s.oDef.prevWinImgWidth,
                                "height" : s.oDef.prevWinImgHeight,
                                "backgroundColor" : s.oDef.imgBGColor
                            }).attr("src" , value);
                            s.oBinds.prevWinHolder.append(s.oBinds.prevImgHold);
                            s.oBinds.prevWinHolder.removeClass("displayNone");
                            s.oFns.positionPrevWinHolder(this);
                            width = s.oBinds.prevImgHold.outerWidth();
                            height = s.oBinds.prevImgHold.outerHeight();
                            s.oBinds.prevWinHolder.css({
                                "width" : width,
                                "height" : height
                            });
                            s.oBinds.bgBorderShadow.css({
                                "width" : width+20,
                                "height" : height+20
                            });
                            s.oFns.positionPrevWinHolder(this);
                        }else if(type == "link"){
                            s.oVars.iframeFocus = true;
                            s.oBinds.prevIFrame.css({
                                "width" : s.oDef.prevWinLinkWidth,
                                "height" : s.oDef.prevWinLinkHeight
                            }).attr("src" , value).focus(function(e){
                                    s.oBinds.selectCopy.find(s.oBinds.previewerOptionsWrap).focus();
                                    s.oVars.iframeFocus = false;
                                });

                            s.oBinds.prevWinHolder.append(s.oBinds.prevIFrame);
                            s.oBinds.prevWinHolder.removeClass("displayNone");
                            s.oFns.positionPrevWinHolder(this);
                            width = s.oBinds.prevIFrame.outerWidth();
                            height = s.oBinds.prevIFrame.outerHeight();
                            s.oBinds.prevWinHolder.css({
                                "width" : width,
                                "height" : height
                            });
                            s.oBinds.bgBorderShadow.css({
                                "width" : width+20,
                                "height" : height+20
                            });
                            s.oFns.positionPrevWinHolder(this);
                        }
                        clearTimeout(s.oVars.timeOut);

                        if(s.oDef.prevWinWaitTime > 0){
                            $(this).find(s.oBinds.loader).remove();
                        }

                        if(typeof s.oDef.optEnter === "function"){
                            s.oDef.optEnter();
                        }
                    },

                    closePrev : function(that){
                        clearTimeout(s.oVars.timeOut);
                        if(s.oDef.prevWinWaitTime > 0){
                            $(that).find(s.oBinds.loader).remove();
                        }
                        s.oBinds.prevWinHolder.find(s.oBinds.prevIFrame).remove();
                        s.oBinds.prevWinHolder.find(s.oBinds.prevImgHold).remove();
                        s.oBinds.prevWinHolder.addClass("displayNone");
                        s.oVars.iframeFocus = false;

                        if(typeof s.oDef.optExit === "function"){
                            s.oDef.optExit();
                        }
                    },

                    positionPrevWinHolder : function(that){
                        var box = that.getBoundingClientRect(), winHolder,x, y;
                        winHolder = s.oBinds.prevWinHolder[0].getBoundingClientRect();
                        x = $(that).position().left + $(that).outerWidth() + 10;
                        y = ($(that).position().top + s.oBinds.selectCopy.outerHeight() + box.height/2) - (winHolder.height/2);
                        s.oBinds.prevWinHolder.css({
                            left: x + 'px',
                            top: y + 'px'
                        });
                    }
                }
            };

            s.oDef = $.extend(true, s.oDef, (opts) ? opts : {});
            s.oFns.init();
            s.oFns.bindControls();
        });
    };
})(jQuery);
