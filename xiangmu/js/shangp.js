function Zoom() {
    // 获取节点
    const boxObj = document.querySelector('#magnifier'),
        smallObj = boxObj.firstElementChild,
        maskObj = smallObj.lastElementChild,
        bigObj = document.querySelector('.big-box'),
        bigImg = bigObj.lastElementChild;

    // 绑定鼠标移入事件
    smallObj.onmouseenter = function() {

        // maskObj.style.display = 'block';
        bigObj.style.display = 'block';
        // console.log(maskObj, bigObj);
    }

    // 绑定鼠标移出事件
    smallObj.onmouseleave = function() {
        maskObj.style.display = 'none';
        bigObj.style.display = 'none';
        // console.log(maskObj, bigObj);
    }

    // let boxT = boxObj.offsetTop;
    // let boxL = boxObj.offsetLeft;
    // console.log(boxT, boxL);

    smallObj.onmousemove = function(eve) {
            // console.log(eve);
            let cX = eve.offsetX;
            let cY = eve.offsetY;
            console.log(cX, cY);

            let maskW = maskObj.offsetWidth;
            let maskH = maskObj.offsetHeight;
            // console.log(maskW, maskH);
            let maskL = cX - maskW / 2;
            let maskT = cY - maskH / 2;
            console.log(maskObj.offsetLeft);

            if (maskL < 0) {
                maskL = 0;
            }
            if (maskT < 0) {
                maskT = 0;
            }

            let maxMaskL = smallObj.offsetWidth - maskW;
            let maxMaskT = smallObj.offsetHeight - maskH;

            if (maskL > maxMaskL) { maskL = maxMaskL }
            if (maskT > maxMaskT) { maskT = maxMaskT }

            maskObj.style.left = maskL + 'px';

            maskObj.style.top = maskT + 'px';

            let bigMaxLeft = bigImg.offsetWidth - bigObj.offsetWidth;
            let bigMaxTop = bigImg.offsetHeight - bigObj.offsetHeight;
            // 计算大图的实时位置
            let tmpBigImgLeft = maskL / maxMaskL * bigMaxLeft;
            let tmpBigImgTop = maskT / maxMaskT * bigMaxTop;
            // 设置大图的位置
            bigImg.style.left = -tmpBigImgLeft + 'px';
            bigImg.style.top = -tmpBigImgTop + 'px';
        }
        // // 1获取节点
        // const boxObj = document.querySelector('#magnifier'),
        //     smallObj = document.querySelector('.small-box'),
        //     maskObj = smallObj.lastElementChild,
        //     bigObj = document.querySelector('.big-box'),
        //     bigImg = bigObj.lastElementChild;
        // // console.log(boxObj, smallObj, maskObj, bigObj, bigImg);
        // console.log(smallObj);
        // // 2绑定鼠标移入事件
        // boxObj.onmouseenter = function() {
        //         // 显示小黄块儿和大图
        //         maskObj.style.display = 'block';
        //         bigObj.style.display = 'block';
        //         // console.log(maskObj, bigObj);
        //         // console.log(maskObj.style.display);
        //         // console.log(maskObj.style.display);

    //     }
    //     // 3绑定鼠标溢出事件
    // boxObj.onmouseleave = function() {
    //         maskObj.style.display = 'none';
    //         bigObj.style.display = 'none';
    //         // console.log(maskObj, bigObj);
    //         // console.log(111);
    //         // console.log(maskObj.style.display);

    //     }
    //     // 获取box相对于body的left和top值
    // let boxT = boxObj.offsetTop;
    // let boxL = boxObj.offsetLeft;
    // // console.log(boxT, boxL);

    // // 4鼠标移动事件,设置mask跟随鼠标移动
    // boxObj.onmousemove = function(eve) {
    //     // console.log(maskObj.style.display);
    //     // console.log(eve);
    //     /*
    //         mask父级 small 具有定位属性
    //         设置left 和top值,就是相对于small的,不能使用clientX

    //         当我们将mask的位置设置到鼠标的位置,此时鼠标再移动获取的在元素值,就是相对于mask
    //         不能用offsetX/Y直接设置
    //     */
    //     //    获取鼠标相对于可视区的坐标
    //     // 如果这种方式设置坐标,页面有滚轮的时往下拉,鼠标会脱离可视区位置
    //     // let cX = eve.clientX;
    //     // let cY = eve.clientY;

    //     // eve.stopPropagation();

    //     // console.log(eve.target);
    //     let cX = eve.pageX;
    //     let cY = eve.pageY;
    //     // console.log(cX, cY);
    //     // console.log(cX, cY);
    //     // console.log(cX, cY);
    //     // 默认mask的属性是display为none,获取不到,获取mask的宽度和高度
    //     let maskW = maskObj.offsetWidth;
    //     let maskH = maskObj.offsetHeight;
    //     // console.log(maskW, maskH);

    //     // 计算mask的坐标
    //     let maskL = cX - maskW / 2;
    //     let maskT = cY - maskH / 2;
    //     // console.log(maskL, maskT);

    //     // 计算mask的边框
    //     // 判断是否超出上和左边界
    //     if (maskL < 0) maskL = 0;
    //     if (maskT < 0) maskT = 0;

    //     // 计算最大值,不能从右边和下边出去
    //     let maxMaskL = smallObj.offsetWidth - maskW;
    //     let maxMaskT = smallObj.offsetHeight - maskH;
    //     // console.log(maxMaskL, maxMaskT);
    //     if (maskL > maxMaskL) {
    //         maskL = maxMaskL
    //     }
    //     if (maskT > maxMaskT) {
    //         maskT = maxMaskT
    //     }

    //     // 将值设置给mask
    //     maskObj.style.left = maskL + 'px';
    //     maskObj.style.top = maskT + 'px';
    //     // maskObj.style.left = cX + 'px';
    //     // maskObj.style.top = cY + 'px';

    //     /*
    //         小黄快的实时left/小黄快移动的最大left = 大图的实时位置left / 大图能移动的最大left 值
    //     */

    //     // 5计算大图能够移动的最大left 值 和 top 值
    //     let bigMaxLeft = bigImg.offsetWidth - bigObj.offsetWidth;
    //     let bigMaxTop = bigImg.offsetHeight - bigObj.offsetHeight;
    //     // 计算大图的实时位置
    //     let tmpBigImgLeft = maskL / maxMaskL * bigMaxLeft;
    //     let tmpBigImgTop = maskT / maxMaskT * bigMaxTop;
    //     // 设置大图的位置
    //     bigImg.style.left = -tmpBigImgLeft + 'px';
    //     bigImg.style.top = -tmpBigImgTop + 'px';
    // }
}

Zoom();

// 商品介绍
function infoPage() {
    // 获取页面中办公家具中的节点       
    const ulLiObj = document.querySelectorAll('.slideTxtBox_1 .hd ul li');
    const ulObj = document.querySelectorAll('.slideTxtBox_1 .bd ul');
    // console.log(ulObj);
    // console.log(ulLiObj);
    // 设置变量
    let Index = 0,
        lastIndex = 0,
        times;

    ulLiObj.forEach((li, key) => {
        // console.log(li);
        // 设置点击效果
        li.onclick = function() {
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

infoPage();