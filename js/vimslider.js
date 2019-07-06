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
            defColor:"white",
            hoverColor:"red",
            animation: "slide"
        }, options);

        var make = function(){
            var slides = [];
            var i = 0;
            var elements = "";
            var list = "";
            $(this).children().each(function () {
                var obj = {};
                obj['data-url'] = $(this).data('url');
                obj['data-type'] = $(this).data('type');
                slides.push(obj);

                var active = i == 0 ? 'active' : '';
                if ($(this).data('type') == "image") { // Template for images
                    list += "<div class='vimSlide-item " + options.animation + " " + active +"'>\n";
                    list += "<img src='"+ $(this).data('url') + "' alt='" +$(this).data('type') +"'>\n";
                    list += "</div>\n";
                } else if ($(this).data('type') == "video") { // Template for videos
                    list += "<div class='vimSlide-item "+ options.animation + " " + active +"'>\n";
                    list += "<video width='100%' height='500px'>\n";
                    list += "<source src='" + $(this).data('url') + "'>\n"
                    list += "</video>\n";
                    list += "<span class='play-button'>&#9654;</span>";
                    list += "</div>\n";
                }
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
            // $(this).append(list);
            $(this).wrap( "<div class='vim-wrapper'></div>" );
            $( ".vim-wrapper" ).append( elements);

            console.log($(this));
            $(this).css("background-color",options.defColor)
                .mouseenter( function(){
                    $(this).css("background-color",options.hoverColor);
                })
                .mouseleave( function(){
                    $(this).css("background-color",options.defColor);
                });
        };

        return this.each(make);
    };
})(jQuery);
