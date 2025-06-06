$(document).ready(function() {

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            var curNameArray = curName.split('.');
            var curExt = curNameArray[curNameArray.length - 1];
            curNameArray.pop();
            var curNameText = curNameArray.join('.');
            if (curNameText.length > 15) {
                curNameText = curNameText.substring(0, 15) + '...' + curNameText.slice(-1);
            }

            curField.find('.form-file-input span').html('<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file"></use></svg>' + curField.find('.form-file-input span').attr('data-placeholder') + '<em>' + curNameText + '.' + curExt + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file-remove"></use></svg></a></em>');
            curField.addClass('full');
        } else {
            curField.find('.form-file-input span').html('<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file"></use></svg>' + curField.find('.form-file-input span').attr('data-placeholder'));
            curField.removeClass('full');
        }
    });

    $('body').on('click', '.form-file-input span em a', function(e) {
        var curField = $(this).parents().filter('.form-file');
        curField.find('input').val('').trigger('change');
        curField.find('.form-file-input span').html('<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file"></use></svg>' + curField.find('.form-file-input span').attr('data-placeholder'));
        curField.removeClass('full');
        if (curField.parents().filter('.account-restaurant-menu-files').length == 1 && $('.account-restaurant-menu-file').length > 1) {
            curField.parents().filter('.account-restaurant-menu-file').remove();
        }
        e.preventDefault();
    });

    $('.form-files').each(function() {
        var curFiles = $(this);
        if (curFiles.find('.form-files-list-item').length > 0) {
            curFiles.addClass('full');
            curFiles.find('.files-required').val('true');
        }
    });

    $('body').on('click', '.form-files-list-item-remove', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        if (window.confirm(curFiles.attr('data-confirmremove'))) {
            $.ajax({
                type: 'GET',
                url: curLink.attr('href'),
                dataType: 'json',
                cache: false
            }).done(function(data) {
                curLink.parent().remove();
                if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
                    curFiles.removeClass('full');
                    curFiles.find('.files-required').val('');
                }
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.form-files-list-item-cancel', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        curLink.parent().remove();
        if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
            curFiles.removeClass('full');
            curFiles.find('.files-required').val('');
        }
        e.preventDefault();
    });

    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
    });

    $(document).bind('dragover', function (e) {
        var dropZones = $('.form-files-dropzone'),
            timeout = window.dropZoneTimeout;
        if (timeout) {
            clearTimeout(timeout);
        } else {
            dropZones.addClass('in');
        }
        var hoveredDropZone = $(e.target).closest(dropZones);
        dropZones.not(hoveredDropZone).removeClass('hover');
        hoveredDropZone.addClass('hover');
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZones.removeClass('in hover');
        }, 100);
    });

    $('body').on('click', '.form-files-dropzone', function(e) {
        var curLink = $(this);
        var curFiles = $(this).parents().filter('.form-files');
        curFiles.find('.form-files-input input').click();
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        $('.window-link.last-active').removeClass('last-active');
        curLink.addClass('last-active');
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.menu-mobile-link').click(function(e) {
        if ($('html').hasClass('menu-mobile-open')) {
            $('html').removeClass('menu-mobile-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('menu-mobile-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
        }
        e.preventDefault();
    });

    $('.header-menu > ul > li').each(function() {
        var curItem = $(this);
        if (curItem.find('ul').length == 1) {
            curItem.addClass('with-submenu');
            curItem.append('<span class="header-menu-mobile-sublink"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#header-menu-mobile-sublink"></use></svg></span>');
        }
    });

    $('body').on('click', '.header-menu-mobile-sublink', function() {
        $(this).parent().toggleClass('open');
    });

    $('.header-lang-select-current').click(function(e) {
        $('.header-lang-select').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-lang-select').length == 0) {
            $('.header-lang-select').removeClass('open');
        }
    });

    $('.header-location-current').click(function(e) {
        $('.header-location').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-location').length == 0) {
            $('.header-location').removeClass('open');
        }
    });

    $('.header-location-window-search input').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $('.header-location-window-search input').on('keyup blur change', function() {
        var curInput = $(this);
        var curValue = curInput.val().toLowerCase();
        $('.header-location-window-item').each(function() {
            var curItem = $(this);

            var curIndex = curItem.find('span').text().toLowerCase().indexOf(curValue);
            if (curIndex == -1) {
                curItem.addClass('hidden');
            } else {
                curItem.removeClass('hidden');
            }
        });
        $('.header-location-window-item.first-child').removeClass('first-child');
        $('.header-location-window-item.last-child').removeClass('last-child');
        $('.header-location-window-item:not(.hidden)').eq(0).addClass('first-child');
        $('.header-location-window-item:not(.hidden)').last().addClass('last-child');
    });

    $('.header-search-link').click(function(e) {
        $('html').toggleClass('header-search-open');
        if ($('html').hasClass('header-search-open')) {
            $('.header-search-input input').trigger('focus');
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('html').removeClass('header-search-open');
        }
    });

    $('.gallery').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider[0], {
            loop: true,
            touchAngle: 30,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                afterInit: function () {
                    var curSlide = curSlider.find('.swiper-slide-active');
                    var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
                    curSlider.find('.swiper-pagination').css({'top': curPhotoHeight});
                    curSlider.find('.swiper-button-prev').css({'top': curPhotoHeight / 2});
                    curSlider.find('.swiper-button-next').css({'top': curPhotoHeight / 2});
                },
                slideChangeTransitionEnd: function () {
                    var curSlide = curSlider.find('.swiper-slide-active');
                    var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
                    curSlider.find('.swiper-pagination').css({'top': curPhotoHeight});
                    curSlider.find('.swiper-button-prev').css({'top': curPhotoHeight / 2});
                    curSlider.find('.swiper-button-next').css({'top': curPhotoHeight / 2});
                }
            }
        });
    });

    $('body').on('click', '.card-favourite', function(e) {
        $(this).parents().filter('.card').toggleClass('in-favourite');
        e.preventDefault();
    });

    $('body').on('click', '.main-events-item-favourite', function(e) {
        $(this).parents().filter('.main-events-item').toggleClass('in-favourite');
        e.preventDefault();
    });

    $('body').on('click', '.detail-favourite', function(e) {
        $('.detail-favourite').toggleClass('in-favourite');
        e.preventDefault();
    });

    $('body').on('click', '.slider-item-favourite', function(e) {
        $(this).parents().filter('.slider-item').toggleClass('in-favourite');
        e.preventDefault();
    });

    $('.slider').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider[0], {
            loop: true,
            speed: 1000,
            touchAngle: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    });

    initMainPage();

    function initMainPage() {
        $('.main-events-list').each(function() {
            var curGallery = $(this);
            var options = {
                loop: true,
                speed: 1000,
                touchAngle: 30,
                autoHeight: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    type: 'fraction',
                    el: '.swiper-pagination'
                }
            }
            if ($(window).width() > 1199) {
                options['effect'] = 'fade';
            }
            const swiper = new Swiper(curGallery[0], options);
        });

        var mainCards = $('.main-section:not(.main-section-more) .cards');
        if ($(window).width() < 1200) {
            mainCards = $('.main-section .cards');
        }
        mainCards.each(function() {
            var curSlider = $(this);
            curSlider.wrapInner('<div class="swiper-wrapper"></div>');
            curSlider.find('.card').addClass('swiper-slide');
            curSlider.append('<div class="swiper-button-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></div><div class="swiper-button-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></div>');
            const swiper = new Swiper(curSlider[0], {
                speed: 1000,
                touchAngle: 30,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 3
                    }
                }
            });
        });

        $('.main-section-more').each(function() {
            var curSection = $(this);
            if (curSection.find('.card').length > 6) {
                curSection.find('.main-section-more-link').addClass('visible');
            }
        });

        $('.main-top-slider').each(function() {
            var curSlider = $(this);
            const swiper = new Swiper(curSlider[0], {
                speed: 1000,
                touchAngle: 30,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 2
                    }
                }
            });
        });
    }

    $('body').on('click', '.main-section-more-link a', function(e) {
        var curSection = $(this).parents().filter('.main-section');
        curSection.toggleClass('open');
        e.preventDefault();
    });

    $('.detail-media').each(function() {
        var curGallery = $(this);
        const swiper = new Swiper(curGallery.find('.detail-media-slider')[0], {
            loop: false,
            speed: 1000,
            touchAngle: 30,
            navigation: {
                nextEl: curGallery.find('.detail-media-slider .swiper-button-next')[0],
                prevEl: curGallery.find('.detail-media-slider .swiper-button-prev')[0],
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                slideChangeTransitionStart: function () {
                    var curSlide = curGallery.find('.swiper-pagination-bullet').index(curGallery.find('.swiper-pagination-bullet-active'));
                    curGallery.find('.detail-media-slider-preview-item.active').removeClass('active');
                    curGallery.find('.detail-media-slider-preview-item').eq(curSlide).addClass('active');
                }
            }
        });

        curGallery.find('.detail-media-slider-preview').each(function() {
            var curPreview = $(this);
            curPreview.find('.detail-media-slider-preview-item').eq(0).addClass('active');
            const swiperPreview = new Swiper(curPreview.find('.detail-media-slider-preview-list')[0], {
                loop: false,
                speed: 1000,
                touchAngle: 30,
                slidesPerView: 4,
                navigation: {
                    nextEl: curPreview.find('.swiper-button-next')[0],
                    prevEl: curPreview.find('.swiper-button-prev')[0],
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 5
                    }
                }
            });
        });

        curGallery.find('.detail-media-slider-preview a').click(function(e) {
            var curIndex = curGallery.find('.detail-media-slider-preview a').index($(this));
            swiper.slideTo(curIndex);
            e.preventDefault();
        });
    });

    $('.detail-info').each(function() {
        var curBlock = $(this);
        var newMenu = '<ul>';
        curBlock.find('.detail-info-tab').each(function() {
            newMenu += '<li><a href="#">' + $(this).attr('data-title') + '</a></li>';
        });
        newMenu += '</ul>';
        curBlock.find('.detail-info-menu').html(newMenu);
        curBlock.find('.detail-info-menu li').eq(0).addClass('active');
        curBlock.find('.detail-info-tab').eq(0).addClass('active');
        if (curBlock.find('.detail-info-tab').length < 2) {
            curBlock.find('.detail-info-menu').remove();
        }
    });

    $('.detail-info-menu li a').click(function(e) {
        var curLi = $(this).parent();
        var curBlock = curLi.parents().filter('.detail-info');
        var curIndex = curBlock.find('.detail-info-menu li').index(curLi);
        curBlock.find('.detail-info-menu li.active').removeClass('active');
        $('html, body').animate({'scrollTop': curBlock.find('.detail-info-tab').eq(curIndex).offset().top - $('header').height() - 20});
        e.preventDefault();
    });

    $('.detail-ctrl-address, .detail-media-header-place').click(function(e) {
        var curBlock = $('#contacts');
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - 64});
        }
        e.preventDefault();
    });

    $('.detail-share-link').click(function(e) {
        $('.detail-share').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.detail-share').length == 0) {
            $('.detail-share').removeClass('open');
        }
    });

    $('.detail-info-social-share-link').click(function(e) {
        $('.detail-info-social-share').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.detail-info-social-share').length == 0) {
            $('.detail-info-social-share').removeClass('open');
        }
    });

    function popupCenter(url, title) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (480 / 2)) + dualScreenLeft;
        var top = ((height / 3) - (360 / 3)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + 480 + ', height=' + 360 + ', top=' + top + ', left=' + left);
        if (window.focus) {
            newWindow.focus();
        }
    }

    $('body').on('click', '.share-link-whatsapp', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://api.whatsapp.com/send?text=' + curTitle + ': ' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.share-link-telegram', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://telegram.me/share/url?url=' + curUrl + '&text=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.share-link-facebook', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.share-link-twitter', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('http://twitter.com/share?text=' + curTitle + '&url=' + curUrl + '&counturl=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('.filters-calendar').mCustomScrollbar({
        axis: 'x',
        scrollButtons: {
            enable: true,
            scrollAmount: 50
        },
        callbacks:{
            onInit: function() {
                $('.filters-calendar').addClass('position-left');
                $('.filters-calendar-wrapper').addClass('with-scrollbar')
            },
            onScroll:function() {
                if (this.mcs.leftPct == 0) {
                    $('.filters-calendar').addClass('position-left');
                } else {
                    $('.filters-calendar').removeClass('position-left');
                }
                if (this.mcs.leftPct == 100) {
                    $('.filters-calendar').addClass('position-right');
                } else {
                    $('.filters-calendar').removeClass('position-right');
                }
            }
        }
    });

    $('div.filters-calendar-month-day').click(function() {
        var curDay = $(this);
        if (curDay.hasClass('active')) {
            curDay.removeClass('active');
        } else {
            curDay.addClass('active')
        }
        if ($('.filters-calendar-month-day.active').length == 2) {
            $('.filters-calendar-input').val($('.filters-calendar-month-day.active').eq(0).attr('data-date') + ',' + $('.filters-calendar-month-day.active').eq(1).attr('data-date'));
            $('.filters-params-dates span').html($('.filters-calendar-month-day.active').eq(0).attr('data-date') + '-' + $('.filters-calendar-month-day.active').eq(1).attr('data-date'));
            $('.filters form').trigger('submit');
        }
        if ($('.filters-calendar-month-day.active').length == 1) {
            $('.filters-calendar-input').val($('.filters-calendar-month-day.active').eq(0).attr('data-date'));
            $('.filters-params-dates span').html($('.filters-calendar-month-day.active').eq(0).attr('data-date'));
            $('.filters form').trigger('submit');
        }
        if ($('.filters-calendar-month-day.active').length == 0) {
            $('.filters-calendar-input').val('');
            $('.filters form').trigger('submit');
        }
        if ($('.filters-calendar-month-day.active').length == 3) {
            $('.filters-calendar-month-day.active').removeClass('active');
            $('.filters-calendar-month-day.in-range').removeClass('in-range');
            curDay.addClass('active');
        }
    });

    if ($('.filters-calendar-month-day.active').length > 0) {
        if ($('.filters-calendar-month-day.active').length == 2) {
            var activeIndex = $('.filters-calendar-month-day').index($('.filters-calendar-month-day.active').eq(0));
            var curIndex = $('.filters-calendar-month-day').index($('.filters-calendar-month-day.active').eq(1));
            var fromIndex = activeIndex + 1;
            var toIndex = curIndex;
            for (var i = fromIndex; i < toIndex; i++) {
                $('.filters-calendar-month-day').eq(i).addClass('in-range');
            }
        }
        if ($('.filters-calendar-month-day.active').length == 2) {
            $('.filters-calendar-input').val($('.filters-calendar-month-day.active').eq(0).attr('data-date') + ',' + $('.filters-calendar-month-day.active').eq(1).attr('data-date'));
            $('.filters-params-dates span').html($('.filters-calendar-month-day.active').eq(0).attr('data-date') + '-' + $('.filters-calendar-month-day.active').eq(1).attr('data-date'));
        }
        if ($('.filters-calendar-month-day.active').length == 1) {
            $('.filters-calendar-input').val($('.filters-calendar-month-day.active').eq(0).attr('data-date'));
            $('.filters-params-dates span').html($('.filters-calendar-month-day.active').eq(0).attr('data-date'));
        }
    }

    $('.filters-calendar-month-day').mouseenter(function() {
        if ($('.filters-calendar-month-day.active').length == 1) {
            $('.filters-calendar-month-day.in-range').removeClass('in-range');
            var activeIndex = $('.filters-calendar-month-day').index($('.filters-calendar-month-day.active'));
            var curIndex = $('.filters-calendar-month-day').index($(this));
            var fromIndex = activeIndex + 1;
            var toIndex = curIndex;
            if (curIndex < activeIndex) {
                fromIndex = curIndex + 1;
                toIndex = activeIndex;
            }
            for (var i = fromIndex; i < toIndex; i++) {
                $('.filters-calendar-month-day').eq(i).addClass('in-range');
            }
        }
    });

    $('.filter-letters input').change(function() {
        $('.filters-params-letters span').html($('.filter-letters input:checked').length);
        $('.filters form').trigger('submit');
    });

    $('.filters-search-link').click(function(e) {
        $('.filters-search').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.filters-search').length == 0) {
            $('.filters-search').removeClass('open');
        }
    });

    $('.filters-search-reset a').click(function(e) {
        $('.filters-search-input input').val('');
        $('.filters-search-submit button').click();
        e.preventDefault();
    });

    $('.filters-search-link-reset').click(function(e) {
        $('.filters-search-input input').val('');
        $('.filters-search-submit button').click();
        return false;
    });

    $('.filters-select').each(function() {
        var curSelect = $(this);
        curSelect.prepend('<div class="filters-select-mobile-header"><div class="filters-select-mobile-title">' + curSelect.find('.filters-select-title').text() + '</div><div class="filters-select-mobile-values"></div></div>');
        curSelect.find('.filters-select-content').wrapInner('<div class="filters-select-container"></div>');
        curSelect.find('.filters-select-container').prepend('<div class="filters-select-mobile-subtitle">' + curSelect.find('.filters-select-title').text() + '<a href="#" class="filters-select-mobile-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filters-select-mobile-close"></use></svg></a></div>');
    });

    $('.filters-select-mobile-title').click(function(e) {
        var curSelect = $(this).parent().parent();
        curSelect.addClass('open');
        e.preventDefault();
    });

    $('.filters-select-mobile-close').click(function(e) {
        var curSelect = $(this).parents().filter('.filters-select');
        curSelect.removeClass('open');
        e.preventDefault();
    });

    $('.filters-select-title').click(function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.filters-select.open').removeClass('open');
            curSelect.addClass('open');
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(window).width() > 1199 && $(e.target).parents().filter('.filters-select').length == 0) {
            $('.filters-select').removeClass('open');
        }
        if ($(e.target).hasClass('filters-select-content') && $(window).width() < 1200) {
            $('.filters-select').removeClass('open');
        }
    });

    $('.filters-select-content-search input').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $('.filters-select-content-search input').on('keyup blur change', function() {
        var curInput = $(this);
        var curValue = curInput.val().toLowerCase();
        var curSelect = curInput.parents().filter('.filters-select');
        curSelect.find('.filters-select-checkbox').each(function() {
            var curItem = $(this);

            var curIndex = curItem.find('span').text().toLowerCase().indexOf(curValue);
            if (curIndex == -1) {
                curItem.addClass('hidden');
            } else {
                curItem.removeClass('hidden');
            }
        });
        curSelect.find('.filters-select-checkbox.first-child').removeClass('first-child');
        curSelect.find('.filters-select-checkbox:not(.hidden)').eq(0).addClass('first-child');
        curSelect.find('.filters-select-group').each(function() {
            var curGroup = $(this);
            if (curGroup.find('.filters-select-checkbox:not(.hidden)').length == 0) {
                curGroup.addClass('hidden');
            } else {
                curGroup.removeClass('hidden');
            }
        });
        curSelect.find('.filters-select-group.first-child').removeClass('first-child');
        curSelect.find('.filters-select-group:not(.hidden)').eq(0).addClass('first-child');
    });

    $('.filters-select-content-search input').each(function() {
        var curInput = $(this);
        var curValue = curInput.val().toLowerCase();
        var curSelect = curInput.parents().filter('.filters-select');
        curSelect.find('.filters-select-checkbox').each(function() {
            var curItem = $(this);

            var curIndex = curItem.find('span').text().toLowerCase().indexOf(curValue);
            if (curIndex == -1) {
                curItem.addClass('hidden');
            } else {
                curItem.removeClass('hidden');
            }
        });
        curSelect.find('.filters-select-checkbox.first-child').removeClass('first-child');
        curSelect.find('.filters-select-checkbox:not(.hidden)').eq(0).addClass('first-child');
    });

    $('.filters-select-content-results-reset a').click(function(e) {
        var curSelect = $(this).parents().filter('.filters-select');
        curSelect.find('.filters-select-checkbox input').prop('checked', false);
        curSelect.find('.filters-select-range').each(function() {
            var curSlider = $(this);
            var curRange = curSlider.find('.filters-select-range-slider-inner')[0];
            curRange.noUiSlider.set([Number(curSlider.find('.filters-select-range-min').html()), Number(curSlider.find('.filters-select-range-max').html())]);
        });
        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('body').on('click', '.filters-select-mobile-value a', function(e) {
        var curSelect = $(this).parents().filter('.filters-select');
        var curText = $(this).parent().text();
        curSelect.find('.filters-select-checkbox').each(function() {
            var curOption = $(this);
            if (curOption.find('span').text() == curText) {
                curOption.find('input').prop('checked', false);
            }
        });
        curSelect.find('.filters-select-range').each(function() {
            var curSlider = $(this);
            var curRange = curSlider.find('.filters-select-range-slider-inner')[0];
            curRange.noUiSlider.set([Number(curSlider.find('.filters-select-range-min').html()), Number(curSlider.find('.filters-select-range-max').html())]);
        });
        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-select-content-results-submit a').click(function(e) {
        var curSelect = $(this).parents().filter('.filters-select');
        curSelect.removeClass('open');
        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-select-title-reset').click(function(e) {
        var curSelect = $(this).parents().filter('.filters-select');
        curSelect.find('.filters-select-checkbox input').prop('checked', false);
        curSelect.find('.filters-select-range').each(function() {
            var curSlider = $(this);
            var curRange = curSlider.find('.filters-select-range-slider-inner')[0];
            curRange.noUiSlider.set([Number(curSlider.find('.filters-select-range-min').html()), Number(curSlider.find('.filters-select-range-max').html())]);
        });
        $('.filters form').trigger('submit');
        return false;
    });

    $('.filters-date-title').click(function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.filters-date.open').removeClass('open');
            curSelect.addClass('open');
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(window).width() > 1199 && $(e.target).parents().filter('.filters-date').length == 0 && !$(e.target).hasClass('air-datepicker-cell') && !$(e.target).hasClass('air-datepicker-nav--title') && $(e.target).parents().filter('.air-datepicker-nav--title').length == 0) {
            $('.filters-date').removeClass('open');
        }
    });

    $('.filters-date-calendar').each(function() {
        var curCalendar = $(this);
        var dp = new AirDatepicker('#' + $(this).attr('id'), {
            range: true,
            inline: true,
            classes: 'form-input-datepicker',
            prevHtml: '<svg viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
            nextHtml: '<svg viewBox="0 0 24 24"><path d="M9 18L15 12L9 6" troke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
            onSelect(date, formattedDate) {
                curCalendar.parent().find('> input[type="hidden"]').val(date.formattedDate.join(','));
                var curItem = curCalendar.parents().filter('.filters-params-item');
                $('.filters form').trigger('submit');
            }

        });
        curCalendar.data('dp', dp);
    });

    $('.filters-date-mobile-title').click(function(e) {
        var curSelect = $(this).parent().parent();
        curSelect.addClass('open');
        e.preventDefault();
    });

    $('.filters-date-mobile-close').click(function(e) {
        var curSelect = $(this).parents().filter('.filters-date');
        curSelect.removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('filters-date-content') && $(window).width() < 1200) {
            $('.filters-date').removeClass('open');
        }
    });

    $('.filters-date-title-reset').click(function(e) {
        var curDate = $(this).parents().filter('.filters-date');
        var dp = curDate.find('.filters-date-calendar').data('dp');
        dp.clear();
        $('.filters form').trigger('submit');
        return false;
    });

    $('body').on('click', '.filters-date-mobile-value a', function(e) {
        var curDate = $(this).parents().filter('.filters-date');
        var dp = curDate.find('.filters-date-calendar').data('dp');
        dp.clear();
        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-date-content-results-reset a').click(function(e) {
        var curDate = $(this).parents().filter('.filters-date');
        var dp = curDate.find('.filters-date-calendar').data('dp');
        dp.clear();
        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-date-content-results-submit a').click(function(e) {
        $('.filters-date').removeClass('open');
        e.preventDefault();
    });

    $('.filters-checkbox-mobile-title').click(function(e) {
        var curSelect = $(this).parent().parent();
        curSelect.addClass('open');
        e.preventDefault();
    });

    $('.filters-checkbox-mobile-close').click(function(e) {
        var curSelect = $(this).parents().filter('.filters-checkbox');
        curSelect.removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('filters-checkbox-content') && $(window).width() < 1200) {
            $('.filters-checkbox').removeClass('open');
        }
    });

    $('.filters-checkbox input').change(function() {
        $('.filters form').trigger('submit');
    });

    $('body').on('click', '.filters-checkbox-mobile-value a', function(e) {
        var curCheckbox = $(this).parents().filter('.filters-checkbox');
        curCheckbox.find('input').prop('checked', false);
        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-checkbox-content-results-reset a').click(function(e) {
        var curCheckbox = $(this).parents().filter('.filters-checkbox')
        curCheckbox.find('input').prop('checked', false);
        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-checkbox-content-results-submit a').click(function(e) {
        $('.filters-checkbox').removeClass('open');
        e.preventDefault();
    });

    $('.filters-select-checkbox input').change(function() {
        $('.filters form').trigger('submit');
    });

    $('.filters-params-ctrl-mobile-reset').click(function(e) {
        $('.filters-params-clearall a').trigger('click');
        e.preventDefault();
    });

    $('.filters-params-clearall a').click(function(e) {
        $('.filters-search-input input').val('');

        $('.filters-checkbox input').prop('checked', false);

        $('.filters-select-checkbox input').prop('checked', false);
        $('.filters-select-range-field-input input').each(function() {
            $(this).val($(this).attr('data-default'));
        });

        $('.filters-select-range').each(function() {
            var curSlider = $(this);
            var curRange = curSlider.find('.filters-select-range-slider-inner')[0];
            curRange.noUiSlider.set([Number(curSlider.find('.filters-select-range-min').html()), Number(curSlider.find('.filters-select-range-max').html())]);
        });

        $('.filters-date').each(function() {
            var curDate = $(this);
            var dp = curDate.find('.filters-date-calendar').data('dp');
            dp.clear();
        });

        $('.filters-calendar-month-day.active').removeClass('active');
        $('.filters-calendar-month-day.in-range').removeClass('in-range');
        $('.filters-calendar-input').val('');
        $('.filter-letters input').prop('checked', false);

        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-params-dates').click(function(e) {
        $('.filters-calendar-month-day.active').removeClass('active');
        $('.filters-calendar-month-day.in-range').removeClass('in-range');
        $('.filters-calendar-input').val('');

        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-params-letters').click(function(e) {
        $('.filter-letters input').prop('checked', false);

        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-params-item-selected-clear a').click(function(e) {
        var curSelect = $(this).parents().filter('.filters-select');
        curSelect.find('.filters-select-checkbox input').prop('checked', false);
        curSelect.find('.filters-select-range-field-input input').each(function() {
            $(this).val($(this).attr('data-default'));
        });

        var curDate = $(this).parents().filter('.filters-date');
        var dp = curDate.find('.filters-date-calendar').data('dp');
        dp.clear();

        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-select-range').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.filters-select-range-slider-inner')[0];
        var curStartFrom = Number(curSlider.find('.filters-select-range-min').html());
        if (Number(curSlider.find('.filters-select-range-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.filters-select-range-from').val());
        }
        var curStartTo = Number(curSlider.find('.filters-select-range-min').html());
        if (Number(curSlider.find('.filters-select-range-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.filters-select-range-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.filters-select-range-min').html()),
                'max': Number(curSlider.find('.filters-select-range-max').html())
            },
            step: Number(curSlider.find('.filters-select-range-step').html()),
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.filters-select-range-from').val(values[handle]);
                curSlider.find('.filters-select-range-hints-from span').html(values[handle]);
            } else {
                curSlider.find('.filters-select-range-to').val(values[handle]);
                curSlider.find('.filters-select-range-hints-to span').html(values[handle]);
            }
        });
        curRange.noUiSlider.on('end', function(values, handle) {
            $('.filters form').trigger('submit');
        });
        curSlider.find('.filters-select-range-examples div span').click(function() {
            var curExample = $(this).parent();
            curRange.noUiSlider.set([Number(curExample.attr('data-from')), Number(curExample.attr('data-to'))]);
            $('.filters form').trigger('submit');
        });
    });

    $('.filters-params').each(function() {
        updateFiltersStatus();
    });

    var isPageClick = false;

    $('.filters form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                $('.catalogue').addClass('loading');

                var curData = curForm.serialize();
                if ($('.pager a.active').length == 1) {
                    curData += '&page=' + $('.pager a.active').attr('data-value');
                }
                if ($('.pager-size-select-item input:checked').length == 1) {
                    curData += '&size=' + $('.pager-size-select-item input:checked').val();
                }
                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    dataType: 'html',
                    data: curData,
                    cache: false
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    alert('The service is temporarily unavailable, try again later.');
                    $('.catalogue').removeClass('loading');
                }).done(function(html) {
                    $('.catalogue').html($(html).html());
                    var count = 0;
                    $(html).find('.cards').each(function() {
                        count += Number($(this).attr('data-count'));
                    });
                    $('.filters-params-count span, .filters-select-content-results-count span').html(count);

                    updateFiltersStatus();

                    initMainPage();

                    updateMap();

                    if ($(window).width() > 1199) {
                        if ($('.page-map-list-content').length > 0) {
                            var curSlider = $('.page-map-list-content');
                            if (curSlider.hasClass('swiper-initialized') && mapSwiper) {
                                mapSwiper.destroy();
                                curSlider.removeClass('swiper');
                                curSlider.find('.catalogue').removeClass('swiper-wrapper');
                                curSlider.find('.card').removeClass('swiper-slide');
                            }
                            $('.page-map-list-content').mCustomScrollbar('destroy');
                            $('.page-map-list-content').mCustomScrollbar({
                                axis: 'y'
                            });
                        }
                    } else {
                        if ($('.page-map-list-content').length > 0) {
                            $('.page-map-list-content').mCustomScrollbar('destroy');

                            var curSlider = $('.page-map-list-content');
                            if (curSlider.hasClass('swiper-initialized') && mapSwiper) {
                                mapSwiper.destroy();
                                curSlider.removeClass('swiper');
                                curSlider.find('.catalogue').removeClass('swiper-wrapper');
                                curSlider.find('.card').removeClass('swiper-slide');
                            }
                            if (!curSlider.hasClass('swiper-initialized')) {
                                curSlider.addClass('swiper');
                                curSlider.find('.catalogue').addClass('swiper-wrapper');
                                curSlider.find('.card').addClass('swiper-slide');
                                curSlider.find('.card-content').eq(0).trigger('click');
                                mapSwiper = new Swiper(curSlider[0], {
                                    slidesPerView: 'auto',
                                    centeredSlides: true,
                                    on: {
                                        slideChange: function () {
                                            curSlider.find('.card-content').eq(mapSwiper.activeIndex).trigger('click');
                                        },
                                    },
                                });
                            }
                        }
                    }

                    $('.catalogue').removeClass('loading');
                    if (isPageClick) {
                        isPageClick = false;
                        var curMargin = $('header').height();
                        if ($('.filters-calendar').length == 1) {
                            curMargin += $('.filters-calendar').height();
                        }
                        $('html, body').animate({'scrollTop': $('.catalogue').offset().top - curMargin});
                    }
                });
            }
        });
    });

    $('.filter-params-mobile-link').click(function(e) {
        if ($('html').hasClass('filters-mobile-open')) {
            $('html').removeClass('filters-mobile-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('filters-mobile-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
        }
        e.preventDefault();
    });

    $('.filters-params-ctrl-mobile-apply').click(function(e) {
        $('html').removeClass('filters-mobile-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('html').data('scrollTop'));
        e.preventDefault();
    });

    $('.filters-sort-current').click(function() {
        $('.filters-sort').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.filters-sort').length == 0) {
            $('.filters-sort').removeClass('open');
        }
    });

    $('.filters-sort-list label').click(function() {
        $('.filters-sort').removeClass('open');
    });

    $('.filters-sort-list input').change(function() {
        var curInput = $('.filters-sort-list input:checked');
        $('.filters-sort-current').html(curInput.parent().find('span').html());
        $('.filters form').trigger('submit');
    });

    $('body').on('change', '.catalogue .pager-size-select-item label input', function() {
        $('.filters form').trigger('submit');
    });

    $('body').on('click', '.catalogue .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.catalogue .pager a.active').removeClass('active');
            curLink.addClass('active');
            if (e.originalEvent === undefined) {
                isPageClick = false;
            } else {
                isPageClick = true;
            }
            $('.filters form').trigger('submit');
        }
        e.preventDefault();
    });

    $('body').on('click', '.window-auth-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.window-auth-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.window-auth-menu ul li').index(curLi);
            $('.window-auth-tab.active').removeClass('active');
            $('.window-auth-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('change', '.window-auth-reg-types .form-radio input', function(e) {
        var curItem = $('.window-auth-reg-types .form-radio input:checked');
        var curIndex = $('.window-auth-reg-types .form-radio input').index(curItem);
        $('.window-auth-reg-types-content.active').removeClass('active');
        $('.window-auth-reg-types-content').eq(curIndex).addClass('active');
    });

    $('body').on('click', '.page-map-list .card-content', function(e) {
        var curItem = $(this).parents().filter('.card');
        if (!curItem.hasClass('active')) {

            var curIcon = null;
            var iconImg = '';
            var iconWidth = 0;
            var iconHeight = 0;
            var iconCenterX = 0;
            var iconCenterY = 0;

            var activeItem = $('.card.active');
            if (activeItem.length == 1) {
                activeItem.removeClass('active');
                var activeIndex = $('.card').index(activeItem);

                curIcon = {
                    'iconURL': activeItem.attr('data-icon'),
                    'iconWidth': 46,
                    'iconHeight': 46,
                    'iconCenterX': 23,
                    'iconCenterY': 23,
                    'iconBigURL': activeItem.attr('data-iconbig'),
                    'iconBigWidth': 64,
                    'iconBigHeight': 64,
                    'iconBigCenterX': 32,
                    'iconBigCenterY': 32
                };
                iconImg = curIcon.iconURL;
                iconWidth = curIcon.iconWidth;
                iconHeight = curIcon.iconHeight;
                iconCenterX = curIcon.iconCenterX;
                iconCenterY = curIcon.iconCenterY;

                markers[activeIndex].setIcon(new google.maps.MarkerImage(
                    iconImg,
                    new google.maps.Size(iconWidth, iconHeight),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(iconCenterX, iconCenterY)
                ));
            }

            curItem.addClass('active');
            var curIndex = $('.card').index(curItem);

            curIcon = {
                'iconURL': curItem.attr('data-icon'),
                'iconWidth': 46,
                'iconHeight': 46,
                'iconCenterX': 23,
                'iconCenterY': 23,
                'iconBigURL': curItem.attr('data-iconbig'),
                'iconBigWidth': 64,
                'iconBigHeight': 64,
                'iconBigCenterX': 32,
                'iconBigCenterY': 32
            };
            iconImg = curIcon.iconBigURL;
            iconWidth = curIcon.iconBigWidth;
            iconHeight = curIcon.iconBigHeight;
            iconCenterX = curIcon.iconBigCenterX;
            iconCenterY = curIcon.iconBigCenterY;

            markers[curIndex].setIcon(new google.maps.MarkerImage(
                iconImg,
                new google.maps.Size(iconWidth, iconHeight),
                new google.maps.Point(0, 0),
                new google.maps.Point(iconCenterX, iconCenterY)
            ));

            map.panTo(markers[curIndex].getPosition());
            if ($('.page-map-list-content').hasClass('swiper-initialized') && mapSwiper) {
                mapSwiper.slideTo(curIndex);
            }
        }
        e.preventDefault();
    });

    $('body').on('mouseenter', '.page-map-list .card-content', function(e) {
        var curItem = $(this).parents().filter('.card');
        if (!curItem.hasClass('active')) {

            var curIcon = null;
            var iconImg = '';
            var iconWidth = 0;
            var iconHeight = 0;
            var iconCenterX = 0;
            var iconCenterY = 0;

            var curIndex = $('.card').index(curItem);

            curIcon = {
                'iconURL': curItem.attr('data-icon'),
                'iconWidth': 46,
                'iconHeight': 46,
                'iconCenterX': 23,
                'iconCenterY': 23,
                'iconBigURL': curItem.attr('data-iconbig'),
                'iconBigWidth': 64,
                'iconBigHeight': 64,
                'iconBigCenterX': 32,
                'iconBigCenterY': 32
            };
            iconImg = curIcon.iconBigURL;
            iconWidth = curIcon.iconBigWidth;
            iconHeight = curIcon.iconBigHeight;
            iconCenterX = curIcon.iconBigCenterX;
            iconCenterY = curIcon.iconBigCenterY;

            markers[curIndex].setIcon(new google.maps.MarkerImage(
                iconImg,
                new google.maps.Size(iconWidth, iconHeight),
                new google.maps.Point(0, 0),
                new google.maps.Point(iconCenterX, iconCenterY)
            ));
        }
        e.preventDefault();
    });

    $('body').on('mouseleave', '.page-map-list .card-content', function(e) {
        var curItem = $(this).parents().filter('.card');
        if (!curItem.hasClass('active')) {
            var curIndex = $('.card').index(curItem);

            var curIcon = {
                'iconURL': curItem.attr('data-icon'),
                'iconWidth': 46,
                'iconHeight': 46,
                'iconCenterX': 23,
                'iconCenterY': 23,
                'iconBigURL': curItem.attr('data-iconbig'),
                'iconBigWidth': 64,
                'iconBigHeight': 64,
                'iconBigCenterX': 32,
                'iconBigCenterY': 32
            };
            iconImg = curIcon.iconURL;
            iconWidth = curIcon.iconWidth;
            iconHeight = curIcon.iconHeight;
            iconCenterX = curIcon.iconCenterX;
            iconCenterY = curIcon.iconCenterY;

            markers[curIndex].setIcon(new google.maps.MarkerImage(
                iconImg,
                new google.maps.Size(iconWidth, iconHeight),
                new google.maps.Point(0, 0),
                new google.maps.Point(iconCenterX, iconCenterY)
            ));
        }
        e.preventDefault();
    });

    $('.page-map-list-content').each(function() {
        updateMap();
    });

    $('.menu-burger-link a').click(function(e) {
        if ($('html').hasClass('menu-burger-open')) {
            $('html').removeClass('menu-burger-open');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curScroll = $(window).scrollTop();
            $('html').addClass('menu-burger-open');
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.detail-schedule').each(function() {
        var curBlock = $(this).parent();
        var countReviews = curBlock.find('.detail-schedule-row').length;
        if (countReviews > 5) {
            curBlock.find('.detail-schedule-more').addClass('visible');
        } else {
            curBlock.find('.detail-schedule-more').removeClass('visible');
        }
    });

    $('.detail-schedule-more a').click(function(e) {
        var curBlock = $(this).parent().parent();
        curBlock.find('.detail-schedule').toggleClass('open');
        curBlock.find('.detail-schedule-more').toggleClass('open');
        e.preventDefault();
    });

    $('.detail-description-more a').click(function(e) {
        $(this).parent().parent().toggleClass('open');
        e.preventDefault();
    });

    $('.detail-info-review-text-more a').click(function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

    $('#free-checkbox input').change(function() {
        if ($('#free-checkbox input').prop('checked')) {
            $('#price-select').addClass('disabled');
        } else {
            $('#price-select').removeClass('disabled');
        }
    });

    $('.detail-info-reviews').each(function() {
        var curBlock = $(this).parent();
        var countReviews = curBlock.find('.detail-info-review').length;
        if (countReviews > 3) {
            curBlock.find('.detail-reviews-more').addClass('visible');
            curBlock.find('.detail-reviews-more span').html(countReviews - 3);
        } else {
            curBlock.find('.detail-reviews-more').removeClass('visible');
        }
    });

    $('.detail-reviews-more a').click(function(e) {
        var curBlock = $(this).parent().parent();
        curBlock.find('.detail-info-reviews').toggleClass('open');
        curBlock.find('.detail-reviews-more').toggleClass('open');
        e.preventDefault();
    });

    $('.detail-info-review-new input[type="radio"]').change(function() {
        $(this).parents().filter('form').find('label.error').remove();
    });

    $('.detail-info-review-new').each(function() {
        $('.detail-info-review-new form').each(function() {
            var curForm = $(this);
            var validator = curForm.validate();
            if (validator) {
                validator.destroy();
            }
            curForm.validate({
                ignore: '',
                submitHandler: function(form) {
                    var curForm = $(form);
                    curForm.find('label.error').remove();
                    if ($('.detail-info-review-new-rating input[type="radio"]:checked').length == 0) {
                        $('.detail-info-review-new-rating').after('<label class="error">' + $('.detail-info-review-new-rating').attr('data-error') + '</label>')
                    } else {
                        curForm.addClass('loading');
                        var formData = new FormData(form);

                        $.ajax({
                            type: 'POST',
                            url: curForm.attr('action'),
                            processData: false,
                            contentType: false,
                            dataType: 'html',
                            data: formData,
                            cache: false
                        }).done(function(html) {
                            curForm.find('.message').remove();
                            curForm.removeClass('loading');
                            $('.detail-info-review-new').replaceWith(html);
                        });
                    }
                }
            });
        });
    });

    $('.detail-info-equipments-group-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.cookies-message-btn').click(function(e) {
        $('.cookies-message').fadeOut(500);
        e.preventDefault();
    });

    $('body').on('click', '.form-input-password-view', function(e) {
        var curField = $(this).parents().filter('.form-input');
        if (curField.find('input').attr('type') == 'password') {
            curField.find('input').attr('type', 'text');
            curField.addClass('password-view');
        } else {
            curField.find('input').attr('type', 'password');
            curField.removeClass('password-view');
        }
        e.preventDefault();
    });

    $('body').on('click', '.reg-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.reg-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.reg-menu ul li').index(curLi);
            $('.reg-tab.active').removeClass('active');
            $('.reg-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

});

$(window).on('load', function() {

    if ($('.youtube-video').length > 0) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

});

function onYouTubeIframeAPIReady() {
    var counterVideo = 0;
    $('.youtube-video').each(function() {
        var curBlock = $(this);
        var newID = 'youtube-video-' + counterVideo++;
        curBlock.attr('id', newID);
        var player = new YT.Player(newID, {
            height: '315',
            width: '560',
            playerVars: {
                'controls': 0,
                'rel': 0
            },
            videoId: curBlock.attr('data-id')
        });
    });
}

function updateFiltersStatus() {

    $('.filters-params').each(function() {
        var curStatus = false;
        var countFilters = 0;

        if ($('.filters-search-input input').length == 1 && $('.filters-search-input input').val() != '') {
            curStatus = true;
            countFilters++;
            $('.filters-search').addClass('active');
            $('.filters-search .filters-search-link span').html($('.filters-search-input input').val());
        } else {
            $('.filters-search').removeClass('active');
            $('.filters-search .filters-search-link span').html($('.filters-search .filters-search-link span').attr('data-default'));
        }

        $('.filters-select').each(function() {
            var curSelect = $(this);
            var isSelected = false;
            curSelect.find('.filters-select-mobile-values').html('');
            if (curSelect.find('.filters-select-checkbox input:checked').length > 0) {
                isSelected = true;
                var countSelected = curSelect.find('.filters-select-checkbox input:checked').length;
                curSelect.find('.filters-select-checkbox input:checked').each(function() {
                    var curOption = $(this);
                    curSelect.find('.filters-select-mobile-values').append('<div class="filters-select-mobile-value">' + curOption.parent().find('span').text() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filters-select-mobile-value-remove"></use></svg></a></div>');
                    newHTML += curOption.parent().find('span').text();
                });
                var newHTML = curSelect.find('.filters-select-checkbox input:checked').eq(0).parent().find('span').text();
                if (countSelected > 1) {
                    newHTML += ' (' + countSelected + ')';
                }
                curSelect.find('.filters-select-title span').html(newHTML);
            }
            if (curSelect.find('.filters-select-range').length > 0) {
                if ((Number(curSelect.find('.filters-select-range-min').html()) < Number(curSelect.find('.filters-select-range-from').val())) || (Number(curSelect.find('.filters-select-range-max').html()) > Number(curSelect.find('.filters-select-range-to').val()))) {
                    isSelected = true;
                    curSelect.find('.filters-select-title span').html('&nbsp;(' + curSelect.find('.filters-select-range-from').val() + '-' + curSelect.find('.filters-select-range-to').val() + curSelect.find('.filters-select-range').attr('data-currency') + ')');
                    curSelect.find('.filters-select-mobile-values').append('<div class="filters-select-mobile-value">' + curSelect.find('.filters-select-range-from').val() + '-' + curSelect.find('.filters-select-range-to').val() + curSelect.find('.filters-select-range').attr('data-currency') + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filters-select-mobile-value-remove"></use></svg></a></div>');
                }
            }
            if (isSelected) {
                curStatus = true;
                countFilters++;
                curSelect.addClass('active');
            } else {
                curSelect.removeClass('active');
            }
        });

        $('.filters-date-mobile-values').html('');
        $('.filters-date').each(function() {
            var curDate = $(this);
            var curInput = curDate.find('.filters-date-content input[type="hidden"]');
            if (curInput.val() != '') {
                curStatus = true;
                countFilters++;
                curDate.addClass('active');
                var curValue = curInput.val().split(',');
                curDate.find('.filters-date-title span').html(curValue.join('-'));
                curDate.find('.filters-date-mobile-values').append('<div class="filters-date-mobile-value">' + curValue.join('-') + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filters-select-mobile-value-remove"></use></svg></a></div>');
            } else {
                curDate.removeClass('active');
                curDate.find('.filters-date-title span').html(curDate.find('.filters-date-title span').attr('data-default'));
            }
        });

        $('.filters-checkbox-mobile-values').html('');
        $('.filters-checkbox').each(function() {
            var curCheckbox = $(this);
            if (curCheckbox.find('input').prop('checked')) {
                curStatus = true;
                countFilters++;
                curCheckbox.addClass('active');
                curCheckbox.find('.filters-checkbox-mobile-values').append('<div class="filters-checkbox-mobile-value">' + curCheckbox.find('span em').eq(1).text() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filters-select-mobile-value-remove"></use></svg></a></div>');
            } else {
                curCheckbox.removeClass('active');
            }
        });

        if ($('.filters-calendar-input').length == 1 && $('.filters-calendar-input').val() != '') {
            curStatus = true;
            countFilters++;
            $('.filters-params-dates').addClass('visible');
        } else {
            $('.filters-params-dates').removeClass('visible');
        }

        if ($('.filter-letters input:checked').length > 0) {
            curStatus = true;
            countFilters++;
            $('.filters-params-letters').addClass('visible');
        } else {
            $('.filters-params-letters').removeClass('visible');
        }

        $('.filter-params-mobile-link a span').html(countFilters);

        if (curStatus) {
            $('.filters-params').addClass('active');
        } else {
            $('.filters-params').removeClass('active');
        }
    });
}

function initForm(curForm) {
	curForm.find('.form-input input, .form-input textarea').each(function() {
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		} else {
			$(this).parent().removeClass('full');
		}
	});

    curForm.find('.form-input input:focus, .form-input textarea:focus').each(function() {
        $(this).trigger('focus');
    });

    curForm.find('.form-input input').blur(function(e) {
        $(this).val($(this).val()).change();
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    var indexFormEditor = Date.now();
    curForm.find('.textarea-editor').each(function() {
        var curEditor = $(this);
        var curID = 'form-textarea-editor-' + indexFormEditor;
        curEditor.attr('id', curID);
        indexFormEditor++;
        tinymce.init({
            selector: '#' + curID,
            menubar: false,
            style_formats: [
                {
                    title: 'Headings',
                    items: [
                        {title: 'Heading 2', format: 'h2'},
                        {title: 'Heading 3', format: 'h3'}
                    ]
                },
                {
                    title: 'Inline',
                    items: [
                        {title: 'Bold', format: 'bold'},
                        {title: 'Italic', format: 'italic'},
                        {title: 'Underline', format: 'underline'}
                    ]
                },
                {
                    title: 'Blocks',
                    items: [
                        {title: 'Paragraph', format: 'p'},
                        {title: 'Blockquote', format: 'blockquote'}
                    ]
                }
            ]
        });
    });

    var indexFormInput = Date.now();
    curForm.find('.form-input-date input').each(function() {
        var curInput = $(this);
        curInput.attr('autocomplete', 'off');
        curInput.prop('readonly', true);
        var curID = 'form-input-date-id-' + indexFormInput;
        curInput.attr('id', curID);
        indexFormInput++;
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('/');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[0]) - 1 , Number(startDateArray[1]));
            }
        }
        curInput.parents().filter('.form-input').addClass('full');
        var containerAir = '.air-datepicker-global-container';
        if (curInput.parents().filter('.window-container').length == 1) {
            containerAir = '.window-container';
        }
        new AirDatepicker('#' + curID, {
            container: containerAir,
            classes: 'form-input-datepicker',
            startDate: startDate,
            selectedDates: [startDate],
            prevHtml: '<svg viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
            nextHtml: '<svg viewBox="0 0 24 24"><path d="M9 18L15 12L9 6" troke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
        });
    });

    curForm.find('.form-input-time input').each(function() {
        var curInput = $(this);
        curInput.attr('autocomplete', 'off');
        curInput.mask('HG:MN', {
            translation: {
                'H': {
                    pattern: /[0-2]/
                },
                'G': {
                    pattern: /[0-9]/
                },
                'M': {
                    pattern: /[0-5]/
                },
                'N': {
                    pattern: /[0-9]/
                }
            }
        });
        var placement = 'top';
        if (curInput.parent().offset().top < 320) {
            placement = 'bottom';
        }
        curInput.parent().clockpicker({
            placement: placement,
            donetext: 'Done',
            afterDone: function() {
                curInput.trigger('blur');
            }
        });
    });

    curForm.find('.phoneMask').each(function() {
        var curInput = $(this);
        curInput.attr('autocomplete', 'off');
        curInput.mask('+386DFFFFFFF', {
            translation: {
                'D': {
                    pattern: /[1-9]/
                },
                'F': {
                    pattern: /[0-9]/
                },
            }
        });
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        if (curSelect.parents().filter('.window').length == 1) {
            options['dropdownParent'] = $('.window-container');
        }

        curSelect.select2(options);

        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
            curSelect.parent().find('select').addClass('valid');
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('.select2-container').removeClass('select2-container--full select2-container--full-multiple');
                curSelect.parent().find('select').removeClass('valid');
            }
        });

        if (curSelect.val() != '' && curSelect.val() !== null) {
            curSelect.trigger({type: 'select2:select'})
            curSelect.parent().find('.select2-container').addClass('select2-container--full');
            curSelect.parent().find('select').addClass('valid');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
        }
    });

    curForm.find('.captcha-container').each(function() {
        if ($('script#smartCaptchaScript').length == 0) {
            $('body').append('<script src="https://captcha-api.yandex.ru/captcha.js?render=onload&onload=smartCaptchaLoad" defer id="smartCaptchaScript"></script>');
        } else {
            if (window.smartCaptcha) {
                var curID = window.smartCaptcha.render(this, {
                    sitekey: smartCaptchaKey,
                    callback: smartCaptchaCallback,
                    invisible: true,
                    hideShield: true,
                    hl: 'en'
                });
                $(this).attr('data-smartid', curID);
            }
        }
    });

    curForm.find('.form-files').each(function() {
        var curFiles = $(this);
        var curInput = curFiles.find('.form-files-input input');

        var uploadURL = curInput.attr('data-uploadurl');
        var uploadFiles = curInput.attr('data-uploadfiles');
        var removeURL = curInput.attr('data-removeurl');
        curInput.fileupload({
            url: uploadURL,
            dataType: 'json',
            dropZone: curFiles.find('.form-files-dropzone'),
            pasteZone: curFiles.find('.form-files-dropzone'),
            add: function(e, data) {
                if (typeof curInput.attr('multiple') !== 'undefined') {
                    curFiles.find('.form-files-list').append('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></span></div>');
                } else {
                    curFiles.find('.form-files-list').html('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></span></div>');
                }
                data.submit();
                curFiles.addClass('full');
            },
            done: function (e, data) {
                curFiles.find('.form-files-list-item-progress').eq(0).remove();
                if (data.result.status == 'success') {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        if (!curFiles.hasClass('form-files-images')) {
                            curFiles.find('.form-files-list').append('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-doc"></use></svg></div><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' МB</div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>');
                        } else {
                            curFiles.find('.form-files-list').append('<div class="form-files-list-item form-files-list-item-img" style="background-image:url(\'' + data.result.url + '\')"><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-item-delete"></use></svg></a></div>');
                        }
                    } else {
                        if (!curFiles.hasClass('form-files-images')) {
                            curFiles.find('.form-files-list').html('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-doc"></use></svg></div><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' МB</div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>');
                        } else {
                            curFiles.find('.form-files-list').html('<div class="form-files-list-item form-files-list-item-img" style="background-image:url(\'' + data.result.url + '\')"><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-item-delete"></use></svg></a></div>');
                        }
                    }
                    curFiles.find('.files-required').val('true');
                    curFiles.find('label.error').remove();
                } else {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        curFiles.find('.form-files-list').append('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-doc"></use></svg></div><div class="form-files-list-item-name">' + data.result.text + '</div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>');
                    } else {
                        curFiles.find('.form-files-list').html('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-doc"></use></svg></div><div class="form-files-list-item-name">' + data.result.text + '</div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>');
                    }
                }
                curFiles.addClass('full');
            }
        });
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);

            var smartCaptchaWaiting = false;
            curForm.find('.captcha-container').each(function() {
                if (curForm.attr('form-smartcaptchawaiting') != 'true') {
                    var curBlock = $(this);
                    var curInput = curBlock.find('input[name="smart-token"]');
                    curInput.removeAttr('value');
                    smartCaptchaWaiting = true;
                    $('form[form-smartcaptchawaiting]').removeAttr('form-smartcaptchawaiting');
                    curForm.attr('form-smartcaptchawaiting', 'false');

                    if (!window.smartCaptcha) {
                        alert('The service is temporarily unavailable, try again later.');
                        return;
                    }
                    var curID = $(this).attr('data-smartid');
                    window.smartCaptcha.execute(curID);
                } else {
                    curForm.removeAttr('form-smartcaptchawaiting');
                }
            });

            if (!smartCaptchaWaiting) {
                var formData = new FormData(form);

                if (curForm.find('[type=file]').length != 0) {
                    var file = curForm.find('[type=file]')[0].files[0];
                    formData.append('file', file);
                }

                if (curForm.hasClass('ajax-form')) {
                    curForm.addClass('loading');

                    $.ajax({
                        type: 'POST',
                        url: curForm.attr('action'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: formData,
                        cache: false
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        curForm.find('.message').remove();
                        curForm.append('<div class="message message-error"><div class="message-title">Wrong!</div><div class="message-text">The service is temporarily unavailable, try again later.</div></div>')
                        curForm.removeClass('loading');
                    }).done(function(data) {
                        curForm.find('.message').remove();
                        if (data.status) {
                            curForm.html('<div class="message message-success"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>')
                        } else {
                            curForm.append('<div class="message message-error"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>')
                        }
                        curForm.removeClass('loading');
                    });
                } else if (curForm.hasClass('window-form')) {
                    windowOpen(curForm.attr('action'), formData);
                } else {
                    form.submit();
                }
            }
        }
    });
}

var smartCaptchaKey = 'uahGSHTKJqjaJ0ezlhjrbOYH4OxS6zzL9CZ47OgY';

function smartCaptchaLoad() {
    $('.captcha-container').each(function() {
        if (!window.smartCaptcha) {
            return;
        }
        var curID = window.smartCaptcha.render(this, {
            sitekey: smartCaptchaKey,
            callback: smartCaptchaCallback,
            invisible: true,
            hideShield: true,
            hl: 'en'
        });
        $(this).attr('data-smartid', curID);
    });
}

function smartCaptchaCallback(token) {
    $('form[form-smartcaptchawaiting]').attr('form-smartcaptchawaiting', 'true');
    $('form[form-smartcaptchawaiting] [type="submit"]').trigger('click');
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        if ($('.window .window-auth-menu').length == 1 && typeof($('.window-link.last-active').attr('data-authtype') != 'undefined')) {
            $('.window .window-auth-menu a[data-authtype="' + $('.window-link.last-active').attr('data-authtype') + '"]').trigger('click');
        }

    });
}

function windowClose() {
    if ($('.window').length > 0) {

        var isEmptyForm = true;
        $('.window .form-input input, .window .form-input textarea, .window .form-select select').each(function() {
            if ($(this).val() != '') {
                isEmptyForm = false;
            }
        });
        if (isEmptyForm) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
            $('.wrapper').css({'top': 0});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            if (confirm('Close the form?')) {
                $('.window .form-input input, .window .form-input textarea, .window .form-select select').val('');
                windowClose();
            }
        }
    }
}

function updateMap() {

    $('.page-map-container-map').each(function() {
        if (map != 'undefined') {
            var data = [];
            $('.card').each(function() {
                var curItem = $(this);
                var isActive = curItem.hasClass('active');
                data.push({
                    'longitude': Number(curItem.attr('data-longitude')),
                    'latitude': Number(curItem.attr('data-latitude')),
                    'title': curItem.find('.card-title').text(),
                    'active': isActive,
                    'icon': curItem.attr('data-icon'),
                    'iconbig': curItem.attr('data-iconbig')
                });
            });

            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            markers = [];

            for (var i = 0; i < data.length; i++) {
                var curIcon = {
                    'iconURL': data[i].icon,
                    'iconWidth': 46,
                    'iconHeight': 46,
                    'iconCenterX': 23,
                    'iconCenterY': 23,
                    'iconBigURL': data[i].iconbig,
                    'iconBigWidth': 64,
                    'iconBigHeight': 64,
                    'iconBigCenterX': 32,
                    'iconBigCenterY': 32
                };
                var iconImg = curIcon.iconURL;
                var iconWidth = curIcon.iconWidth;
                var iconHeight = curIcon.iconHeight;
                var iconCenterX = curIcon.iconCenterX;
                var iconCenterY = curIcon.iconCenterY;
                if (data[i].active) {
                    iconImg = curIcon.iconBigURL;
                    iconWidth = curIcon.iconBigWidth;
                    iconHeight = curIcon.iconBigHeight;
                    iconCenterX = curIcon.iconBigCenterX;
                    iconCenterY = curIcon.iconBigCenterY;
                }
                $('body').append('<img src="' + curIcon.iconBigURL + '" alt="" style="position:fixed; left:-9999px; top:-9999px" />');
                var marker = add_marker(data[i].longitude, data[i].latitude, data[i].title, iconImg, iconWidth, iconHeight, iconCenterX, iconCenterY);
                markers.push(marker);
            }
        }
    });

}

function add_marker(lng, lat, title, iconImg, iconWidth, iconHeight, iconCenterX, iconCenterY) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lng, lat),
        map: map,
        title: title,
        icon: new google.maps.MarkerImage(
            iconImg,
            new google.maps.Size(iconWidth, iconHeight),
            new google.maps.Point(0, 0),
            new google.maps.Point(iconCenterX, iconCenterY)
        ),
    });
    google.maps.event.addListener(marker, 'click', function () {
        var curIndex = -1;
        for (var i = 0; i < markers.length; i++) {
            if (marker == markers[i]) {
                curIndex = i;
            }
        }
        if (curIndex > -1) {
            $('.page-map-container').addClass('open')
            $('.page-map-list .card').eq(curIndex).find('.card-content').click();
            window.setTimeout(function() {
                $('.page-map-list-content').mCustomScrollbar('scrollTo', $('.page-map-list .card').eq(curIndex));
            }, 300);
            if (mapSwiper) {
                mapSwiper.slideTo(curIndex);
            }
        } else {
            $('.page-map-container').removeClass('open')
        }
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
        if ($(window).width() > 1199) {
            var curIndex = -1;
            for (var i = 0; i < markers.length; i++) {
                if (marker == markers[i]) {
                    curIndex = i;
                }
            }
            if (curIndex > -1) {
                var curItem = $('.card').eq(curIndex);
                if (!curItem.hasClass('active')) {
                    var curIcon = null;
                    var iconImg = '';
                    var iconWidth = 0;
                    var iconHeight = 0;
                    var iconCenterX = 0;
                    var iconCenterY = 0;

                    curIcon = {
                        'iconURL': curItem.attr('data-icon'),
                        'iconWidth': 46,
                        'iconHeight': 46,
                        'iconCenterX': 23,
                        'iconCenterY': 23,
                        'iconBigURL': curItem.attr('data-iconbig'),
                        'iconBigWidth': 64,
                        'iconBigHeight': 64,
                        'iconBigCenterX': 32,
                        'iconBigCenterY': 32
                    };

                    iconImg = curIcon.iconBigURL;
                    iconWidth = curIcon.iconBigWidth;
                    iconHeight = curIcon.iconBigHeight;
                    iconCenterX = curIcon.iconBigCenterX;
                    iconCenterY = curIcon.iconBigCenterY;

                    marker.setIcon(new google.maps.MarkerImage(
                        iconImg,
                        new google.maps.Size(iconWidth, iconHeight),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(iconCenterX, iconCenterY)
                    ));
                }

                $('.page-map-list .card').eq(curIndex).addClass('hover');
                $('.page-map-list-content').mCustomScrollbar('scrollTo', $('.page-map-list .card').eq(curIndex));
            }
        }
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
        if ($(window).width() > 1199) {
            var curIndex = -1;
            for (var i = 0; i < markers.length; i++) {
                if (marker == markers[i]) {
                    curIndex = i;
                }
            }
            if (curIndex > -1) {
                var curItem = $('.card').eq(curIndex);
                if (!curItem.hasClass('active')) {
                    var curIcon = {
                        'iconURL': curItem.attr('data-icon'),
                        'iconWidth': 46,
                        'iconHeight': 46,
                        'iconCenterX': 23,
                        'iconCenterY': 23,
                        'iconBigURL': curItem.attr('data-iconbig'),
                        'iconBigWidth': 64,
                        'iconBigHeight': 64,
                        'iconBigCenterX': 32,
                        'iconBigCenterY': 32
                    };
                    var iconImg = '';
                    var iconWidth = 0;
                    var iconHeight = 0;
                    var iconCenterX = 0;
                    var iconCenterY = 0;

                    iconImg = curIcon.iconURL;
                    iconWidth = curIcon.iconWidth;
                    iconHeight = curIcon.iconHeight;
                    iconCenterX = curIcon.iconCenterX;
                    iconCenterY = curIcon.iconCenterY;

                    marker.setIcon(new google.maps.MarkerImage(
                        iconImg,
                        new google.maps.Size(iconWidth, iconHeight),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(iconCenterX, iconCenterY)
                    ));
                }

                $('.page-map-list .card').eq(curIndex).removeClass('hover');
            }
        }
    });
    return marker;
}

function getDateText(curDate) {
    var curDay = curDate.split('/')[1];
    var curMonth = curDate.split('/')[0];
    var curYear = curDate.split('/')[2];
    var curMonthTitle = '';
    switch(curMonth) {
        case '01':
            curMonthTitle = 'Jan';
            break;
        case '02':
            curMonthTitle = 'Feb';
            break;
        case '03':
            curMonthTitle = 'Mar';
            break;
        case '04':
            curMonthTitle = 'Apr';
            break;
        case '05':
            curMonthTitle = 'May';
            break;
        case '06':
            curMonthTitle = 'Jun';
            break;
        case '07':
            curMonthTitle = 'Jul';
            break;
        case '08':
            curMonthTitle = 'Aug';
            break;
        case '09':
            curMonthTitle = 'Sep';
            break;
        case '10':
            curMonthTitle = 'Oct';
            break;
        case '11':
            curMonthTitle = 'Nov';
            break;
        case '12':
            curMonthTitle = 'Dec';
            break;
    }
    return (curDay + ' ' + curMonthTitle + ' <span>' + curYear + '</span>');
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('header').each(function() {
        if (windowScroll > 64) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
        }
    });

    $('.filters-calendar-wrapper').each(function() {
        if (windowScroll > $('.filters-calendar-wrapper').offset().top + $('.filters-calendar-wrapper').outerHeight() - 88) {
            $('html').addClass('calendar-fixed');
        } else {
            $('html').removeClass('calendar-fixed');
        }
    });

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }
});

var mapSwiper;
var accountEventMediaSwiper;

$(window).on('load resize', function() {
    if ($(window).width() > 1199) {
        if ($('.page-map-list-content').length > 0) {
            var curSlider = $('.page-map-list-content');
            if (curSlider.hasClass('swiper-initialized') && mapSwiper) {
                mapSwiper.destroy();
                curSlider.removeClass('swiper');
                curSlider.find('.catalogue').removeClass('swiper-wrapper');
                curSlider.find('.card').removeClass('swiper-slide');
            }
            $('.page-map-list-content').mCustomScrollbar('destroy');
            $('.page-map-list-content').mCustomScrollbar({
                axis: 'y'
            });
        }

        $('.account-event-card-media-photos').each(function() {
            var curSlider = $(this);
            if (curSlider.hasClass('swiper-initialized') && accountEventMediaSwiper) {
                accountEventMediaSwiper.destroy();
            }
        });
    } else {
        if ($('.page-map-list-content').length > 0) {
            $('.page-map-list-content').mCustomScrollbar('destroy');

            var curSlider = $('.page-map-list-content');
            if (!curSlider.hasClass('swiper-initialized')) {
                curSlider.addClass('swiper');
                curSlider.find('.catalogue').addClass('swiper-wrapper');
                curSlider.find('.card').addClass('swiper-slide');
                if ($(window).width() > 1199) {
                    curSlider.find('.card-content').eq(0).trigger('click');
                }
                mapSwiper = new Swiper(curSlider[0], {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    on: {
                        slideChange: function () {
                            curSlider.find('.card-content').eq(mapSwiper.activeIndex).trigger('click');
                        },
                    },
                });
            }
        }

        $('.account-event-card-media-photos').each(function() {
            var curSlider = $(this);
            if (!curSlider.hasClass('swiper-initialized')) {
                accountEventMediaSwiper = new Swiper(curSlider[0], {
                    slidesPerView: 'auto',
                    freeMode: true,
                    watchSlidesProgress: true,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    }
                });
            }
        });
    }

    $('.other-section .cards').each(function() {
        var curSlider = $(this);
        if ($(window).width() < 1200) {
            if (!curSlider.hasClass('swiper-initialized')) {
                curSlider.wrapInner('<div class="swiper-wrapper"></div>');
                curSlider.find('.card').addClass('swiper-slide');
                curSlider.append('<div class="swiper-button-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></div><div class="swiper-button-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></div>');
                const swiper = new Swiper(curSlider[0], {
                    speed: 1000,
                    touchAngle: 30,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                });
            }
        } else {
            if (curSlider.hasClass('swiper-initialized')) {
                const swiper = curSlider[0].swiper;
                swiper.destroy();
                curSlider.find('.card').removeClass('swiper-slide');
                curSlider.find('.cardm').removeAttr('role');
                curSlider.find('.card').removeAttr('aria-label');
                curSlider.find('.card').removeAttr('style');
                curSlider.html(curSlider.find('.swiper-wrapper').html());
            }
        }
    });

    $('.other-section').each(function() {
        var curSection = $(this);
        if (curSection.find('.card').length > 3) {
            curSection.find('.other-section-more').addClass('visible');
        }
    });

    $('body').on('click', '.other-section-more a', function(e) {
        var curSection = $(this).parents().filter('.other-section');
        curSection.toggleClass('open');
        e.preventDefault();
    });

});

$(window).on('load', function() {

    $('.detail-description').each(function() {
        var curText = $(this);
        curText.removeClass('open with-more');
        if (curText.find('.detail-description-container').height() < curText.find('.detail-description-content').height()) {
            curText.addClass('with-more');
        }
    });

    $('.detail-info-review-text').each(function() {
        var curText = $(this);
        curText.removeClass('open with-more');
        if (curText.height() < curText.find('.detail-info-review-text-inner').height()) {
            curText.addClass('with-more');
        }
    });

});

$(document).ready(function() {

    $('.header-user-notifications-link').click(function(e) {
        $('html').toggleClass('header-user-notifications-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-user-notifications').length == 0) {
            $('html').removeClass('header-user-notifications-open');
        }
    });

    $(document).click(function(e) {
        if ($(window).width() > 1199) {
            if ($(e.target).parents().filter('.header-user-account').length == 0) {
                $('html').removeClass('header-user-menu-open');
            }
        }
    });

    $('.header-user-account-link').click(function(e) {
        if ($('html').hasClass('header-user-menu-open')) {
            $('html').removeClass('header-user-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('header-user-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
        }
        e.preventDefault();
    });

    $('.account-profile-menu-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.account-profile-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.account-profile-menu-item').index(curItem);
            $('.account-profile-tab.active').removeClass('active');
            $('.account-profile-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.account-profile-form-edit a').click(function(e) {
        var curForm = $(this).parents().filter('.account-profile-form').find('form');
        curForm.parent().addClass('editable');
        curForm.find('.accout-profile-field-editable').prop('disabled', false);
        e.preventDefault();
    });

    $('.account-profile-form-save a').click(function(e) {
        var curForm = $(this).parents().filter('.account-profile-form').find('form');
        curForm.find('.form-submit input').trigger('click');
        e.preventDefault();
    });

    $('.account-profile-form .form-reset input').click(function() {
        var curForm = $(this).parents().filter('.account-profile-form').find('form');
        window.setTimeout(function() {
            curForm.find('label.error').remove();
            curForm.find('.error').removeClass('error');
            curForm.find('input').trigger('blur');
            curForm.parent().removeClass('editable');
            curForm.find('.accout-profile-field-editable').prop('disabled', true);
        }, 100);
    });

    $('.account-profile-form-password-edit a').click(function(e) {
        var curForm = $(this).parents().filter('.account-profile-form');
        curForm.toggleClass('password-editable');
        if (curForm.hasClass('password-editable')) {
            curForm.find('.account-profile-form-password-edit-block .form-input input').addClass('required');
        } else {
            curForm.find('.account-profile-form-password-edit-block .form-input input').removeClass('required error');
            curForm.find('.account-profile-form-password-edit-block .form-input label.error').remove();
            curForm.find('.account-profile-form-password-edit-block .form-input input').val('').trigger('blur');
        }
        e.preventDefault();
    });

    $('.account-support-card-new-message-link a').click(function(e) {
        $('.account-support-card-new-message').addClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.pager-size-select-current', function() {
        $(this).parent().toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.pager-size-select').length == 0) {
            $('.pager-size-select').removeClass('open');
        }
    });

    $('body').on('change', '.pager-size-select-item label input', function() {
        var curSelect = $(this).parents().filter('.pager-size');
        var curText = '';
        curSelect.find('.pager-size-select-item label input:checked').each(function() {
            curText = $(this).parent().find('span').html();
        });
        curSelect.find('.pager-size-select-current span').html(curText);
        $('.pager-size-select').removeClass('open');
    });

    $('.account-event-card').each(function() {
        var menuHTML =  '<ul>';

        $('.account-event-card-tab').each(function() {
            menuHTML +=     '<li><a href="#">' + $(this).attr('data-title') + '</a></li>';
        });

        menuHTML +=     '</ul>';

        $('.account-event-card-menu').html(menuHTML);
        $('.account-event-card-menu ul li').eq(0).addClass('active');
        $('.account-event-card-tab').eq(0).addClass('active');
    });

    $('body').on('click', '.account-event-card-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.account-event-card-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.account-event-card-menu ul li').index(curLi);
            $('.account-event-card-tab.active').removeClass('active');
            $('.account-event-card-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.account-event-card-media-video-player-start', function(e) {
        var curLink = $(this);
        var curPlayer = curLink.parent();
        var curHREF = curLink.attr('href');
        if (curHREF.indexOf('?') == -1) {
            curHREF += '?autoplay=1';
        } else {
            curHREF += '&autoplay=1';
        }
        curPlayer.html('<iframe width="560" height="315" src="' + curHREF + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
        e.preventDefault();
    });

    $('.account-event-card-schedule').each(function() {
        if ($('.account-event-card-schedule-item').length > 5) {
            $('.account-event-card-schedule-more').addClass('visible');
        }
    });

    $('.account-event-card-schedule-more a').click(function(e) {
        $('.account-event-card-schedule').toggleClass('open');
        e.preventDefault();
    });

    $('.account-event-add-category-current').click(function() {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.account-event-add-category.open').removeClass('open');
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.account-event-add-category').length == 0) {
            $('.account-event-add-category.open').removeClass('open');
        }
    });

    $('.account-event-add-category').each(function() {
        var curSelect = $(this);
        var newValue = '';
        curSelect.find('.account-event-add-category-checkbox input:checked').each(function() {
            if (newValue != '') {
                newValue += ', ';
            }
            newValue += $(this).parent().find('span').html();
        });
        curSelect.find('.account-event-add-category-validfield').val(newValue);
        curSelect.find('.account-event-add-category-current-value').html(newValue);
        if (newValue == '') {
            curSelect.removeClass('full');
        } else {
            curSelect.addClass('full');
        }
    });

    $('.account-event-add-category-content-search input').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $('.account-event-add-category-content-search input').on('keyup blur change', function() {
        var curInput = $(this);
        var curValue = curInput.val().toLowerCase();
        var curSelect = curInput.parents().filter('.account-event-add-category');
        curSelect.find('.account-event-add-category-checkbox').each(function() {
            var curItem = $(this);

            var curIndex = curItem.find('span').text().toLowerCase().indexOf(curValue);
            if (curIndex == -1) {
                curItem.addClass('hidden');
            } else {
                curItem.removeClass('hidden');
            }
        });
        curSelect.find('.account-event-add-category-checkbox.first-child').removeClass('first-child');
        curSelect.find('.account-event-add-category-checkbox:not(.hidden)').eq(0).addClass('first-child');
        curSelect.find('.account-event-add-category-group').each(function() {
            var curGroup = $(this);
            if (curGroup.find('.account-event-add-category-checkbox:not(.hidden)').length == 0) {
                curGroup.addClass('hidden');
            } else {
                curGroup.removeClass('hidden');
            }
        });
        curSelect.find('.account-event-add-category-group.first-child').removeClass('first-child');
        curSelect.find('.account-event-add-category-group:not(.hidden)').eq(0).addClass('first-child');
    });

    $('.account-event-add-category-content-search input').each(function() {
        var curInput = $(this);
        var curValue = curInput.val().toLowerCase();
        var curSelect = curInput.parents().filter('.account-event-add-category');
        curSelect.find('.account-event-add-category-checkbox').each(function() {
            var curItem = $(this);

            var curIndex = curItem.find('span').text().toLowerCase().indexOf(curValue);
            if (curIndex == -1) {
                curItem.addClass('hidden');
            } else {
                curItem.removeClass('hidden');
            }
        });
        curSelect.find('.account-event-add-category-checkbox.first-child').removeClass('first-child');
        curSelect.find('.account-event-add-category-checkbox:not(.hidden)').eq(0).addClass('first-child');
    });

    $('.account-event-add-category-checkbox input').change(function() {
        var curSelect = $(this).parents().filter('.account-event-add-category');
        var newValue = '';
        curSelect.find('.account-event-add-category-checkbox input:checked').each(function() {
            if (newValue != '') {
                newValue += ', ';
            }
            newValue += $(this).parent().find('span').html();
        });
        curSelect.find('.account-event-add-category-validfield').val(newValue).removeClass('error');
        curSelect.find('label.error').remove();
        curSelect.find('.account-event-add-category-current-value').html(newValue);
        if (newValue == '') {
            curSelect.removeClass('full');
        } else {
            curSelect.addClass('full');
        }
    });

    $('.account-event-add-schedule-edit a').click(function(e) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);

        if (!$(this).parent().hasClass('account-restaurant-add-schedule-edit')) {
            var newHTML =   '<div class="window-account-event-add-schedule">' +
                                '<form action="#" method="post">' +
                                    '<div class="window-title">' + $('.window-account-event-add-schedule-template-title').html() + '</div>' +
                                    '<div class="window-account-event-add-schedule-container">';

            $('.account-event-add-schedule-item').each(function() {
                var curItem = $(this);
                newHTML +=              '<div class="window-account-event-add-schedule-item">' +
                                            '<div class="window-account-event-add-schedule-item-date">' +
                                                '<div class="form-input form-input-date"><span>' + $('.window-account-event-add-schedule-template-date').html() + '</span><input type="text" name="' + curItem.find('.account-event-add-schedule-item-date').attr('name') + '" value="' + curItem.find('.account-event-add-schedule-item-date').attr('value') + '" class="required"></div>' +
                                            '</div>' +
                                            '<div class="window-account-event-add-schedule-item-start">' +
                                                '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-start').html() + '</span><input type="text" name="' + curItem.find('.account-event-add-schedule-item-start').attr('name') + '" value="' + curItem.find('.account-event-add-schedule-item-start').attr('value') + '" class="required"></div>' +
                                            '</div>' +
                                            '<div class="window-account-event-add-schedule-item-end">' +
                                                '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-end').html() + '</span><input type="text" name="' + curItem.find('.account-event-add-schedule-item-end').attr('name') + '" value="' + curItem.find('.account-event-add-schedule-item-end').attr('value') + '" class="required"></div>' +
                                            '</div>' +
                                            '<div class="window-account-event-add-schedule-item-remove"><a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>' +
                                        '</div>';
            });

            newHTML +=              '</div>' +
                                    '<div class="window-account-event-add-schedule-add"><a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-add"></use></svg>' + $('.window-account-event-add-schedule-template-add').html() + '</a></div>' +
                                    '<div class="window-account-event-add-schedule-ctrl">' +
                                        '<div class="window-account-event-add-schedule-cancel"><a href="#" class="window-close-btn">' + $('.window-account-event-add-schedule-template-cancel').html() + '</a></div>' +
                                        '<div class="window-account-event-add-schedule-save"><input type="submit" value="' + $('.window-account-event-add-schedule-template-save').html() + '" class="btn-border"></a></div>' +
                                    '</div>' +
                                '</form>' +
                            '</div>';
        } else {
            var newHTML =   '<div class="window-account-event-add-schedule">' +
                                '<form action="#" method="post">' +
                                    '<div class="window-title">' + $('.window-account-event-add-schedule-template-title').html() + '</div>' +
                                    '<div class="window-account-event-add-schedule-container">';

            $('.account-event-add-schedule-item').each(function() {
                var curItem = $(this);
                newHTML +=              '<div class="window-account-event-add-schedule-item">' +
                                            '<div class="window-account-event-add-schedule-item-date">' +
                                                '<div class="form-input"><span>' + $('.window-account-event-add-schedule-template-date').html() + '</span><input type="text" name="' + curItem.find('.account-event-add-schedule-item-date').attr('name') + '" value="' + curItem.find('.account-event-add-schedule-item-date').attr('value') + '" class="required"></div>' +
                                            '</div>' +
                                            '<div class="window-account-event-add-schedule-item-start">' +
                                                '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-start').html() + '</span><input type="text" name="' + curItem.find('.account-event-add-schedule-item-start').attr('name') + '" value="' + curItem.find('.account-event-add-schedule-item-start').attr('value') + '" class="required"></div>' +
                                            '</div>' +
                                            '<div class="window-account-event-add-schedule-item-end">' +
                                                '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-end').html() + '</span><input type="text" name="' + curItem.find('.account-event-add-schedule-item-end').attr('name') + '" value="' + curItem.find('.account-event-add-schedule-item-end').attr('value') + '" class="required"></div>' +
                                            '</div>' +
                                            '<div class="window-account-event-add-schedule-item-remove"><a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>' +
                                        '</div>';
            });

            newHTML +=              '</div>' +
                                    '<div class="window-account-event-add-schedule-add window-account-restaurant-add-schedule-add"><a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-add"></use></svg>' + $('.window-account-event-add-schedule-template-add').html() + '</a></div>' +
                                    '<div class="window-account-event-add-schedule-ctrl">' +
                                        '<div class="window-account-event-add-schedule-cancel"><a href="#" class="window-close-btn">' + $('.window-account-event-add-schedule-template-cancel').html() + '</a></div>' +
                                        '<div class="window-account-event-add-schedule-save"><input type="submit" value="' + $('.window-account-event-add-schedule-template-save').html() + '" class="btn-border"></a></div>' +
                                    '</div>' +
                                '</form>' +
                            '</div>';
        }

        $('.window').html('<div class="window-container window-container-preload">' + newHTML + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
            var curForm = $(this);
            var validator = curForm.validate();
            if (validator) {
                validator.destroy();
            }
            curForm.validate({
                ignore: '',
                submitHandler: function(form) {
                    var updateHTML = '';

                    $('.window-account-event-add-schedule-item').each(function() {
                        var curItem = $(this);
                        updateHTML +=   '<div class="account-event-add-schedule-item">' +
                                            '<input type="hidden" name="' + curItem.find('.window-account-event-add-schedule-item-date input').attr('name') + '" value="' + curItem.find('.window-account-event-add-schedule-item-date input').val() + '" class="account-event-add-schedule-item-date">' +
                                            '<input type="hidden" name="' + curItem.find('.window-account-event-add-schedule-item-start input').attr('name') + '" value="' + curItem.find('.window-account-event-add-schedule-item-start input').val() + '" class="account-event-add-schedule-item-start">' +
                                            '<input type="hidden" name="' + curItem.find('.window-account-event-add-schedule-item-end input').attr('name') + '" value="' + curItem.find('.window-account-event-add-schedule-item-end input').val() + '" class="account-event-add-schedule-item-end">' +
                                            '<div class="account-event-add-schedule-item-date">' + curItem.find('.window-account-event-add-schedule-item-date input').val() + '</div>' +
                                            '<div class="account-event-add-schedule-item-start">' + curItem.find('.window-account-event-add-schedule-item-start input').val() + '</div>' +
                                            '<div class="account-event-add-schedule-item-sep">—</div>' +
                                            '<div class="account-event-add-schedule-item-end">' + curItem.find('.window-account-event-add-schedule-item-end input').val() + '</div>' +
                                        '</div>';
                    });

                    $('.account-event-add-schedule-list').html(updateHTML);
                    $('.window-account-event-add-schedule-container').html('');
                    windowClose();
                }
            });
        });

        e.preventDefault();
    });

    $('body').on('click', '.window-account-event-add-schedule-item-remove a', function(e) {
        $(this).parents().filter('.window-account-event-add-schedule-item').remove();
        e.preventDefault();
    });

    $('body').on('click', '.window-account-event-add-schedule-add a', function(e) {
        var newID = Date.now();
        if (!$(this).parent().hasClass('window-account-restaurant-add-schedule-add')) {
            $('.window-account-event-add-schedule-container').append(
                                    '<div class="window-account-event-add-schedule-item">' +
                                        '<div class="window-account-event-add-schedule-item-date">' +
                                            '<div class="form-input form-input-date"><span>' + $('.window-account-event-add-schedule-template-date').html() + '</span><input type="text" id="form-input-date-id-' + newID + '" name="schedule[' + newID + '][date]" value="" class="required"></div>' +
                                        '</div>' +
                                        '<div class="window-account-event-add-schedule-item-start">' +
                                            '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-start').html() + '</span><input type="text" name="schedule[' + newID + '][start]" value="" class="required"></div>' +
                                        '</div>' +
                                        '<div class="window-account-event-add-schedule-item-end">' +
                                            '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-end').html() + '</span><input type="text" name="schedule[' + newID + '][end]" value="" class="required"></div>' +
                                        '</div>' +
                                        '<div class="window-account-event-add-schedule-item-remove"><a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>' +
                                    '</div>');
            $('#form-input-date-id-' + newID).each(function() {
                var curInput = $(this);
                curInput.attr('autocomplete', 'off');
                curInput.prop('readonly', true);
                new AirDatepicker('#form-input-date-id-' + newID, {
                    container: '.window-container',
                    classes: 'form-input-datepicker',
                    prevHtml: '<svg viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
                    nextHtml: '<svg viewBox="0 0 24 24"><path d="M9 18L15 12L9 6" troke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
                });
            });
        } else {
            $('.window-account-event-add-schedule-container').append(
                                    '<div class="window-account-event-add-schedule-item">' +
                                        '<div class="window-account-event-add-schedule-item-date">' +
                                            '<div class="form-input"><span>' + $('.window-account-event-add-schedule-template-date').html() + '</span><input type="text" name="schedule[' + newID + '][date]" value="" class="required"></div>' +
                                        '</div>' +
                                        '<div class="window-account-event-add-schedule-item-start">' +
                                            '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-start').html() + '</span><input type="text" name="schedule[' + newID + '][start]" value="" class="required"></div>' +
                                        '</div>' +
                                        '<div class="window-account-event-add-schedule-item-end">' +
                                            '<div class="form-input form-input-time"><span>' + $('.window-account-event-add-schedule-template-end').html() + '</span><input type="text" name="schedule[' + newID + '][end]" value="" class="required"></div>' +
                                        '</div>' +
                                        '<div class="window-account-event-add-schedule-item-remove"><a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>' +
                                    '</div>');
        }
        $('.window-account-event-add-schedule-item:last-child').each(function() {
            $(this).find('.form-input-time input').each(function() {
                var curInput = $(this);
                curInput.attr('autocomplete', 'off');
                curInput.mask('HG:MN', {
                    translation: {
                        'H': {
                            pattern: /[0-2]/
                        },
                        'G': {
                            pattern: /[0-9]/
                        },
                        'M': {
                            pattern: /[0-5]/
                        },
                        'N': {
                            pattern: /[0-9]/
                        }
                    }
                });
                var placement = 'top';
                if (curInput.parent().offset().top < 320) {
                    placement = 'bottom';
                }
                curInput.parent().clockpicker({
                    placement: placement,
                    donetext: 'Done',
                    afterDone: function() {
                        curInput.trigger('blur');
                    }
                });
            });
        });
        e.preventDefault();
    });

    $('.account-event-add-location-current').click(function() {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.account-event-add-location.open').removeClass('open');
            curSelect.addClass('open');
            curSelect.find('.account-event-add-location-content-search input').trigger('focus');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.account-event-add-location').length == 0) {
            $('.account-event-add-location.open').removeClass('open');
        }
    });

    $('.account-event-add-location').each(function() {
        var curSelect = $(this);
        var newValue = '';
        curSelect.find('.account-event-add-location-checkbox input:checked').each(function() {
            newValue = $(this).parent().find('span.account-event-add-location-checkbox-title').html();
        });
        curSelect.find('.account-event-add-location-validfield').val(newValue);
        curSelect.find('.account-event-add-location-current-value').html(newValue);
        if (newValue == '') {
            curSelect.removeClass('full');
        } else {
            curSelect.addClass('full');
        }
    });

    $('.account-event-add-location-content-search input').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $('.account-event-add-location-content-search input').on('keyup', function() {
        var curInput = $(this);
        var curValue = curInput.val();
        var curSelect = curInput.parents().filter('.account-event-add-location');
        curSelect.find('.account-event-add-location-content-inner').addClass('loading');
        $.ajax({
            type: 'POST',
            url: curSelect.find('.account-event-add-location-content-search').attr('data-url'),
            processData: false,
            contentType: false,
            dataType: 'html',
            data: curInput.serialize(),
            cache: false
        }).done(function(html) {
            curSelect.find('.account-event-add-location-content-inner').html(html);
            curSelect.find('.account-event-add-location-content-inner').removeClass('loading');
        });
    });

    $('body').on('change', '.account-event-add-location-checkbox input', function() {
        var curSelect = $(this).parents().filter('.account-event-add-location');
        var newValue = '';
        curSelect.find('.account-event-add-location-checkbox input:checked').each(function() {
            var curCheckbox = $(this).parent();
            newValue = curCheckbox.find('span.account-event-add-location-checkbox-title').html();
            $('.account-event-add-location-detail-city').html(curCheckbox.find('span.account-event-add-location-checkbox-detail-city').html());
            $('.account-event-add-location-detail-address').html(curCheckbox.find('span.account-event-add-location-checkbox-detail-address').html());
            $('.account-event-add-location-detail-address-english').html(curCheckbox.find('span.account-event-add-location-checkbox-detail-address-english').html());
            $('.account-event-add-location-detail-point-latitude').html(curCheckbox.find('span.account-event-add-location-checkbox-detail-address-latitude').html());
            $('.account-event-add-location-detail-point-longitude').html(curCheckbox.find('span.account-event-add-location-checkbox-detail-address-longitude').html());
        });
        curSelect.find('.account-event-add-location-validfield').val(newValue).removeClass('error');
        curSelect.find('label.error').remove();
        curSelect.find('.account-event-add-location-current-value').html(newValue);
        if (newValue == '') {
            curSelect.removeClass('full');
            $('.account-event-add-location-detail').removeClass('visible');
        } else {
            curSelect.addClass('full');
            $('.account-event-add-location-detail').addClass('visible');
        }
        curSelect.removeClass('open');
    });

    $('.account-event-add-location-detail-btn a').click(function(e) {
        $('.account-event-add-location-city').val($('.account-event-add-location-detail-city').html()).trigger('change').trigger({type: 'select2:select'});
        $('.account-event-add-location-address').val($('.account-event-add-location-detail-address').html()).parents().filter('.form-input').addClass('full');
        $('.account-event-add-location-address-english').val($('.account-event-add-location-detail-address-english').html()).parents().filter('.form-input').addClass('full');
        $('.account-event-add-location-address-latitude').val($('.account-event-add-location-detail-point-latitude').html()).parents().filter('.form-input').addClass('full');
        $('.account-event-add-location-address-longitude').val($('.account-event-add-location-detail-point-longitude').html()).parents().filter('.form-input').addClass('full');
        if (map && marker) {
            var newCoords = new google.maps.LatLng($('.account-event-add-location-detail-point-latitude').html(), $('.account-event-add-location-detail-point-longitude').html());
            marker.setPosition(newCoords);
            map.setCenter(newCoords);
        }
        e.preventDefault();
    });

    $('.account-event-add-location-address').change(function() {
        var curValue = $(this).val();
        if (curValue != '') {
            if (geocoder) {
                geocode({address: curValue});
            }
        }
    });

    function geocode(request) {
        geocoder
            .geocode(request)
                .then((result) => {
                    const { results } = result;

                    map.setCenter(results[0].geometry.location);
                    marker.setPosition(results[0].geometry.location);
                    var position = marker.position;
                    $('.account-event-add-location-address-latitude').val(position.lat).parents().filter('.form-input').addClass('full');
                    $('.account-event-add-location-address-longitude').val(position.lng).parents().filter('.form-input').addClass('full');
                    return results;
                })
                .catch((e) => {
                    alert("Geocode was not successful for the following reason: " + e);
                });
    }

    $('.account-event-add-persons-current').click(function() {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.account-event-add-persons.open').removeClass('open');
            curSelect.addClass('open');
            curSelect.find('.account-event-add-persons-content-search input').trigger('focus');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.account-event-add-persons').length == 0) {
            $('.account-event-add-persons.open').removeClass('open');
        }
    });

    $('.account-event-add-persons-content-search input').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $('.account-event-add-persons-content-search input').on('keyup', function() {
        var curInput = $(this);
        var curValue = curInput.val();
        var curSelect = curInput.parents().filter('.account-event-add-persons');
        curSelect.find('.account-event-add-persons-content-inner').addClass('loading');
        $.ajax({
            type: 'POST',
            url: curSelect.find('.account-event-add-persons-content-search').attr('data-url'),
            processData: false,
            contentType: false,
            dataType: 'html',
            data: curInput.serialize(),
            cache: false
        }).done(function(html) {
            curSelect.find('.account-event-add-persons-content-inner').html(html);
            $('.account-event-add-persons-item').each(function() {
                var curItem = $(this);
                $('.account-event-add-persons-checkbox input[value="' + curItem.find('input').val() + '"]').prop('checked', true);
            });
            curSelect.find('.account-event-add-persons-content-inner').removeClass('loading');
        });
    });

    $('body').on('change', '.account-event-add-persons-checkbox input', function() {
        var curInput = $(this);
        var curCheckbox = curInput.parent();
        var curSelect = curInput.parents().filter('.account-event-add-persons');
        if (curInput.prop('checked')) {
            $('.account-event-add-persons-list').append(
                '<div class="account-event-add-persons-item">' +
                    '<input type="hidden" name="persons_selected[]" value="' + curInput.val() + '">' +
                    '<div class="account-event-add-persons-item-photo" style="' + curCheckbox.find('.account-event-add-persons-checkbox-photo').attr('style') + '"><a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-item-delete"></use></svg></a></div>' +
                    '<div class="account-event-add-persons-item-name">' + curCheckbox.find('.account-event-add-persons-checkbox-title').html() + '</div>' +
                    '<div class="account-event-add-persons-item-text">' + curCheckbox.find('.account-event-add-persons-checkbox-text').html() + '</div>' +
                '</div>'
            );
        } else {
            $('.account-event-add-persons-item input[value="' + curInput.val() + '"]').parents().filter('.account-event-add-persons-item').remove();
        }
        var curValue = '1';
        if ($('.account-event-add-persons-item').length == 0) {
            curValue = '';
        }
        curSelect.find('.account-event-add-persons-validfield').val(curValue).removeClass('error');
        curSelect.find('label.error').remove();
    });

    $('body').on('click', '.account-event-add-persons-item-photo a', function(e) {
        var curItem = $(this).parents().filter('.account-event-add-persons-item');
        $('.account-event-add-persons-checkbox input[value="' + curItem.find('input').val() + '"]').prop('checked', false).trigger('change');
        e.preventDefault();
    });

    $('.account-event-add-persons-list').each(function() {
        Sortable.create(this, {
            handle: '.account-event-add-persons-item',
            animation: 150
        });
    });

    $('.form-files-images .form-files-list').each(function() {
        Sortable.create(this, {
            handle: '.form-files-list-item',
            animation: 150
        });
    });

    $('.account-event-add-main-photo').change(function(e) {
        var currFiles = e.target.files;
        if (currFiles.length > 0) {
            $('.account-event-add-main-photo-preview img').attr('src', URL.createObjectURL(currFiles[0]));
            $('.account-event-add-main-photo-preview').addClass('visible');
        } else {
            $('.account-event-add-main-photo-preview img').attr('src', '');
            $('.account-event-add-main-photo-preview').removeClass('visible');
        }
    });

    $('.account-event-add-main-photo-preview a').click(function(e) {
        if (window.confirm($(this).attr('data-confirm'))) {
            $('.account-event-add-main-photo').val('').trigger('change');
        }
        e.preventDefault();
    });

    $('.account-event-add-video-preview').change(function(e) {
        var currFiles = e.target.files;
        if (currFiles.length > 0) {
            $('.account-event-add-media-video-player-start').attr('style', 'background-image:url(\'' + URL.createObjectURL(currFiles[0]) + '\')');
            if ($('.account-event-add-media-video-player-start').length == 0) {
                $('.account-event-add-media-video-player').html('<a href="" class="account-event-add-media-video-player-start" style=""><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-video-play"></use></svg></a>');
            }
            if ($('.account-event-add-media-video-player-start').attr('href') != '') {
                $('.account-event-add-media-video-preview').addClass('visible');
            }
        } else {
            if ($('.account-event-add-media-video-player-start').length == 0) {
                $('.account-event-add-media-video-player').html('<a href="" class="account-event-add-media-video-player-start" style=""><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-video-play"></use></svg></a>');
            }
            $('.account-event-add-media-video-player-start').attr('style', '');
            $('.account-event-add-media-video-preview').removeClass('visible');
            $('.account-event-add-video').each(function(e) {
                var curValue = $(this).val();
                if (curValue != '') {
                    var videoID = curValue.replace('https://www.youtube.com/embed/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/watch', '').split('?')[0];
                    if (videoID == '') {
                        videoID = curValue.replace('https://www.youtube.com/embed/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/watch', '').split('?')[1].replace('v=', '').split('&')[0];
                    }
                    var previewImg = 'https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg';
                    $('.account-event-add-media-video-player-start').attr('style', 'background-image:url(\'' + previewImg + '\')');
                    $('.account-event-add-media-video-preview').addClass('visible');
                }
            });
        }
    });

    $('.account-event-add-video').change(function(e) {
        var curValue = $(this).val();
        if (curValue != '') {
            if ($('.account-event-add-media-video-player-start').length == 0) {
                $('.account-event-add-media-video-player').html('<a href="" class="account-event-add-media-video-player-start" style=""><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-video-play"></use></svg></a>');
            }
            var videoID = curValue.replace('https://www.youtube.com/embed/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/watch', '').split('?')[0];
            if (videoID == '') {
                videoID = curValue.replace('https://www.youtube.com/embed/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/watch', '').split('?')[1].replace('v=', '').split('&')[0];
            }
            if ($('.account-event-add-media-video-player-start').attr('style') == '') {
                var previewImg = 'https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg';
                $('.account-event-add-media-video-player-start').attr('style', 'background-image:url(\'' + previewImg + '\')');
            }
            $('.account-event-add-media-video-player-start').attr('href', 'https://www.youtube.com/embed/' + videoID);
            $('.account-event-add-media-video-preview').addClass('visible');
        } else {
            if ($('.account-event-add-media-video-player-start').length == 0) {
                $('.account-event-add-media-video-player').html('<a href="" class="account-event-add-media-video-player-start" style=""><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-video-play"></use></svg></a>');
            }
            $('.account-event-add-media-video-player-start').attr('href', '');
            $('.account-event-add-media-video-preview').removeClass('visible');
        }
    });

    $('.account-event-add-media-video-preview-remove').click(function(e) {
        $('.account-event-add-media-video-player').html('<a href="" class="account-event-add-media-video-player-start" style=""><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-video-play"></use></svg></a>');
        $('.account-event-add-video').val('').trigger('change').parents().filter('.form-input').removeClass('full');
        $('.account-event-add-video-preview').val('').trigger('change').parents().filter('.form-input').removeClass('full');
        $('.account-event-add-video').each(function(e) {
            var curValue = $(this).val();
            if (curValue != '') {
                var videoID = curValue.replace('https://www.youtube.com/embed/', '').split('?')[0];
                var previewImg = 'https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg';
                $('.account-event-add-media-video-player-start').attr('style', 'background-image:url(\'' + previewImg + '\')');
                $('.account-event-add-media-video-preview').addClass('visible');
            }
        });
        e.preventDefault();
    });

    $('body').on('click', '.account-event-add-media-video-player-start', function(e) {
        var curLink = $(this);
        var curPlayer = curLink.parent();
        var curHREF = curLink.attr('href');
        if (curHREF.indexOf('?') == -1) {
            curHREF += '?autoplay=1';
        } else {
            curHREF += '&autoplay=1';
        }
        curPlayer.html('<iframe width="560" height="315" src="' + curHREF + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
        e.preventDefault();
    });

    $('body').on('change', '.window .account-event-card-stats-params-periods input', function() {
        var curPeriod = $('.window .account-event-card-stats-params-periods input:checked');
        if (curPeriod.parents().filter('.account-event-card-stats-params-period').hasClass('other')) {
            $('.window .account-event-card-stats-params-range input').prop('disabled', false);
        } else {
            $('.window .account-event-card-stats-params-range input').prop('disabled', true);
        }
    });

    $('.account-event-card-stats-params').each(function() {
        var curForm = $(this);
        initForm(curForm);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                $('.account-event-card-stats-detail-chart, .account-event-card-stats-detail-table').addClass('loading');

                var curData = curForm.serialize();

                $.ajax({
                    type: 'POST',
                    url: curForm.attr('data-url'),
                    dataType: 'json',
                    data: curData,
                    cache: false
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    alert('The service is temporarily unavailable, try again later.');
                    $('.account-event-card-stats-detail-chart, .account-event-card-stats-detail-table').removeClass('loading');
                }).done(function(data) {
                    var chartLabels = [];
                    var chartValues = [];

                    var newTable =  '<div class="account-event-card-stats-detail-table-header">' +
                                        '<div class="account-event-card-stats-detail-table-header-date">' + $('.account-event-card-stats-detail-table').attr('data-date') + '</div>';
                    for (var i = 0; i < data.cols.length; i++) {
                        newTable +=     '<div class="account-event-card-stats-detail-table-header-value">' + data.cols[i].title + '</div>';
                    }
                    newTable +=     '</div>';
                    for (var i = 0; i < data.data.length; i++) {
                        var curRow = data.data[i];
                        chartLabels.push(curRow.date);
                        newTable += '<div class="account-event-card-stats-detail-table-row">' +
                                        '<div class="account-event-card-stats-detail-table-row-date">' + curRow.date + '</div>';
                        for (var j = 0; j < data.cols.length; j++) {
                            var classHighlight = '';
                            if ((typeof(data.cols[j].highlight) != 'undefined') && data.cols[j].highlight) {
                                classHighlight = 'highlight';
                            }
                            var curValue = curRow[data.cols[j].name];
                            if (Number.isFinite(Number(curValue))) {
                                curValue = String(curValue).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;');
                            }
                            newTable += '<div class="account-event-card-stats-detail-table-row-value ' + classHighlight + '"><span>' + data.cols[j].title + '</span>' + curValue + '</div>';
                            if ((typeof(data.cols[j].onchart) != 'undefined') && data.cols[j].onchart) {
                                chartValues.push(curRow[data.cols[j].name]);
                            }
                        }
                        newTable += '</div>';
                    }
                    newTable +=     '<div class="account-event-card-stats-detail-table-row summ">' +
                                        '<div class="account-event-card-stats-detail-table-row-date">' + $('.account-event-card-stats-detail-table').attr('data-total') + '</div>';
                    for (var j = 0; j < data.cols.length; j++) {
                        var classHighlight = '';
                        if ((typeof(data.cols[j].highlight) != 'undefined') && data.cols[j].highlight) {
                            classHighlight = 'highlight';
                        }
                        var curValue = data.total[data.cols[j].name];
                        if (Number.isFinite(Number(curValue))) {
                            curValue = String(curValue).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;');
                        }
                        newTable +=     '<div class="account-event-card-stats-detail-table-row-value ' + classHighlight + '"><span>' + data.cols[j].title + '</span>' + curValue + '</div>';
                    }
                    newTable +=     '</div>';
                    $('.account-event-card-stats-detail-table').html(newTable);

                    chart.data.labels = chartLabels;
                    chart.data.datasets.data = chartValues;
                    chart.update();
                    $('.account-event-card-stats-detail-chart, .account-event-card-stats-detail-table').removeClass('loading');
                });
            }
        });
    });

    $('.account-event-card-stats-detail-ctrl-dates-item').click(function(e) {
        var curItem = $(this);
        $('.account-event-card-stats-detail-ctrl-dates-item.active').removeClass('active');
        curItem.addClass('active');
        $('.account-event-card-stats-params-period.' + curItem.attr('data-period')).prop('checked', true);
        if (!curItem.hasClass('detail')) {
            $('.account-event-card-stats-params').trigger('submit');
        } else {
            var curPadding = $('.wrapper').width();
            var curScroll = $(window).scrollTop();
            $('html').addClass('window-open');
            curPadding = $('.wrapper').width() - curPadding;
            $('body').css({'margin-right': curPadding + 'px'});

            $('body').append('<div class="window"><div class="window-loading"></div></div>')

            $('.wrapper').css({'top': -curScroll});
            $('.wrapper').data('curScroll', curScroll);

            var newHTML =   '<div class="window-stat-details">' +
                                '<div class="window-stat-details-title">' + $('.account-event-card-stats-params').attr('data-title') + '</div>' +
                                '<div class="window-stat-details-container">' +
                                    '<form action="' + $('.account-event-card-stats-params').attr('data-url') + '" method="post">' +
                                        $('.account-event-card-stats-params').html() +
                                    '</form>' +
                                '</div>' +
                            '</div>';

            $('.window').html('<div class="window-container window-container-preload">' + newHTML + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');

            $('.window .account-event-card-stats-params-range-item.from input').val($('.account-event-card-stats-params .account-event-card-stats-params-range-item.from input').val());
            $('.window .account-event-card-stats-params-range-item.to input').val($('.account-event-card-stats-params .account-event-card-stats-params-range-item.to input').val());

            window.setTimeout(function() {
                $('.window-container-preload').removeClass('window-container-preload');
            }, 100);

            $('.window form').each(function() {
                var curForm = $(this);
                initForm(curForm);
                var validator = curForm.validate();
                if (validator) {
                    validator.destroy();
                }
                curForm.validate({
                    ignore: '',
                    submitHandler: function(form) {
                        $('.account-event-card-stats-detail-chart, .account-event-card-stats-detail-table').addClass('loading');

                        var curData = curForm.serialize();
                        $('.window .form-input input, .window .form-input textarea, .window .form-select select').val('');
                        windowClose();

                        $.ajax({
                            type: 'POST',
                            url: curForm.attr('action'),
                            dataType: 'json',
                            data: curData,
                            cache: false
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            alert('The service is temporarily unavailable, try again later.');
                            $('.account-event-card-stats-detail-chart, .account-event-card-stats-detail-table').removeClass('loading');
                        }).done(function(data) {
                            var chartLabels = [];
                            var chartValues = [];

                            var newTable =  '<div class="account-event-card-stats-detail-table-header">' +
                                                '<div class="account-event-card-stats-detail-table-header-date">' + $('.account-event-card-stats-detail-table').attr('data-date') + '</div>';
                            for (var i = 0; i < data.cols.length; i++) {
                                newTable +=     '<div class="account-event-card-stats-detail-table-header-value">' + data.cols[i].title + '</div>';
                            }
                            newTable +=     '</div>';
                            for (var i = 0; i < data.data.length; i++) {
                                var curRow = data.data[i];
                                chartLabels.push(curRow.date);
                                newTable += '<div class="account-event-card-stats-detail-table-row">' +
                                                '<div class="account-event-card-stats-detail-table-row-date">' + curRow.date + '</div>';
                                for (var j = 0; j < data.cols.length; j++) {
                                    var classHighlight = '';
                                    if ((typeof(data.cols[j].highlight) != 'undefined') && data.cols[j].highlight) {
                                        classHighlight = 'highlight';
                                    }
                                    var curValue = curRow[data.cols[j].name];
                                    if (Number.isFinite(Number(curValue))) {
                                        curValue = String(curValue).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;');
                                    }
                                    newTable += '<div class="account-event-card-stats-detail-table-row-value ' + classHighlight + '"><span>' + data.cols[j].title + '</span>' + curValue + '</div>';
                                    if ((typeof(data.cols[j].onchart) != 'undefined') && data.cols[j].onchart) {
                                        chartValues.push(curRow[data.cols[j].name]);
                                    }
                                }
                                newTable += '</div>';
                            }
                            newTable +=     '<div class="account-event-card-stats-detail-table-row summ">' +
                                                '<div class="account-event-card-stats-detail-table-row-date">' + $('.account-event-card-stats-detail-table').attr('data-total') + '</div>';
                            for (var j = 0; j < data.cols.length; j++) {
                                var classHighlight = '';
                                if ((typeof(data.cols[j].highlight) != 'undefined') && data.cols[j].highlight) {
                                    classHighlight = 'highlight';
                                }
                                var curValue = data.total[data.cols[j].name];
                                if (Number.isFinite(Number(curValue))) {
                                    curValue = String(curValue).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;');
                                }
                                newTable +=     '<div class="account-event-card-stats-detail-table-row-value ' + classHighlight + '"><span>' + data.cols[j].title + '</span>' + curValue + '</div>';
                            }
                            newTable +=     '</div>';
                            $('.account-event-card-stats-detail-table').html(newTable);

                            chart.data.labels = chartLabels;
                            chart.data.datasets.data = chartValues;
                            chart.update();
                            $('.account-event-card-stats-detail-chart, .account-event-card-stats-detail-table').removeClass('loading');
                        });
                    }
                });
            });
        }
    });

    $('.account-event-card-stats-detail-ctrl-chart a').click(function(e) {
        $('.account-event-card-stats-detail-ctrl-chart').toggleClass('open');
        $('.account-event-card-stats-detail-chart').toggleClass('open');
        e.preventDefault();
    });

    $('.account-event-card-stats-detail-table').each(function() {
        var newTable =  '<div class="account-event-card-stats-detail-table-header">' +
                            '<div class="account-event-card-stats-detail-table-header-date">' + $('.account-event-card-stats-detail-table').attr('data-date') + '</div>';
        for (var i = 0; i < statData.cols.length; i++) {
            newTable +=     '<div class="account-event-card-stats-detail-table-header-value">' + statData.cols[i].title + '</div>';
        }
        newTable +=     '</div>';
        for (var i = 0; i < statData.data.length; i++) {
            var curRow = statData.data[i];
            newTable += '<div class="account-event-card-stats-detail-table-row">' +
                            '<div class="account-event-card-stats-detail-table-row-date">' + curRow.date + '</div>';
            for (var j = 0; j < statData.cols.length; j++) {
                var classHighlight = '';
                if ((typeof(statData.cols[j].highlight) != 'undefined') && statData.cols[j].highlight) {
                    classHighlight = 'highlight';
                }
                var curValue = curRow[statData.cols[j].name];
                if (Number.isFinite(Number(curValue))) {
                    curValue = String(curValue).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;');
                }
                newTable += '<div class="account-event-card-stats-detail-table-row-value ' + classHighlight + '"><span>' + statData.cols[j].title + '</span>' + curValue + '</div>';
            }
            newTable += '</div>';
        }
        newTable +=     '<div class="account-event-card-stats-detail-table-row summ">' +
                            '<div class="account-event-card-stats-detail-table-row-date">' + $('.account-event-card-stats-detail-table').attr('data-total') + '</div>';
        for (var j = 0; j < statData.cols.length; j++) {
            var classHighlight = '';
            if ((typeof(statData.cols[j].highlight) != 'undefined') && statData.cols[j].highlight) {
                classHighlight = 'highlight';
            }
            var curValue = statData.total[statData.cols[j].name];
            if (Number.isFinite(Number(curValue))) {
                curValue = String(curValue).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;');
            }
            newTable +=     '<div class="account-event-card-stats-detail-table-row-value ' + classHighlight + '"><span>' + statData.cols[j].title + '</span>' + curValue + '</div>';
        }
        newTable +=     '</div>';
        $('.account-event-card-stats-detail-table').html(newTable);
    });

    var chart;

    $('.account-event-card-stats-detail-chart').each(function() {
        var ctx = $('.account-event-card-stats-detail-chart canvas')[0];
        var skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
        var chartLabels = [];
        var chartValues = [];
        for (var i = 0; i < statData.data.length; i++) {
            var curRow = statData.data[i];
            chartLabels.push(curRow.date);
            for (var j = 0; j < statData.cols.length; j++) {
                if ((typeof(statData.cols[j].onchart) != 'undefined') && statData.cols[j].onchart) {
                    chartValues.push(curRow[statData.cols[j].name]);
                }
            }
        }
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartValues,
                    borderColor: '#EA435D',
                    borderWidth: 2,
                    pointStyle: false,
                    segment: {
                        borderDash: ctx => skipped(ctx, [6, 6]),
                    },
                    spanGaps: true
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

    $('.businesslunch-is').change(function() {
        if ($(this).prop('checked')) {
            $('.businesslunch-inputs .form-input input').prop('disabled', false).addClass('required');
        } else {
            $('.businesslunch-inputs .form-input input').prop('disabled', true).removeClass('required');
        }
    });

    $('.businesslunch-is').each(function() {
        if ($(this).prop('checked')) {
            $('.businesslunch-inputs .form-input input').prop('disabled', false).addClass('required');
        } else {
            $('.businesslunch-inputs .form-input input').prop('disabled', true).removeClass('required');
        }
    });

    $('.account-restaurant-menu-add a').click(function(e) {
        var newID = Date.now();
        var titleFile = $('.account-restaurant-menu-files').attr('data-attach');
        var nameFile = $('.account-restaurant-menu-files').attr('data-file').replace('_ID_', newID);
        var titleText = $('.account-restaurant-menu-files').attr('data-description');
        var nameText = $('.account-restaurant-menu-files').attr('data-text').replace('_ID_', newID);
        $('.account-restaurant-menu-files').append( '<div class="account-restaurant-menu-file">' +
                                                        '<div class="form-file">' +
                                                            '<div class="form-file-input">' +
                                                                '<input type="file" name="' + nameFile + '" value="">' +
                                                                '<span data-placeholder="' + titleFile + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file"></use></svg>' + titleFile + '</span>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="form-input"><span>' + titleText + '</span><input type="text" name="' + nameText + '" value=""></div>' +
                                                    '</div>');
        e.preventDefault();
    });

    $('body').on('change', '.account-event-add-category-type input', function() {
        if ($('.account-event-add-category-type-restraunt').prop('checked')) {
            $('.account-event-add-category-restraunt-types').addClass('required');
            $('.account-event-add-category-restraunt-types').prop('disabled', false);
        } else {
            $('.account-event-add-category-restraunt-types').removeClass('required');
            $('.account-event-add-category-restraunt-types').prop('disabled', true);
        }
    });

    $('.account-event-add-category-type').each(function() {
        if ($('.account-event-add-category-type-restraunt').prop('checked')) {
            $('.account-event-add-category-restraunt-types').addClass('required');
            $('.account-event-add-category-restraunt-types').prop('disabled', false);
        } else {
            $('.account-event-add-category-restraunt-types').removeClass('required');
            $('.account-event-add-category-restraunt-types').prop('disabled', true);
        }
    });

});

$(document).ready(function() {
    $('body').on('click', '.account-event-add-location-gapi-search-btn a', function(e) {
        var curValue = $('.account-event-add-location-gapi-search .form-input input').val().trim();
        if (curValue != '') {
            if (!$('.account-event-add-location-gapi-search').hasClass('loading')) {
                $('.account-event-add-location-gapi-search').addClass('loading');
                var request = {
                    query: curValue,
                    fields: ['place_id', 'formatted_address', 'name'],
                };
                if (service != null) {
                    service.findPlaceFromQuery(request, (results, status) => {
                        $('.account-event-add-location-gapi-search-results-list').html('');
                        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                            for (var i = 0; i < results.length; i++) {
                                $('.account-event-add-location-gapi-search-results-list').append(   '<div class="account-event-add-location-gapi-search-results-list-item" data-id="' + results[i].place_id + '">' +
                                                                                                        '<div class="account-event-add-location-gapi-search-results-list-item-title">' + results[i].name + '</div>' +
                                                                                                        '<div class="account-event-add-location-gapi-search-results-list-item-address">' + results[i].formatted_address + '</div>' +
                                                                                                    '</div>');
                            }
                            $('.account-event-add-location-gapi-search-results-count span').html(results.length);
                        } else {
                            $('.account-event-add-location-gapi-search-results-list').html('<div class="account-event-add-location-gapi-search-results-list-empty">' + $('.account-event-add-location-gapi-search-results-list').attr('data-emptytext') + '</div>');
                            $('.account-event-add-location-gapi-search-results-count span').html('0');
                        }
                        $('.account-event-add-location-gapi-search').addClass('open');
                        $('.account-event-add-location-gapi-search').removeClass('loading');
                    });
                }
            }
        } else {
            $('.account-event-add-location-gapi-search .form-input input').trigger('focus');
        }
        e.preventDefault();
    });

    $('body').on('keydown', '.account-event-add-location-gapi-search .form-input input', function(e) {
        if (e.keyCode === 13) {
            $('.account-event-add-location-gapi-search-btn a').trigger('click');
            e.preventDefault();
        }
    });

    $('body').on('focus', '.account-event-add-location-gapi-search .form-input input', function() {
        var curInput = $(this);
        if (curInput.parent().hasClass('full')) {
            $('.account-event-add-location-gapi-search').addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.account-event-add-location-gapi-search').length == 0) {
            $('.account-event-add-location-gapi-search').removeClass('open');
        }
    });

    $('body').on('click', '.account-event-add-location-gapi-search-results-list-item', function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.account-event-add-location-gapi-search-results-list-item.active').removeClass('active');
            curItem.addClass('active');
            var curID = curItem.attr('data-id');
            $('.account-event-add-location-gapi-detail').addClass('open loading');
            $('.account-event-add-location-gapi-detail-photo, .account-event-add-location-gapi-detail-item').removeClass('visible');
            var request = {
                placeId: curID,
                fields: ['photos', 'adr_address', 'formatted_phone_number', 'website', 'geometry'],
            };
            if (service != null) {
                service.getDetails(request, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                        if (place.photos && place.photos.length > 0) {
                            $('.account-event-add-location-gapi-detail-photo').addClass('visible').html('<img src="' + place.photos[0].getUrl() + '" alt="">');
                        }
                        if (place.adr_address) {
                            var newHTML = $('<div>' + place.adr_address + '</div>');
                            if (newHTML.find('.locality').length == 1) {
                                $('.account-event-add-location-gapi-detail-item-city').addClass('visible');
                                $('.account-event-add-location-gapi-detail-item-city .account-event-add-location-gapi-detail-item-value').html(newHTML.find('.locality').html());
                            }
                            if (newHTML.find('.street-address').length == 1) {
                                $('.account-event-add-location-gapi-detail-item-address').addClass('visible');
                                $('.account-event-add-location-gapi-detail-item-address .account-event-add-location-gapi-detail-item-value').html(newHTML.find('.street-address').html());
                            }
                        }
                        if (place.formatted_phone_number) {
                            $('.account-event-add-location-gapi-detail-item-phone').addClass('visible');
                            $('.account-event-add-location-gapi-detail-item-phone .account-event-add-location-gapi-detail-item-value').html(place.formatted_phone_number);
                        }
                        if (place.website) {
                            $('.account-event-add-location-gapi-detail-item-url').addClass('visible');
                            $('.account-event-add-location-gapi-detail-item-url .account-event-add-location-gapi-detail-item-value a span').html(place.website);
                            $('.account-event-add-location-gapi-detail-item-url .account-event-add-location-gapi-detail-item-value a').attr('href', place.website);
                        }
                        if (place.geometry && place.geometry.location) {
                            $('.account-event-add-location-gapi-detail').attr('data-lat', place.geometry.location.lat());
                            $('.account-event-add-location-gapi-detail').attr('data-lng', place.geometry.location.lng());
                        }
                    }
                    $('.account-event-add-location-gapi-detail').removeClass('loading');
                });
            }
        }
        $('.account-event-add-location-gapi-search').removeClass('open');
    });

    $('body').on('click', '.account-event-add-location-gapi-search-results-clear a', function(e) {
        $('.account-event-add-location-gapi-search .form-input input').val('').removeClass('full focus').trigger('blur');
        $('.account-event-add-location-gapi-search').removeClass('open');
        $('.account-event-add-location-gapi-detail').removeClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.account-event-add-location-gapi-detail-btn a', function(e) {
        $('.account-event-add-location-city').val($('.account-event-add-location-gapi-detail-item-city .account-event-add-location-gapi-detail-item-value').html()).trigger('change').trigger({type: 'select2:select'});
        $('.account-event-add-location-address').val($('.account-event-add-location-gapi-detail-item-address .account-event-add-location-gapi-detail-item-value').html()).parents().filter('.form-input').addClass('full');
        $('.account-event-add-location-address-english').val($('.account-event-add-location-gapi-detail-item-address .account-event-add-location-gapi-detail-item-value').html()).parents().filter('.form-input').addClass('full');
        $('.account-event-add-location-address-latitude').val($('.account-event-add-location-gapi-detail').attr('data-lat')).parents().filter('.form-input').addClass('full');
        $('.account-event-add-location-address-longitude').val($('.account-event-add-location-gapi-detail').attr('data-lng')).parents().filter('.form-input').addClass('full');
        $('.account-event-add-location-website').val($('.account-event-add-location-gapi-detail-item-url .account-event-add-location-gapi-detail-item-value a').attr('href')).parents().filter('.form-input').addClass('full');
        if (map && marker) {
            var newCoords = new google.maps.LatLng($('.account-event-add-location-gapi-detail').attr('data-lat'), $('.account-event-add-location-gapi-detail').attr('data-lng'));
            marker.setPosition(newCoords);
            map.setCenter(newCoords);
        }
        e.preventDefault();
    });
});