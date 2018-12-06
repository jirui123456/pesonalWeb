// JavaScript Document
// $().ready(function(e) {
    //头部
    // var loginUrl = '/dist_pre/#/login';
    // var registerUrl = '/dist_pre/#/register';

    var service = 'saas';
    var serverUrl = '';
    var loginUrl = '';
    var registerUrl = '';

    if (service == 'saas') {
        loginUrl = 'http://saas.pewinner.com/#/login';
        registerUrl = 'http://saas.pewinner.com/#/register';
        serverUrl = 'https://sougu.pewinner.com';
    } else if(service == 'pre'){
        loginUrl = 'http://preht.pewinner.com/#/login';
        registerUrl = 'http://preht.pewinner.com/#/register';
        serverUrl = 'http://prehts.pewinner.com';
    }else{
        loginUrl = '/dist_pre/#/login';
        registerUrl = '/dist_pre/#/register';
        serverUrl = 'http://prehts.pewinner.com';
    } 
    function tabclick(pageName){
        window.location.href="./"+pageName;
    }
    function login(){
        window.location.href=loginUrl
    }
    function register(tel){
        if(tel==undefined){
            window.location.href=registerUrl
        }else{
            var tel = $('#registerPhone').val();
            window.location.href=registerUrl+'?phone='+tel;
        }
        
    }
// })();