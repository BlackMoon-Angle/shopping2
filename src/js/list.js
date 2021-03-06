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

    // 商品排序二级菜单
    shop_sort()
    function shop_sort() {
        // 移入
        $('.sort_div').mouseenter(function () {
            $(this)
                .children('.sort_list')
                .css('display', 'block')
        })
        // 移出
        $('.sort_div').mouseleave(function () {
            $(this)
                .children('.sort_list')
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

    //接受传递数据，列表页数据渲染
    list_rendering();
    function list_rendering() {

        //拿到localStorage的数据
        //解析
        const info = JSON.parse(localStorage.getItem('listInfo'));

        let a_arr = $('.head_nav_ul_li_a');

        for (let i = 0; i < a_arr.length; i++) {

            a_arr[i].style.color = "#FFFFFF";

            if (a_arr[i].id == info.id) {//如果id相同

                a_arr[i].style.color = "#F94915";

                break;//匹配后打断循环
            }
        }



        //判断数是否存在
        if (!info) {
            alert('数据不存在！');
            //跳转回列表页
            window.location.href = '../pages/index.html';
        }

        //渲染页面
        rendering();
        function rendering() {

            $('.main_div_a2').text(info.title);
            $('.banner_img').attr('src', info.banner)

            //左边分类渲染
            list_left_rendering()
            function list_left_rendering() {
                let str = '';
                str += `
                    <dt>
                        <i></i>
                        <span catid="119" style="cursor:pointer;">${info.left_title}</span>
                    </dt>
                    `
                info.classify.forEach(item => {
                    str += `
                        <dd><a href="javascript:void(0);">${item.dd}</a></dd>
                        `
                })
                $('.commodity_left_div1_dl').html(str);
            }

            //右边商品列表渲染
            list_right_rendering()
            function list_right_rendering() {

                let list_res = [];//定义一个数组，用于接受处理过的数据

                //渲染分页器
                $('.M-box3').pagination({
                    pageCount: Math.ceil((info.right_list).length / 3),//总页数
                    current: 1,//当前页
                    jump: true,
                    coping: true,
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '上页',
                    nextContent: '下页',
                    callback: function (api) {

                        let curr = api.getCurrent();//获取，当前是第几页

                        var list = info.right_list.slice((curr - 1) * 3, curr * 3)//切割数据,slice(start, end),不包括尾部

                        rendering_shop(list);//使用分页器时，渲染

                    }
                });

                //将list.json数据，传递给list_res
                list_res = info.right_list;

                //优先降第一页的数据渲染
                rendering_shop(info.right_list.slice(0, 3));


                //渲染分页过的数据
                function rendering_shop(list) {

                    let str = ''
                    list.forEach(item => {

                        str += `
                    <li>
                        <i></i>
                        <a id="${item.list_id}" class="commodity_list_a" href="javascript:;">
                            <div class="commodity_list_div_img">
                                <img src="${item.img}"
                                    width="527" height="506">
                            </div>
                            <div class="commodity_list_div2_img">
                                <img src="${item.img2}"
                                    width="527" height="506">
                            </div>
                        </a>
                        <p class="commodity_name">${item.img_title}</p>
                        <p class="commodity_price">${item.pri}</p>
                        </li>
                    `
                    })
                    $('.commodity_list').html(str);
                }
            }
        }
        img_show()
    }
    //商品主视图切换事件
    function img_show() {
        // 移入
        $('.commodity_list').on('mouseenter', '.commodity_list_a', function () {
            $(this)
                .children('.commodity_list_div2_img')
                .css('display', 'block')
        });
        // 移出
        $('.commodity_list').on('mouseleave', '.commodity_list_a', function () {
            $(this)
                .children('.commodity_list_div2_img')
                .css('display', 'none')
        });
    }

    //如果选择其他导航项
    //重新渲染列表页数据
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

    //列表页与详细页数据交互
    $('.commodity_list').on('click', '.commodity_list_a', function () {

        const DataId = $(this).attr('id');//获取点击的a身上的id属性

        $.ajax({
            url: '../lib/detail.json',
            dataType: 'json',
            success: function (res) {
                let data = null;

                for (let i = 0; i < res.length; i++) {
                    if (res[i].list_id == DataId) {//如果id相同

                        data = res[i];//接受数据

                        break;//匹配后打断循环
                    }
                }
                //将数据存储到localStorage
                localStorage.setItem('detailInfo', JSON.stringify(data));

                // 跳转页面到列表页
                window.location.href = '../pages/detail.html?id=' + DataId;
            }
        })
    })
}