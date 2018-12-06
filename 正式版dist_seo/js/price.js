// JavaScript Document
$().ready(function(e) {
    //头部
    getdetail();
    getBottomData();

    function setNumber(num, discount, discountList) {
        var rates = 0
        if (discountList != undefined) {
            // //console.log(discountList);
            discountList.forEach(element => {
                if (element.value == discount) {
                    rates = element.rates;
                }
            });
        }
        return discount != undefined ? numFormat(num * discount - rates) : numFormat(num);
    }
    function numFormat(num) {
        var res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
            return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
                return $1 + ",";
            });
        })
        return res;
    }

    function getdetail() {
        $.ajax({
            url: serverUrl+"/web/Pay/payBillCombo",
            data: {},
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                //console.log(data);
                if (data.msgNo == 1) {
                    initprice(data.payload);
                    $(".vip_contact_phone span").text(data.payload[0].tel)
                }
            },
            error: function() {
                //请求出错处理
                alert("系统错误，请联系管理员");
            }
        });
    }
   
    function getBottomData() {
        $.ajax({
            url: serverUrl+"/web/Main/latestApp",
            data: {},
            dataType: 'json',
            crossDomain: true,
            success: function(data) {

                //console.log();
                if (data.msgNo == 1) {
                    $('.ewm-item-box-ios').attr("src", data.payload.ios.path);
                    $('.ewm-item-box-and').attr("src", data.payload.android.path);
                    $('.ewm-item-box-ios-text').text('版本'+data.payload.ios.version+' '+data.payload.ios.add_time);
                    $('.ewm-item-box-and-text').text('版本'+data.payload.android.version+' '+data.payload.android.add_time);
                }
            },
            error: function() {
                //请求出错处理
                alert("系统错误，请联系管理员");
            }
        });
    }
    var result = '';
    function initprice(data) {
        // //console.log(data);
        var packageList = [{
            type: 1,
            name: "基础款",
            desc: "加入团队即可享有",
            desc1: " ",
            totalPrice: "",
            btn: "注  册",
            func: {
                name: "免费功能：",
                list: [{
                        name: "可创建项目15个",
                        btn: ""
                    },
                    {
                        name: "征信50次",
                        btn: ""
                    }
                ]
            }
        }]
        packageList = packageList.concat(data);
        // //console.log(packageList);
        var html = ''
        packageList.forEach((item, index) => {
            if (index == 0) {
                html += "<div class='package_item current'>"
                html += "<h2 class='package_title'>" + item.name + "</h2>"
                html += "<p class='package_smalltitle'>" + item.desc + "</p>"
                html += "<p class='package_minititle'>" + item.desc1 + "</p>"
                html += "<a><div class='package_btn'>" + item.btn + "</div></a>"
                html += "<div class='package_vipfuncbox'>"
                // //console.log(item);
                html += "<div class='package_vipitem_title'>" + item.func.name + "</div>"
                html += "<div class='package_vipfunclist'>"
                item.func.list.forEach(item1 => {
                    html += "<div class='package_vipfuncitem'>"
                    html += "<span class='iconfont icon-zhengque'></span>"
                    html += "<div class='package_vipfunc_text'>" + item1.name + "</div>"
                    html += "</div>"
                })
                html += "</div>"
                html += "</div>"
                html += "</div>"
            } else {
                html += "<div class='package_item'>"
                html += "<h2 class='package_title'>" + item.mealName + "</h2>"
                html += "<p class='package_smalltitle'>增加管理项目数量</p>"
                html += "<p class='package_minititle'>(按年支付)</p>"
                html += "<div class='package_btn'>"
                if (index == 1) {
                    html += "<span class='noDiscount'></span>"
                }
                html += "<span class='haveDiscount'></span>"
                html += "</div>"
                html += "<div class='package_vipfuncbox'>"
                html += "<div class='package_vipitem_title'>包含基础款所有功能，以及以下可选功能：</div>"
                if (index == 1) {
                    html += "<div class='package_vipitem_radiobox'>"
                    item.discountInfo.forEach((radio, radioindex) => {
                        html += "<div class='package_vipitem_radio'>"
                        html += "<input type='radio' name='colors' class='selectRadio' value="+radio.discount/10+" data-cutCount="+radio.rates+">"
                        if (radio.discount != 10) {
                            html += "<span>" + radio.period + "年(" + radio.discount + "折)</span>"
                        } else {
                            html += "<span>" + radio.period + "年</span>"
                        }
                        if (radioindex == (item.discountInfo.length - 1)) {
                            html += "<img src='images/icon_tj.png' class='icon_tj' alt=''>"
                        }
                        html += "</div>"
                    })
                    html += "</div>"
                }
                html += "<div class='package_vipfunclist package_vipfunclist1'>"
                item.list.forEach(item1 => {
                    html += "<div class='package_vipfuncitem'>"
                    html += "<span class='iconfont icon-danxuanweixuanzhong iconfont-click' data-value='"+item1.price+"'></span>"
                    html += "<div class='package_vipfunc_text'>" + item1.name + "</div>"
                    html += "<div class='package_vipfunc_span'>" + setNumber(item1.price) + "</div>"
                    html += "</div>"

                })
                html += "</div>"
                html += "</div>"
                html += "</div>"
            }

        })
        var package1={
            radio:0,
            index:0
        }
        $(".package_list").html(html);

        //设置默认值
        $(".package_item").eq(1).find(".noDiscount").text(setNumber(packageList[1].list[0].price));
        $(".package_item").eq(1).find(".haveDiscount").text(setNumber(packageList[1].list[0].price*(packageList[1].discountInfo[2].discount/10)-packageList[1].discountInfo[2].rates));
        $(".package_item").eq(2).find(".haveDiscount").text(setNumber(packageList[2].list[0].price));
        $(".package_item").eq(1).find(".package_vipitem_radio").eq(2).find("input").attr("checked", 'checked');
        $(".package_item").eq(1).find(".package_vipitem_radio").eq(2).find("input").addClass('isSelected');
        $(".package_vipfunclist1").eq(0).find(".package_vipfuncitem").eq(0).find(".iconfont").removeClass("icon-danxuanweixuanzhong").addClass("icon-xuanzhong")
        $(".package_vipfunclist1").eq(1).find(".package_vipfuncitem").eq(0).find(".iconfont").removeClass("icon-danxuanweixuanzhong").addClass("icon-xuanzhong");
        
        $('.selectRadio').click(function(){
            $(this).addClass('isSelected');
            $(this).parent('.package_vipitem_radio').siblings('.package_vipitem_radio').children('.selectRadio').removeClass('isSelected');
            result = $('.current .icon-xuanzhong').attr('data-value')*$(this).val();
            $('.current .noDiscount').text(numFormat($('.current .icon-xuanzhong').attr('data-value')));
            $('.current .haveDiscount').text(numFormat(result-$(this).attr('data-cutCount')));
        })
        $('.iconfont').click(function(){
            $(this).removeClass("icon-danxuanweixuanzhong").addClass("icon-xuanzhong");
            $(this).parent('.package_vipfuncitem').siblings('.package_vipfuncitem').children('.iconfont').removeClass("icon-xuanzhong").addClass("icon-danxuanweixuanzhong");
            if($('.current .isSelected').val()==null||$('.current .isSelected').val()==undefined){
                $('.current .haveDiscount').text( numFormat($(this).attr('data-value')));
            }else{
                result = $(this).attr('data-value')*$('.current .isSelected').val();
                $('.current .noDiscount').text(numFormat($(this).attr('data-value')));
                $('.current .haveDiscount').text(numFormat(result-$('.current .isSelected').attr('data-cutCount')));
            }
        })
        $(".package_item").hover(function () {
            $(this).addClass('current');
            $(this).siblings('.current').removeClass('current');
        });


    }

})