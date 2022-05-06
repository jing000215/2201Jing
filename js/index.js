class index {
    baseUsrl = 'http://localhost:3000/goods'
    constructor() {
        this.bannerLunbo();
        this.liveLunbo();
        this.livePage();
        this.checkLogin();
        this.getCartGoods();
        this.addCartFn();
    }


    // 首页
    // banner轮播图
    // 获取节点
    async bannerLunbo() {
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


    // 办公家具 轮播图
    async liveLunbo() {
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


    async livePage() {
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

    async addCartFn() {
        // console.log(this);

        // 判断是否登录
        let token = localStorage.getItem('token')

        // 跳转
        if (!token) location.assign('./login.html?ReturnUrl=./index.html')
    }

    // 获取购物车中的数据
    async getCartGoods() {
        const TOKEN = localStorage.getItem('token');

        axios.defaults.headers.common['authorization'] = TOKEN;
        let { data, status } = await axios.get(this.baseUsrl);
        // console.log(data);

        // 判断是否超过有效期,过期则跳转到登录页面
        if (data.code == 401) location.assign('./login.html?ReturnUrl=./index.html')
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
            location.assign('./login.html?ReturnUrl=./index.html')
        }
    }

    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new index;