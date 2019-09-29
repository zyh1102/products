window.onload = function () {

    //网站顶部下拉菜单
    var list = getObj.byID("list");
    var ul1 = getObj.byID("guideline");
    var ul2 = getObj.byID("service");
    var ul3 = getObj.byID("office");

    //鼠标滑过菜单显示
    ul1.onmouseover = ul2.onmouseover = ul3.onmouseover = function () {
        //获取所有li
        var oLis = this.getElementsByTagName("li");
        for(var j =0;j<oLis.length;j++){
            oLis[j].style.display = "block";
        }
    }
    ul1.onmouseout = ul2.onmouseout = ul3.onmouseout = function () {
        //获取所有li
        var oLis = this.getElementsByTagName("li");
        for(var j =1;j<oLis.length;j++){
            oLis[j].style.display = "none";
        }
    }


    //咨询商家的卡片
    var a = getObj.byID("consult");
    var companyInfo = getObj.byID("companyInfo");
    a.onclick = function () {
        if(companyInfo.style.display == "block"){
            companyInfo.style.display = "none";
        }else{
            companyInfo.style.display = "block";
        }
    };
    companyInfo.onmouseout = function (ev) {
        companyInfo.style.display = "none";
    }


    //图片淡入淡出
    var navDiv = document.getElementById("navDiv");
    var allA = navDiv.getElementsByTagName("a");//获取超链接按钮
    var imgList = document.getElementById("imgList");
    var imgs = imgList.getElementsByTagName("li");//获取图片
    var index = 3; //当前图片的序号
    var zIndex = 1;


    allA[index].style.backgroundColor = "black";//设置超链接方块黑色
    var timer;


    for(var i=0;i<allA.length;i++){//为所有超链接绑定单击响应函数
        allA[i].index = i;
        allA[i].onclick = function () {
            index = this.index;//当前是哪一张图片

            for(var i=0;i<allA.length;i++){
                allA[i].style.backgroundColor = "";//设置没选中的a的颜色
                if(i == index){
                    fadeIn(imgs[i]);
                }else{
                    fadeOut(imgs[i]);
                }
            }

            allA[index].style.backgroundColor = "black";//设置选中的a的颜色



        };
    }
};

//淡入
function fadeIn(obj){
    var currentOpacity = getStyle(obj,'opacity');
    if(currentOpacity == 1)return false;

    move(obj,"opacity",100,5);
}

//淡出
function fadeOut(obj){
    var currentOpacity = getStyle(obj,'opacity');
    if(currentOpacity == 0)return false;
    move(obj,"opacity",0,5);


}

