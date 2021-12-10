const Record = require('../model/recordModel')

/**
 * 训练记录中间件
 */
module.exports = {
  /**
   * 查询该动作是否有历史记录数据
   */
  getRecordCount: (req, res, next) => {
    // 获取查询参数
    const { id } = req.params
    // 调用 recordDetailModel 模型中的查询方法
    Record.getRecordCount(id).then(results => {
      req.count = results.count
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 请求当前动作当前组别历史记录数据
   */
  getRecordsByCount: (req, res, next) => {
    // 获取查询参数
    const { id, count } = req.query
    // 调用 recordDetailModel 模型中的查询方法
    Record.getRecordsByCount(id, count).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 请求上一组记录数据
   */
  getLastRecord: (req, res, next) => {
    // 获取查询参数
    const { id, count } = req.query
    // 调用 recordDetailModel 模型中的查询方法
    Record.getLastRecord(id, count).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 新增记录数据
   */
  addRecord: (req, res, next) => {
    // 获取查询参数
    const { id, count, unit, weight, times, volume, date, timer, distance } = req.body
    const move_id = id
    let record = null
    if (timer) {
      record = { move_id, count, date, timer, distance }
    } else {
      record = { move_id, count, date, unit, weight, times, volume }
    }
    // 调用 recordDetailModel 模型中的查询方法
    Record.addRecord(record).then(results => {
      req.id = results.id
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 更新记录数据
   */
  putRecord: (req, res, next) => {
    // 获取查询参数
    const { record, recordId } = req.body
    // 调用 recordDetailModel 模型中的查询方法
    Record.putRecord(record, recordId).then(results => {
      req.id = results.id
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 更新组间休息数据
   */
  updateBreak: (req, res, next) => {
    // 获取查询参数
    const { breaktime, comment, detailId } = req.body
    // 调用 recordDetailModel 模型中的查询方法
    Record.updateBreak(breaktime, comment, detailId).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 查询日历对应数据
   */
  getPartsByCale: (req, res, next) => {
    // 获取查询参数
    const { startDate, endDate } = req.query
    // 调用 recordDetailModel 模型中的查询方法
    Record.getPartsByCale(startDate, endDate).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 查询日期对应训练记录数据
   */
  getRecordsByDate: (req, res, next) => {
    // 获取查询参数
    const { date } = req.query
    // 调用 recordDetailModel 模型中的查询方法
    Record.getRecordsByDate(date).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 查询日期对应训练记录数据
   */
  getVolumeByDate: (req, res, next) => {
    // 获取查询参数
    const { date } = req.query
    // 调用 recordDetailModel 模型中的查询方法
    Record.getVolumeByDate(date).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 删除指定的训练记录
   */
  deleteRecordById: (req, res, next) => {
    // 获取查询参数
    const { id } = req.params
    // 调用 recordDetailModel 模型中的查询方法
    Record.deleteRecordById(id).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 查询 每个部位的训练天数
   */
  getPartDataByRange: (req, res, next) => {
    // 获取查询参数
    const { range } = req.params
    // 调用 recordDetailModel 模型中的查询方法
    Record.getPartDataByRange(range).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 查询 训练量趋势
   */
  getVolumeDataByRange: (req, res, next) => {
    // 获取查询参数
    const { range } = req.params
    // 调用 recordDetailModel 模型中的查询方法
    Record.getVolumeDataByRange(range).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 查询 动作排行
   */
  getMoveDataByRange: (req, res, next) => {
    // 获取查询参数
    const { range } = req.params
    // 调用 recordDetailModel 模型中的查询方法
    Record.getMoveDataByRange(range).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  }
}
