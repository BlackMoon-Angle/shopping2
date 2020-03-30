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

    //选项卡
    option()
    function option() {
        $('.left_img_option_div_ul').on('click', '.option_a', function () {
            // 修改主视图
            $(this)
                .parents('.left_img_option')
                .siblings('.left_BigImg')
                .children('a')
                .children('img')
                .attr('src', $(this).attr('rel'));//修改主视图img的src值

            // 修改放大镜投影视图
            $(this)
                .parents('.left_img_option')
                .siblings('.left_BigImg')
                .children('.fdj_box')
                .children('img')
                .attr('src', $(this).attr('rel'));
        });
    }

    //放大镜
    fdj()
    function fdj() {
        $(".mask").mouseover(function () {
            $(".float_layer").show()
            $(".big_box").show()
        })
        $(".mask").mouseout(function () {
            $(".float_layer").hide()
            $(".big_box").hide()
        })
        $(".mask").mousemove(function (e) {
            var l = e.pageX - $(".pBigPic").offset().left - ($(".float_layer").width() / 2)
            var t = e.pageY - $(".pBigPic").offset().top - ($(".float_layer").height() / 2)
            if (l < 0) {
                l = 0
            }
            if (l > $(this).width() - $(".float_layer").width()) {
                l = $(this).width() - $(".float_layer").width()
            }
            if (t < 0) {
                t = 0
            }
            if (t > $(this).height() - $(".float_layer").height()) {
                t = $(this).height() - $(".float_layer").height()
            }
            $(".float_layer").css({
                "left": l,
                "top": t
            })
            var pX = l / ($(".mask").width() - $(".float_layer").width())
            var pY = t / ($(".mask").height() - $(".float_layer").height())
            $(".big_box img").css({
                "left": -pX * ($(".big_box img").width() - $(".big_box").width()),
                "top": -pY * ($(".big_box img").height() - $(".big_box").height())
            })
        })
    }

}