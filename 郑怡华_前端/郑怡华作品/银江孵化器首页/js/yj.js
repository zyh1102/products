window.onload = function () {
    var oUl = document.getElementById('tab-list');
    var aLi = oUl.getElementsByTagName('li');
    var oBg = aLi[aLi.length - 1];//滑动菜单
    var i = 0;

    for (i = 0; i < aLi.length - 1; i++) {
        aLi[i].onmouseover = function () {
            startMove(oBg, this.offsetLeft);
        };
    }
};

var iSpeed = 0;
var left = 0;

function startMove(obj, iTarget) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        iSpeed += (iTarget - obj.offsetLeft) / 5;
        iSpeed *= 0.6;

        left += iSpeed;

        if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
            clearInterval(obj.timer);

            obj.style.left = iTarget + 'px';

        } else {
            obj.style.left = left + 'px';
        }
    }, 30);
}