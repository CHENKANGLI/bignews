$(function() {
  $(".input_sub").on("click", function(e) {
    e.preventDefault();
    //验证用户名和密码非空
    let userName = $(".input_txt")
      .val()
      .trim();
    let passWord = $(".input_pass")
      .val()
      .trim();
    if (userName == "" || passWord == "") {
      $("#exampleModal").modal();
      return;
    }

    $.post({
      url: BigNew.user_login,
      data: {
        username: userName,
        password: passWord
      },
      success: function(res) {
        console.log(res);
        if (res.code === 200) {
          location.href = "./index.html";
        }
      }
    });
  });
});
