class goods {
    baseUsrl = 'http://localhost:3000/goods'
    constructor() {
        this.getData();
        this.$('.picScroll_left_s ul').addEventListener('click', this.addCartFn.bind(this));
        this.checkLogin();

        this.getCartGoods()
        this.bindEve();
    }

    // 绑定事件
    bindEve() {
        this.$('.containers').addEventListener('click', this.distributeEve.bind(this));

        // 给全选按钮绑定事件
        this.$('.cart-main-header .jdcheckbox').addEventListener('click', this.clickAllChecked.bind(this))
    }

    async getData() {
        let imgData = images;

        // 获取页面中的节点
        const ulObj = document.querySelector('.picScroll_left_s ul');
        const toObj = document.querySelector('.meis_chak_quanb');
        // console.log(ulObj);

        // 获取元素的宽度
        let ulW = ulObj.offsetWidth;
        // console.log(ulW);

        // 设置商品之间的间距
        let space = 15;

        let page = 1;
        let pageSize = 15;

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

                showData.forEach((ele, index) => {
                    html += `<li data-id="${ele.id}" class="idData">
        <div class="pic">
            <a href="#" target="_blank"><img src="${ele.img}" class="imgData" /></a>
        </div>
        <div class="title">
            <a href="#" target="_blank" class="titleData">${ele.title}</a>
            <div class="jiage_gouw">￥<span class="priceData">${ele.price}</span></div>
        </div>
        <a href="#none" class="cart_scroll_btn cart_scroll_btn_${index+1}">加入购物车</a>
        </li>`


                });

                // console.log(html);
                // 将数据追加到ul中
                ulObj.innerHTML += html;



                // 设置加载后的状态
                toObj.innerHTML = '加载更多商品';
                toObj.classList.remove('loading');

                sortImg();
            })
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

    }

    async addCartFn(eve) {
        // console.log(this);

        // 判断是否登录
        let token = localStorage.getItem('token')

        // 跳转
        if (!token) location.assign('./login.html?ReturnUrl=./gouw_che.html')

        // 判断点击的是a标签
        if (eve.target.classList.contains('cart_scroll_btn')) {
            // 商品id或用户id获取
            let lisObj = eve.target.parentNode;
            console.log(lisObj);
            let goodsId = lisObj.dataset.id;
            console.log(goodsId);

            let userId = localStorage.getItem('user_id');

            // 两个id必须都有才能发送请求
            if (!userId || !goodsId) throw new Error('两个id存在问题,请打印...');
            axios.defaults.headers.common['authorization'] = token;

            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            // console.log(eve.target.parentNode.firstElementChild.firstElementChild.firstElementChild.getAttribute("src"));
            let img = eve.target.parentNode.firstElementChild.firstElementChild.firstElementChild.getAttribute("src")

            // console.log(img);
            let title = eve.target.parentNode.firstElementChild.nextElementSibling.firstElementChild.innerText;
            // console.log(title);

            let price = eve.target.parentNode.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.innerText;
            // console.log(price);
            let param = `id=${goodsId}&img=${img}&title=${title}&price=${price}&shuliang=${1}`;
            // 不为空则添加到json中
            axios.post(this.baseUsrl, param).then(({ status }) => {
                console.log(status);
                if (status == 201) {
                    // 重新刷新页面
                    location.reload();
                }
            })
        }





        // console.log(eve.target);



    }

    // 操作购物车页面,用户必须登录
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
            location.assign('./login.html?ReturnUrl=./gouw_che.html')
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
        if (data.code == 401) location.assign('./login.html?ReturnUrl=./gouw_che.html')
            // 判断接口的状态

        // baseUsrl = 'http://localhost:8888/goods'

        let html = '';

        data.forEach(ele => {
            html += `<ul class="cart-shop-goods dangq_honh" data-id="${ele.id}">
                    <div class="cart-shop-good">
                        <li class="cart-col-1">
                            <input type="checkbox" class="jdcheckbox">
                        </li>
                        <li class="cart-col-2" style="height: 82px;">
                            <a href="" target="_blank" class="g-img"><img src="${ele.img}" alt=""></a>
                        </li>
                        <li class="fl houj_c">
                            <div class="cart-dfsg">
                                <div class="cart-good-name"><a href="#" target="_blank">${ele.title}</a></div>
                            </div>
                            <div class="cart-good-pro"></div>
                            <div class="cart-col-4">
                                <div class="cart-good-real-price ">
                                    ￥${ele.price}</div>
                                <div class="red"></div>
                            </div>
                            <div class="cart-col-5">
                                <div class="gui-count cart-count">
                                    <a href="#" gui-count-sub="" class="gui-count-btn gui-count-sub gui-count-disabled">-</a>
                                    <a href="#" gui-count-add="" class="gui-count-btn gui-count-add">+</a>
                                    <div class="gui-count-input"><input dytest="" class="itxt" type="text" value="${ele.shuliang}"></div>
                                </div>
                            </div>
                            <div class="cart-col-6 ">
                                <div class="cart-good-amount cart-good-xiaoji">￥<span>${ele.price * ele.shuliang}</span></div>
        
                            </div>
                        </li>
                        <li class="cart-col-7">
                            <div class="cart-good-fun delfixed">
                                <a href="javascript:;">删除</a>
                            </div>
                            <div class="cart-good-fun">
                                <a href="#">移入收藏夹</a>
                            </div>
                        </li>
                    </div>
                </ul>`;
            // console.log(ele.price * ele.shuliang);
            // console.log(html);
        });
        // console.log(this.$('.container'));

        this.$('.containers').innerHTML = html;

    }

    // 直接结构赋值,获取事件源
    distributeEve({ target }) {
        // console.log(target);
        if (target.parentNode.classList.contains('cart-good-fun')) {
            // console.log(target);

            this.delGoods(target);

        }

        if (target.classList.contains('jdcheckbox')) {
            // console.log(target);
            this.getOneGoodsCheck(target);

            this.getNumPriceGoods()
        }
    }

    // 删除的方法
    delGoods(target) {
        // console.log(target);
        console.log(this);

        let ulObj = target.parentNode.parentNode.parentNode.parentNode;
        // console.log(ulObj);

        let id = ulObj.dataset.id;
        // console.log(id);
        // 获取用户id
        let userId = localStorage.getItem('user_id');
        //发送ajax删除商品数据
        // console.log(id, userId);

        axios.delete(this.baseUsrl + '/' + id)
            .then(res => {

                if (res.status == 200) {
                    // 刷新页面
                    location.reload();
                }

            });

    }

    // 单个商品的选中按钮的回调
    getOneGoodsCheck(target) {
        //如果是取消,则直接让全选取消
        // console.log(target.checked);
        if (!target.checked) {
            this.$('.cart-main-header .jdcheckbox').checked = false;
            return;
        }

        // console.log(target.checked);
        // 如果点击的是选中,则返回true
        if (target.checked) {
            // 选中页面中,没有被选中的商品
            // console.log(this.$('.cart-shop-good .jdcheckbox'));

            let res = Array.from(this.$('.cart-shop-good .jdcheckbox')).find(checkbox => {
                // 没有被选中,状态为false
                console.log(checkbox.checked);
                return !checkbox.checked

            });
            // console.log(res);
            // 如果返回undefined,则是页面中都被选中
            if (!res) this.$('.cart-main-header .jdcheckbox').checked = true;

        }
    }

    // 获取页面中,所有选中商品的价格和数量
    getNumPriceGoods() {
        let goods = document.querySelectorAll('.cart-shop-goods');
        // console.log(goods);
        // 保存数量和价格
        let totalNum = 0;
        let totalPrice = 0;
        // console.log(goods);

        goods.forEach(one => {
            // console.log(one.firstElementChild.firstElementChild);
            // 只统计本选中的商品的价格和数量
            if (one.firstElementChild.firstElementChild.firstElementChild.checked) {
                // console.log(one);
                // 数量的获取
                totalNum = one.querySelector('.itxt').value - 0 + totalNum;
                totalPrice = one.querySelector('.cart-good-xiaoji span').innerHTML - 0 + totalPrice;
            }

        });

        // console.log(totalNum, totalPrice);
        // 设置到总计上
        this.$('.jies_ann_bei em').innerHTML = totalNum;
        this.$('.jies_ann_bei .zonge').innerHTML = totalPrice;

    }

    // 全选的实现
    clickAllChecked(eve) {
        // console.log(eve.target);
        // 获取全选按钮的状态
        let checked = eve.target.checked;
        // console.log(checked);
        this.oneGoodsCheck(checked);
        // 统计数量和价格的方法
        this.getNumPriceGoods();
    }

    // 设置单个商品的选中状态
    oneGoodsCheck(checkStatus) {
        let goodsList = this.$('.cart-shop-good');
        // console.log(goodsList, checkStatus);
        goodsList.forEach(ul => {
            // console.log(ul);
            // 找到单个商品的复选框
            ul.firstElementChild.firstElementChild.checked = checkStatus;

        })

    }

    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new goods;