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

    $('.filters-calendar').mCustomScrollbar({
        axis: 'x',
        scrollButtons: {
            enable: true
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
        if ($(e.target).parents().filter('.filters-select').length == 0) {
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
        if ($(e.target).parents().filter('.filters-date').length == 0 && !$(e.target).hasClass('air-datepicker-cell') && !$(e.target).hasClass('air-datepicker-nav--title') && $(e.target).parents().filter('.air-datepicker-nav--title').length == 0) {
            $('.filters-date').removeClass('open');
        }
    });

    $('.filters-date-calendar').each(function() {
        var curCalendar = $(this);
        var dp = new AirDatepicker('#' + $(this).attr('id'), {
            range: true,
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

        $('.filter-letters input').prop('checked', false);

        $('.filters form').trigger('submit');
        e.preventDefault();
    });

    $('.filters-params-dates').click(function(e) {
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

                for (var j = 0; j < mapIcons.length; j++) {
                    if (mapIcons[j].type == activeItem.attr('data-type')) {
                        curIcon = mapIcons[j];
                    }
                }
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

            for (var j = 0; j < mapIcons.length; j++) {
                if (mapIcons[j].type == curItem.attr('data-type')) {
                    curIcon = mapIcons[j];
                }
            }
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

            for (var j = 0; j < mapIcons.length; j++) {
                if (mapIcons[j].type == curItem.attr('data-type')) {
                    curIcon = mapIcons[j];
                }
            }
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

            for (var j = 0; j < mapIcons.length; j++) {
                if (mapIcons[j].type == curItem.attr('data-type')) {
                    curIcon = mapIcons[j];
                }
            }
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
                curSelect.find('.filters-select-title span').html('&nbsp;(' + curSelect.find('.filters-select-checkbox input:checked').length + ')');
                curSelect.find('.filters-select-checkbox input:checked').each(function() {
                    var curOption = $(this);
                    curSelect.find('.filters-select-mobile-values').append('<div class="filters-select-mobile-value">' + curOption.parent().find('span').text() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#filters-select-mobile-value-remove"></use></svg></a></div>');
                });
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

    var indexFormInput = Date.now();
    curForm.find('.form-input-date input').each(function() {
        var curInput = $(this);
        curInput.attr('autocomplete', 'off');
        curInput.prop('readonly', true);
        var curID = 'form-input-date-id-' + indexFormInput;
        curInput.attr('id', curID);
        indexFormInput++;
        new AirDatepicker('#' + curID, {
            classes: 'form-input-datepicker',
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
                            curFiles.find('.form-files-list').append('<div class="form-files-list-item form-files-list-item-img" style="background-image:url(' + data.result.url + ')"><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-item-delete"></use></svg></a></div>');
                        }
                    } else {
                        if (!curFiles.hasClass('form-files-images')) {
                            curFiles.find('.form-files-list').html('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-doc"></use></svg></div><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' МB</div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>');
                        } else {
                            curFiles.find('.form-files-list').html('<div class="form-files-list-item form-files-list-item-img" style="background-image:url(' + data.result.url + ')"><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-item-delete"></use></svg></a></div>');
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
                    'type': curItem.attr('data-type')
                });
            });

            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            markers = [];

            for (var i = 0; i < data.length; i++) {
                var curIcon = null
                for (var j = 0; j < mapIcons.length; j++) {
                    if (mapIcons[j].type == data[i].type) {
                        curIcon = mapIcons[j];
                    }
                }
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
            $('.page-map-list .card').eq(curIndex).find('.card-content').click();
            window.setTimeout(function() {
                $('.page-map-list-content').mCustomScrollbar('scrollTo', $('.page-map-list .card').eq(curIndex));
            }, 300);
            if (mapSwiper) {
                mapSwiper.slideTo(curIndex);
            }
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

                    for (var j = 0; j < mapIcons.length; j++) {
                        if (mapIcons[j].type == curItem.attr('data-type')) {
                            curIcon = mapIcons[j];
                        }
                    }

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
                    var curIcon = null;
                    var iconImg = '';
                    var iconWidth = 0;
                    var iconHeight = 0;
                    var iconCenterX = 0;
                    var iconCenterY = 0;

                    for (var j = 0; j < mapIcons.length; j++) {
                        if (mapIcons[j].type == curItem.attr('data-type')) {
                            curIcon = mapIcons[j];
                        }
                    }

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
});

var mapSwiper;

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
    } else {
        if ($('.page-map-list-content').length > 0) {
            $('.page-map-list-content').mCustomScrollbar('destroy');

            var curSlider = $('.page-map-list-content');
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

    $('.header-user-account-link').click(function(e) {
        $('html').toggleClass('header-user-menu-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-user-account').length == 0) {
            $('html').removeClass('header-user-menu-open');
        }
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

    $('.pager-size-select-current').click(function() {
        $(this).parent().toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.pager-size-select').length == 0) {
            $('.pager-size-select').removeClass('open');
        }
    });

    $('.pager-size-select-item label input').change(function() {
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
                classes: 'form-input-datepicker',
                prevHtml: '<svg viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
                nextHtml: '<svg viewBox="0 0 24 24"><path d="M9 18L15 12L9 6" troke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            });
        });

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
        if (curValue.length > 2) {
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
        }
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
        $('.account-event-add-location-address').val($('.account-event-add-location-detail-address').html()).parents().filter('.form-input').addClass('full');;
        $('.account-event-add-location-address-english').val($('.account-event-add-location-detail-address-english').html()).parents().filter('.form-input').addClass('full');;
        $('.account-event-add-location-address-latitude').val($('.account-event-add-location-detail-point-latitude').html()).parents().filter('.form-input').addClass('full');;
        $('.account-event-add-location-address-longitude').val($('.account-event-add-location-detail-point-longitude').html()).parents().filter('.form-input').addClass('full');;
        if (map && marker) {
            var newCoords = new google.maps.LatLng($('.account-event-add-location-detail-point-latitude').html(), $('.account-event-add-location-detail-point-longitude').html());
            marker.setPosition(newCoords);
            map.setCenter(newCoords);
        }
        e.preventDefault();
    });

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
        if (curValue.length > 2) {
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
        }
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
        $('.account-event-add-main-photo').val('').trigger('change');
        e.preventDefault();
    });

    $('.account-event-add-video-preview').change(function(e) {
        var currFiles = e.target.files;
        if (currFiles.length > 0) {
            $('.account-event-add-media-video-player-start').attr('style', 'background-image:url(' + URL.createObjectURL(currFiles[0]) + ')');
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
        }
    });

    $('.account-event-add-video').change(function(e) {
        var curValue = $(this).val();
        if (curValue != '') {
            $('.account-event-add-media-video-player-start').attr('href', curValue);
            if ($('.account-event-add-media-video-player-start').length == 0) {
                $('.account-event-add-media-video-player').html('<a href="" class="account-event-add-media-video-player-start" style=""><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#account-icon-video-play"></use></svg></a>');
            }
            if ($('.account-event-add-media-video-player-start').attr('style') != '') {
                $('.account-event-add-media-video-preview').addClass('visible');
            }
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

});