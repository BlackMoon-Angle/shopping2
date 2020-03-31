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
            $(this)
                .parent()
                .siblings('.form_box_phone')
                .children('div')
                .children('input')
                .val('')
            $(this)
                .parent()
                .siblings('.form_box_email')
                .children('div')
                .children('input')
                .val('')
        })
    }

    // 注册
    register_ajax();
    function register_ajax() {
        $('.register_btn').click(function () {
            $.ajax({
                url: 'http://api.icodeilife.cn:81/user',
                data: {
                    type: "register",
                    user: $('.register_username').val(),
                    pass: $('.register_password').val(),
                    tel: $('.register_phone').val(),
                    email: $('.register_email').val()
                },
                success: function (res) {
                    let res_info = JSON.parse(res);
                    if (res_info.code == 1) {
                        alert('注册成功！')
                        location.href = '../pages/login.html'
                    } else {
                        alert('注册失败！您注册的账号已存在!')
                        location.reload();
                    }
                }
            })
        })
    }
}