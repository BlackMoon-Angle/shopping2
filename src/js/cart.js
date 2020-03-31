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

    //接受详细页数据，购物车渲染
    cart_info();
    function cart_info() {

        //获取数据
        const cartList = JSON.parse(localStorage.getItem('cartList'));

        //判断是否存在数据
        if (!cartList) {
            alert('购物车为空！')
        }
        else {
            html_info();
            bindEvent();
        }

        //购物信息渲染
        function html_info() {

            let selectAll = cartList.every(item => {

                return item.isSelect === true;
            });

            let str = '';//用于左侧商品信息
            let str2 = '';//用于右侧总数量与价格

            str += `
            <!-- 商品信息头部 -->
            <ul class="buy_box_head">
                <li class="buy_box_head_li">
                    <label><input class="all_btn" type="checkbox" ${selectAll ? 'checked' : ''} ><span>全选</span></label>
                </li>
                <li class="buy_box_head_li2">商品数量</li>
                <li class="buy_box_head_li3">单价(元)</li>
                <li class="buy_box_head_li4">数量</li>
                <li class="buy_box_head_li5">小计</li>
                <li class="buy_box_head_li6">操作</li>
            </ul>
            `

            cartList.forEach(item => {
                str += `
                <!-- 购买商品信息 -->
                <ul class="info_ul">
                    <!-- 选项 -->
                    <li class="info_ul_li">
                        <label><input class="single_btn" id="${ item.list_id}" type="checkbox" ${item.isSelect ? 'checked' : ''}></label>
                    </li>
                    <!-- 信息 -->
                    <li class="info_ul_li2">
                        <div class="info_ul_li_div">
                            <a class="info_ul_li_div_a" href="javascript:;">
                                <img
                                    src="${item.big_img}">
                            </a>
                            <div class="info_ul_li_div_div">
                                <a href="javascript:;">
                                    <span>${item.head_title4}</span>
                                </a>
                                <div class="info_ul_li_div_div_div">
                                    <span style="display: block;">
                                        <span>型号</span>：<span>常规</span></span>
                                    <span style="display: block;">
                                        <span>规格</span>：<span>${item.specifications[0].size}</span></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- 单价 -->
                    <li class="info_ul_li3">
                        <span>¥
                            <span>${item.pri} 元</span>
                        </span>
                    </li>
                    <!-- 数量操作 -->
                    <li class="info_ul_li4">
                        <div>
                            <a class="reduce_a" id=${ item.list_id}>
                                <img src="//js01.daoju.qq.com/zb/lolriotmall/ht/buy_jian.jpg">
                            </a>
                            <input type="text" value="${item.number}" disabled="value">
                            <a class="add_a" id=${ item.list_id}>
                                <img src="//js01.daoju.qq.com/zb/lolriotmall/ht/buy_jia.jpg">
                            </a>
                        </div>
                    </li>
                    <!-- 小计 -->
                    <li class="info_ul_li5">
                        <span>¥</span>
                        <span>
                        ${(item.All_pri * 1).toFixed(2)}
                        </span>
                    </li>
                    <!-- 操作 -->
                    <li class="info_ul_li6">
                        <a class="delete_a" id="${ item.list_id}">删除</a>
                    </li>
                </ul>
                `
            })

            str += `
                <!-- 底部全选与清空 -->
                <ul class="info_bottom">
                    <li class="info_bottom_li">
                        <label><input class="all_btn" type="checkbox" ${selectAll ? 'checked' : ''} ><span>全选</span></label>
                    </li>
                    <li style="width: 348px;">&nbsp;</li>
                    <li style="width: 80px;">&nbsp;</li>
                    <li style="width: 152px;">&nbsp;</li>
                    <li style="width: 80px;">&nbsp;</li>
                    <li class="info_bottom_li2"><a class="empty_a" href="javascript:;">清空购物车</a></li>
                </ul>
                `
            $('.buy_box').html(str);

            let selectArr = cartList.filter(item => item.isSelect)

            let selectNumber = 0;//选中商品数量计算
            let selectPrice = 0;//总价格

            selectArr.forEach(item => {
                selectNumber += item.number
                selectPrice += item.All_pri * 1
            })

            str2 +=`
            <div class="right_buy_box">
                <h3>我的购物车</h3>
                <!-- 结算 -->
                <div class="right_buy_box_pay">
                    <div class="pay_div">
                        商品数量：<span>${selectNumber}</span><br>
                        商品金额：<span style="color: #ed3029;">¥<font>${(selectPrice * 1).toFixed(2)}</font></span>
                        <a href="javascript:;">去结算</a>
                    </div>
                    <div class="pay_div2">
                        <div class="pay_div2_div">
                            <div class="pay_div2_div_div">承诺</div>
                            <div class="pay_div2_div_div2">
                                7天无理由退换货<br>100%官方正品<br>全场每单满199元包邮
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            $('.right_buy').html(str2);
        }

        // 按钮事件绑定
        function bindEvent() {

            //全选按钮的事件
            $('.buy_box').on('change', '.all_btn', function () {
                //当全选按钮被选上时
                //其他的选择按钮也被选中
                cartList.forEach(item => {
                    item.isSelect = this.checked;
                })
                //重新渲染页面
                html_info();

                //重新储存数据，防止页面刷新的时候，重置按钮
                localStorage.setItem('cartList', JSON.stringify(cartList));
            })

            //单选按钮的事件
            $('.buy_box').on('change', '.single_btn', function () {

                //获取自己身上的id
                const id = $(this).attr('id');

                //从数据中，匹配到id相同的数据，修改isSelect的值
                cartList.forEach(item => {
                    if (item.list_id == id) {
                        item.isSelect = !item.isSelect
                    }
                })

                // //重新渲染页面
                html_info();

                // //重新储存数据，防止页面刷新的时候，重置按钮
                localStorage.setItem('cartList', JSON.stringify(cartList));
            })

            //减少按钮
            $('.buy_box').on('click', '.reduce_a', function () {

                //获取自己身上的id
                const id = $(this).attr('id');

                //从数据中，匹配到id相同的数据，修改number和Allmoney的值
                cartList.forEach(item => {
                    if (item.list_id == id) {
                        //当number为1的时候，就停止继续减少
                        item.number > 1 ? item.number-- : '';
                        item.All_pri = item.pri * item.number;
                    }
                })
                // //重新渲染页面
                html_info();

                // //重新储存数据，防止页面刷新的时候，重置按钮
                localStorage.setItem('cartList', JSON.stringify(cartList));
            })

            //增加按钮
            $('.buy_box').on('click', '.add_a', function () {

                //获取自己身上的id
                const id = $(this).attr('id');

                //从数据中，匹配到id相同的数据，修改number和Allmoney的值
                cartList.forEach(item => {
                    if (item.list_id == id) {
                        item.number++;
                        item.All_pri = item.pri * item.number;
                    }
                })
                // //重新渲染页面
                html_info();

                // //重新储存数据，防止页面刷新的时候，重置按钮
                localStorage.setItem('cartList', JSON.stringify(cartList));
            })

            //删除按钮
            $('.buy_box').on('click', '.delete_a', function () {
                //获取自己身上的id
                const id = $(this).attr('id');

                //从数据中，匹配到id相同的数据，进行删除
                cartList.forEach(item => {
                    if (item.list_id == id) {
                        cartList.splice(item.index,1)
                    }
                })

                //重新渲染页面
                html_info();

                //重新储存数据，防止页面刷新的时候，重置按钮
                localStorage.setItem('cartList', JSON.stringify(cartList));
            })

            //清空按钮
            $('.buy_box').on('click', '.empty_a', function () {
                var ls_list = JSON.parse(localStorage.getItem('cartList'));//获取数组
                ls_list.splice(0);

                // //重新渲染页面
                html_info();
                // //重新储存数据，防止页面刷新的时候，重置按钮
                localStorage.setItem('cartList', JSON.stringify(ls_list));

                cart_info();
            })

        }
    }
}