window.onload = function () {
    // 头部滚动公告
    textMove()
    function textMove() {
        var num = 0;
        function goLeft() {
            if (num == -1578) {
                num = 0;
            }
            num -= 1;
            $(".head_top_div2_div_begin").css({
                left: num
            })
            $(".head_top_div2_div_end").css({
                left: (1578 + num)
            })
        }
        //设置滚动速度
        var timer = setInterval(goLeft, 50);
        //设置鼠标经过时滚动停止
        $(".head_top_div2").hover(function () {
            clearInterval(timer);
        },
            function () {
                timer = setInterval(goLeft, 50);
            })
    }
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
}