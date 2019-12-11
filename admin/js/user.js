$(function () {
    // 获取当前用户信息并显示
    $.get({
        url: BigNew.user_detail,
        dataType:'json',
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                
                // $('.username').val(res.data.username);
                // $('.nickname').val(res.data.nickname);
                // $('.email').val(res.data.email);
                // $('.password').val(res.data.password);
                //遍历对象优化代码
                for (var key in res.data) {
                    $('.' + key).val(res.data[key]);
                }
                $('.user_pic').attr('src', res.data.userPic);
             }
         }
    });
    // 注册change事件，实现图片预览效果
    $('#exampleInputFile').on('change', function () { 
        let file = this.files[0];
        // console.log(this.files);
        let url = URL.createObjectURL(file);//???
        $('.user_pic').attr('src', url);
    });
    // 编辑用户信息
    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        let form = $('#form')[0];
        let userdata = new FormData(form);
        $.post({
            url: BigNew.user_edit,
            data: userdata,
            processData: false,
            contentType:false,
            success: function (res) {
                if (res.code === 200) {
                    $.get({
                        url: BigNew.user_info,
                        success: function (res) {
                            parent.$('.user_info img').attr('src', res.data.userPic);
                            parent.$('.user_info span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                            parent.$('.user_center_link>img').attr('src', res.data.userPic);
                        }
                    });
                 }
            }
        });
     })
    
 });