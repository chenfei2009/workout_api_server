// 登录拦截
const guard = (req, res, next)=>{
  // 判断是否为登录页面
  // 判断用户的登录状态
  if(req.url != '/login' && !req.session.username){
    // 如果不是，返回登录页面
    res.redirect('/admin/login');
  } else {
    // 如果是，判断用户角色
    if (req.session.role == 'normal') return res.redirect('/home');
    next();
  }
}

module.exports = guard;
