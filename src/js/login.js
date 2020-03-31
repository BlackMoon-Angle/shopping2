window.onload = function () {
    // 切换语言二级菜单
    language();
    function language() {
        $('.head_box_div2').mouseenter(function () {
            $(this)
                .children('.head_box_div2_div')
                .children('.down')
                .css('display', 'none')
            $(this)
                .children('.head_box_div2_div')
                .children('.up')
                .css('display', 'inline-block')
            $(this)
                .children('ul')
                .css('display', 'block')
        })
        $('.head_box_div2').mouseleave(function () {
            $(this)
                .children('.head_box_div2_div')
                .children('.down')
                .css('display', 'inline-block')
            $(this)
                .children('.head_box_div2_div')
                .children('.up')
                .css('display', 'none')
            $(this)
                .children('ul')
                .css('display', 'none')
        })
    }

    //重置按钮
    empty_btn();
    function empty_btn() {
        $('.empty_btn').click(function () {
            $(this)
                .parent()
                .siblings('.form_box_username')
                .children('div')
                .children('input')
                .val('')
            $(this)
                .parent()
                .siblings('.form_box_password')
                .children('div')
                .children('input')
                .val('')
        })
    }

    // 登录
    login_ajax();
    function login_ajax() {
        $('.login_btn').click(function () {
            $.ajax({
                url: 'http://api.icodeilife.cn:81/user',
                data: {
                    type: "login",
                    user: $('.login_username').val(),
                    pass: $('.login_password').val(),
                },
                success: function (res) {
                    if ($('.login_username').val() == '' && $('.login_password').val() == '') {
                        alert('请输入账号与密码！')
                        location.reload();
                    }
                    else {
                        let res_info = JSON.parse(res);
                        if (res_info.code == 1) {
                            sessionStorage.setItem("userInfo",JSON.stringify(res_info.msg));
                            alert('登录成功！')
                            location.href = '../pages/index.html'
                        } else {
                            alert('登录失败！账号或密码错误!')
                            location.reload();
                        }
                    }
                }
            })
        })
    }
}