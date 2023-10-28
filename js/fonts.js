window.onload = function() {
    var html = document.documentElement;

    var fontsfile = document.createElement('link');
    fontsfile.href = pathTemplate + 'css/fonts.css';
    fontsfile.rel = 'stylesheet';
    document.head.appendChild(fontsfile);

    if (sessionStorage.fontsLoaded) {
        html.classList.add('fonts-loaded');
        window.setTimeout(function() { window.dispatchEvent(new Event('resize')); updateSwipers(); }, 500);
    } else {
        var script = document.createElement('script');
        script.src = pathTemplate + 'js/fontfaceobserver.js';
        script.async = true;

        script.onload = function () {
            var Mulish300 = new FontFaceObserver('Mulish', {
                weight: '300'
            });
            var Mulish400 = new FontFaceObserver('Mulish', {
                weight: 'normal'
            });
            var Mulish500 = new FontFaceObserver('Mulish', {
                weight: '500'
            });
            var Mulish500i = new FontFaceObserver('Mulish', {
                weight: '500',
                style: 'italic'
            });
            var Mulish600 = new FontFaceObserver('Mulish', {
                weight: '600'
            });
            var Mulish600i = new FontFaceObserver('Mulish', {
                weight: '600',
                style: 'italic'
            });
            var Mulish700 = new FontFaceObserver('Mulish', {
                weight: 'bold'
            });
            var Mulish800 = new FontFaceObserver('Mulish', {
                weight: '800'
            });
            var Mulish900 = new FontFaceObserver('Mulish', {
                weight: '900'
            });
            var YesevaOne400 = new FontFaceObserver('YesevaOne', {
                weight: 'normal'
            });

            Promise.all([
                Mulish300.load(),
                Mulish400.load(),
                Mulish500.load(),
                Mulish500i.load(),
                Mulish600.load(),
                Mulish600i.load(),
                Mulish700.load(),
                Mulish800.load(),
                Mulish900.load(),
                YesevaOne400.load()
            ]).then(function () {
                html.classList.add('fonts-loaded');
                sessionStorage.fontsLoaded = true;
                window.setTimeout(function() { window.dispatchEvent(new Event('resize')); updateSwipers(); }, 500);
            });
        };
        document.head.appendChild(script);
    }
}

function updateSwipers() {
    $('.swiper-wrapper').each(function() {
        const swiper = $(this).parent()[0].swiper;
        if (swiper) {
            swiper.update();
        }
    });
}