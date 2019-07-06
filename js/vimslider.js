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
            defColor:"aqua", //цвет элемента над которым нет курсора
            hoverColor:"red" //цвет элемента на который наведен курсор
        }, options);

        var make = function(){
            var i;
            var elements = "";
            $(this).children().each(function (index, value) {
                console.log(value);
                console.log(value['data-type']);
                // console.log(value.attr('data-url'));
            });
            console.log(this);
            for (var i = 0; i < this.children.length; i++) {
                var active = i == 0 ? 'active' : '';
                console.log(this.children[i]);
            }
            $(this).wrap( "<div class='vim-wrapper'></div>" );
            elements += "<a class='vimSlide-prev'>&#10094;</a>\n"; // Previous button
            elements += "<a class='vimSlide-next'>&#10095;</a>\n"; // Next button
            // Navigation dots
            console.log(this.children.length);
            elements += "<div class='vimSlide-dots'>\n";
            for (var i = 0; i < this.children.length; i++) {
                var active = i == 0 ? 'selected' : '';
                elements += "<span class='vimSlide-dot " + active + "' data-vimSlide-dot-index='"+ i +"'></span>\n"
            }
            elements += "</div>";
            $( ".vim-wrapper" ).append( elements);
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
