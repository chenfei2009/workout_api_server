// 导入 express
const express = require('express')

// 引入 path 模块
const path = require('path')

// 创建网站服务器
const app = express()

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

// 设置跨域问题
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options')
    res.send(200)
  else
    next()
})

// 用 express 调用 bodyParser 的方法
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 导入路由并匹配请求路径
app.use('/home', require('./route/home'))
app.use('/movement', require('./route/movement'))
app.use('/workout', require('./route/workout'))
app.use('/break', require('./route/break'))
app.use('/record', require('./route/record'))
app.use('/cale', require('./route/cale'))
app.use('/stat', require('./route/stat'))
app.use('/plan', require('./route/plan'))

// 错误处理
// 跳转地址和错误信息需要通过参数传入
// JSON.parse()
app.use((err, req, res, next) => {
  if(err.message.indexOf('ER_DUP_ENTRY') !== -1) return res.status(401).send({ msg: '名称重复' })
  res.status(500).send(err.message)
})

// 返回系统监听
app.listen(3000, () => console.log('You are listening to port 3000'))
