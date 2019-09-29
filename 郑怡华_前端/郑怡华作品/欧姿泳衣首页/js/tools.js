/* 定义一个函数，用来读取指定元素的当前的样式
	参数：
		1. obj 要获取样式的元素
		2. name 要获取的样式名
 */
function getStyle(obj,name){ //获取非行间样式
    /* 判断浏览器中是否有getComputedStyle（）方法，如果有就用，没有就用currentStyle */
    if(window.getComputedStyle){//在正常浏览器中,getComputedStyle是一个对象,里面封装了样式
        // 不加window，是变量，需要去作用域中寻找，如果找不到变量会报错；加了window之后是一个对象的属性，找不到会返回undefined

        return getComputedStyle(obj,null)[name];
    }
    else{
        return obj.currentStyle[name];
    }
}


//尝试创建一个函数,实现动画效果
/* 参数：
		1. obj 移动的对象
	    2. attr 要修改的对象的样式，比如： left，top，width，height
	    3. speed 移动的速度（正数向右，负数想左）
	    4. target目标位置 （向左的时候 <target,向右的时候>target）
	    5. callback 回调函数，会在动画执行完毕后执行
*/

function move(obj, attr,target,speed,callback){
    //关闭上一次计时器
    clearInterval(obj.timer);
    //获取元素当前的属性的值
    var currentStyle;
    if(attr=='opacity'){
        currentStyle=Math.round(parseFloat(getStyle(obj, attr))*100);//获取当前的透明度
    }else{
        currentStyle=parseInt(getStyle(obj, attr));//或其他属性值
    }
    //判断速度的正负
    if(currentStyle>target){
        speed = -speed;
    }
    //开启一个定时器来执行动画效果
    //向执行动画的对象中添加一个timer属性,用来保存定时器的值
    obj.timer=setInterval(function (){
        //获取当前的属性值
        var oldValue;
        if(attr == 'opacity'){
            oldValue = Math.round(parseFloat(getStyle(obj, attr))*100);//透明度
        }else{
            oldValue = parseInt(getStyle(obj, attr));//或其他属性值
        }
        //在旧的值上加speed
        var newValue = oldValue + speed;
        //判断新的值是否到达目标
        if((speed<0 && newValue<target)||(speed>0 && newValue>target)){
            newValue = target;
        }
        //修改属性值
        if(attr=='opacity'){
            obj.style.filter='alpha(opacity:'+(newValue)+')';
            obj.style.opacity=(newValue)/100;//attr是一个变量,要以[]的形式传递
        }else{
            obj.style[attr]=newValue+"px";
        }

        //达到目标关闭计时器
        if(newValue==target){
            clearInterval(obj.timer);
            //到达目标后调用回调函数
            callback&&callback();
        }
    }, 30);

}

/* //定义一个函数,用来向一个元素中添加指定的class属性值
	参数：
		1. obj 要添加class属性的元素
		2. cn 要添加的class的名字
*/
function addClass(obj,cn){
    //检查obj中是否含有cn,避免重复添加
    if(!hasClass(obj,cn)){
        //添加cn
        obj.className += " "+cn; //记得要加一个空格
    }
}
/* 定义一个函数，判断一个元素中是否有指定的class
	参数：
		1. obj 要判断的元素
		2. cn 要判断的class的名字
*/
function hasClass(obj,cn){
    //reg = /\bcn\b/; //创建一个正则表达式,并添加单词边界,确保cn是独立的
    var reg = new RegExp("\\b"+cn+"\\b");//以构造函数的形式传递cn,可以动态的生成正则表达式
    return reg.test(obj.className);
}

/* 定义一个函数，删除一个元素中的指定的class
	参数：
		1. obj 要删除的元素
		2. cn 要删除的class的名字
*/

function removeClass(obj,cn){
    var reg = new RegExp("\\b"+cn+"\\b");//以构造函数的形式传递cn,可以动态的生成正则表达式
    obj.className = obj.className.replace(reg,"");//用空串替换cn
}

/* 定义一个函数，用来切换一个类
	如果元素中有这个类，就删除；如果没有这个类，就添加
	参数：
		1. obj 要删除的元素
		2. cn 要删除的class的名字
*/
function toggleClass(obj,cn){
    if(hasClass(obj,cn)){
        //如果有,就删除
        removeClass(obj,cn);
    }else{
        //如果没有,就添加
        addClass(obj,cn);}
}

/*拖拽动画*/
function drag(obj){
    //1. 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
    obj.onmousedown = function(event){
        //当鼠标按下，设置box1捕获所有鼠标按下事件
        /*
            setCapture()只有ie支持，但是在火狐中使用，不会报错
            如果在chrome中调用，会报错，所以要先判断
         */
        if(obj.setCapture){
            obj.setCapture();
        }
        //box1.setCapture&&box1.setCapture();
        event = event||window.event;
        //计算鼠标和div的偏移量
        var x = event.clientX-obj.offsetLeft//水平距离的偏移量
        var y = event.clientY-obj.offsetTop//垂直距离的偏移量

        //2. 当鼠标移动时，被拖拽元素跟随鼠标移动 onmousemove
        //为document绑定onmousemove
        document.onmousemove = function(event){
            event = event||window.event;
            var left = event.clientX - x;//焦点位置 = 鼠标位置- 偏移量
            var top = event.clientY - y;
            //修改box1的位置
            obj.style.left = left+"px";
            obj.style.top = top+"px";
        };
        //3. 当鼠标松开时，被拖拽元素固定在当前位置 onmouseup
        document.onmouseup = function(){
            //当鼠标松开,取消box1的事件捕获
            obj.releaseCapture&&box1.releaseCapture();

            //取消document的onmousemove事件
            document.onmousemove = null;
            //取消document的onmouseup事件,变成一次性的事件
            document.onmouseup = null;
        };
        /*
            当我们拖拽网页中的内容时，浏览器会默认去搜索引擎中搜索内容，此时会导致拖拽功能异常
            这个是浏览器的默认行为，如果不想要可以通过return false来取消这个行为

            但是，这个方法对ie8不起作用
         */
        return false;
    };
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