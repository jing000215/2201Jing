class login {
    constructor() {
        // 登录按钮绑定事件
        this.$('.kengl_kuang .btnnuw').addEventListener('click', this.clickFn.bind(this))
    }
    clickFn() {
        // 获取页面中form表单
        let forms = document.forms[0].elements;
        // console.log(forms);
        let username = forms.uname.value;
        let password = forms.password.value

        // 判断是否为空
        if (!username.trim() || !password.trim()) throw new Error('Can not is null');

        // console.log(username, password);
        // 注意要发送post请请求
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        // 对参数进行编码
        let data = `username=${username}&password=${password}`;
        axios.post('http://localhost:8888/users/login', data).then(res => {
            // console.log(data);
            let { status, data } = res;
            console.log(data);

            if (status == 200) {
                // 判断是否登录成功
                if (data.code == 1) {
                    // token 是登录 的 标识符
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_id', data.user.id);
                    // 从哪来回哪去
                    location.assign(location.search.split('=')[1])


                } else {
                    layer.open({
                        title: '登录提示',
                        content: '用户名或者密码输入错误'
                    });
                }
            }

        });

    }

    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new login;