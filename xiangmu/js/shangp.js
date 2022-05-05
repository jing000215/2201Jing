class shangp {
    baseUsrl = 'http://localhost:3000/goods';
    constructor() {
        this.Zoom();
        this.infoPage();
        this.$('.shangpxiangqing').addEventListener('click', this.addCartFn.bind(this));
        // console.log(this.$('.shangpxiangqing'));
        this.getCartGoods();
        this.checkLogin();
    }
    async Zoom() {
        // 获取节点
        const boxObj = document.querySelector('#magnifier'),
            smallObj = boxObj.firstElementChild,
            maskObj = smallObj.lastElementChild,
            bigObj = document.querySelector('.big-box'),
            bigImg = bigObj.lastElementChild;

        // 绑定鼠标移入事件
        smallObj.onmouseenter = function() {

            maskObj.style.display = 'block';
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
            // console.log(cX, cY);

            let maskW = maskObj.offsetWidth;
            let maskH = maskObj.offsetHeight;
            // console.log(maskW, maskH);
            let maskL = cX - maskW / 2;
            let maskT = cY - maskH / 2;
            // console.log(maskObj.offsetLeft);

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

    }



    // 商品介绍
    async infoPage() {
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

    async addCartFn(eve) {
        // console.log(this);

        // 判断是否登录
        let token = localStorage.getItem('token')

        // 跳转
        if (!token) location.assign('./login.html?ReturnUrl=./shangp_xiangq.html')
            // 判断点击的是a标签
        if (eve.target.classList.contains('btn-gouwuche')) {
            // 商品id或用户id获取
            let lisObj = eve.target.parentNode.parentNode;
            // console.log(lisObj);
            let goodsId = lisObj.dataset.id;
            let userId = localStorage.getItem('user_id');

            // 两个id必须都有才能发送请求
            if (!userId || !goodsId) throw new Error('两个id存在问题,请打印...');
            axios.defaults.headers.common['authorization'] = token;

            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            let img = document.querySelector('.imgData').getAttribute("src");
            // console.log(img);
            let title = document.querySelector('.titleData').innerText;
            // console.log(title);
            let price = document.querySelector('.priceData').innerText;
            // console.log(price);
            let param = `&img=${img}&title=${title}&price=${price}&shuliang=${1}`;

            // console.log(this.baseUsrl);

            axios.post(this.baseUsrl, param).then(({ status }) => {
                console.log(status);
                if (status == 201) {
                    // 重新刷新页面
                    location.reload();
                }
            })

        }

    }

    // 获取购物车中的数据
    async getCartGoods() {
        const TOKEN = localStorage.getItem('token');
        // let userId = localStorage.getItem('user_id');
        axios.defaults.headers.common['authorization'] = TOKEN;
        let { data, status } = await axios.get(this.baseUsrl);
        // console.log(data);

        // 判断是否超过有效期,过期则跳转到登录页面
        if (data.code == 401) location.assign('./login.html?ReturnUrl=./shangp_xiangq.html')
            // 判断接口的状态

        // baseUsrl = 'http://localhost:8888/goods'

        let html = '';

        data.forEach(ele => {
            html += `<li class="gouwuche">
            <img src="${ele.img}">
            <div id="shangpin">
                <p>${ele.title}</p>
                <h3>￥${ele.price}
                </h3>
            </div>
        </li>`;
            // console.log(ele.price * ele.shuliang);
            // console.log(html);
        });
        // console.log(this.$('.container'));

        this.$('.dorpdown-layer').innerHTML = html;

    }

    async checkLogin() {
        // 获取token值,进行判断
        const TOKEN = localStorage.getItem('token');
        // 判断是否登录过期
        axios.defaults.headers.common['authorization'] = TOKEN;
        let userId = localStorage.getItem('user_id');
        let { data, status } = await axios.get('http://localhost:8888/users/info/' + userId);
        // console.log(data);

        // 如果没有token肯定没有登录
        if (!TOKEN || data.code == 401) {
            location.assign('./login.html?ReturnUrl=./shangp_xiangq.html')
        }
    }

    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }

}
new shangp;