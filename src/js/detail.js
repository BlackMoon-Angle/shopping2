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

    //接受列表页数据，渲染
    Data_rendering();
    function Data_rendering() {
        //拿到localStorage的数据
        //解析
        const info = JSON.parse(localStorage.getItem('detailInfo'));

        //判断数是否存在
        if (!info) {
            alert('数据不存在！');
            //跳转回列表页
            window.location.href = '../pages/list.html';
        }

        //渲染页面
        rendering();
        function rendering() {
            // 头部
            $('.a1').text(info.head_title);
            $('.a2').text(info.head_title2);
            $('.a3').text(info.head_title3);
            $('.a4').text(info.head_title4);

            // 主视图
            $('.mask_BigImg').attr('src', info.big_img);
            //投影
            $('.fdj_box > img').attr('src', info.big_img);

            //商品名称
            $('.info_head > h3').text(info.title);

            //选项卡
            option();
            function option() {
                let str = '';

                info.left_list.forEach(item => {
                    str += `
                    <li>
                        <a class="option_a" href="javascript:;"
                            rel="${item.left_img}">
                            <img src="${item.left_img}"
                                width="34" height="34">
                        </a>
                    </li>
                    `
                })
                $('.left_img_option_div_ul').html(str);
            }

            //规格
            specifications();
            function specifications() {
                let str = '';

                info.specifications.forEach(item => {
                    str += `
                    <li>
                        <a>${item.size}</a>
                    </li>
                    `
                })
                $('.info_specifications_div_span2 > ul').html(str);
            }

            option_click();
            fdj();
            specifications_click();
        }
    }

    //选项卡
    function option_click() {
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

    // 规格点击事件
    function specifications_click() {
        // 默认第一个规格项为首选
        $('.info_specifications_div_span2')
            .children('ul')
            .children('li')
            .first()
            .children('a')
            .css({
                "border": "1px solid #e70516",
                "color": "#ed3029"
            })

        $('.info_specifications_div_span2').on('click', 'a', function () {

            $(this)
                .parents('ul')
                .children('li')
                .children()
                .css({
                    "border": "1px solid #e0e0e0",
                    "color": "#333333"
                })
            $(this)
                .css({
                    "border": "1px solid #e70516",
                    "color": "#ed3029"
                })
        })
    }

    //如果选择其他导航项
    //跳回列表页数据
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
                window.location.href = '../pages/list.html';
            }
        })
    })

}