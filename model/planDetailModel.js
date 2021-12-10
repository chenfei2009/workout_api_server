const mysql = require('mysql')

/**
 * 计划对应的动作数据模型
 */
 module.exports = class PlanDetail extends require('./model') {
  /**
   * 向指定计划添加动作
   */
  static addMovesToPlan (name, moves) {
    return new Promise((resolve, reject) => {
      // 拼接sql语句
      let model_sql = 'INSERT INTO plan_detail set name = ?, move_id = ?'
      let sqls = ''
      moves.forEach((v, i) => {
        sqls += mysql.format(model_sql, [name, v.id]) + ';'
      })
      this.query(sqls).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`添加动作失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 获取计划对应的动作
   */
  static getMovesByName (name) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM movement
      HAVING id IN (SELECT move_id FROM plan_detail WHERE name = ?)`
      this.query(sql, [name]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取动作失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 更新计划
   */
  static deleteMovesByName (name) {
    return new Promise((resolve, reject) => {
      let sql = 'DELETE FROM plan_detail WHERE name = ?'
      this.query(sql, [name]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`更新动作失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }
}