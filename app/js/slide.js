let photoSlider = new Swiper(".photo__slider", {
    slidesPerView: 1,
    spaceBetween: 40,
    breakpoints: {
        1280: {
            spaceBetween: 40,
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});