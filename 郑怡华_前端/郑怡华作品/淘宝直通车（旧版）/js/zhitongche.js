$(document).ready(function () {
    var $oNav = $('.menu');
    var $aLi = $('.menu li'); // 所有一级菜单
    var $aSubNav = $('.menu li .sub-nav') // 所有子菜单
    var i = 0;

    $('.menu li').mouseover(function () {
        $('.menu li .sub-nav').css({"display": "none"});// 所有的子菜单隐藏
        $(this).find(".sub-nav").css({"display": "block"});

        // 让子菜单始终在一级菜单内部
        $('.menu').width() - $(this).offset().left > $(this).find(".sub-nav").width() ?
            $(this).find(".sub-nav").css({"left": "$(this).offset().left + 'px'"}) :
            $(this).find(".sub-nav").css({"right": 0})
    });

    /*
    、///点击改变背景样式
    $('.menu li').click(function () {
        $('.menu li a').css({"background": "none"});
        $('.menu li a span').css({"background": "none"});
        $('.menu li a span').css({"color": "#fff"});
        $(this).find("a").css({"background": "url(img/menu-left.png) no-repeat left"});
        $(this).find("a span").css({"background": "url(img/menu-right.png) no-repeat left"});
        $(this).find("a span").css({"color": "#dd2a00"});
    })*/
})