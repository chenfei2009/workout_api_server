$(function() {
  // 此处是页面DOM加载完成的入口
  // 监听表单提交事件
  $('#loginForm').on('submit', function(){
    // 获取表单中的用户输入内容
    // let result = serializeToJson($(this));
    let {email, password} = serializeToJson($(this));
    // console.log(email, password);
    // 验证邮箱地址合法性的正则表达式
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
    // if (email.trim().length == 0) {
    //   alert('请输入邮箱');
    //   return false; // 阻止表单默认提交行为
    // } 
    // if (!reg.test(email)) {
    //   alert('请输入合法的邮箱地址');
    //   return false; // 阻止表单默认提交行为
    // }
    // if (password.trim().length == 0) {
    //   alert('请输入密码')
    //   return false; // 阻止表单默认提交行为
    // } 
    // if (password.trim().length < 6 || password.trim().length > 12) {
    //   alert('密码长度在6~12位');
    //   return false; // 阻止表单默认提交行为
    // }
    // 提交表单
    console.log('ok');
    // return false;
  })
});
