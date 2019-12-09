// 获取用户信息并显示
$(function () {
    $.get({
        url: BigNew.user_info,
        success: function (res) {
            // console, log(res);
            $('.user_info>img').attr('src',res.data.userPic);
            $('.user_center_link').attr('src', res.data.userPic);
            $('.user_info>span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
        }
    });
    //注册点击退出事件
    $('.logout').on('click', function (e) {
        e.preventDefault();
        $('.modal-body').text('您确认要退出吗？');
        $('#exampleModal').modal();
        $('#btn-sure').on('click', function () {
            localStorage.removeItem('token');
            location.href = './login.html';
        });
    });
    //左侧菜单栏注册点击事件
    $('.level01').on('click', function () {
        //实现点击高亮
        $(this).addClass('active').siblings().removeClass('active');

        if ($(this).index() == 1) {
            $('.level02').slideToggle();
            //a标签模拟点击事件需要使用原生DOM元素调用click()方法;jquery对象无法调用,所以在这里我们获取到的a标签的jQuery对象要转换为原生的对象去调用click()这个方法
            $('.level02 li:eq(0) a')[0].click();

            $(this).find('b').toggleClass('rotate0');
         }
    });
    
    $('.level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
     });
});

