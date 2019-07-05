/*
*
* Video And Image Responsive vim Slider
* Created by Ruzanna Mehrabyan
* For task
*
* */

(function ($) {

    var slider;

    var defaults = {
        slideShow: true,
        interval: 500,
        animation: 'slide'
    };

    $.fn.vimslider = function (options) {

        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function () {
                $(this).vimslider(options);
            });
            return this;
        }

        initialSlider(options, this);

        // Join User Options with default options
        var options = $.extend({}, defaults, options);

        return this;
    }

    function Slider(options, items) {

    }

});