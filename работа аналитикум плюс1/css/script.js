
const tabs = document.querySelectorAll('.tech-tab');
const slides = document.querySelectorAll('.tech-slide');
const descriptions = document.querySelectorAll('.tech-description-content');
const consentCheckbox = document.getElementById('userConsent');
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger-menu');
    const menu = document.querySelector('.main-menu');
    const overlay = document.querySelector('.overlay');
    const html = document.documentElement;
    const body = document.body;

    if (burger && menu && overlay) {
        burger.addEventListener('click', function (e) {
            e.preventDefault();
            menu.classList.toggle('active');
            overlay.classList.toggle('active');


            html.classList.toggle('lock');
            body.classList.toggle('lock');
        });

        overlay.addEventListener('click', function () {
            menu.classList.remove('active');
            overlay.classList.remove('active');


            html.classList.remove('lock');
            body.classList.remove('lock');
        });
    }
});


document.querySelector('.overlay').addEventListener('click', function () {
    const menu = document.querySelector('.main-menu');
    const overlay = document.querySelector('.overlay');

    menu.classList.remove('active');
    overlay.classList.remove('active');
});
    const submitBtn = document.getElementById('submitBtn');


    submitBtn.disabled = !consentCheckbox.checked;


    consentCheckbox.addEventListener('change', function() {
        submitBtn.disabled = !this.checked;
    });

tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        tabs.forEach(t => t.classList.remove('active'));
        slides.forEach(s => s.classList.remove('active'));
        descriptions.forEach(d => d.classList.remove('active'));


        tab.classList.add('active');


        const tabName = tab.getAttribute('data-tab');
        document.querySelector(`.tech-slide[data-tab="${tabName}"]`).classList.add('active');
        document.querySelector(`.tech-description-content[data-tab="${tabName}"]`).classList.add('active');
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');


        document.querySelectorAll('.accordion-item').forEach(el => {
            el.classList.remove('active');
        });


        if (!isActive) {
            item.classList.add('active');
        }
    });
});


const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


const paginationButtons = document.querySelectorAll('.custom-pagination-btn');


swiper.on('slideChange', function() {
    const realIndex = swiper.realIndex;
    paginationButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === realIndex);
    });
});


paginationButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        swiper.slideTo(index);
    });
});


ymaps.ready(init);

function init() {

    const map = new ymaps.Map('map', {
        center: [55.159897, 61.402554],
        zoom: 10,
        controls: ['zoomControl']
    });


    const markerLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="custom-marker"></div>'
    );


    const chelyabinsk = new ymaps.Placemark(
        [55.159897, 61.402554],
        {
            hintContent: 'Челябинск, ул. Довятова, 9 оф.27',
            balloonContent: '<b>8 (351) 225 62 41</b>'
        },
        {
            iconLayout: markerLayout,
            iconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 20
            }
        }
    );

    const magnitogorsk = new ymaps.Placemark(
        [53.41861, 58.97028],
        {
            hintContent: 'Магнитогорск, ул. Строителей, 26',
            balloonContent: '<b>8 (3519) 335-123</b>'
        },
        {
            iconLayout: markerLayout,
            iconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 20
            }
        }
    );

    const petersburg = new ymaps.Placemark(
        [59.93428, 30.3351],
        {
            hintContent: 'Санкт-Петербург',
            balloonContent: '<b>+7 812 507-98-17</b>'
        },
        {
            iconLayout: markerLayout,
            iconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 20
            }
        }
    );


    map.geoObjects.add(chelyabinsk);
    map.geoObjects.add(magnitogorsk);
    map.geoObjects.add(petersburg);


    map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true
    });
}
