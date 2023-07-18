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

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></button>',
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false
    });

    $('.main-events-list').each(function() {
        var curGallery = $(this);
        curGallery.find('.main-events-preview-item').eq(0).addClass('active');
        var options = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 1000,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            fade: true,
            dots: false
        };
        curGallery.find('.main-events-detail-list').slick(
            options
        ).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            curGallery.find('.main-events-preview-item.active').removeClass('active');
            curGallery.find('.main-events-preview-item').eq(nextSlide).addClass('active');
        }).on('setPosition', function(event, slick) {
            curGallery.find('.main-events-preview-item.active').removeClass('active');
            var currentSlide = curGallery.find('.main-events-detail-list').slick('slickCurrentSlide');
            curGallery.find('.main-events-preview-item').eq(currentSlide).addClass('active');
        });

        curGallery.find('.main-events-preview-item-content').click(function(e) {
            var curIndex = curGallery.find('.main-events-preview-item').index($(this).parent());
            curGallery.find('.main-events-detail-list').slick('slickGoTo', curIndex);
            e.preventDefault();
        });
    });

    $('.main-section .cards').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></button>',
        dots: true
    });

});