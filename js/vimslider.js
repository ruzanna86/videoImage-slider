/*
*
* Video And Image Responsive vim Slider
* Created by Ruzanna Mehrabyan
* For task
*
* */

(function($){
    $.vimslider = function(element, options) {
        var that = element[0];
        var autoPlay;
        this.init = function(element, options) {
            this.options = $.extend({}, $.vimslider.defaults, options);
            this.active = 0;
            this.playVideo = false;
            var slides = [],
                navigations = "",
                list = "";
            for(var i = 0; i < element.children().length; i++){
                var items = $(that.children[i]);
                var data_obj = items.data();
                var active = i == 0 ? 'active' : '';

                if (data_obj.type == "image") { // Template for images
                    list += "<div class='vimSlide-item " + this.options.animation + " " + active +"'>\n";
                    list += "<img src='"+ data_obj.url + "' alt='" + data_obj.type +"'>\n";
                    list += "</div>\n";
                } else if (data_obj.type == "video") { // Template for videos
                    list += "<div class='vimSlide-item "+ this.options.animation + " " + active +"'>\n";
                    list += "<video width='100%' height='500px' controls>\n";
                    list += "<source src='" + data_obj.url + "'>\n"
                    list += "</video>\n";
                    list += "</div>\n";
                }
                slides.push(data_obj);
            }
            // Add Next/Prev Buttons
            navigations += "<a class='vimSlide-prev'></a>\n";
            navigations += "<a class='vimSlide-next'></a>\n";
            // Add Navigation dots
            navigations += "<div class='vimSlide-dots'>\n";
            for (var i = 0; i < element.children().length; i++) {
                var active = i == 0 ? 'selected' : '';
                navigations += "<span class='vimSlide-dot " + active + "' data-vimSlide-dot-index='"+ i +"'></span>\n"
            }
            navigations += "</div>";

            // Replace With new List & Add Navigations
            $(that).html(list);
            $(that).wrap( "<div class='vim-wrapper'></div>" );
            $(that).after( navigations );

            // Added List Object in slider each index
            for(var j = 0; j < element.children().length; j++) {
                slides[j].obj = $(element[0].children[j]);
            }
            this.elements = slides;
            // Call All Click Events & Video Event
            this.clickEvents(this);
            this.videoControl(this);

            if (options.slideShow === true) {
                this.currentInterval();
            }
        };
        this.nextSlide = function () {
            if(this.options.slideShow === true && this.playVideo === false ){
                if(this.active == (this.elements.length - 1)){
                    this.active = 0;
                }else{
                    this.active++;
                }
                this.updateFrame(this);
            }
        };
        this.updateFrame = function (mySlider) {
            $(that).siblings('.vimSlide-dots').children().each(function (index) {
                $(this).removeClass('selected');
                $(mySlider.elements[index].obj).removeClass('active');
                if(index == mySlider.active){
                    $(this).addClass('selected');
                    $(mySlider.elements[mySlider.active].obj).addClass('active');
                }
            });
        };
        this.clickEvents = function (mySlider) {
            // Navigation dots Click event
            $(that).siblings('.vimSlide-dots').children().each(function (index, value) {
                $(value).click(function () {
                    var n = $(this).attr('data-vimSlide-dot-index');
                    n *= 1;
                    mySlider.active = n;
                    $(that).siblings('.vimSlide-dots').children().each(function (index) {
                        $(this).removeClass('selected');
                        $(mySlider.elements[index].obj).removeClass('active');
                    });
                    $(this).addClass('selected');
                    $(mySlider.elements[mySlider.active].obj).addClass('active');
                    clearInterval(autoPlay);
                    mySlider.currentInterval();
                });
            });
            // Next Arrow click event
            $(that).siblings('.vimSlide-next').click(function () {
                if(mySlider.active == (mySlider.elements.length - 1)){
                    mySlider.active = 0;
                }else{
                    mySlider.active++;
                }
                mySlider.updateFrame(mySlider);
                clearInterval(autoPlay);
                mySlider.currentInterval();
            });
            // Prev Arrow click event
            $(that).siblings('.vimSlide-prev').click(function () {
                if(mySlider.active == 0){
                    mySlider.active = (mySlider.elements.length - 1);
                }else{
                    mySlider.active--;
                }
                mySlider.updateFrame(mySlider);
                clearInterval(autoPlay);
                mySlider.currentInterval();
            });
        };
        this.videoControl = function (mySlider) {
            var myVideo = $(that).find('video');
            myVideo.on('play', function() {
                mySlider.playVideo = true;

            });
            $(myVideo).on('pause', function() {
                mySlider.playVideo = false;
            });
        };
        this.currentInterval = function () {
            autoPlay = setInterval(this.nextSlide.bind(this), this.options.interval);
        };

        this.init(element, options);

    };

    $.fn.vimslider = function(options) { //Using only one method off of $.fn
        return this.each(function() {
            (new $.vimslider($(this), options));
        });
    };

    $.vimslider.defaults = {
        slideShow: false,
        interval: 1500,
        animation: "fade"
    }
})(jQuery);
