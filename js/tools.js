$(document).ready(function() {

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

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

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

    initMainPage();

    function initMainPage() {
        $('.main-events-list').each(function() {
            var curGallery = $(this);
            curGallery.find('.main-events-preview-item').eq(0).addClass('active');
            var options = {
                infinite: true,
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
            dots: true,
            responsive: [
                {
                    breakpoint: 1259,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: false
                    }
                }
            ]
        });
    }

    $('.detail-media-slider-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></button>',
        dots: false
    }).on('setPosition', function(event, slick) {
        var currentSlide = $('.detail-media-slider-list').slick('slickCurrentSlide');
        $('.detail-media-slider-preview a.active').removeClass('active');
        $('.detail-media-slider-preview a').eq(currentSlide).addClass('active');
    });

    $('.detail-media-slider-preview a').click(function(e) {
        var curIndex = $('.detail-media-slider-preview a').index($(this));
        $('.detail-media-slider-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.detail-info').each(function() {
        var curBlock = $(this);
        var newMenu = '<ul>';
        curBlock.find('.detail-info-tab').each(function() {
            var textCount = '';
            if ($(this).find('.detail-info-review').length > 0) {
                textCount = '<span>' + $(this).find('.detail-info-review').length + '</span>';
            }
            newMenu += '<li><a href="#">' + $(this).attr('data-title') + textCount + '</a></li>';
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
        if (!curLi.hasClass('active')) {
            var curBlock = curLi.parents().filter('.detail-info');
            var curIndex = curBlock.find('.detail-info-menu li').index(curLi);
            curBlock.find('.detail-info-menu li.active').removeClass('active');
            curLi.addClass('active');
            curBlock.find('.detail-info-tab.active').removeClass('active');
            curBlock.find('.detail-info-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.other-section .cards').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1259,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false
                }
            }
        ]
    });

    $('.restaurants-special-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></button>',
        dots: true
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

    $('.filters-calendar-month-days input').change(function() {
        $('.filters form').trigger('submit');
    });

    $('.filter-letters input').change(function() {
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

    $('.filters-search-close').click(function(e) {
        $('.filters-search').removeClass('open');
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
            onSelect(date, formattedDate) {
                curCalendar.parent().find('> input[type="hidden"]').val(date.formattedDate.join(','));
            }

        });
        curCalendar.data('dp', dp);
    });

    $('.filters-checkbox input').change(function() {
        $('.filters form').trigger('submit');
    });

    $('.filters-select-checkbox input').change(function() {
        $('.filters form').trigger('submit');
    });

    $('.filters-params-clearall a').click(function(e) {
        $('.filters-search-input input').val('');

        $('.filters-checkbox input').prop('checked', false);

        $('.filters-select-checkbox input').prop('checked', false);
        $('.filters-select-range-field-input input').each(function() {
            $(this).val($(this).attr('data-default'));
        });

        $('.filters-date').each(function() {
            var curDate = $(this);
            var dp = curDate.find('.filters-date-calendar').data('dp');
            dp.clear();
        });

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

    $('.filters-params').each(function() {
        updateFiltersStatus();
    });

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
                    $('.catalogue').html(html);

                    updateFiltersStatus();

                    initMainPage();

                    updateMap();

                    $('.catalogue').removeClass('loading');
                });
            }
        });
    });

    $('body').on('click', '.cards-more a', function(e) {
        $('.cards-more').addClass('loading');
        var curLink = $(this);
        var curForm = $('.filters form');
        var curData = curForm.serialize();
        curData += '&page=' + curLink.attr('data-page');
        $.ajax({
            type: 'POST',
            url: curLink.attr('href'),
            dataType: 'html',
            data: curData,
            cache: false
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('The service is temporarily unavailable, try again later.');
            $('.cards-more').removeClass('loading');
        }).done(function(html) {
            $('.cards-more').removeClass('loading');
            $('.cards').append($(html).find('.cards').html());
            if ($(html).find('.cards-more').length == 1) {
                $('.cards-more').html($(html).find('.cards-more').html());
            } else {
                $('.cards-more').remove();
            }
        });
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

    $('body').on('click', '.page-map-list-item', function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {

            var curIcon = null;
            var iconImg = '';
            var iconWidth = 0;
            var iconHeight = 0;
            var iconCenterX = 0;
            var iconCenterY = 0;

            var activeItem = $('.page-map-list-item.active');
            if (activeItem.length == 1) {
                activeItem.removeClass('active');
                var activeIndex = $('.page-map-list-item').index(activeItem);

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
            var curIndex = $('.page-map-list-item').index(curItem);

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
    
    $('.page-map-list-close').click(function(e) {
        $('.page-map-list').removeClass('visible');
        e.preventDefault();
    });

});

$(window).on('load', function() {
    $('.youtube-video').each(function() {
        $(this).replaceWith('<iframe width="560" height="315" src="' + $(this).attr('data-href') + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
    });
});

function updateFiltersStatus() {

    $('.filters-params').each(function() {
        var curStatus = false;

        if ($('.filters-search-input input').length == 1 && $('.filters-search-input input').val() != '') {
            curStatus = true;
            $('.filters-search').addClass('active');
        } else {
            $('.filters-search').removeClass('active');
        }

        $('.filters-select').each(function() {
            var curSelect = $(this);
            var selectedHTML = '';
            if (curSelect.find('.filters-select-checkbox').length > 0) {
                curSelect.find('.filters-select-checkbox input:checked').each(function() {
                    selectedHTML += '<div class="filters-params-item-selected-values-item">' + $(this).parent().find('span').html() + '</div>';
                });
            }
            if (curSelect.find('.filters-select-range').length > 0) {
                var rangeActive = false;
                curSelect.find('.filters-select-range-field-input input').each(function() {
                    var curInput = $(this);
                    if (curInput.val() != curInput.attr('data-default')) {
                        rangeActive = true;
                    }
                });
                if (rangeActive) {
                    curSelect.find('.filters-select-range-field-input input').each(function() {
                        var curInput = $(this);
                        var curField = curInput.parents().filter('.filters-select-range-field');
                        var curText = '';
                        if (curField.find('.filters-select-range-field-title strong').length == 1) {
                            curText = curField.find('.filters-select-range-field-title strong').html() + '&nbsp;';
                        }
                        var curUnit = '';
                        if (curField.find('.filters-select-range-field-title span').length == 1) {
                            curUnit = '&nbsp;' + curField.find('.filters-select-range-field-title span').html();
                        }
                        selectedHTML += '<div class="filters-params-item-selected-values-text">' +
                                            curText +
                                            curInput.val() +
                                            curUnit +
                                        '</div>';
                    });
                }
            }
            if (selectedHTML != '') {
                curStatus = true;
                curSelect.addClass('active');
                curSelect.find('.filters-params-item-selected-values').html(selectedHTML);
            } else {
                curSelect.removeClass('active');
                curSelect.find('.filters-params-item-selected-values').html(selectedHTML);
            }
        });

        $('.filters-date').each(function() {
            var curDate = $(this);
            var curInput = curDate.find('.filters-date-content > input[type="hidden"]');
            if (curInput.val() != '') {
                curStatus = true;
                curDate.addClass('active');
                var curValue = curInput.val().split(',');
                var selectedHTML = '';
                for (var i = 0; i < curValue.length; i++) {
                    selectedHTML += '<div class="filters-params-item-selected-values-text">' + getDateText(curValue[i]) + '</div>';
                }
                curDate.find('.filters-params-item-selected-values').html(selectedHTML);
            } else {
                curDate.removeClass('active');
                curDate.find('.filters-params-item-selected-values').html('');
            }
        });

        $('.filters-checkbox').each(function() {
            var curCheckbox = $(this);
            if (curCheckbox.find('input').prop('checked')) {
                curStatus = true;
                curCheckbox.addClass('active');
            } else {
                curCheckbox.removeClass('active');
            }
        });

        if (curStatus) {
            $('.filters-params').addClass('active');
        } else {
            $('.filters-params').removeClass('active');
        }
    });

    $('#free-checkbox input').change(function() {
        if ($('#free-checkbox input').prop('checked')) {
            $('#price-select').addClass('disabled');
        } else {
            $('#price-select').removeClass('disabled');
        }
    });

}

function initForm(curForm) {
    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        options['dropdownParent'] = curForm;

        curSelect.select2(options);

        curSelect.on('select2:select', function(e) {
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
            curSelect.parent().find('select').addClass('valid');
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('select').removeClass('valid');
            }
        });

        if (curSelect.val() != '' && curSelect.val() !== null) {
            curSelect.trigger({type: 'select2:select'})
            curSelect.parent().find('select').addClass('valid');
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

                if (curForm.hasClass('ajax-form')) {
                    curForm.addClass('loading');
                    var formData = new FormData(form);

                    if (curForm.find('[type=file]').length != 0) {
                        var file = curForm.find('[type=file]')[0].files[0];
                        formData.append('file', file);
                    }

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
            $('.page-map-list-item').each(function() {
                var curItem = $(this);
                var isActive = curItem.hasClass('active');
                data.push({
                    'longitude': Number(curItem.attr('data-longitude')),
                    'latitude': Number(curItem.attr('data-latitude')),
                    'title': curItem.find('.page-map-list-item-title').text(),
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
            $('.page-map-list-item').eq(curIndex).trigger('click');
            $('.page-map-list-content').mCustomScrollbar('scrollTo', $('.page-map-list-item').eq(curIndex));
            $('.page-map-list').addClass('visible');
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

$(window).on('load resize', function() {
    if ($(window).width() > 1259) {
        if ($('.filters-params').length > 0) {
            $('.filters-params').mCustomScrollbar('destroy');
        }

        if ($('.page-map-list-content').length > 0) {
            $('.page-map-list-content').mCustomScrollbar('destroy');
            $('.page-map-list-content').mCustomScrollbar({
                axis: 'y'
            });
        }
    } else {
        if ($('.filters-params').length > 0 && $('.page-map-filters').length == 0) {
            $('.filters-params').mCustomScrollbar({
                axis: 'x'
            });
        }

        if ($('.page-map-list-content').length > 0) {
            $('.page-map-list-content').mCustomScrollbar('destroy');
            $('.page-map-list-content').mCustomScrollbar({
                axis: 'x'
            });
        }
    }
});