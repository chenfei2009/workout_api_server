const Plan = require('../model/planModel')
const PlanDetail = require('../model/planDetailModel')
const Record = require('../model/recordModel')

/**
 * 训练计划中间件
 */
module.exports = {
  /**
   * 查询计划列表
   */
  getPlanList: (req, res, next) => {
    // 调用 planModel 模型中的查询方法
    Plan.getPlanList().then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 新建计划
   */
  addPlan: (req, res, next) => {
    // 获取查询参数
    const { name } = req.body
    // 调用模型中的查询方法
    Plan.addPlan(name).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 向指定计划添加动作
   */
  addMovesToPlan: (req, res, next) => {
    // 获取查询参数
    const { name, moves } = req.body
    PlanDetail.addMovesToPlan(name, moves).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 获取指定计划的动作列表
   */
  getMovesByName: (req, res, next) => {
    // 获取查询参数
    const { name } = req.query
    PlanDetail.getMovesByName(name).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 删除指定计划的动作列表
   */
  deleteMovesByName: (req, res, next) => {
    // 获取查询参数
    const { name } = req.body
    PlanDetail.deleteMovesByName(name).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 删除指定计划
   */
  deletePlanByName: (req, res, next) => {
    // 获取查询参数
    const { name } = req.query
    Plan.deletePlanByName(name).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 查询最近10个日期对应的训练记录
   */
  getRecentRecords: (req, res, next) => {
    Record.getRecentRecords().then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  }
}