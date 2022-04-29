// 首页
// banner轮播图
// 获取节点
function bannerLunbo() {
    const ulObj = document.querySelectorAll('#one li');
    const olObj = document.querySelectorAll('#two li');
    const zuo = document.querySelector('#left');
    const you = document.querySelector('#right');


    // console.log(ulObj);
    let index = 0;
    let lastIndex = 0;
    // 定时器返回值
    let times;

    // 点击圆圈儿, 切换图片
    olObj.forEach((li, key) => {
        // console.log(li);
        // 绑定事件
        li.onclick = function() {
            // console.log(this);
            lastIndex = index;
            index = key;
            change()
        }
    })

    zuo.onclick = function() {
        lastIndex = index;
        index--;
        if (index < 0) {
            index = olObj.length - 1;
        }
        change();
    }

    you.onclick = function() {
        lastIndex = index;
        index++;
        if (index > olObj.length - 1) {
            index = 0;
        }
        change();
    }

    // 轮播
    function slideshow() {
        times = setInterval(() => {
            you.onclick();
        }, 3000)
    }
    slideshow();

    you.parentNode.parentNode.onmouseover = function() {
        clearInterval(times)
    }
    you.parentNode.parentNode.onmouseout = function() {
        slideshow();
    }

    function change() {
        ulObj[lastIndex].className = '';
        olObj[lastIndex].className = '';
        olObj[index].className = 'on';
        ulObj[index].className = 'on';
    }
}

bannerLunbo();

// 办公家具 轮播图
function liveLunbo() {
    const bdObj = document.querySelectorAll('.silder-main div');

    let index = 0;
    let times;

    function Lunbo() {
        times = setInterval(() => {
            index++
            if (index > bdObj.length - 1) {
                index = 0;
            }
            change();
        }, 4000)
    }

    Lunbo();

    function change() {
        bdObj[index].className = 'silder-main-img';
    }

    // setInterval(Lunbo, 4000);
}
liveLunbo();

function livePage() {
    // 获取页面中办公家具中的节点       
    const ulLiObj = document.querySelectorAll('.slideTxtBox .hd ul li');
    const ulObj = document.querySelectorAll('.slideTxtBox .bd ul');
    // console.log(ulObj);
    // console.log(ulLiObj);
    // 设置变量
    let Index = 0,
        lastIndex = 0,
        times;

    ulLiObj.forEach((li, key) => {
        // console.log(li);
        // 设置移入效果
        li.onmouseover = function() {
            // console.log(li);
            lastIndex = Index;
            Index = key;
            change();
        }
        li.onmouseout = function() {

        }
    })

    function change() {
        ulLiObj[lastIndex].className = '';
        ulObj[lastIndex].className = '';
        ulLiObj[Index].className = 'on';
        ulObj[Index].className = 'on';
    }
}

livePage();