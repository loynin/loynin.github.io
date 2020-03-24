

    function countLines(object) {
        var divHeight = document.getElementById("item-header").offsetHeight;
        var lineHeight = parseInt(object.height());
        var lines = parseInt(divHeight / lineHeight);
        return lines;
    }

    function animateTitle(title,top,bottom,time,delay){
        TweenMax.set(title, {
            y:top,
            opacity: 0.0,
            lazy:true,
        });
        TweenMax.to(title, 0.4,{
            y:bottom,
            rotationZ:0.05,
            opacity:1.0,
            delay:delay,
            ease:Power4.easeOut,
            force3D:true,
            onComplete:enableBackBtn
        });
    }

    function enableBackBtn (){
        $(".back-button").removeClass('disable-btn');
    }

    function animateTitleUp(title,top,bottom,time,opacity){
        TweenMax.set(title, {
            y:top,
            opacity: opacity,
            lazy:true,
        });
        TweenMax.to(title, time,{
            y:bottom,
            rotationZ:0.05,
            opacity:0,
            delay:0.75,
            ease:Power4.easeOut,
            force3D:true,
        });
    }

    function animateField(step,origin,dist,time,direction){
        TweenLite.set(step, {
            left: origin,//initial
            opacity: 0.0,
            lazy:true,
            transformOrigin: '0% 0%'
        });
        TweenLite.to(step, time,{ //time
            left:dist,//final
            // rotationY:0.01,
            opacity:1.0,
            onComplete:leadLine,
            onCompleteParams:[direction],
            ease:Power3.easeOut,
            force3D:true,
        });
    }

    function animateOptions(option,origin,dist,time,delay, easing,nextelem){
		        if (!detectIE()) {
            if (nextelem.length) {
                if (nextelem.find('input').length) {
                    if ( !/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
                    {
                        nextelem.find('input').first().select();
                    }
                }
            };
        };
		
        TweenMax.set(option, {
            left: origin,
            opacity: 1.0,
            lazy:true,
            onStart: endResize
        });
        TweenMax.to(option, time,{
            left:dist,
            opacity:1.0,
            delay:delay,
            ease:easing,
            force3D:true,
            onComplete:startResize,
            onCompleteParams:[nextelem]
        });
    }
    function animateOptionScrollbar(option,origin,dist,time,delay, easing,obj){

        TweenLite.set(option, {
            right: origin,//initial
            opacity: 1.0,
            lazy:true,
            onStart: endResize
        });
        TweenLite.to(option, time,{ //time
            right:dist,//final
            opacity:1.0,
            delay:delay,
            ease: easing,
            force3D:true,
            onComplete:hideScrollContent,
            onCompleteParams:[obj]
        });
    }
    function hideScrollContent (obj){
        if (obj.length && obj.find('.scrollbar')) {
            obj.removeClass('block');
        };
    }
    function leadLine (direction){

        var content_subtitle = jQuery(".content-subtitle");
        var content_title = jQuery(".content-title");
        if (direction == 'next') {
            if (detectIE()) {
                TweenMax.set(content_title, {
                    y: "-20px",
                    opacity: 0.0,
                    lazy:true,
                    transformOrigin: '50% 0%'
                });
                TweenMax.to(content_title, 2.0,{
                    y:"0.0",
                    rotationZ:0.05,
                    opacity:1.0,
                    ease:Power3.easeOut,
                    force3D:true,
                });
                TweenMax.set(content_subtitle, {
                    y: "-20px",
                    opacity: 0.0,
                    lazy:true,
                    transformOrigin: '50% 0%'
                });
                TweenMax.to(content_subtitle, 2.0, {
                    y:"0.0",
                    rotationZ:0.05,
                    opacity:1.0,
                    ease:Power3.easeOut,
                    force3D:true
                });
                // $(".content-title , .content-subtitle").addClass('visible-title');
            }else{
                TweenLite.set(content_title, {
                    y: "-20px",
                    opacity: 0.0,
                    lazy:true,
                    transformOrigin: '0% 0%'
                });
                TweenLite.to(content_title, 2.0,{
                    y:"0.0",
                    rotationY:0.01,
                    opacity:1.0,
                    ease:Power3.easeOut,
                    force3D:true,
                });


                TweenLite.set(content_subtitle, {
                    y: "-20px",
                    opacity: 0.0,
                    lazy:true,
                    transformOrigin: '0% 0%'
                });
                TweenLite.to(content_subtitle, 2.0, {
                    y:"0.0",
                    rotationY:0.01,
                    opacity:1.0,
                    // yoyo:true,
                    ease:Power3.easeOut,
                    force3D:true
                });
            }
        };

    }
    jQuery( document ).ready(function() {
        $(".content-title , .content-subtitle").css('opacity', 0.0);

        function percentToPixel(width, _perc){
            return (width/100)* parseFloat(_perc);
        }
        _box = $('#step-1').width();
        per_width = percentToPixel(_box, 50);
        $(window).bind("load", function() {
            $(".loader-wrapper").fadeOut(400,function() {
                animateField($('#step-1'),1000,per_width,0.3,'next');
            });
        });


        if (jQuery("#getfreeinsurancequotestext").length) {
            var font_size = $("#getfreeinsurancequotestext span").css('font-size').replace(/[^-\d\.]/g, '');
            font_size_number = parseInt(font_size, 10);
            var line_height = font_size_number + 5;
            $("#getfreeinsurancequotestext span").css('line-height', line_height +"px" );
        }


        if (jQuery("#getfreeratequotestext").length) {
            var font_size = $("#getfreeratequotestext span").css('font-size').replace(/[^-\d\.]/g, '');
            font_size_number = parseInt(font_size, 10);
            var line_height = font_size_number + 5;
            $("#getfreeratequotestext span").css('line-height', line_height +"px" );
        };


        if (jQuery(".content-wrapper .main-content").height > 450) {
            var  content_height = jQuery(".content-wrapper .main-content").height();
            jQuery("#replacediv").css("height", content_height);
        };



        // animate the progress bar on DOM ready
        var percent = $('.progress-line').attr('title');
        $('.progress-line').animate({width: percent},1000);

        $('form.f-form input.f-input').on('focus',function(){
            $( this ).parent("div.inputwrapper").addClass('focus');
            $( this ).parents("div.input_fields").removeClass('error');

        });

        $('form.f-form input.f-input').on('focusout',function(){
            $( this ).parent("div.rounded").removeClass('focus');
        });


    });



    function resizer() {
        $("#f-p2-item").css('width' , '100%');
        $('.question.current').find('.option').each(function(index, el) {
            $(el).css('left', '50%');
        });
    }

    function startResize(nextelem) {
        $(window).resize(resizer);
        if (nextelem.length) {
            if (nextelem.find('input').length) {
                // nextelem.find('input').focusout().focus();
                if ( !/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
                {
                    nextelem.find('input').first().select();
                }
                if (nextelem.find('input').hasClass('firstname') && nextelem.hasClass('current')) {
                    $(".privacy-image").css({
                        'display': 'block'
                    });
                }
                                else if(nextelem.find('input').hasClass('phonenumber')) {
                                            $(".helping_text").css({
                            'display': 'block'
                        });
                        $(".realestate_tcpa_text").css({
                            'display': 'block'
                        });
                    
					                    selector = $('.phonenumber');
                    var im = new Inputmask("(999) 999-9999");
                                        im.mask(selector);
					                };
            }
        };
    }

    function endResize() {
        $(window).off("resize", resizer);
    }
    var pvalid = '';
    var evalid = '';
    var nvalid = '';

    //startResize();

    $('input#firstname, input#youremail , input#phonenumber').on('keyup', function (e) {
        if (e.which != 13) {
            name = $(this).attr('name');
            if ($('.question.current input.'+name+'').val()=='') {
                $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                $("."+name+"-box .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
            } else if (name == 'youremail') {
                                if (validateEmail($('.question.current input.' + name + '').val())) {
                    evalid = evalid + 1;
                    $("." + name + "-box .check-wrapp").parent("div.inputwrapper").removeClass("focus").addClass('validate');
                    $("." + name + "-box .check-wrapp").find(".checked").removeClass("hidden").addClass("visible");
                    $("." + name + "-box .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");
                } else if (evalid != '') {
                    $("." + name + "-box .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                    $("." + name + "-box .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                    $("." + name + "-box .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                }
                            } else if (name == 'phonenumber') {

                                if (!LEADPOP.validatePhone($('.question.current input.' + name + '').val())) {
                    pvalid = pvalid + 1;
                    $("." + name + "-box .check-wrapp").parent("div.inputwrapper").removeClass("focus").addClass('validate');
                    $("." + name + "-box .check-wrapp").find(".checked").removeClass("hidden").addClass("visible");
                    $("." + name + "-box .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");
                } else if (pvalid != '') {
                    $("." + name + "-box .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                    $("." + name + "-box .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                    $("." + name + "-box .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                }
                
            }else if (name == 'firstname'){
                var str = $(this).val();
                var arr = str.split(' ');
                console.info(arr);
                if(arr.length >= 2 && arr[1]!='') {
                    nvalid = nvalid +1;
                    $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("focus").addClass('validate');
                    $("."+name+"-box .check-wrapp").find(".checked").removeClass("hidden").addClass("visible");
                    $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");
                }else if(nvalid != ''){
                    $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                    $("."+name+"-box .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                    $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                }
            }else {
                console.info("undefined");
                return;
            }
        };

    });

    var  lp_to = '';
    var LEADPOPDATA = {};
    var LEADPOP = function($) {
        return {

            saveContactData  : function() {
                var qa = "";
                var tObj = {};
                var tRel;

                var trs = $('#replacedivtwo').find(".input_fields").find('.option.selected');
                trs.each(function()
                {
                    if($(this).find('.q-text')) {
                        qvalues = $(this).find('.q-text').val();
                        qhtml = $(this).find('.q-text').html();
                        qrel = $(this).find('.q-text').attr('rel');
                        qfield = $(this).find('.q-text').data('field');
                        qstep = $(this).find('.q-text').data('step');
                        if (qfield == "fullname") {
                            first = LEADPOP.getFirstName(qvalues);
                            last = LEADPOP.getLastName(qvalues);
                            qa = qa + "First Name=" + first + "~~~firstname~~~" + qstep + "&";
                            qa = qa + "Last Name=" + last + "~~~lastname~~~" + qstep + "&";
                        }else {
                            qa = qa + qrel;
                            if (qhtml) {
                                qa = qa + "=" + qhtml + "~~~" + qfield + "~~~" + qstep + "&";
                            }else {
                                qa = qa + "=" + qvalues + "~~~" + qfield + "~~~" + qstep + "&";
                            };
                        }
                        // delete tObj.vals;

                    }
                });
                qa = qa +  'lps=hcuadl11v0alovddv32d6e6cu4';
                //alert(qa);
                //console.log(qa);
                $.ajax( {
                    type : "POST",
                    url : '/save_contact_info.php',
                    data : qa,
                    success : function(data) {},
                    cache : false,
                    async : false
                });
            },
            saveData : function(inputType) {
                //alert(inputType);
                var qa = "";
                var tObj = {};
                var tRel;
                var fields = jQuery('#leadpopquoteform').serializeArray();
                var _post_questions = [];
                if (fields) {
                    $.each(fields, function(i, field){
                        step = $('#'+field.name).data('step');
                        _post_questions.push({
                            name: ($('label[for=' + field.name + ']').text()).replace(":",""),
                            value: field.value + "~~~" + field.name + "~~~" + step
                        });
                    });
                };

                if ('mvp elements' == inputType) {
                    // TODO: Need to remove
                    var _questions = $('#replacedivtwo').find('.question');

                    _questions.each(function(index){
                        var _single_question = $(this);
                        var _options = _single_question.find('.option.selected');
                        var _option_arr = [];
                        var qrel = "";
                        var qstep = 0;
                        var qfield = "";
                        var qvalues = "";
                        _options.each(function(_index){
                            qvalues = $(this).find('.q-text').val();
                            if(qvalues=="" || qvalues==undefined){
                                qvalues = $(this).find('.q-text').html();
                            }
                            qvalues = qvalues.replace("&gt;", "#1#");
                            qvalues = qvalues.replace("&lt;", "#2#");
                            qrel = $(this).find('.q-text').attr('rel');
                            qfield = $(this).find('.q-text').data('field');
                            qstep = $(this).find('.q-text').data('step');
                            _option_arr.push(qvalues);
                        });

                        if (qfield == "fullname") {
                            first = LEADPOP.getFirstName(qvalues);
                            last = LEADPOP.getLastName(qvalues);
                            _post_questions.push({
                                name: 'First Name',
                                value: first + "~~~firstname~~~" + qstep
                            });
                            _post_questions.push({
                                name: 'Last Name',
                                value: last + "~~~lastname~~~" + qstep
                            });
                        }else if(qfield=="minimumprice~maximumprice"){
                            var _min_max = qvalues.split(' - ');
                            _post_questions.push({
                                name: 'Minimum Price',
                                value: _min_max[0] + "~~~minimumprice~~~" + qstep
                            });
                            _post_questions.push({
                                name: 'Maximum Price',
                                value: _min_max[1] + "~~~maximumprice~~~" + qstep
                            });
                        }
                        else{
                            _post_questions.push({name:qrel,value: _option_arr.join(',') + "~~~" + qfield + "~~~" + qstep});
                        }
                    });
                }

                _post_questions.push({
                    name: 'lps',
                    value: 'hcuadl11v0alovddv32d6e6cu4'
                });

                //  _post_questions.push({
                //     name: 'test',
                //     value: '1'
                //  });

                $.ajax( {
                    type : "POST",
                    url : 'ajax/save_subdomain_mvp.php',
                    data : _post_questions,
                    success : function(data) {

                    },
                    cache : false,
                    async : false
                });
            },
            getFirstName: function(str) {
                str = str.trim();
                // var arr = str.split(' ');
                var arr = str.match(/^(\S+)\s(.*)/).slice(1);
                if( arr.length === 1 ) {
                    return arr[0];
                }
                return arr.slice(0, -1).join(' ');
            },
            getLastName: function(str, ifNone) {
                str = str.trim();
                // var arr = str.split(' ');
                var arr = str.match(/^(\S+)\s(.*)/).slice(1);
                if(arr.length === 1) {
                    return ifNone || "";
                }
                return arr.slice(-1).join(' ');
            },
            goAfterSlide : function (direction,inputType) {
                var dir = direction;
                if(dir != 'back') {
                    LEADPOP.saveData(inputType);
                }
                if(direction == 'last') {
                    LEADPOP.saveContactData();
                }

                jQuery('#replacedivtwo').html('');
                jQuery('#replacediv').html('');
                // jQuery('.inner-bar').css('display':'none');
                jQuery('#replacediv').html('<div class="mask-loader"><p class="mask-loader-title">Saving...</p><div class="loader-inner ball-pulse"><div></div><div></div><div></div><div></div><div></div></div></div>');
                setTimeout(function() {LEADPOP.getStepHtml(dir)}, 1000);
            },
            getStepHtml : function(step) {
                var stepaction = step;
                $.ajax( {
                    type : "POST",
                    url : '/get_step_html.php' ,
                    data : "step=" + step + "&lps=hcuadl11v0alovddv32d6e6cu4",
                    success : function(data) {
                        var loc = data.split("~~~~~~");
                        if(loc[0] == 'ad') {
                            window.location.href = loc[1];
                        }
                        else {
                            if(typeof lp_analytics_active != 'undefined') {
                                $.ajax( {
                                    type : "POST",
                                    url : '/get_current_step.php',
                                    data : "lps=hcuadl11v0alovddv32d6e6cu4",
                                    success : function(currentstep) {
                                        var steplabel = 'Step' + currentstep;
                                        var lp_form_name = $('#lp_form_id').val();
                                        if(typeof lp_analytics_active != 'undefined') {
                                            if( lp_analytics_active == 'y' && stepaction != 'back' && stepaction != 'last') {
                                                _gaq.push(['_trackEvent', lp_form_name, 'Step', steplabel, currentstep, 0]);
                                            }
                                            else if( lp_analytics_active == 'y' && stepaction == 'last') {
                                                _gaq.push(['_trackEvent', lp_form_name, 'Step', steplabel, currentstep, 0]);
                                            }
                                        }

                                    },
                                    cache : false,
                                    async : true
                                });
                            }
                            jQuery('#replacediv').html('');
                            jQuery('#replacediv').html(loc[1]);
                            //  console.log(loc[1]);
                        }
                    },
                    error : function(a,b,c) {
                    },
                    cache : false,
                    async : false
                });
            },
            validateZillowForm: function() {
                var ok1 = true;
                var ok2 = true;
                var ok3 = true;
				                ok1 = LEADPOP.validateZillow('enteryourzipcode','required~zip','zipid');
                if(ok1 == true) {
                    return true;
                }
                else {
                    return false;
                }
				            },
            validateZillow: function(field, attr, fieldtwo,setpath) {

                var val = attr.split("~");

                if (val[0] == 'required' && val[1] == 'zip')
                {
                    if ($('#' + field).val() == '') {
                        $(".check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                        return false;

                    } else if ($('#' + field).val() != '') {
                        if (this.validateZip($('#' + field).val()) == true) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            },
            validateField: function(field, attr) {

                var val = attr.split("~");
                if (val[0] == 'required' && val[1] == 'zip')
                {
                    if ($('#' + field).val() == '') {
                        return false;

                    } else if ($('#' + field).val() != '') {

                        if (this.validateZip($('#' + field).val()) == true) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }

                if (val[0] == 'required' && val[1] == 'email') // required...entry is email
                {
                    if ($('#' + field).val() == '') {
                        if (typeof (val[2]) != 'undefined') {
                            $('#' + val[2]).addClass('makeitred');
                        }
                        // $('#' + field).next("img").attr('src', '//short-sale-7887.secure-clix.com/images/auto_xmark.png');
                        return false;
                    } else if ($('#' + field).val() != '') {
                        if (LEADPOP.validateEmail($('#' + field).val()) == true) {
                            if (typeof (val[2]) != 'undefined') {
                                $('#' + val[2]).addClass('makeitred');
                            }
                            // $('#' + field).next("img").attr('src', '//short-sale-7887.secure-clix.com/images/auto_xmark.png');
                            return false;
                        } else {
                            if (typeof (val[2]) != 'undefined') {

                                $('#' + val[2]).removeClass('makeitred');

                            }

                            // $('#' + field).next("img").attr('src', '//short-sale-7887.secure-clix.com/images/auto_check.png');

                            return true;

                        }

                    }

                }

                if (val[0] == 'required' && val[1] == 'phone') // required...entry is phone
                {
                    if ($('#' + field).val() == '') {
                        if (typeof (val[2]) != 'undefined') {
                            $('#' + val[2]).addClass('makeitred');
                        }

                        // $('#' + field).next("img").attr('src', '//short-sale-7887.secure-clix.com/images/auto_xmark.png');

                        return false;

                    } else if ($('#' + field).val() != '') {

                        if (LEADPOP.validatePhone($('#' + field).val()) == true) {

                            if (typeof (val[2]) != 'undefined') {

                                $('#' + val[2]).addClass('makeitred');

                            }

                            // $('#' + field).next("img").attr('src', '//short-sale-7887.secure-clix.com/images/auto_xmark.png');

                            return false;

                        } else {

                            if (typeof (val[2]) != 'undefined') {

                                $('#' + val[2]).removeClass('makeitred');

                            }

                            // $('#' + field).next("img").attr('src', '//short-sale-7887.secure-clix.com/images/auto_check.png');

                            return true;

                        }

                    }
                }
            },
            validatePhone: function(fld) {

                var error = false;

                var stripped = fld.replace(/[\(\)\.\-\_\ ]/g, '');

                if (isNaN(parseInt(stripped))) {

                    error = true;

                }
                                    else if (!(stripped.length == 10)) {
                        error = true;
                    }
                
                return error;
            },
            validateEmail : function (fld) {

                var error = false;

                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                if (!filter.test(fld)) {

                    error = true;

                }

                return error;
            },
            validateZip : function (fld) {

                var error = false;
                var stripped = fld.replace(/[\-\ ]/g, '');

                if (isNaN(parseInt(stripped))) {
                    error = true;
                }
              
                return error;
            },
        }
    }(jQuery);

    function cursorAnimation(){
        $("#enteryourzipcode.cursor").animate(
            {
                opacity: 0
            }, "fast", "swing").animate(
            {
                opacity: 1
            }, "fast", "swing");
    }

    $(document).keydown(function (e) {
        var keycode1 = (e.keyCode ? e.keyCode : e.which);
        if (keycode1 == 0 || keycode1 == 9) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    jQuery(document).ready(function($){
        var reload = '1';
        var adrequest = '';

        if(reload != '1' && adrequest == "") {
            LEADPOP.getStepHtml(reload);
        }
        setInterval ( "cursorAnimation()", 600 );
        jQuery('#enteryourzipcode').keyup(function() {
            var str = jQuery('#enteryourzipcode').val();

            if (str.length == 5) {

                if (LEADPOP.validateField('enteryourzipcode','required~zip')) {
                    jQuery("#enteryourzipcode").parent('.inputwrapper').removeClass("focus").addClass('validate');
                    jQuery("#enteryourzipcode").parent('.inputwrapper').find('input.f-input').blur();

                    $(".codebox .check-wrapp").parent("div.inputwrapper").removeClass("focus").addClass('validate');
                    $(".codebox .check-wrapp").find(".checked").removeClass("hidden").addClass("visible");
                    $(".codebox .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");

                }
                else {
                    $(".codebox .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                    $(".codebox .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                    $(".codebox .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                }
            }else if (str.length > 5){
                $(".codebox .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                $(".codebox .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                $(".codebox .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
            }else {
                $(".codebox .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                $(".codebox .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                $(".codebox .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");
            }
        });
    });

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    var myEfficientFn = debounce(function() {
        setwidth();
        setBackGround();

        var count = $(".question.current").data("id");
        if ($(window).width() <= 1024) {
            setContentHeight(count);
        }

        opt_margin = percentToPixel($("#f-p2-item").width(), 50);
        current_question = jQuery(".question.current");

        if (current_question.find('.scrollbar')) {
            opt_width  = jQuery(".question.current").find('.option').first().width();
            opt_margin_percentage = percentToPixel(opt_width, 50);
            opt_margin_scroll = opt_margin - opt_margin_percentage -18;
            current_question.find('.mCSB_scrollTools_vertical').css('right', opt_margin_scroll);
        };

        if (count != 'undefined') {
            calculationProgressBar11(count);
            current_title = $("#f-p2-item .item-header h2.q-title").filter( function() {
                return $(this).css('opacity') === '1';
            });
            mod_current = countLines(current_title);
            if (mod_current == 1) {
                animateTitle(current_title,-20,10,0.1,0);
                return;
            }else if(mod_current == 2){
                animateTitle(current_title,-20,30,0.1,0);
                return;
            }else{
                animateTitle(current_title,-30,0,0.4,0);
                return;
            }
        };
    }, 250);

    function setwidth (){
        current_question = jQuery(".question.current");
        if ($(window).width() <= 320) {
            item_width = 270;
        }else if ($(window).width() <= 380) {
            item_width = 300;
        }else if ($(window).width() > 380) {
            item_width = 334;
        };
        jQuery(".question").each(function(index, el) {
            _length  = $(el).find('.option').length;
            if ($(el).find('.scrollbar').length) {
                _top = 0;
            }else {
                _top = 75;
                if ($(window).width() <= 1024) {
                    _top = 100;
                }
            }
            for (var i = 1; i <= _length; i++) {
                var item = $(this).find("#option-"+i+"");
                item.css({
                    'top': _top,
                    'width': item_width,
                });
                _top = _top + 70;
            };
            jQuery(".multiselect .btn-mvp-wrapper.next-button").css({
                "width": item_width,
                'left': '50%',
                'display': 'none',
            });
            current_question.find(".btn-mvp-wrapper.next-button").css('display', 'block');
            jQuery("a.micro-logo").css({
                'bottom': '0',
                'right': '0'
            });
        });
    }
    function setBackGround(){

        var docH = $(document).height(),
            viewPortH = $(window).height();

        if (docH > viewPortH) {
            $("html , body").css("height","auto");
        }else{
            $("html , body").css("height","100%");
        }
    }

    function setContentHeight(screenid){
        if (screenid == undefined) {
            content_height = jQuery("#singleton").height();
            if (content_height > 440) {
                content_height = content_height+parseInt(percentToPixel(content_height, 10));
            }else {
                content_height = 480;
            }
            jQuery(".content-wrapper,.main-content").css('height', content_height);
        }else {
            revertContentHeight();
        }
    }
    function revertContentHeight(){
        if ($(window).width() <= 1024) {

            jQuery(".content-wrapper,.main-content").css('height', 480);

        }
    }

    $(window).on('resize', myEfficientFn);


    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // IE 12 (aka Edge) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    $(document).ready(function(){


        cnt_bar = 0;

        count_bar = 0;



		        $("#id14quotebutton").on("click", function( e ) {
            e.preventDefault();
            if (LEADPOP.validateZillowForm() == false) {
                return false;
            }else {
                revertContentHeight();
                first_step = $('#step-1');
                $('#step-1,.lock').delay(300).animate({'left' : '-1800px'}, 500, function(){
                    $(".lock").css('opacity', '0');
                });
                $("#step-2").delay(500).animate({'left' : '50%'}, 500);

                _line = countLines($("#ques-wrapper .q-1"));
                if (_line == 1) {
                    animateTitle($("#ques-wrapper .q-1"),-20,10,0.8,1.0);
                }else if(_line == 2){
                    animateTitle($("#ques-wrapper .q-1"),-20,30,0.8,1.0);
                }

                _count = $("#ques1").find("div.option").size();
                var _delay = 0.60;
                opt_parent = $('#f-p2-item');
                opt_parent_w = opt_parent.width();
                opt_margin = percentToPixel(opt_parent_w, 50);
                easing = " Power3.easeOut";
                for (var i = 1; i <= _count; i++) {
                    //item = $("#ques1 #option-"+i+"");
                    animateOptions($("#ques1 #option-"+i+""),2000,opt_margin,0.5,_delay,easing,'');
                    _delay = _delay+0.08;
                };
                $('.back-button').delay(750).addClass('block');
                $('#card').addClass('block');
                $("#ques1").addClass('current');
                $("#ques1").find('.inputwrapper').addClass('focus');

                // $("*").blur(function(event) {
                //   $('#ques1 .inputwrapper').find('input').focus();
                // });

                cnt_bar = cnt_bar + 1;
                calculationProgressBar11(cnt_bar);
                if ($(window).width() <= 640){
                    $("html, body").animate({ scrollTop: 0 }, "fast");
                }
                $("#id14quotebutton").blur();
            }
        });
    });
    function calculationProgressBar11(cnt_bar){
        var total_input_field = 12;
        var valid_input_field = cnt_bar;
        var unit = (98/total_input_field);
        var _u = 4;
        if ($(window).width() <= 1024){
            var _u = 8.9;
        }
        if ($(window).width() <= 966){
            var _u = 7.3;
        }
        if ($(window).width() <= 800){
            var _u = 7;
        }
        if ($(window).width() <= 768){
            var _u = 5.5;
        }
        if ($(window).width() <= 603){
            var _u = 4.5;
        }
        if ($(window).width() <= 480){
            var _u = 3.2;
        }
        if ($(window).width() <= 360){
            var _u = 3;
        }
        var bar_length = (unit*valid_input_field);

        if(valid_input_field == 12){
            bar_length = 98;
        }

        if (valid_input_field ==  13 ) {
            bar_length = 100;
        }

        $(".count").countTo(bar_length,{"duration": 0.40});

        TweenMax.to($('.progress .progressbar'), .8, {
            width: (bar_length*_u),
            ease: Linear.ease,
        });

        TweenMax.to($('.percent-block'), .8, {
            left: ((bar_length*_u)-22),
            ease: Linear.ease,
        });
    }
    function showbottom(category,keys) {
        var dialog = jQuery('#creditfunnels');
		        var top = 'top+120';
        speeddown = 400;
        speedup = 600;
        var winW = $(window).width() - (($(window).width()/100)*(50));
        var winH = $(window).height() - (($(window).height()/100)*(30));
		        dialog.dialog('destroy');
        dialog.dialog( {
            closeOnEscape: false,
            open: function(event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
            },
            buttons: [
                {
                    class: 'cross-btn',
                    text: "x",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ],
            modal : true,
            autoOpen : false,
            width : winW,
            resizable: false,
            height : winH,
            // position: { my: 'top', at: top },
            hide: {
                effect: "drop",
                direction: "up",
                duration: speeddown
            },
            show: {
                effect: "drop",
                direction: "up",
                duration: speedup
            },
        });

        dialog.html("");
        jQuery.ajax( {
            type : "POST",
            url : '/getbottomcontent.php',
            data : "category="+ category + "&keys=" + keys,
            success : function(data) {
                var aback = data.split("~~");
                var dtext = aback[0];
                var ltext = aback[1];
                dialog.html(dtext);
                dialog.dialog('option','title',ltext);
            },
            cache : false,
            async : false
        });
        dialog.dialog('open');
        return false;
    }
    function PopupCenter(url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        //Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    }
    jQuery(document).ready(function() {
        // MN
        if ($(window).width() <= 1024) {
            content_height = jQuery("#singleton").height();
            if (content_height > 440) {
                content_height = content_height+parseInt(percentToPixel(content_height, 10));
            }else {
                content_height = 480;
            }
            jQuery(".content-wrapper,.main-content").css('height', content_height);
        };

        jQuery('a.bottomlinksmodal').click(function(e){
            e.preventDefault();
        });

        jQuery('a.external').click(function(e){
            e.preventDefault();
            var _href = jQuery(this).attr('href');
            PopupCenter(_href,'','800','600');
            return false;
        });
    });

    var cashout_max_index = 0;
    var cashout_selected_index = 0;

    var slider1, slider2, slider4 ;
    var _slider_values = ['$80,000 or less','$80,001 to $85,000','$85,001 to $90,000','$90,001 to $95,000','$95,001 to $100,000','$100,001 to $120,000','$120,001 to $140,000','$140,001 to $160,000','$160,001 to $180,000','$180,001 to $200,000','$200,001 to $220,000','$220,001 to $240,000','$240,001 to $260,000','$260,001 to $280,000','$280,001 to $300,000','$300,001 to $320,000','$320,001 to $340,000','$340,001 to $360,000','$360,001 to $380,000','$380,001 to $400,000','$400,001 to $420,000','$420,001 to $440,000','$440,001 to $460,000','$460,001 to $480,000','$480,001 to $500,000','$500,001 to $520,000','$520,001 to $540,000','$540,001 to $560,000','$560,001 to $580,000','$580,001 to $600,000','$600,001 to $620,000','$620,001 to $640,000','$640,001 to $660,000','$660,001 to $680,000','$680,001 to $700,000','$700,001 to $720,000','$720,001 to $740,000','$740,001 to $760,000','$760,001 to $780,000','$780,001 to $800,000','$800,001 to $820,000','$820,001 to $840,000','$840,001 to $860,000','$860,001 to $880,000','$880,001 to $900,000','$900,001 to $920,000','$920,001 to $940,000','$940,001 to $960,000','$960,001 to $980,000','$980,001 to $1,000,000','$1,000,001 to $1,100,000','$1,100,001 to $1,200,000','$1,200,001 to $1,300,000','$1,300,001 to $1,400,000','$1,400,001 to $1,500,000','$1,500,001 to $1,600,000','$1,600,001 to $1,700,000','$1,700,001 to $1,800,000','$1,800,001 to $1,900,000','$1,900,001 to $2M','Over $2,000,000'];
    var _home_values = [80000,85000,90000,95000,100000,120000,140000,160000,180000,200000,220000,240000,260000,280000,300000,320000,340000,360000,380000,400000,420000,440000,460000,480000,500000,520000,540000,560000,580000,600000,620000,640000,660000,680000,700000,720000,740000,760000,780000,800000,820000,840000,860000,880000,900000,920000,940000,960000,980000,1000000,1100000,1200000,1300000,1400000,1500000,1600000,1700000,1800000,1900000,2000000];

    var _slider_values2 =  ['0 to $10,000','$10,001 to $20,000','$20,001 to $30,000','$30,001 to $40,000','$40,001 to $50,000','$50,001 to $60,000','$60,001 to $70,000','$70,001 to $80,000','$80,001 to $90,000','$90,001 to $100,000','$100,001 to $120,000','$120,001 to $140,000','$140,001 to $160,000','$160,001 to $180,000','$180,001 to $200,000','$200,001 to $220,000','$220,001 to $240,000','$240,001 to $260,000','$260,001 to $280,000','$280,001 to $300,000','$300,001 to $320,000','$320,001 to $340,000','$340,001 to $360,000','$360,001 to $380,000','$380,001 to $400,000','$400,001 to $420,000','$420,001 to $440,000','$440,001 to $460,000','$460,001 to $480,000','$480,001 to $500,000','$500,001 to $520,000','$520,001 to $540,000','$540,001 to $560,000','$560,001 to $580,000','$580,001 to $600,000','$600,001 to $620,000','$620,001 to $640,000','$640,001 to $660,000','$660,001 to $680,000','$680,001 to $700,000','$700,001 to $720,000','$720,001 to $740,000','$740,001 to $760,000','$760,001 to $780,000','$780,001 to $800,000','$800,001 to $820,000','$820,001 to $840,000','$840,001 to $860,000','$860,001 to $880,000','$880,001 to $900,000','$900,001 to $920,000','$920,001 to $940,000','$940,001 to $960,000','$960,001 to $980,000','$980,001 to $1,000,000','$1,000,001 to $1,100,000','$1,100,001 to $1,200,000','$1,200,001 to $1,300,000','$1,300,001 to $1,400,000','$1,400,001 to $1,500,000','$1,500,001 to $1,600,000','$1,600,001 to $1,700,000','$1,700,001 to $1,800,000','$1,800,001 to $1,900,000','$1,900,001 to $2,000,000','$2,000,001 to $2,100,000','$2,100,001 to $2,200,000','$2,200,001 to $2,300,000','$2,300,001 to $2,400,000','$2,400,001 to $2,500,000','Over $2,500,000'];
    var _mortgage_values = [10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,120000,140000,160000,180000,200000,220000,240000,260000,280000,300000,320000,340000,360000,380000,400000,420000,440000,460000,480000,500000,520000,540000,560000,580000,600000,620000,640000,660000,680000,700000,720000,740000,760000,780000,800000,820000,840000,860000,880000,900000,920000,940000,960000,980000,1000000,1100000,1200000,1300000,1400000,1500000,1600000,1700000,1800000,1900000,2000000,2100000,2200000,2300000,2400000,2500000,2600000];
    var mortgage_selected_index = 0;
    var _slider_values4 = ['$0 (No Cash)','$0 to $5,000','$5,000 to $10,000','$10,001 to $15,000','$15,001 to $20,000','$20,001 to $25,000','$25,001 to $30,000','$30,001 to $35,000','$35,001 to $40,000','$40,001 to $45,000','$45,001 to $50,000','$50,001 to $55,000','$55,001 to $60,000','$60,001 to $65,000','$65,001 to $70,000','$70,001 to $75,000','$75,001 to $80,000','$80,001 to $85,000','$85,001 to $90,000','$90,001 to $95,000','$95,001 to $100,000','$100,001 to $120,000','$120,001 to $140,000','$140,001 to $160,000','$160,001 to $180,000','$180,001 to $200,000','$200,001 to $220,000','$220,001 to $240,000','$240,001 to $260,000','$260,001 to $280,000','$280,001 to $300,000','$300,001 to $320,000','$320,001 to $340,000','$340,001 to $360,000','$360,001 to $380,000','$380,001 to $400,000','$400,001 to $420,000','$420,001 to $440,000','$440,001 to $460,000','$460,001 to $480,000','$480,001 to $500,000','$500,001 to $520,000','$520,001 to $540,000','$540,001 to $560,000','$560,001 to $580,000','$580,001 to $600,000','$600,001 to $620,000','$620,001 to $640,000','$640,001 to $660,000','$660,001 to $680,000','$680,001 to $700,000','$700,001 to $720,000','$720,001 to $740,000','$740,001 to $760,000','$760,001 to $780,000','$780,001 to $800,000','$800,001 to $820,000','$820,001 to $840,000','$840,001 to $860,000','$860,001 to $880,000','$880,001 to $900,000','$900,001 to $920,000','$920,001 to $940,000','$940,001 to $960,000','$960,001 to $980,000','$980,001 to $1,000,000','$1,000,001 to $1,100,000','$1,100,001 to $1,200,000','$1,200,001 to $1,300,000','$1,300,001 to $1,400,000','$1,400,001 to $1,500,000','$1,500,001 to $1,600,000','$1,600,001 to $1,700,000','$1,700,001 to $1,800,000','$1,800,001 to $1,900,000','$1,900,001 to $2M','Over $2,000,000'];
    var _cashout_values = [0,5000,10000,15000,20000,25000,30000,35000,40000,45000,50000,55000,60000,65000,70000,75000,80000,85000,90000,95000,100000,120000,140000,160000,180000,200000,220000,240000,260000,280000,300000,320000,340000,360000,380000,400000,420000,440000,460000,480000,500000,520000,540000,560000,580000,600000,620000,640000,660000,680000,700000,720000,740000,760000,780000,800000,820000,840000,860000,880000,900000,920000,940000,960000,980000,1000000,1100000,1200000,1300000,1400000,1500000,1600000,1700000,1800000,1900000,2000000];
    var cash_selected_index = 0;


    window.onload = function() {
        setTimeout(function(){
            jQuery('#enteryourzipcode').select();
        },1000);
    };

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,7})?$/;
        return emailReg.test( $email );
    }

    function disableItems(question){
        answers = question.find('.option');
        answers.each(function(index, el) {
            $(el).find('.btn-clicks').unbind('click.lp1');
        });
    }

    function percentToPixel(width, _perc){
        return (width/100)* parseFloat(_perc);
    }

    function callback_question_button(_element){

        var _question = $(_element).closest('.question');
        if (_question.hasClass('input_fields')) {
            _question.find('.btn-clicks').blur();
        };
        _question_id = _question.attr("id");
        name = _question.find('input').attr('name');
        if ($('.question.current input#firstname, .question.current input#youremail, .question.current input#phonenumber').val() =='') {
            $("."+name+"-box").find(".checked").removeClass("visible").addClass("hidden");
            $("."+name+"-box").removeClass("validate").addClass('focus');
            $("."+name+"-box").find(".cross-checked").removeClass("hidden").addClass("visible");
            return;
        } else if (name == 'youremail') {
                        if (!validateEmail($('.question.current input#youremail').val())){
                $("."+name+"-box").removeClass("validate").addClass('focus');
                $("."+name+"-box .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                return;
            }
                        else{
                $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("focus").addClass('validate');
                $("."+name+"-box .check-wrapp").find(".checked").removeClass("hidden").addClass("visible");
                $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");
                _question.find('input').blur();
            };
        }else if (name == 'phonenumber') {
                        if (!LEADPOP.validatePhone($('.question.current input.'+name+'').val())){
                $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("focus").addClass('validate');
                $("."+name+"-box .check-wrapp").find(".checked").removeClass("hidden").addClass("visible");
                $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");
                _question.find('input').blur();
            }
                        else{
                $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                $("."+name+"-box .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                return;
            }
        }else if (name == 'firstname'){
            var str = _question.find('input').val();
            var arr = str.split(' ');
            console.info(arr);
            if(arr.length >= 2 && arr[1]!='') {
                $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("focus").addClass('validate');
                $("."+name+"-box .check-wrapp").find(".checked").removeClass("hidden").addClass("visible");
                $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("visible").addClass("hidden");
            }else{
                $("."+name+"-box .check-wrapp").parent("div.inputwrapper").removeClass("validate").addClass('focus');
                $("."+name+"-box .check-wrapp").find(".checked").removeClass("visible").addClass("hidden");
                $("."+name+"-box .check-wrapp").find(".cross-checked").removeClass("hidden").addClass("visible");
                return;
            }
        }

        _ring = $(_element).find('.ring');
        TweenMax.fromTo(_ring, 0.5,
            {
                autoAlpha:0,
                css:{backgroundPosition:"0 0"}
            },
            {
                autoAlpha:1,
                ease:SteppedEase.config(28),
                css:{backgroundPosition:"-1400px 0"},
            }
        );

        // if(_question.attr('id')=='ques10'){
        //   $('#ques11').addClass('block');
        // }
        // if(_question.attr('id')=='ques12'){
        //   $('#ques11').removeClass('block');
        // }
        // $('.back-button').removeClass('firststep');

        $('.current .btn-clicks .ring').removeClass('turn');
        $(_element).find('.ring').addClass('turn');
        selecteditem = $(_element).parents(".option").attr('id');
        disableItems(_question);

        var _screen_id = _question.attr('data-id');

        if (!_question.hasClass('input_fields') && !_question.hasClass('slider_fields')) {
            _question.find('.btn-mvp-wrapper').removeClass('flip').removeClass('selected');
            $(_element).closest('.btn-mvp-wrapper').addClass('flip').addClass('selected');
        }

        if(_screen_id<jQuery('.question').length){

            // Hide All Titles
            //jQuery('.q-title').delay(500).animate({'opacity' : '0','top' : '-40px'}, 400);
            var _next_question = _question.next('.question');
            if (_next_question.find('.scrollbar')) {
                _next_question.find('.scrollbar').addClass('block');
                // _next_question.find('.scrollbar').css('z-index', '1');
                answer_count  = _next_question.find('.option').length;
                scrollheight = answer_count * 70;
                _next_question.find('.mCSB_container').css('height', scrollheight);
            };

            // if (_question.find('.scrollbar')) {
            //   _question.css('z-index', '-1');
            // }

            jQuery('.question').removeClass('current');
            _next_question.removeClass('current').addClass('current');

            mod_next = countLines(jQuery('h2.q-'+_next_question.attr('data-id')));
            mod_current = countLines(jQuery('h2.q-'+_question.attr('data-id')));

            if (mod_current == 1) {
                animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),10,-20,0.8,1);
            }else if(mod_current == 2){
                animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),30,0,0.8,1);
            }else {
                animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),0,-30,0.8,1);
            }

            if (mod_next == 1) {
                animateTitle(jQuery('h2.q-'+_next_question.attr('data-id')),-20,10,0.4,1.0);
            }else if(mod_next == 2){
                animateTitle(jQuery('h2.q-'+_next_question.attr('data-id')),-20,30,0.4,1.0);
            }else{
                animateTitle(jQuery('h2.q-'+_next_question.attr('data-id')),-30,0,0.4,1.0);
            }

            var _delay = 0.60;
            opt_parent = $('#f-p2-item');
            opt_parent_w = opt_parent.width();
            opt_margin = percentToPixel(opt_parent_w, 50);
            easing = " Power3.easeOut";
            _question.find('.option').each(function(option){
                animateOptions($(this),opt_margin,-2000,1.5,_delay,easing,'');
                if (_question.find('.scrollbar')) {
                    if ($(this).hasClass('active')) {
                        _delay = _delay+0.08;
                    }else {
                        _delay = 0.60;
                        _delay = _delay+0.08;
                    }
                }else{
                    _delay = _delay+0.08;
                }
            });


            if (_question.hasClass('multiselect')) {
                if (_question.find('.next-button').length) {
                    _question.find('.next-button').css('display', 'block');
                    animateOptions(_question.find('.next-button'),opt_margin,-2000,1.5,_delay,easing,'');
                };
            };

            opt_width  = _next_question.find('.option').first().width();
            opt_margin_percentage = percentToPixel(opt_width, 50);
            opt_margin_scroll = opt_margin - opt_margin_percentage -18;

            _delay = 0.75;
            // Current Screen Options Scrollbar
            _question.find('.mCSB_scrollTools_vertical').each(function(option){
                animateOptionScrollbar($(this),opt_margin_scroll,2000,0.5,_delay,easing,_question);
            });

            // Next Screen Options
            _delay = 0.60;
            easing = " Power3.easeOut";
            if (validateMultiSelect(_next_question) == true) {
                // $('.next-button').show();
            }

            if (_next_question.find('scrollbar')) {
                animateOptions(_next_question,2000,0,0.5,_delay,easing,'');
            }
            _next_question.find('.option').each(function(option){
                animateOptions($(this),2000,opt_margin,0.5,_delay,easing,_next_question);
                _next_question.find('.inputwrapper').addClass('focus');
                if (_next_question.find('.scrollbar')) {
                    if (option < 3) {
                        _delay = _delay+0.08;
                    }
                }else{
                    _delay = _delay+0.08;
                }
            });
            _delay = _delay+0.08;
            if (_next_question.hasClass('multiselect')) {
                if (_next_question.find('.next-button').length) {
                    _next_question.find('.next-button').css('display', 'block');
                    animateOptions(_next_question.find('.next-button'),2000,opt_margin,0.5,_delay,easing,'');
                };
            };

            // Next Screen Options Scrollbar
            _next_question.find('.mCSB_scrollTools_vertical').each(function(option){
                animateOptionScrollbar($(this),-2000,opt_margin_scroll,0.5,_delay,easing,'');
            });

        }

        if(_question.attr('id')=='ques18'){
            $('input.youremail').attr('autocomplete', 'on');
        }
        if(_question.attr('id')=='ques19'){
            $('input.phonenumber').attr('autocomplete', 'on');
        }

        cnt_bar = cnt_bar + 1;
        calculationProgressBar11(cnt_bar);

        if(_question.find('.slide-range').length>0){

            if(_question.attr('id')=='ques20'){ // ques4
                // Home Value Slider
                // Calculate & Display Mortgage

                var _home = _home_values[slider1.slider( "value" )];
                var mortgage_upper = (_home * 1.25);
                var mortgage_selected = (_home * 0.8);

                var mortgage_max_index = 0;
                mortgage_selected_index = 0;
                var max_found = false;
                var selected_found = false;
                $.each(_mortgage_values, function(index, value) {
                    if(value>=mortgage_upper){
                        max_found = true;
                    }

                    if(value>=mortgage_selected){
                        selected_found = true;
                    }

                    if(!max_found){
                        mortgage_max_index++;

                    }

                    if(!selected_found){
                        mortgage_selected_index++;
                    }

                    if(selected_found && max_found){
                        return false;
                    }
                });

                slider2.slider('option','max',(mortgage_max_index));
                slider2.slider('option','value',(mortgage_selected_index));
                $( "#value2" ).text(_slider_values2[mortgage_selected_index]);
            }
            if(_question.attr('id')=='ques21'){ // ques5
                // Mortgage Value Slider
                // Calculate & Display Mortgage
                var _home_cash = _home_values[slider1.slider( "value" )];
                // var _mort_user_value = _mortgage_values[slider2.slider( "value" )];
                var _cashout_from_home = (_home_cash * 0.80);
                // var _diff_home_mort = (_cashout_from_home - _mort_user_value);


                var cash_max_index = 0;
                cash_selected_index = 0;
                var max_found = false;
                var selected_found = false;
                $.each(_cashout_values, function(index, value) {
                    if(value>=_cashout_from_home){
                        max_found = true;
                    }

                    // if(value>=mortgage_selected){
                    //   selected_found = true;
                    // }

                    if(!max_found){
                        cash_max_index++;
                    }
                    if(max_found){
                        return false;
                    }
                });

                slider4.slider('option','max',(cash_max_index));
                slider4.slider('option','value',0);
                $( "#value4" ).text(_slider_values4[0]);
                var _upper_add_cash = '$'+(_cashout_values[cash_max_index]/1000)+'k'
                $('#add_cash').text(_upper_add_cash);
            }
        }
    }


    animateBackHandler = function (event){
        event.preventDefault();
        event.stopImmediatePropagation();
        $(this).blur();
        $(this).addClass('disable-btn');
        var _question = jQuery('.question.current');
        var _prev_question =  _question.prev('.question');
        var _screen_id = _question.attr('data-id');
        if(_screen_id>1)
        {
            // Hide All Titles

            // if (_screen_id == 12) {
            //   $('#ques11').addClass('block');
            // }
            // if (_screen_id == 10) {
            //   $('#ques11').removeClass('block');
            // };
            //jQuery('.q-title').delay(500).animate({'opacity' : '0','top' : '-40px'}, 400);
            if (_question.find('input').attr('name') == 'firstname') {
                $(".privacy-image").css({
                    'display': 'none'
                });
            }
                        if (_question.find('input').attr('name') == 'phonenumber') {
                $(".helping_text").css({
                    'display': 'none'
                });
                $(".realestate_tcpa_text").css({
                    'display': 'none'
                });
            }
                        mod_prev = countLines(jQuery('h2.q-'+_prev_question.attr('data-id')));
            mod_current = countLines(jQuery('h2.q-'+_question.attr('data-id')));
            if (mod_current == 1) {
                animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),10,-20,0.8,1);
            }else if(mod_current == 2){
                animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),30,0,0.8,1);
            }else {
                animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),0,-30,0.8,1);
            }

            if (mod_prev == 1) {
                animateTitle(jQuery('h2.q-'+_prev_question.attr('data-id')),-20,10,0.4,1.0);
            }else if(mod_prev == 2){
                animateTitle(jQuery('h2.q-'+_prev_question.attr('data-id')),-20,30,0.4,1.0);
            }else{
                animateTitle(jQuery('h2.q-'+_prev_question.attr('data-id')),-30,0,0.4,1.0);
            }

            var _delay = 0.60;
            opt_parent = $('#f-p2-item');
            opt_parent_w = opt_parent.width();
            opt_margin = percentToPixel(opt_parent_w, 50);

            opt_width  = _question.find('.option').first().width();
            opt_margin_percentage = percentToPixel(opt_width, 50);
            opt_margin_scroll = opt_margin - opt_margin_percentage -18;

            easing = " Power3.easeOut";

            if (_question.find('scrollbar')) {
                animateOptions(_question,0,2000,0.5,2,easing,'');
            }
            _question.find('.option').each(function(option){
                //$(this).delay(_delay).animate({'left' : '-50%'}, 500);
                animateOptions($(this),opt_margin,2000,0.5,_delay,easing,'');
                _delay = _delay+0.08;
            });

            if (_question.hasClass('multiselect')) {
                if (_question.find('.next-button').length) {
                    _question.find('.next-button').css('display', 'block');
                    animateOptions(_question.find('.next-button'),opt_margin,2000,0.5,0.85,easing,_question);
                };
            };

            _delay = 0.50;
            // Current Screen Options Scrollbar
            _question.find('.mCSB_scrollTools_vertical').each(function(option){
                animateOptionScrollbar($(this),opt_margin_scroll,-2000,0.5,_delay,easing,'');
            });


            _delay = 0.60;
            easing = " Power3.easeOut";


            if (_prev_question.find('.scrollbar')) {

                off_set = _prev_question.find('.option.selected').css('top');
                _prev_question.find('.scrollbar').mCustomScrollbar('scrollTo',off_set);
            }

            _total = _prev_question.find('.option').length;
            lastindex = _total - 1;
            last_four = lastindex - 3;

            if (_prev_question.find('scrollbar')) {
                animateOptions(_prev_question,-2000,0,0.5,_delay,easing,'');
            }
            _prev_question.find('.option').each(function(option){
                //$(this).delay(_delay).animate({'left' : '50%'}, 500);
                animateOptions($(this),-2000,opt_margin,0.5,_delay,easing,'');
                $(this).find('.btn-clicks').bind('click.lp1' , listItemClickHandler);
                selected_index = _prev_question.find('.option.selected').index();
                next_selected = selected_index + 3;
                if (selected_index > last_four) {
                    selected_index = last_four;
                    next_selected = lastindex;
                };
                if (_prev_question.find('.scrollbar')) {
                    if (option >= selected_index && option <= next_selected) {
                        _delay = _delay+0.08;
                    }
                }else{
                    _delay = _delay+0.08;
                }
            });
            _delay = 0.50;

            if (_prev_question.hasClass('multiselect')) {
                if (_prev_question.find('.next-button').length) {
                    _prev_question.find('.next-button').css('display', 'block');
                    animateOptions(_prev_question.find('.next-button'),-2000,opt_margin,0.5,_delay,easing,'');
                };
            };

            // if (_prev_question.hasClass('multiselect')) {
            //   $('.next-button').show();
            // }else{
            //   // $('.next-button').hide();
            // }

            if (_prev_question.find('.scrollbar')) {
                _prev_question.addClass('block');
                answer_count  = _prev_question.find('.option').length;
                scrollheight = answer_count * 70;
                _prev_question.find('.mCSB_container').css('height', scrollheight);
            };
            _prev_question.find('.mCSB_scrollTools_vertical').each(function(option){
                animateOptionScrollbar($(this),2000,opt_margin_scroll,0.5,_delay,easing,'');
            });


            jQuery('.question').removeClass('current');
            _prev_question.addClass('current');


            //jQuery('h2.q-'+_prev_question.attr('data-id')).delay(400).animate({'opacity' : '1','top' : '10px'}, 400);
            if(_question.find('.btn-mvp-wrapper.flip').length>=0){
                cnt_bar = cnt_bar - 1;
                calculationProgressBar11(cnt_bar);
            }
        }else if(_screen_id==1){
            jQuery('.question').removeClass('current');
            jQuery('.question').find('.option').each(function(index, el) {
                $(el).find(".btn-mvp-wrapper").removeClass('selected').removeClass('flip');
                $(el).find('.ring').removeClass('turn');

                if ($(el).find('.ring').hasClass('square_check')) {
                    $(el).find('.ring').removeClass('uncheck').addClass('uncheck');
                };
            });
            if ($(window).width() <= 1024) {
                setContentHeight(undefined);
            }
            $(".lock").css({
                'opacity': '1',
                "left": '12px'
            });

            _box = $('#step-1').width();
            per_width = percentToPixel(_box, 50);
            $("#step-2").delay(500).animate({'left' : '2900px'}, 500, function(){
                animateField($('#step-1'),-1000,per_width,0.3,'back');
            });

            $(this).removeClass('block');
            cnt_bar = 0;
            calculationProgressBar11(cnt_bar);
            jQuery('.question').removeClass('current');
            jQuery('#card').removeClass('block');
        }
    }
    animateNextHandler = function(event){
        event.preventDefault();
        var _question = $('.question.current');
        if (validateMultiSelect(_question) == true) {
            // _question.find('.next-button').addClass('flip');

            var _question = $('.question.current');
            disableItems(_question);
            var _screen_id = _question.attr('data-id');
            if(_screen_id<jQuery('.question').length){

                // Hide All Titles
                //jQuery('.q-title').delay(500).animate({'opacity' : '0','top' : '-40px'}, 400);
                var _next_question = _question.next('.question');

                if (_next_question.find('.scrollbar')) {
                    _next_question.find('.scrollbar').addClass('block');
                    answer_count  = _next_question.find('.option').length;
                    scrollheight = answer_count * 70;
                    _next_question.find('.mCSB_container').css('height', scrollheight);
                };
                jQuery('.question').removeClass('current');
                _next_question.removeClass('current').addClass('current');

                mod_next = countLines(jQuery('h2.q-'+_next_question.attr('data-id')));
                mod_current = countLines(jQuery('h2.q-'+_question.attr('data-id')));

                if (mod_current == 1) {
                    animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),10,-20,0.8,1);
                }else if(mod_current == 2){
                    animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),30,0,0.8,1);
                }else {
                    animateTitleUp(jQuery('h2.q-'+_question.attr('data-id')),0,-30,0.8,1);
                }

                if (mod_next == 1) {
                    animateTitle(jQuery('h2.q-'+_next_question.attr('data-id')),-20,10,0.4,1.0);
                }else if(mod_next == 2){
                    animateTitle(jQuery('h2.q-'+_next_question.attr('data-id')),-20,30,0.4,1.0);
                }else{
                    animateTitle(jQuery('h2.q-'+_next_question.attr('data-id')),-30,0,0.4,1.0);
                }

                var _delay = 0.60;
                opt_parent = $('#f-p2-item');
                opt_parent_w = opt_parent.width();
                opt_margin = percentToPixel(opt_parent_w, 50);
                easing = " Power3.easeOut";

                _question.find('.option').each(function(option){
                    //$(this).delay(_delay).animate({'left' : '-50%'}, 500);
                    // animateOptions($(this),opt_margin,-opt_margin,0.5,_delay,easing);
                    animateOptions($(this),opt_margin,-2000,1.5,_delay,easing,'');
                    if (_question.find('.scrollbar')) {
                        if ($(this).hasClass('active')) {
                            _delay = _delay+0.08;
                        }else {
                            _delay = 0.60;
                        }
                    }else{
                        _delay = _delay+0.08;
                    }
                });
                if (_question.hasClass('multiselect')) {
                    if (_question.find('.next-button').length) {
                        animateOptions(_question.find('.next-button'),opt_margin,-2000,1.5,_delay,easing,'');
                    };
                };

                if (_next_question.find('.next-button')) {
                    animateOptions(_next_question.find('.next-button'),opt_margin,-2000,1.5,0.85,easing,'');
                };
                opt_width  = _next_question.find('.option').first().width();
                opt_margin_percentage = percentToPixel(opt_width, 50);
                opt_margin_scroll = opt_margin - opt_margin_percentage -18;

                _delay = 0.75;
                // Current Screen Options Scrollbar
                _question.find('.mCSB_scrollTools_vertical').each(function(option){
                    animateOptionScrollbar($(this),opt_margin_scroll,2000,0.5,_delay,easing,_question);
                });

                // Next Screen Options
                _delay = 0.60;
                easing = " Power3.easeOut";

                _next_question.find('.option').each(function(option){
                    animateOptions($(this),2000,opt_margin,0.5,_delay,easing,_next_question);
                    _next_question.find('.inputwrapper').addClass('focus');
                    if (_next_question.find('.scrollbar')) {
                        if (option < 3) {
                            _delay = _delay+0.08;
                        }
                    }else{
                        _delay = _delay+0.08;
                    }
                });
                _delay = _delay+0.08;
                // Next Screen Options Scrollbar
                _next_question.find('.mCSB_scrollTools_vertical').each(function(option){
                    animateOptionScrollbar($(this),-2000,opt_margin_scroll,0.5,_delay,easing,'');
                });

            }

            if(_question.find('.btn-mvp-wrapper.flip').length>0){
                cnt_bar = cnt_bar + 1;
                calculationProgressBar11(cnt_bar);
            };
        };
    };
    function validateMultiSelect(_question){
        isselected = false;
        if (_question.hasClass('multiselect')) {
            if (_question.find('.option.selected').length>0) {
                isselected = true;
            };
        }
        return isselected;
    }

    jQuery(".back-button").unbind('click.b1').bind('click.b1',animateBackHandler);
    jQuery(".next-button").unbind('click.next').bind('click.next',animateNextHandler);


    // if($(window).width() >= 1064){
    //jQuery('#ques2 .scrollbar,#ques4 .scrollbar,#ques5 .scrollbar,#ques6 .scrollbar,#ques7 .scrollbar,#ques9 .scrollbar,#ques10 .scrollbar,#ques13 .scrollbar')
    jQuery('.question .scrollbar').mCustomScrollbar({
        theme:"light-thick",
        scrollInertia: 250,
        autoDraggerLength: false,
        scrollButtons:{ scrollAmount: 300 },
        scrollbarPosition:"outside",
        scrollButtons:{ enable: true },
        callbacks:{
            onScroll:function(){
                $(this).find($(".option")).each(function(index, el) {
                    if ($(el).is(":mcsInView")) {
                        $(el).addClass('active');
                    }else{
                        $(el).removeClass('active');
                    }
                });
            },
            onCreate:function(){
                $(this).each(function(index, element) {
                    $(element).find($(".option")).each(function(index, item) {
                        if (index < 4 ) {
                            $(item).addClass('active');
                        };
                    });
                });
            }
        }

    });
    // }

    jQuery(function(){
        document.onkeydown = function(e) {
            e = e || window.event;
            if (e.which == 13){
                if ($('.question.current').length>0) {
                    console.info("testing");
                    $(".input_fields.current .option .btn-clicks").trigger( "click" );
                } else {
                    $("#id14quotebutton").trigger( "click" );
                }
            }
        }
    });


    $(".saveall").click(function (e) {
        var direction = $(this).attr('rel');
        _question_id = $(".question.current").attr("id");
                if (LEADPOP.validatePhone($('.question.current input.phonenumber').val())) {
            return;
        }
                else {
                        
            $(".lock").animate({'left': '-2000px'},  1500);
            $("#replacedivtwo").animate({'right' : '2000px'}, 1000, function () {
                calculationProgressBar11(13);
                var direction = 'last';
                LEADPOP.goAfterSlide(direction,'mvp elements');
                jQuery("#card").flip(true);
            });
        };
    });


    function getMortageValuesByHomeValue(_home_value){
        if(_home_value!=undefined){
            var _mortgage_lower = 10000;
            var _mortgage_upper = parseInt(_home_value)*1.25;
            var _rem = _mortgage_upper%_mortgage_lower;
            var _extra = 1;
            if(_rem<1){
                _extra = 0;
            }
            var _res = (parseInt(_mortgage_upper/_mortgage_lower)+_extra)*_mortgage_lower;
            var _start = _mortgage_lower;
            var _val = "";
            var _labels = [];
            var _values = [];

            while(_start<_mortgage_upper){
                if(_start==_mortgage_lower){
                    _values.push(_start);
                    _val = currency_format(_start)+" or Less";
                }else{
                    _values.push(_start+_mortgage_lower);
                    _val = currency_format((parseInt(_start)+1))+" to "+currency_format((_start+_mortgage_lower));
                }
                _labels.push(_val);
                _start += _mortgage_lower;
            }
            return [_labels, _values];
        }else{
            return false;
        }
    }


    function additionalCashBorrowMortgage(_cash_value){
        if(_cash_value!=undefined){
            var _cash_lower = 10000;
            var _cash_upper = _cash_value;
            var _rem = _cash_upper%_cash_lower;
            var _extra = 1;
            if(_rem<1){
                _extra = 0;
            }

            var _res = (parseInt(_cash_upper/_cash_lower)+_extra)*_cash_lower;
            var _start = 0;
            var _val = "";
            var _labels = [];
            var _values = [];

            while(_start<_cash_upper){
                if(_start==0){
                    _values.push(_start);
                    _val = currency_format(_start)+" (No Cash)";
                }else{
                    _values.push(_start+_cash_lower);
                    _val = currency_format((parseInt(_start)+1))+" to "+currency_format((_start+_cash_lower));
                }
                _labels.push(_val);
                _start += _cash_lower;
            }

            var _add_cash = _cash_upper

            return [_labels, _values];
        }else{
            return false;
        }
    }

    function currency_format(number){
        return "$"+(number+"").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    function xverifycheckIfEmail(id, parent) {

        var val = jQuery('#' + parent).find('#' + id).val();
        var error = false;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(val) || val == "") {
            error = true;
        }
        if (error == false) {
            jQuery.ajax({
                type: "POST",
                url: '/xverify.php',
                data: "email=" + val + "&domain=short-sale-7887.secure-clix.com",
                success: function (res) {
                    console.log(res);
                    //return false;
                    if (res == "invalid" || res == "unknown") {
                        error = true;
                    }

                },
                cache: false,
                async: false
            });
        }

        if (error) {
            // jQuery('#' + id).focus();
            console.info("error");
            return false;
        }
        else {
            console.info("no error");
            return true;
        }

    };

    function xverifycheckIfPhone(id, parent) {
        var error = false;
        var val = jQuery('#' + parent).find('#' + id).val();
        var stripped = val.replace(/[\(\)\.\-\_\ ]/g, '');
        if (isNaN(parseInt(stripped))) {
            error = true;
        } else if (!(stripped.length == 10)) {
            error = true;

        }

        if (error == false) {
            jQuery.ajax({
                type: "POST",
                url: '/xverify.php',
                data: "phone=" + stripped + "&domain=short-sale-7887.secure-clix.com",
                success: function (res) {
                    if (res == "invalid") {
                        error = true;
                    }
                },
                cache: false,
                async: false
            });

        }
        if (error) {
            // jQuery('#' + id).focus();
            console.info("error");
            return false;
        }
        else {
            console.info("no error");
            return true;
        }
    };

    $(function() {
        // On Load
        $('.slide-range[data-range=true]').each(function(){
            var _self_from = $(this).data('from');
            var _self_to = $(this).data('to');
            var _self_values = $(this).data('values').split('#');
            $(this).find('.slider_value').text(_self_values[_self_from]+" - "+_self_values[_self_to]);

            $(this).find('.slider').slider({
                range: true,
                values: [_self_from, _self_to],
                min: 0,
                max: 32,
                step: 1
            });
            $(this).on('slide', function(event,ui){
                var _self_slider = $(ui.handle).closest('.slide-range');
                var _self_values = _self_slider.data('values').split('#');
                _self_slider.find('.slider_value').text(_self_values[ui.values[0]]+" - "+_self_values[ui.values[1]]);
            });
        });

        slider1 = $( "#slider1" ).slider({
            range: "min",
            value: 11,
            min: 0,
            max: _home_values.length,
            step: 1,
        });
        $( "#slider1" ).on('slide', function(event,ui){
            // On Slider Change
            $( "#value1" ).text(_slider_values[ui.value]);
        });

        // Start Value
        $( "#value1" ).text(_slider_values[11]);

        //var _slider_values2 = ['$10,000 or less','$10,001 to $20,000','$20,001 to $30,000','$30,001 to $40,000','$40,001 to $50,000','$50,001 to $60,000','$60,001 to $70,000','$70,001 to $80,000','$80,001 to $85,000','$85,001 to $90,000','$90,001 to $95,000','$95,001 to $100,000','$100,001 to $105,000','$105,001 to $110,000','$110,001 to $115,000','$115,001 to $120,000','$120,001 to $125,000','$125,001 to $130,000','$130,001 to $140,000','$140,001 to $150,000','$150,001 to $160,000','$160,001 to $170,000','$170,001 to $180,000'];
        slider2 = $( "#slider2" ).slider({
            range: "min",
            value: 0,
            min: 0,
            max: 23,
            step: 1,
        });
        slider2.on('slide', function(event,ui){
            // On Slider Change
            $( "#value2" ).text(_slider_values2[ui.value]);
        });

        var _slider_values3 = ['less than 2%','2.00%','2.25%','2.50%','2.75%','3.00%','3.25%','3.50%','3.75%','4.00%','4.25%','4.50%','4.75%','5.00%','5.25%','5.50%','5.75%','6.00%','6.25%','6.50','6.75%','7.00%','7.25%','7.50%','7.75%','8.00%','8.25%','8.50%','8.75%','9.00%','9.25%','9.50%','9.75%','10.00%','10.25%','10.50%','10.75%','11% or more'];
        $( "#slider3" ).slider({
            range: "min",
            value: 13,
            min: 0,
            max: 37,
            step: 1,
        });
        $( "#slider3" ).on('slide', function(event,ui){
            // On Slider Change
            $( "#value3" ).text(_slider_values3[ui.value]);
        });
        // Start Value
        $( "#value3" ).text(_slider_values3[13]);

        //var _slider_values4 = ['$0 (No Cash)','$10,001 to $20,000','$20,001 to $30,000','$30,001 to $40,000','$40,001 to $50,000','$50,001 to $60,000','$60,001 to $70,000','$70,001 to $80,000','$80,001 to $85,000','$85,001 to $90,000','$90,001 to $95,000','$95,001 to $100,000','$100,001 to $105,000','$105,001 to $110,000','$110,001 to $115,000','$115,001 to $120,000','$120,001 to $125,000','$125,001 to $130,000','$130,001 to $140,000','$140,001 to $150,000','$150,001 to $160,000','$160,001 to $170,000','$170,001 to $180,000'];
        slider4 = $( "#slider4" ).slider({
            range: "min",
            value: 0,
            min: 0,
            max: _cashout_values.length,
            step: 1,
        });
        slider4.on('slide', function(event,ui){
            // On Slider Change
            $( "#value4" ).text(_slider_values4[ui.value]);
        });

        var _slider_values5 = ['$0','$1 to $1,000','$1,001 to $2,000','$2,001 to $3,000','$3,001 to $4,000','$4,001 to $5,000','$5,001 to $7,500','$7,501 to $10,000','$10,001 to $12,500','$12,501 to $15,000','$15,001 to $20,000','$20,001 to $25,000','$25,001 to $30,000','$30,001 to $35,000','$35,001 to $40,000','$40,001 to $45,000','$45,001 to $50,000','$50,000 or More'];
        $( "#slider5" ).slider({
            range: "min",
            value: 5,
            min: 0,
            max: 18,
            step: 1,
        });
        $( "#slider5" ).on('slide', function(event,ui){
            // On Slider Change
            $( "#value5" ).text(_slider_values5[ui.value]);
        });
        // Start Value
        $( "#value5" ).text(_slider_values5[5]);

        var _slider_values6 = ['Any Square Feet','Less Than 500 SF','501-750 SF','751-1,000 SF','1,001-1,250 SF','1,251-1,500 SF','1,750-2,000 SF','2,001-2,250 SF','2,251-2,500 SF','2,750-3,000 SF','3,001-3,250 SF','3,251-3,500 SF','3,750-4,000 SF','4,001-4,250 SF','4,251-4,500 SF','4,750-5,000 SF','5,001-5,250 SF','5,251-5,500 SF','5,750-6,000 SF','6,001-6,250 SF','6,251-6,500 SF','6,750-7,000 SF','7,001-7,250 SF','7,251-7,500 SF','7,750-8,000 SF','8,001-8,250 SF','8,251-8,500 SF','8,750-9,000 SF','9,001-9,250 SF','9,251-9,500 SF','9,750-10,000 SF','More than 10,000 SF'];
        $( "#slider6" ).slider({
            range: "min",
            value: 3,
            min: 0,
            max: 31,
            step: 1,
        });
        $( "#slider6" ).on('slide', function(event,ui){
            // On Slider Change
            $( "#value6" ).text(_slider_values6[ui.value]);
        });
        // Start Value
        $( "#value6" ).text(_slider_values6[3]);

        $(".field_slider").each(function(){
            var _slider_values = $(this).data('values').split('#');
            var _slider_value = $(this).data('value');
            var _slider_minimum = $(this).data('minimum');
            var _slider_selector = $(this).data('selector');

            $(this).slider({
                range: _slider_minimum,
                value: _slider_value,
                min: 0,
                max: (_slider_values.length-1),
                step: 1,
            });
            $(this).on('slide', function(event,ui){
                $(_slider_selector).text(_slider_values[ui.value]);
            });
            $(_slider_selector).text(_slider_values[_slider_value]);
        });
    });


    (function(jQuery) {

        jQuery.fn.leadpops = function(options){
            var selectboxoptions_wrap = "#lp_wrap_id_one_table";
            var classselected = "selected";
            return this.each(function() {
                listItemClickHandler = function () {
                    if(jQuery(this).attr("class").indexOf("disabled") < 0)
                    {
                        var _question = jQuery(this).parents('.question');
                        if(!jQuery(this).hasClass(classselected))
                        {
                            if(_question.hasClass('multiselect')){
                                var _self_wrapper = $(this).closest('.btn-mvp-wrapper');
                                //new
                                if (jQuery(this).parents('.question').find('.option')) {
                                    _firstopt = jQuery(this).parents('.question').find('.option').first();
                                    if (_firstopt.find('span').text() == 'None' || _firstopt.find('span').text() == 'None Of These') {
                                        _firstopt.removeClass(classselected);
                                        _firstopt.find('.btn-mvp-wrapper').removeClass('flip');
                                        _firstopt.find('.ring').removeClass('turn').addClass('uncheck');
                                    }
                                };
                                if(_self_wrapper.hasClass('flip')){
                                    _self_wrapper.removeClass('flip').removeClass('selected');
                                    $(this).closest('.option').removeClass(classselected)
                                    $(this).find('.ring').removeClass('turn');
                                    $(this).find('.ring').addClass('uncheck');
                                }else{
                                    _self_wrapper.addClass('flip').addClass('selected');
                                    //new
                                    if ($(this).siblings('span').text() == 'None' || $(this).siblings('span').text() == 'None Of These') {
                                        jQuery(this).parents('.question').find("." + classselected).find(".btn-mvp-wrapper").removeClass('flip').removeClass('selected');
                                        jQuery(this).parents('.question').find("." + classselected).find(".ring").removeClass('turn').addClass('uncheck');
                                        jQuery(this).parents('.question').find("." + classselected).removeClass(classselected);
                                    };
                                    $(this).find('.ring').removeClass('uncheck');
                                    $(this).closest('.option').addClass(classselected);
                                    _ring = $(this).find('.ring');
                                    TweenMax.fromTo(_ring, 0.1,
                                        {
                                            autoAlpha:0,
                                            css:{backgroundPosition:"0 0"}
                                        },
                                        {
                                            autoAlpha:1,
                                            ease:SteppedEase.config(28),
                                            css:{backgroundPosition:"-1400px 0"},
                                        }
                                    );
                                    $(this).find('.ring').addClass('turn');
                                }
                                // $('.next-button').show();

                                return;
                            }else{
                                // $('.next-button').hide();
                                jQuery(this).parents('.question').find("." + classselected).removeClass(classselected);
                                jQuery(this).parents('.option').addClass(classselected);
                                (window.triggerFbTracking || function(){})(this);
                                callback_question_button(this);
                            }

                        } else {
                            jQuery(this).parents().find("." + classselected).removeClass(classselected);
                            jQuery(this).parents('.question .option').find('.q-text').addClass(classselected);
                        }
                    };

                };

                jQuery(selectboxoptions_wrap+ " .question .option .btn-clicks").unbind('click.lp1').bind('click.lp1',listItemClickHandler);
            });

        };
    })(jQuery);

    jQuery(document).ready(function($){
		        $("#lp_replace_one").append('<img src="//short-sale-7887.secure-clix.com/images/realestate/realestate/lock1.jpg" class = "privacy-image" alt="" />');
		        if ($(window).width() <= 320) {
            item_width = 270;
        }else if ($(window).width() <= 380) {
            item_width = 300;
        }else if ($(window).width() > 380) {
            item_width = 334;
        }
        jQuery(".question").each(function(index, el) {
            _length  = $(el).find('.option').length;
            if ($(el).find('.scrollbar').length>0 || $(el).hasClass('multiselect')) {
                _top = 0;
            }else {
                _top = 75;
                if ($(window).width() <= 1024) {
                    _top = 100;
                }
            }
            _left = 2000;
            for (var i = 1; i <= _length; i++) {
                var item = $(this).find("#option-"+i+"");
                item.css({
                    'left': _left,
                    'top': _top,
                    'width': item_width,
                });

                _top = _top + 70;
                _left = _left + 100;
            };
        });
		        // GetStartedNow Scroll to Top
        $("a[href='#GetStartedNow']").click(function() {
            $([document.documentElement, document.body]).animate({
                                scrollTop: 0
                            }, function(){
                if (jQuery('#enteryourzipcode').val() == '') {
                    jQuery('#enteryourzipcode').select();
                }
            });
            return false;
        });
        // GetStartedNow Scroll to Top end
        $( "#progressbar .inner-bar").css({'display':'block'});
        calculationProgressBar11(cnt_bar);
        jQuery("#lp_replace_one").leadpops();
    });



    jQuery(document).ready(function(){
        try {

            // jQuery('html').attr('style','background-image: linear-gradient(to right bottom,rgba(171, 179, 182, 1) 0%,rgba(171, 179, 182, 1) 100%);');
            
            var $ = jQuery;
            var shouldTrack = false;

            var fbTrackMap = {}
            var fbTrackSelection = {}
            if (shouldTrack && typeof fbq === 'function') {
                init();


            $(document).on("click", "#id14quotebutton" ,function (e) {
                e.preventDefault();
                if (LEADPOP.validateZillowForm() == true) {
                    if (shouldTrack) {
                        fbTrack($("#enteryourzipcode").val(), fbTrackSelection.enteryourzipcode, fbTrackMap['enteryourzipcode'].event);
                    }
                }

                });

            $(document).on('click', ".btn-mvp-wrapper .btn-clicks", function (e){
                   if($(this).parent().parent('.question').hasClass('multiselect')){
                    var html = $(this).parent().parent('.question');
                      var ele = $(html).find('.flip.selected');
                       var field = $(html).find('.flip.selected .q-text').data('field');
                       for(var i = 0; i < ele.length; i++){
                           fbTrack($(ele[i]).find('.q-text').text(),fbTrackSelection[field], fbTrackMap[field].event);
                       }

                   }

                });

            }

            function init(){
                for(var field in fbTrackMap){
                    if( !("event" in fbTrackMap[field]) ){
                        throw new Error("Fb pixel tracking would not work because 'event' property is not defined for fbTrackMap."+field);
                    }
                }
                window.triggerFbTracking = triggerFbTracking;
            }

            function triggerFbTracking(el){
                var $qText, multi;
                if($(el).parent().siblings('.slider_value').length == 1){
                    $qText = $(el).parent().siblings('.q-text');

                    multi = true;

                }else{
                    $qText = $(el).siblings('.q-text');
                    multi = false;

                }

                var field = $qText.data('field');

                if (typeof field === 'undefined') {
                    console.warn('q-text field is not defined for following object');
                    console.warn(el);
                }

                if(typeof fbTrackMap[field] !== 'undefined') {

                    var px_field = field.replace(/[^A-Za-z]/gi, '');
                    if (typeof fbTrackSelection[px_field] !== 'undefined') {

                        var val = $qText.text();
                        if (multi && (!field.match(/theyear/g) && !field.match(/downpayment/g))) {
                            if (val.indexOf('to') != -1) {
                                var s = val.split('to');

                            } else if (val.indexOf('-') != -1) {
                                var s = val.split('-');

                            }
                            var px = fbTrackSelection[px_field][0].split('~');
                            var sl_min = parseInt(s[0].replace(/[^0-9]/gi, ''));
                            var sl_max = parseInt(s[1].replace(/[^0-9]/gi, ''));
                            var total = parseInt((sl_min + sl_max) / 2);
                            var px_min = parseInt(px[0].replace(/[^0-9]/gi, ''));
                            var px_max = parseInt(px[1].replace(/[^0-9]/gi, ''));

                            if (total >= px_min && total <= px_max) {
                                console.log('sl_min ' + sl_min + ' sl_max ' + sl_max + ' px_min ' + px_min + ' px_max ' + px_max)
                                fbq('track', fbTrackMap[field].event);
                            }
                        } else {
                            fbTrack(val, fbTrackSelection[px_field], fbTrackMap[field].event);
                        }
                    }
                }
            }

            function fbTrack(a,b,c){
                if (jQuery.inArray(a, b) != '-1') {
                    fbq('track', c);
                    console.log(a);
                    console.log(b);
                    console.log('fb track');
                }
            }


        } catch (e) {
            console.warn(e);
        }

    });
function showbottom(category, keys) {
    var dialog = jQuery('#creditfunnels');
        var top = 'top+120';
    speeddown = 400;
    speedup = 600;
    var winW = $(window).width() - (($(window).width() / 100) * (50));
    var winH = $(window).height() - (($(window).height() / 100) * (30));
        dialog.dialog('destroy');
    dialog.dialog({
        closeOnEscape: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        },
        focus: function(event, ui){
            dialog.scrollTop(0);
        },
        buttons: [
            {
                class: 'cross-btn',
                text: "x",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
        modal: true,
        autoOpen: false,
        width: winW,
        resizable: false,
        height: winH,
        // position: { my: 'top', at: top },
        hide: {
            effect: "drop",
            direction: "up",
            duration: speeddown
        },
        show: {
            effect: "drop",
            direction: "up",
            duration: speedup
        },
    });

    dialog.html("");
    jQuery.ajax({
        type: "POST",
        url: '/getbottomcontent.php',
        data: "category=" + category + "&keys=" + keys,
        success: function (data) {
            var aback = data.split("~~");
            var dtext = aback[0];
            var ltext = aback[1];
            dialog.html(dtext);
            dialog.dialog('option', 'title', ltext);
        },
        cache: false,
        async: false
    });
    dialog.dialog('open');
    return false;
}
