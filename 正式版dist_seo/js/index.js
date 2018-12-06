// JavaScript Document
$().ready(function(e) {
    var dataArr = [{
        info1: '企业级数据加密方案',
        info2: '顶级算法对数据进行高强度加密',
    }, {
        info1: '专用数据通道进行数据传输',
        info2: '使用HTTPS协议加密，保证传输过程中数据无泄漏',
    }, {
        info1: '行业领先数据存储方案',
        info2: '多套数据备份方案，让机构数据存储高枕无忧',
    }, {
        info1: '可加选的私有云部署',
        info2: '客户可选择自建服务器或托管服务器进行运维',
    }];
    //头部
    getdetail()
    function getdetail() {
        $.ajax({
            url: serverUrl+"/web/Main/latestApp",
            data: {},
            dataType: 'json',
            crossDomain: true,
            success: function(data) {

                console.log();
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
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var top1 = $('.line7').offset().top - 200;
        var top2 = $('.line4').offset().top - 300;
        var top3 = $('.line5').offset().top - 300;
        if (scrollTop > top1) {
            $('.img-item-box-showtext1').addClass('img-item-box-show')
        } else {
            $('.img-item-box-showtext1').removeClass('img-item-box-show')
        }
        if (scrollTop > top2) {
            $('.showTitle1').addClass('toshow')
        } else {
            $('.showTitle1').removeClass('toshow')
        }
        if (scrollTop > top3) {
            $('.showTitle2').addClass('toshow')
        } else {
            $('.showTitle2').removeClass('toshow')
        }
        if (scrollTop > top1) {
            $('.showTitle3').addClass('toshow')
        } else {
            $('.showTitle3').removeClass('toshow')
        }
    })
    $('.line5_item').click(function() {
        var index = $(this).index();
        $('.line5_item .line5_item_img img').removeClass('img_hover');
        $(this).children('.line5_item_img').children('img').addClass('img_hover');
        var step = $('.line5_item').length / 2 - index;
        var left = -336 * step + 'px';
        $('.line5_item_line').css('margin-left', left);
        $('.line5_item_info').css('margin-left', left);

        $('.line5_item_info h2').text(dataArr[index].info1)
        $('.line5_item_info h3').text(dataArr[index].info2)
    })
    
})