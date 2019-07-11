/*
*
* Video And Image Responsive vim Slider
* Created by Ruzanna Mehrabyan
* For task
*
* */

(function($){
    $.vimslider = function(element, options) {
        this.options = {};
        var that = element;
        this.init = function(element, options) {
            this.options = $.extend({}, $.vimslider.defaults, options);
            this.active = 0;
            this.playVideo = false;
            var wrapper = element[0],
                slides = [],
                elements = "",
                list = "";
            for(var i = 0; i < element.children().length; i++){
                var items = $(wrapper.children[i]);
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
            elements += "<a class='vimSlide-prev'></a>\n";
            elements += "<a class='vimSlide-next'></a>\n";
            // Navigation dots
            elements += "<div class='vimSlide-dots'>\n";
            for (var i = 0; i < element.children().length; i++) {
                var active = i == 0 ? 'selected' : '';
                elements += "<span class='vimSlide-dot " + active + "' data-vimSlide-dot-index='"+ i +"'></span>\n"
            }
            elements += "</div>";

            $(wrapper).html(list);
            $(wrapper).wrap( "<div class='vim-wrapper'></div>" );
            $(wrapper).after( elements );

            // Added List Object in slider each index
            for(var j = 0; j < element.children().length; j++) {
                slides[j].obj = $(element[0].children[j]);
            }
            this.elements = slides;
            this.clickEvents(this);
            this.videoControl(this);
        };
        this.nextSlide = function (that) {
            if(that.options.slideShow === true && that.playVideo === false ){
                if(that.active == (that.elements.length - 1)){
                    that.active = 0;
                }else{
                    that.active++;
                }
                that.updateFrame(that);
            }
        };
        this.updateFrame = function (mySlider) {
            $(that[0]).siblings('.vimSlide-dots').children().each(function (index) {
                $(this).removeClass('selected');
                $(mySlider.elements[index].obj).removeClass('active');
                if(index == mySlider.active){
                    $(this).addClass('selected');
                    $(mySlider.elements[mySlider.active].obj).addClass('active');
                }
            });
        };
        this.clickEvents = function (mySlider) {
            $(that[0]).siblings('.vimSlide-dots').children().each(function (index, value) {
                $(value).click(function () {
                    var n = $(this).attr('data-vimSlide-dot-index');
                    n *= 1;
                    mySlider.active = n;
                    $(that[0]).siblings('.vimSlide-dots').children().each(function (index) {
                        $(this).removeClass('selected');
                        $(mySlider.elements[index].obj).removeClass('active');
                    });
                    $(this).addClass('selected');
                    $(mySlider.elements[mySlider.active].obj).addClass('active');
                });
            });
            // Next Arrow click event
            $(that[0]).siblings('.vimSlide-next').click(function () {
                if(mySlider.active == (mySlider.elements.length - 1)){
                    mySlider.active = 0;
                }else{
                    mySlider.active++;
                }
                mySlider.updateFrame(mySlider);
            });
            // Prev Arrow click event
            $(that[0]).siblings('.vimSlide-prev').click(function () {
                if(mySlider.active == 0){
                    mySlider.active = (mySlider.elements.length - 1);
                }else{
                    mySlider.active--;
                }
                mySlider.updateFrame(mySlider);
            });
        };
        this.videoControl = function (mySlider) {
            var myvideo = $(that[0]).find('video');
            myvideo.on('play', function() {
                mySlider.playVideo = true;

            });
            $(myvideo).on('pause', function() {
                mySlider.playVideo = false;
            });
        };

        this.init(element, options);

        if (options.slideShow === true) {
            var mySlider = this;
            setInterval(function() {

                mySlider.nextSlide(mySlider);

            } , mySlider.options.interval);
        }
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
