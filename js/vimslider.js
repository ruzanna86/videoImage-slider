/*
*
* Video And Image Responsive vim Slider
* Created by Ruzanna Mehrabyan
* For task
*
* */

(function($){
    jQuery.fn.vimslider = function(options){
        options = $.extend({
            slideShow: false,
            interval: 1500,
            animation: "slide"
        }, options);

        // Initialize Slider
        var make = function(){
            var slides = [],
                i = 0,
                elements = "",
                list = "",
                slideActive = 0;
            // Change List items
            $(this).children().each(function () {
                var data_obj = {};
                data_obj['data-url'] = $(this).data('url');
                data_obj['data-type'] = $(this).data('type');
                var active = i == 0 ? 'active' : '';
                if(active){
                    data_obj['active'] = true;
                }else{
                    data_obj['active'] = false;
                }

                if ($(this).data('type') == "image") { // Template for images
                    list += "<div class='vimSlide-item " + options.animation + " " + active +"'>\n";
                    list += "<img src='"+ $(this).data('url') + "' alt='" +$(this).data('type') +"'>\n";
                    list += "</div>\n";
                } else if ($(this).data('type') == "video") { // Template for videos
                    if(active){
                        data_obj['playing'] = true;
                    }else{
                        data_obj['playing'] = false;
                    }
                    list += "<div class='vimSlide-item "+ options.animation + " " + active +"'>\n";
                    list += "<video width='100%' height='500px'>\n";
                    list += "<source src='" + $(this).data('url') + "'>\n"
                    list += "</video>\n";
                    list += "<span class='play-button'>&#9654;</span>";
                    list += "</div>\n";
                }
                slides.push(data_obj);
                i++;
            });

            elements += "<a class='vimSlide-prev'></a>\n";
            elements += "<a class='vimSlide-next'></a>\n";
            // Navigation dots
            elements += "<div class='vimSlide-dots'>\n";
            for (var i = 0; i < this.children.length; i++) {
                var active = i == 0 ? 'selected' : '';
                elements += "<span class='vimSlide-dot " + active + "' data-vimSlide-dot-index='"+ i +"'></span>\n"
            }
            elements += "</div>";

            $(this).html(list);
            $(this).wrap( "<div class='vim-wrapper'></div>" );
            $( ".vim-wrapper" ).append( elements);

            // Added List bject in slider each index
            for(var j = 0; j < this.children.length; j++) {
                slides[j].obj = $(this)[0].children[j];
                if($(slides[j].obj).hasClass('active')){
                    slideActive = j;
                }
            }

            // Check if autoplay is true
            if(options.slideShow == true){
                setTimeout(slideAutoplay.bind(), options.interval);
            }
            // Call Click functions
            allClicks();

            // All click functions
            function allClicks(){
                // Dots click event
                $('.vimSlide-dots').children().each(function (index, value) {
                    $(value).click(function () {
                        var n = $(this).attr('data-vimSlide-dot-index');
                        n *= 1;
                        slideActive = n;
                        $('.vimSlide-dots .vimSlide-dot').each(function (index) {
                            $(this).removeClass('selected');
                            $(slides[index]['obj']).removeClass('active');
                        });
                        $(this).addClass('selected');
                        $(slides[n]['obj']).addClass('active');
                    });
                });
                // Next Arrow click event
                $('.vimSlide-next').click(function () {
                    if(slideActive == (slides.length - 1)){
                        slideActive = 0;
                    }else{
                        slideActive++;
                    }
                    objLoop(slideActive);
                });
                // Prev Arrow click event
                $('.vimSlide-prev').click(function () {
                    if(slideActive == 0){
                        slideActive = (slides.length - 1);
                    }else{
                        slideActive--;
                    }
                    objLoop(slideActive);
                });
            }

            // Added active/selected class in dots and list items
            function objLoop() {
                $('.vimSlide-dots .vimSlide-dot').each(function (index) {
                    $(this).removeClass('selected');
                    $(slides[index].obj).removeClass('active');
                });
                $('.vimSlide-dots .vimSlide-dot[data-vimslide-dot-index="'+slideActive+'"]').addClass('selected');
                $(slides[slideActive].obj).addClass('active');
            }
            
            // Added autoPlay function with Set Interval
            function slideAutoplay(){
                if(options.slideShow === true){
                    if(slideActive == (slides.length - 1)){
                        slideActive = 0;
                    }else{
                        slideActive++;
                    }
                    objLoop();
                    setTimeout(slideAutoplay.bind(), options.interval);
                }else{
                    setTimeout(slideAutoplay.bind(), false);
                }
            }

        };
        return this.each(make);
    };
})(jQuery);
