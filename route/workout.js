// 引入 express 框架
const express = require('express')
// const db = require('../model/mysql.js')
const record = require('../middleware/record')

// 创建页面路由
const workoutRouter = express.Router()

// bodyParser 被弃用
// 用 express 调用 bodyParser 的方法
// workoutRouter.use(express.json())
// workoutRouter.use(express.urlencoded({ extended: true }))

/**
 * 请求当前动作当前组别历史记录数据
 */
workoutRouter.get('/count/', [record.getRecordsByCount], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 请求当前动作上一组历史记录数据
 */
workoutRouter.get('/last/', [record.getLastRecord], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 新增训练记录
 */
workoutRouter.post('/add', [record.addRecord], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: { id: req.id }
  })
})

/**
 * 更新训练记录
 */
workoutRouter.put('/update', [record.putRecord], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: { id: req.id }
  })
})

// 导出路由对象
module.exports = workoutRouter