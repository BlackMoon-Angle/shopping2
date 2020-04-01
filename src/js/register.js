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
    //账号：焦点事件
    username_focus_blur()
    function username_focus_blur() {
        $('.register_username').focus(function () {
            $(this)
                .parent()
                .parent()
                .siblings('.username_warning')
                .html('请输入账号')
                .css({
                    'display': 'block',
                    'color': 'green'
                })
        })
        $('.register_username').blur(function () {
            if ($(this).val() == '') {
                $(this)
                    .parent()
                    .parent()
                    .siblings('.username_warning')
                    .html('账号不能为空！')
                    .css({
                        'display': 'block',
                        'color': 'red'
                    })
            }
            else {
                $(this)
                    .parent()
                    .parent()
                    .siblings('.username_warning')
                    .css({
                        'display': 'none',
                    })
            }
        })
    }

    //密码：焦点事件与正则验证
    password_focus_blur();
    function password_focus_blur() {
        $('.register_password').focus(function () {

            $(this)
                .parent()
                .siblings('.eyes_password')
                .children('.Close_eyes')
                .css('display', 'block')
            eyes_password();
            $(this)
                .parent()
                .parent()
                .siblings('.password_warning')
                .html('不能有空格；长度为8-16字符；至少包含数字、字母，符号中至少2种')
                .css({
                    'display': 'block',
                    'color': 'green'
                })
        })
        $('.register_password').blur(function () {
            if ($(this).val() == '') {
                $(this)
                    .parent()
                    .siblings('.eyes_password')
                    .children('.Close_eyes')
                    .css('display', 'none')
                $(this)
                    .parent()
                    .parent()
                    .siblings('.password_warning')
                    .html('密码不能为空！')
                    .css({
                        'display': 'block',
                        'color': 'red'
                    })
            } else {
                let input_val = $(this).val();
                let regular = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
                if (!regular.test(input_val)) {
                    $(this)
                        .parent()
                        .parent()
                        .siblings('.password_warning')
                        .html('密码格式不正确')
                        .css({
                            'display': 'block',
                            'color': 'red'
                        })
                }
                else {
                    $(this)
                        .parent()
                        .parent()
                        .siblings('.password_warning')
                        .html('密码格式正确')
                        .css({
                            'display': 'block',
                            'color': 'green'
                        })
                }
            }
        })
    }
    //密码查看
    function eyes_password() {
        $('.eyes_password').mouseenter(function () {
            $(this).children('.Close_eyes').css('display', 'none')
            $(this).children('.Open_eyes').css('display', 'block')
            $(this).siblings('.password_div').children('.register_password').attr('type', 'text')
        })
        $('.eyes_password').mouseleave(function () {
            $(this).children('.Close_eyes').css('display', 'block')
            $(this).children('.Open_eyes').css('display', 'none')
            $(this).siblings('.password_div').children('.register_password').attr('type', 'password')
        })
    }

    //手机号：焦点事件与正则验证
    phone_focus_blur();
    function phone_focus_blur() {
        $('.register_phone').focus(function () {
            $(this)
                .parent()
                .parent()
                .siblings('.phone_warning')
                .html('请输入手机号！')
                .css({
                    'display': 'block',
                    'color': 'green'
                })
        })
        $('.register_phone').blur(function () {
            if ($(this).val() == '') {
                $(this)
                    .parent()
                    .parent()
                    .siblings('.phone_warning')
                    .html('手机号不能为空！')
                    .css({
                        'display': 'block',
                        'color': 'red'
                    })
            }
            else {
                let input_val = $(this).val();
                let regular = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
                if (!regular.test(input_val)) {
                    $(this)
                        .parent()
                        .parent()
                        .siblings('.phone_warning')
                        .html('手机格式不正确')
                        .css({
                            'display': 'block',
                            'color': 'red'
                        })
                }
                else {
                    $(this)
                        .parent()
                        .parent()
                        .siblings('.phone_warning')
                        .html('手机格式正确')
                        .css({
                            'display': 'block',
                            'color': 'green'
                        })
                }
            }
        })
    }

    //邮箱：焦点事件与正则验证
    email_focus_blur();
    function email_focus_blur() {
        $('.register_email').focus(function () {
            $(this)
                .parent()
                .parent()
                .siblings('.email_warning')
                .html('请输入邮箱！')
                .css({
                    'display': 'block',
                    'color': 'green'
                })
        })
        $('.register_email').blur(function () {
            if ($(this).val() == '') {
                $(this)
                    .parent()
                    .parent()
                    .siblings('.email_warning')
                    .html('邮箱不能为空！')
                    .css({
                        'display': 'block',
                        'color': 'red'
                    })
            }
            else {
                let input_val = $(this).val();
                let regular = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
                if (!regular.test(input_val)) {
                    $(this)
                        .parent()
                        .parent()
                        .siblings('.email_warning')
                        .html('邮箱格式不正确')
                        .css({
                            'display': 'block',
                            'color': 'red'
                        })
                }
                else {
                    $(this)
                        .parent()
                        .parent()
                        .siblings('.email_warning')
                        .html('邮箱格式正确')
                        .css({
                            'display': 'block',
                            'color': 'green'
                        })
                }
            }
        })
    }

    // 注册
    register_ajax();
    function register_ajax() {
        $('.register_btn').click(function () {
            let password_val = $('.register_password').val();
            let password_regular = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
            let phone_val = $('.register_phone').val();
            let phone_regular = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
            let email_val = $('.register_email').val();
            let email_regular = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

            if (password_regular.test(password_val) == false) {
                alert('注册输入的内容存在格式不符！')
            }
            else
                if (phone_regular.test(phone_val) == false) {
                    alert('注册输入的内容存在格式不符！')
                }
                else
                    if (email_regular.test(email_val) == false) {
                        alert('注册输入的内容存在格式不符！')
                    }
                    else {
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
                    }
        })
    }
}