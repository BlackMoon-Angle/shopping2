window.onload = function () {
    //微信商城二级菜单
    wx()
    function wx() {
        // 移入
        $('#wx_Two_nav').mouseenter(function () {
            $(this)
                .children('.wx_div')
                .css('display', "block")
            $(this)
                .children('.marrl')
                .css('background', 'url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/ico-menu.png) no-repeat -24px 0')
        })
        // 移出
        $('#wx_Two_nav').mouseleave(function () {
            $(this)
                .children('.wx_div')
                .css('display', "none")
            $(this)
                .children('.marrl')
                .css('background', 'url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/ico-menu.png) no-repeat -32px 0')
        })
    }

    //导航条二级菜单
    Two_nav()
    function Two_nav() {
        // 移入
        $('.head_nav_ul_li').mouseenter(function () {
            $(this)
                .children('.head_nav_ul_li_div')
                .css('display', 'block')
        })
        // 移出
        $('.head_nav_ul_li').mouseleave(function () {
            $(this)
                .children('.head_nav_ul_li_div')
                .css('display', 'none')
        })

    }

    //检查用户是否登录
    user_inspect();
    function user_inspect() {
        const usermsg = sessionStorage.getItem("userInfo");
        const JSON_usermsg = usermsg ? JSON.parse(usermsg) : {};
        if (JSON_usermsg.user) {
            $('.login_not_online')
                .css('display', 'none')
            $('.login_online')
                .css('display', 'block')
                .children('.login_online_div')
                .children('.login_online_div_username')
                .html(JSON_usermsg.user)

            //登录后即可查看已购物数量
            statistics_num();

        }
        login_out();
    }

    //购物数量统计
    function statistics_num() {

        const cartList_info = JSON.parse(localStorage.getItem('cartList')) || [];

        let selectArr = cartList_info.filter(item => item.number)

        let selectNumber = 0;//商品数量计算

        selectArr.forEach(item => {
            selectNumber += item.number
        })

        $('.span_number').html(selectNumber);
    }

    //登录退出按钮
    function login_out() {
        $('.out_btn').click(function () {
            //移除sessionStorage
            sessionStorage.removeItem("userInfo");
            //刷新页面
            location.reload();
        })
    }

    //轮播图
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        cssMode: true,
        loop: true, // 循环模式选项
        autoplay: true,
        clickable: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination'
        },
        mousewheel: true,
        keyboard: true,
        effect: false
    });

    //推荐商品渲染
    $.ajax({
        url: '../lib/index.json',
        dataType: 'json',
        success: function (res) {
            let str = '';
            res.forEach(item => {
                str += `
                    <li>
                    <a href="javascript:;">
                        <img src="${item.img}" width="480"
                            height="300">
                    </a>
                    <p>${item.title}</p>
                </li>
                    `
            })
            $('.main_ul').html(str);
        }
    })

    //首页与列表页数据交互
    $('.head_nav_ul_li_a').click(function () {

        const DataId = $(this).attr('id');//获取点击的a身上的id属性

        $.ajax({
            url: '../lib/list.json',
            dataType: 'json',
            success: function (res) {
                let data = null;

                for (let i = 0; i < res.length; i++) {
                    if (res[i].id == DataId) {//如果id相同

                        data = res[i];//接受数据

                        break;//匹配后打断循环
                    }
                }
                //将数据存储到localStorage
                localStorage.setItem('listInfo', JSON.stringify(data));

                //跳转页面到列表页
                window.location.href = '../pages/list.html?id=' + DataId;
            }
        })
    })

}
