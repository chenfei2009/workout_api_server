const Movement = require('../model/moveModel')

/**
 * 动作中间件
 */
module.exports = {
  /**
   * 获取动作列表
   */
  getMoves: (req, res, next) => {
    // 获取查询参数
    const { pid, date } = req.query
    // 调用 moveModel 模型中的查询方法
    Movement.getMoves(pid, date).then(results => {
      req.moves = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 更新动作列表
   */
  putMoves: (req, res, next) => {
    // 获取查询参数
    const { formData } = req.body
    // 调用 moveModel 模型中的查询方法
    Movement.putMoves(formData).then(results => {
      // req.moves = results
      next()
    }).catch(err => {
      // if (err.message.indexOf('Duplicate entry') !== -1) 
      // req.errMessage = '名称重复'
      next(err)
    })
  },

  /**
   * 删除指定动作
   */
  deleteMove: (req, res, next) => {
    // 获取查询参数
    const { id } = req.params
    // 调用 moveModel 模型中的查询方法
    Movement.deleteMove(id).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  },

  /**
   * 新增动作
   */
   addMove: (req, res, next) => {
    // 获取查询参数
    const move = req.body
    // 调用 moveModel 模型中的查询方法
    Movement.addMove(move).then(results => {
      req.data = results
      next()
    }).catch(err => {
      next(err)
    })
  }
}