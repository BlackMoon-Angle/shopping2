"use strict";window.onload=function(){function s(){var i=(JSON.parse(localStorage.getItem("cartList"))||[]).filter(function(i){return i.number}),t=0;i.forEach(function(i){t+=i.number}),$(".span_number").html(t)}$("#wx_Two_nav").mouseenter(function(){$(this).children(".wx_div").css("display","block"),$(this).children(".marrl").css("background","url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/ico-menu.png) no-repeat -24px 0")}),$("#wx_Two_nav").mouseleave(function(){$(this).children(".wx_div").css("display","none"),$(this).children(".marrl").css("background","url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/ico-menu.png) no-repeat -32px 0")}),$(".head_nav_ul_li").mouseenter(function(){$(this).children(".head_nav_ul_li_div").css("display","block")}),$(".head_nav_ul_li").mouseleave(function(){$(this).children(".head_nav_ul_li_div").css("display","none")}),function(){var i=sessionStorage.getItem("userInfo"),t=i?JSON.parse(i):{};t.user&&($(".login_not_online").css("display","none"),$(".login_online").css("display","block").children(".login_online_div").children(".login_online_div_username").html(t.user),s());$(".out_btn").click(function(){sessionStorage.removeItem("userInfo"),location.reload()})}(),function(){var a=JSON.parse(localStorage.getItem("detailInfo"));a||(alert("数据不存在！"),window.location.href="../pages/list.html");$(".a1").text(a.head_title),$(".a2").text(a.head_title2),$(".a3").text(a.head_title3),$(".a4").text(a.head_title4),$(".mask_BigImg").css("opacity","1").attr("src",a.big_img),$(".fdj_box > img").attr("src",a.big_img),$(".info_head > h3").text(a.title),$(".info_pri_div2_span2").append("<font>¥</font>"+a.pri),e="",a.left_list.forEach(function(i){e+='\n                    <li>\n                        <a class="option_a" href="javascript:;"\n                            rel="'.concat(i.left_img,'">\n                            <img src="').concat(i.left_img,'"\n                                width="34" height="34">\n                        </a>\n                    </li>\n                    ')}),$(".left_img_option_div_ul").html(e),t="",a.specifications.forEach(function(i){t+="\n                    <li>\n                        <a>".concat(i.size,"</a>\n                    </li>\n                    ")}),$(".info_specifications_div_span2 > ul").html(t),$(".left_img_option_div_ul").on("click",".option_a",function(){$(this).parents(".left_img_option").siblings(".left_BigImg").children("a").children("img").attr("src",$(this).attr("rel")),$(this).parents(".left_img_option").siblings(".left_BigImg").children(".fdj_box").children("img").attr("src",$(this).attr("rel"))}),$(".mask").mouseover(function(){$(".float_layer").show(),$(".big_box").show()}),$(".mask").mouseout(function(){$(".float_layer").hide(),$(".big_box").hide()}),$(".mask").mousemove(function(i){var t=i.pageX-$(".pBigPic").offset().left-$(".float_layer").width()/2,e=i.pageY-$(".pBigPic").offset().top-$(".float_layer").height()/2;t<0&&(t=0),t>$(this).width()-$(".float_layer").width()&&(t=$(this).width()-$(".float_layer").width()),e<0&&(e=0),e>$(this).height()-$(".float_layer").height()&&(e=$(this).height()-$(".float_layer").height()),$(".float_layer").css({left:t,top:e});var n=t/($(".mask").width()-$(".float_layer").width()),o=e/($(".mask").height()-$(".float_layer").height());$(".big_box img").css({left:-n*($(".big_box img").width()-$(".big_box").width()),top:-o*($(".big_box img").height()-$(".big_box").height())})}),$(".info_specifications_div_span2").children("ul").children("li").first().children("a").css({border:"1px solid #e70516",color:"#ed3029"}),$(".info_specifications_div_span2").on("click","a",function(){$(this).parents("ul").children("li").children().css({border:"1px solid #e0e0e0",color:"#333333"}),$(this).css({border:"1px solid #e70516",color:"#ed3029"})}),$(".prodCartBtn").click(function(){var i=sessionStorage.getItem("userInfo"),t=i?JSON.parse(i):{};if(t.user){var e=JSON.parse(localStorage.getItem("cartList"))||[],n=e.some(function(i){return i.list_id==a.list_id});if(n){for(var o=null,l=0;l<e.length;l++)if(e[l].list_id==a.list_id){o=e[l];break}o.number++,o.All_pri=o.number*o.pri}else a.number=1,a.All_pri=a.pri,a.isSelect=!1,e.push(a);localStorage.setItem("cartList",JSON.stringify(e)),s()}else alert("请登录后再进行购物！"),location.href="../pages/login.html"});var t,e}(),$(".head_nav_ul_li_a").click(function(){var n=$(this).attr("id");$.ajax({url:"../lib/list.json",dataType:"json",success:function(i){for(var t=null,e=0;e<i.length;e++)if(i[e].id==n){t=i[e];break}localStorage.setItem("listInfo",JSON.stringify(t)),window.location.href="../pages/list.html?id="+n}})})};