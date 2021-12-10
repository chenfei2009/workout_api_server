// 引入 express 框架
const express = require('express')

const db = require('../model/mysql.js')
const record = require('../middleware/record')

// 创建页面路由
const statRouter = express.Router()

// bodyParser 被弃用
// 用 express 调用 bodyParser 的方法
// statRouter.use(express.json())
// statRouter.use(express.urlencoded({ extended: true }))

/**
 * 查询 每个部位的训练天数
 */
statRouter.get('/part/:range', [record.getPartDataByRange], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/*
  查询 每个日期的训练容量
  @params 当前范围 range 7 30 90 近7天 近30天 近90天
*/
statRouter.get('/volume/:range', [record.getVolumeDataByRange], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/*
  查询 每个动作的训练频次
  @params 当前范围 range 7 30 90 近7天 近30天 近90天
*/
statRouter.get('/move/:range', [record.getMoveDataByRange], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

// 导出路由对象
module.exports = statRouter