// 引入 express 框架
const express = require('express')

const plan = require('../middleware/plan.js')
const db = require('../model/mysql.js')
const mysql = require('mysql')

// 创建页面路由
const planRouter = express.Router()

// bodyParser 被弃用
// 用 express 调用 bodyParser 的方法
// planRouter.use(express.json())
// planRouter.use(express.urlencoded({ extended: true }))

// 训练计划路由 Plan
/**
 * 请求计划列表数据
 */
planRouter.get('/list/', [plan.getPlanList], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 请求计划对应的动作列表
 * @param {string} name 计划名称
 */
planRouter.get('/moves', [plan.getMovesByName], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 新建训练计划
 * @param {string} name 计划名称
 * @param {array} moves 选中动作列表
 */
planRouter.post('/add/', [plan.addPlan, plan.addMovesToPlan], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 更新训练计划
 * @param {string} name 计划名称
 * @param {array} moves 选中动作列表
 */
planRouter.put('/update/', [plan.deleteMovesByName, plan.addMovesToPlan], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 删除训练计划
 * @param {string} name 计划名称
 * @param {array} moves 选中动作列表
 */
planRouter.delete('/delete/', [plan.deletePlanByName, plan.deleteMovesByName], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 查询最近10个日期对应的训练记录详情
 */
planRouter.get('/recent/', [plan.getRecentRecords], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

// 导出路由对象
module.exports = planRouter