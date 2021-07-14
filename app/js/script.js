$("a[href^='#']").click(function() {
    var _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
});

window.onload = function() {
    let loader = document.querySelector('.loader-wrapper');
    loader.classList.add('loaded');
}

let burger = document.querySelector('.header__burger');
let headerList = document.querySelector('.header__list');
burger.addEventListener('click', function(e) {
    e.preventDefault();
    headerList.classList.toggle('active');
})

$(document).click(function(e) {
    if ($(e.target).closest('.header__list').length || $(e.target).closest('.header__burger').length) {
        // клик внутри элемента 
        return;
    }
    // клик снаружи элемента 
    $('.header__list').removeClass('active');
});


$.fn.parallax = function(resistance, mouse) {
    $el = $(this);
    TweenLite.to($el, 0.2, {
        x: -((mouse.clientX - window.innerWidth / 10) / resistance),
        y: -((mouse.clientY - window.innerHeight / 10) / resistance)
    });
};

$(document).mousemove(function(e) {
    $(".confetti1").parallax(100, e);
    $(".confetti2").parallax(-200, e);
    $(".confetti3").parallax(50, e);
});

AOS.init();

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

function calculateCircle(hours, minutes, seconds, days) {
    var stepMS = 360 / 60;
    var stepH = 360 / 24;
    var stepD = 360 / 10;
    var d = (10 - days) * stepD;
    var s = (60 - seconds) * stepMS;
    var m = (60 - minutes) * stepMS;
    var h = (24 - hours) * stepH;

    document.querySelector('.arc-minutes').setAttribute("d", describeArc(62, 62, 60, 0, m));
    document.querySelector('.arc-seccond').setAttribute("d", describeArc(62, 62, 60, 0, s));
    document.querySelector('.arc-hours').setAttribute("d", describeArc(62, 62, 60, 0, h));
    document.querySelector('.arc-days').setAttribute("d", describeArc(62, 62, 60, 0, d));
}

document.addEventListener('DOMContentLoaded', () => {
    const newYear = new Date('July 5 2021 15:00:00');

    const daysVal = document.querySelector('.count__days .count__time');
    const hoursVal = document.querySelector('.count__hours .count__time');
    const minutesVal = document.querySelector('.count__minutes .count__time');
    const secondsVal = document.querySelector('.count__seconds .count__time');

    const daysText = document.querySelector('.count__days .count__type');
    const hoursText = document.querySelector('.count__hours .count__type');
    const minutesText = document.querySelector('.count__minutes .count__type');
    const secondsText = document.querySelector('.count__seconds .count__type');


    function declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    const timeCount = () => {
        let now = new Date();
        let leftUntil = newYear - now;

        let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
        let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
        let seconds = Math.floor(leftUntil / 1000) % 60;

        calculateCircle(hours, minutes, seconds, days);
        hoursVal.textContent = hours;
        minutesVal.textContent = minutes;
        secondsVal.textContent = seconds;
        daysVal.textContent = days;

        daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);
        hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
        minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        secondsText.textContent = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
    };

    timeCount();

    setInterval(timeCount, 1000);
});