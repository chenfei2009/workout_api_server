// 引入 express 框架
const express = require('express')

// const db = require('../model/mysql.js')
const record = require('../middleware/record')

// 创建页面路由
const recordRouter = express.Router()

let recordCount = {
  startDate: null,
  totalTime: '00:11:00',
  totalWeight: '1611'
}

// bodyParser 被弃用
// 用 express 调用 bodyParser 的方法
// recordRouter.use(express.json())
// recordRouter.use(express.urlencoded({ extended: true }))

/**
 * 查询日期对应的训练记录
 */
recordRouter.get('/', [record.getRecordsByDate], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 查询日期对应的训练量数据
 */
 recordRouter.get('/volume/', [record.getVolumeByDate], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: {
      volumes: req.data[0],
      end: req.data[1][0].end,
      start: req.data[2][0].start
    }
  })
})

/*
  删除训练记录数据
  @params 当前训练记录对应的 detail_id
*/
recordRouter.delete('/detail/:id', [record.deleteRecordById], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

// 导出路由对象
module.exports = recordRouter