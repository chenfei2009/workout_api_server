// 引入 express 框架
const express = require('express')

const record = require('../middleware/record')

// 创建页面路由
const caleRouter = express.Router()

/*
  日历页
  查询当前日期范围内部位数据
  @params 开始日期 startDate 结束日期 endDate
*/
caleRouter.get('/', [record.getPartsByCale], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

// 导出路由对象
module.exports = caleRouter