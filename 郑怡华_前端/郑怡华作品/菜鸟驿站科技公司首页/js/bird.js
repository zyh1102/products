window.onload = function () {

    var btn01 = document.getElementById("buttonLeft");

    var btn02 = document.getElementById("buttonRight");

    var oBack = document.getElementById("back_bg");

    var oNext = document.getElementById("next_bg");

    var dreamList = document.getElementById("dreamList");

    var dreams = dreamList.getElementsByTagName("li");

    //dreamList.style.width = 1000*dreams.length+"px";



    /*button左右显示*/
    btn01.onmouseover = oBack.onmouseover = function (ev1) {
        btn01.style.display = "block";
        clearInterval(timerP);
    }
    btn01.onmouseout = oBack.onmouseout = function (ev1) {
        btn01.style.display = "none";
        autoPlay();
    }
    btn02.onmouseover = oNext.onmouseover = function (ev1) {
        btn02.style.display = "block";
        clearInterval(timerP);
    }
    btn02.onmouseout = oNext.onmouseout = function (ev1) {
        btn02.style.display = "none";
        autoPlay();
    }


    // 手动播放
    var iNow=0;
    var minIndex=2;
    btn01.onclick = function(){
        clearInterval(timerP);
        if(iNow == 0){
            iNow = dreams.length-1;
        }else{
            iNow--;
        }

        dreams[iNow].style.zIndex=minIndex++;
        oBack.style.zIndex=oNext.style.zIndex=minIndex++;
        btn01.style.zIndex=btn02.style.zIndex=minIndex++;



        for(var i=0;i<dreams.length;i++){
            fadeOut(dreams[i]);
        }
        console.log(getStyle(dreams[iNow], 'opacity'));
        fadeIn(dreams[iNow]);
    }

    btn02.onclick = function(){
        clearInterval(timerP);
        if(iNow==dreams.length-1){
            iNow = 0;
        }else{
            iNow++;
        }

        dreams[iNow].style.zIndex=minIndex++;
        oBack.style.zIndex=oNext.style.zIndex=minIndex++;
        btn01.style.zIndex=btn02.style.zIndex=minIndex++;

        for(var i=0;i<dreams.length;i++){
            fadeOut(dreams[i]);
        }
        fadeIn(dreams[iNow]);
    }


    //自动播放
    var timerP;
    autoPlay();
    function autoPlay(){
        clearInterval(timerP);
        timerP = setInterval(function(){
            if(iNow==dreams.length-1){
                iNow=0;
            }else{
                iNow++;
            }

            dreams[iNow].style.zIndex=minIndex++;
            oBack.style.zIndex=oNext.style.zIndex=minIndex++;
            btn01.style.zIndex=btn02.style.zIndex=minIndex++;

            for(var i=0;i<dreams.length;i++){
                fadeOut(dreams[i]);
            }
            fadeIn(dreams[iNow]);

            console.log(iNow);

        },2000)

    }




//淡入
    function fadeIn(obj){
        var currentOpacity = getStyle(obj,'opacity');

        if(currentOpacity == 1)return false;
        //console.log(obj.style.opacity)
        move(obj,"opacity",100,5);

       // console.log(obj.style.opacity)


    }

//淡出
    function fadeOut(obj){
        var currentOpacity = getStyle(obj,'opacity');
        if(currentOpacity == 0)return false;
        move(obj,"opacity",0,5);
        //console.log(obj.style.opacity)

    }
















    /*产品项目轮播*/
    var oBackPro = document.getElementById("back_pro");
    var oNextPro = document.getElementById("next_pro");

    var proList = document.getElementById("proList");
    var proName = document.getElementById("proName");
    var pros = proList.getElementsByTagName("img");
    proList.style.width = 205*pros.length+"px";
    proName.style.width = 205*pros.length+"px";

    var index = 0;
    var timerPro;
    var timer2;
    var indexPro=0;
    autoPlayPro();

    //手动切换
    oBackPro.onclick = function(){
        if(index == pros.length/2){
            index = 0;
            proList.style.left = 0;
        }
        move(proList,"left",-(index+1)*205,10,function () {});
        index++;
    }
    oNextPro.onclick = function(){
        if(index == 0){
            index = pros.length/2;
            proList.style.left = -proList.offsetWidth/2+'px';
        }
        move(proList,"left",-(index-1)*205,10,function () {});
        index--;
    }

    //自动切换
    function autoPlayPro(){
        timerPro = setInterval(function(){
            oNextPro.onclick();
        },2000);
    }

    //鼠标移入停止运动
    oBackPro.onmouseout = oNextPro.onmouseout = proList.onmouseout = function (ev1) {
        autoPlayPro();
    };
    oBackPro.onmouseover = oNextPro.onmouseover = proList.onmouseover = function (ev1) {
        clearInterval(timerPro);
    };


    //加号
    var allA = document.getElementsByClassName("allA")[0];
    allA.onmouseover = function () {
        move(allA,"right",0,30,function(){});
    }
    allA.onmouseout = function () {
        move(allA,"right",-200,30,function(){});
    }


    //弹窗
    var popWindow = document.getElementById("popWindow");
    var height = document.body.offsetHeight;
    popWindow.style.height = height+"px";
};


/*函数*/


//弹出登录窗口
function showLogin() {
    document.getElementById('popWindow').style.display = 'block';
    document.getElementById('loginLayer').style.display = 'block';
}

//弹出注册窗口
function showRegister() {
    document.getElementById('popWindow').style.display = 'block';
    document.getElementById('registerLayer').style.display = 'block';
}
function closeDiv() {
    document.getElementById('popWindow').style.display = 'none';
    document.getElementById('loginLayer').style.display = 'none';
    document.getElementById('registerLayer').style.display = 'none';
}

