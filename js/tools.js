$(document).ready(function() {

    $('.header-menu ul li.with-more a').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.with-more').length == 0) {
            $('.with-more.open').removeClass('open');
        }
    });

    $('.header-lang-select-current').click(function() {
        $('.header-lang-select').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-lang-select').length == 0) {
            $('.header-lang-select.open').removeClass('open');
        }
    });

    $('.footer-lang-select-current').click(function() {
        $('.footer-lang-select').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.footer-lang-select').length == 0) {
            $('.footer-lang-select.open').removeClass('open');
        }
    });

});