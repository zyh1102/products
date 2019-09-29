function getStyle(obj,name){
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[name];
    }
    else{
        return obj.currentStyle[name];
    }
}

function move(obj, attr, target,speed,callback){
    clearInterval(obj.timer);
    var currentStyle;
    if(attr=='opacity'){
        currentStyle=parseFloat(parseInt(getStyle(obj, attr)*100));//获取当前的透明度
    }else{
        currentStyle=parseInt(getStyle(obj, attr));//或其他属性值
    }
    //判断速度的正负
    if(currentStyle>target){
        speed = -speed;
    }

    obj.timer=setInterval(function (){
        var oldValue;
        if(attr == 'opacity'){
            oldValue = parseFloat(parseInt(getStyle(obj, attr)*100));//透明度
        }else{
            oldValue = parseInt(getStyle(obj, attr));//或其他属性值
        }
        var newValue = oldValue + speed;

        if((speed<0 && newValue<target)||(speed>0 && newValue>target)){
            newValue = target;
        }
        if(attr=='opacity'){
            obj.style.filter='alpha(opacity:'+(newValue)+')';
            obj.style.opacity=(newValue)/100;

        }else{

            obj.style[attr]=newValue+"px";

        }
        if(newValue==target){
            clearInterval(obj.timer);
            callback&&callback();
        }
    }, 30);

}

//取对象的函数
var getObj =  {//简化获取对象的操作
    byID: function(id) {return document.getElementById(id);},
    byTagName: function(parent,obj) {return (parent||document).getElementsByTagName(obj);},
    byClassName:function (parent, clsName) {
        if(!parent){allNodes = document.getElementsByTagName("*")}
        else{allNodes = parent.getElementsByTagName("*")}
        var arr=[];
        for(var i=0;i<allNodes.length;i++){
            if(allNodes[i].className == clsName){
                arr.push(allNodes[i]);
            }
        }
        return arr;
    }
}