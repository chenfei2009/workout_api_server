// 引入 express 框架
const express = require('express')
// const db = require('../model/mysql.js')
const record = require('../middleware/record')

// 创建页面路由
const breakRouter = express.Router()

// bodyParser 被弃用
// 用 express 调用 bodyParser 的方法
// breakRouter.use(express.json())
// breakRouter.use(express.urlencoded({ extended: true }))

/**
 * 组间休息页面
 * 更新 record 数据
 */
breakRouter.put('/', [record.updateBreak], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

// 导出路由对象
module.exports = breakRouter