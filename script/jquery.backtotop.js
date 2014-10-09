(function ($) {

    $.fn.backToTop = function (options) {

        var $this = $(this);
        $this
        .hide()
        .click(function () {
            $("body, html").animate({
                scrollTop: "0px"
            });
        });

        var $window = $(window);
        $window.scroll(function () {
            if ($window.scrollTop() > 0) {
                $this.fadeIn();
            } else {
                $this.fadeOut();
            }
        });

        return this;
    };
	
	/* created by zak */
	 $.fn.ToBottom = function (options) {
        var $this = $(this);
        $this
        .click(function () {
            $("body, html").animate({
                scrollTop: $(document).height()+"px"
            });
        });
        return this;
    };

})(jQuery);