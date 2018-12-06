// JavaScript Document
$().ready(function(e) {
    //头部
    getdetail();

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

})