$(document).ready(function () {
    $(".collapse ul li").mousemove(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
})