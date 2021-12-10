// 导入 express
const express = require('express');

// 引入 path 模块
const path = require('path');

// 引入 express-session 模块
const session = require('express-session');

// 引入 dateformat 模块
// const dateFormat = require('dateformat');
// const formatDate = require('./middleware/formatDate');

// 引入 morgan 模块
const morgan = require('morgan'); 

// 引入 config 模块
// const config = require('config');
// 获取配置信息
// let dbConfig = config.get('title');
// 输出配置信息
// if (process.env.NODE_ENV == 'development') {
//   console.log('当前是开发环境');
//   console.log(dbConfig);
//   // console.log(dbConfig.host);
// } else {
//   console.log('当前是生产环境');
//   console.log(dbConfig);
// }

// 导入路由
const recordRouter = require('./route/record');
const caleRouter = require('./route/cale');
const statRouter = require('./route/stat');
const planRouter = require('./route/plan');
// const { nextTick } = require('process');

// 创建网站服务器
const app = express();

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 设置 express-session 的中间件
// app.use(session({
//   secret: 'secret key',
//   resave: true, 
//   saveUninitialized: false, // 未登录状态不储存 cookie
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000
//   }
// }))

// 登录拦截
// app.use('/admin', require('./middleware/loginGuard'));

// 设置跨域问题
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})

// app.use(express.urlencoded({ extended: false }))
// bodyParser 被弃用
// 用 express 调用 bodyParser 的方法
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 为路由匹配请求路径
app.use('/home', require('./route/home'))
app.use('/movement', require('./route/movement'))
app.use('/workout', require('./route/workout'))
app.use('/break', require('./route/break'))
app.use('/record', recordRouter);
app.use('/cale', caleRouter);
app.use('/stat', statRouter);
app.use('/plan', planRouter);

// 错误处理
// 跳转地址和错误信息需要通过参数传入
// JSON.parse()
app.use((err, req, res, next)=>{
  if(err.message.indexOf('ER_DUP_ENTRY') !== -1) return res.status(401).send({ msg: '名称重复' })
  res.status(500).send(err.message)
  // res.json({
  //   meta: { msg: err.message },
  //   data: null
  // })
})

// 数据库连接
// require('./model/connect');

// 测试代码 新建用户
// require('./model/user');

// 向模版内部导入 dateFormat 变量
// template.defaults.imports.dateFormat = dateFormat;

// 返回系统监听
app.listen(3000, ()=> console.log('You are listening to port 3000'));
