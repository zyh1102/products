$(document).ready(function () {
    /* 导航栏 */
    $("#place li").hover(function(){
        $(this).css("color","#d60d03");
    },function(){
        $(this).css("color","");
    });
    $("#place li").click(function () {

        $(this).addClass("current-place").siblings().removeClass("current-place");
    });

    /* 搜索框 */
    $(".searchTabs a").click(function () {
        $(this).addClass("current-tab").siblings().removeClass("current-tab");
        $(".search-area input[type=text]").attr("placeholder",$(this).attr("input-text"));
    });

    /* 文章 */
    var $ulPos = 0;
    $("#up").click(function () {
        $ulPos++;
        if($ulPos > 4){
            $ulPos = 0;
        };
        $("#articles").addClass("animated slideInUp")
        $("#articles ul").css('top','-'+25*$ulPos+'px');
    });
    $("#down").click(function () {
        $ulPos--;
        if($ulPos < 0){
            $ulPos = 4;
        }
        $("#articles").addClass("animated slideInDown")
        $("#articles ul").css('top','-'+25*$ulPos+'px');
    });

    /* 网红店铺 */
    $(".shop-tab a").click(function () {
        $(this).addClass("current-tab").siblings().removeClass("current-tab");
        $(".shop-tab img").attr("src","img/down2.png");
        $(".current-tab img").attr("src","img/down.png");
        var $shopMainId = $(this).attr('shop-main');
        $("#"+$shopMainId).addClass("current-shop-main").siblings().removeClass("current-shop-main");
    });

    /* subway */
    $(".subway-tabs a").click(function () {
        $(this).addClass("current-tab").siblings().removeClass("current-tab");
        $(".subway-tabs img").attr("src","img/down2.png");
        $(".current-tab img").attr("src","img/down.png");
        var $subwayMainId = $(this).attr('subway-main');
        $("#"+$subwayMainId).addClass("current-subway").siblings().removeClass("current-subway");
    });


    /* bbs */
    $(".bbs-titles .bbs-title").hover(function () {
        var $bbsId = $(this).attr('bbs-list');
        $("#"+$bbsId).show();
    },function () {});
    $(".bbs-lists .bbs-list").hover(function () {},function () {
        $(this).hide();
    });


    /* 知道分子 */
    $(".advice-tabs a").click(function () {
        $(this).addClass("current-tab").siblings().removeClass("current-tab");
        $(".advice-tabs img").attr("src","img/down2.png");
        $(".current-tab img").attr("src","img/down.png");
        var $adviceMainId = $(this).attr('advice-list');
        $("#"+$adviceMainId).addClass("current-list").siblings().removeClass("current-list");
    });

    /* recommend */
    $(".pic-list img").click(function () {
        $(".main-pic img").hide();
        $(".main-pic img").attr("src",$(this).attr("src"));
        $(".main-pic img").fadeIn();
    });

    /* calendar */
    var $oDate = $(".dates").find(".active-date");
    var $oDetail = $(".calendar-detail");
    var $oH1 = $oDetail.find("h1");
    var $oP = $oDetail.find("p");
    var $oWeek = $(".calendar-title li");
    $oDate.hover(function () {
        var index = (($(this).text())%7+2)%7;
        var left = parseInt($(this).position().left)+50;
        var top = parseInt($(this).position().top)+200;
        $(".calendar-detail img:eq(1)").attr("src",$(this).attr("img"));
        $(".calendar-detail img:eq(1)").css("border","3px solid #d30408");
        $oP.text($(this).attr("p"));
        $oH1.text($oWeek.eq(index).text());
        $oDetail.show().css({"left":left,"top":top});
    },function () {
    });
    $oDetail.hover(function () {},function () {
        $(this).hide();
    })

    /* COUPONS抢券 */
    $(".coupons-tabs a").click(function () {
        $(this).addClass("current-tab").siblings().removeClass("current-tab");
        $(".coupons-tabs img").attr("src","img/down2.png");
        $(".current-tab img").attr("src","img/down.png");
        var $couponsMainId = $(this).attr('coupons-main');
        $("#"+$couponsMainId).addClass("current-coupons-main").siblings().removeClass("current-coupons-main");
    });


    /* 红人烧客 */
    $(".people li").hover(function () {
        $(this).find("a").show();
        },function () {
        $(this).find("a").hide();
    });

})


/*
搜索框
    1. 找对象，初始化数据
    2. 点击换tab样式
    3. 鼠标focus就消失
    4. 鼠标blur 如果是空 就和以前一样就，如果非空，就保留
 */
function tab(oList, oContent, ev, class1, class2) {
    oList.each(function (index) {
        $(this).bind(ev, function () {
            var $index = oList.index(this);
            $(this).addClass(class1).siblings().removeClass(class1);
            oContent.eq($index).addClass(class2).siblings().removeClass(class2);
        })
    })

}
