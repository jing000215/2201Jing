let imgData = images;

// 获取页面中的节点
const ulObj = document.querySelector('.meis_neir_lieb ul');
const toObj = document.querySelector('.meis_chak_quanb');
// console.log(ulObj);

// 获取元素的宽度
let ulW = ulObj.offsetWidth;
// console.log(ulW);

// 设置商品之间的间距
let space = 15;

let page = 1;
let pageSize = 12;

function odity(curPage) {
    toObj.innerHTML = '加载商品中';
    toObj.classList.add('loading');

    // 计算开始位置和结束位置
    let startPage = (curPage - 1) * pageSize;
    let endPage = startPage + pageSize;
    // console.log(startPage, endPage);

    // 用延时器实现延时获取
    setTimeout(() => {
        let showData = imgData.slice(startPage, endPage);
        // console.log(showData);

        if (showData.length == 0) {
            toObj.innerHTML = '无法加载更多商品';
            toObj.classList.remove('loading');
            return;
        }

        // 循环数据追加页面中
        let html = '';
        showData.forEach(ele => {
            html += `<li>
            <a href="#" class="meis_tup_kuang"><img src="${ele.path}"></a>
            <div class="meis_neir"> 
                <a href="#">${ele.text}</a>
                <p>${ele.wifi}</p>
                <h4><span>${ele.qian}</span>${ele.jia}<i>${ele.mai}</i></h4>
            </div> 
        </li>`
        });

        // 将数据追加到ul中
        ulObj.innerHTML += html;

        // 设置加载后的状态
        toObj.innerHTML = '加载更多商品';
        toObj.classList.remove('loading');

        sortImg();
    }, 800)
}

odity(page)

// 页面排序
let itemsObj = '';

function sortImg() {
    itemsObj = ulObj.children;
    // console.log(itemsObj);

    // 计算页面显示列
    let imgW = itemsObj[0].offsetWidth;
    let columns = parseInt(ulW / imgW);
    // console.log(columns);
}

toObj.onclick = loadMore;

function loadMore() {
    if (!toObj.classList.contains('loading')) {
        odity(++page);
    }
}

/* 懒加载*/

let cliH = document.documentElement.clientHeight;

window.onscroll = function() {
    // 滚动条高度
    let sTop = document.documentElement.scrollTop;

    // 内容高度
    // let contH = itemsObj[itemsObj.length - 1].offsetTop;
    // console.log(cliH,sTop,contH);

    if (cliH + sTop) {
        toObj.onclick();
    }
}