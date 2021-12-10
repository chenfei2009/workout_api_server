/**
 * 计划数据模型
 */
module.exports = class Plan extends require('./model') {
  /**
   * 查询计划列表
   */
  static getPlanList () {
    return new Promise((resolve, reject) => {
      // 根据 id 和 count 查询历史记录
      let sql = 'SELECT * FROM plan;'
      this.query(sql).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取计划失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 新建训练计划
   */
  static addPlan (name) {
    return new Promise((resolve, reject) => {
      // 根据 id 和 count 查询历史记录
      let sql = `INSERT INTO plan VALUES (null, ?);
      select @@identity as plan_id`
      this.query(sql, name).then(results => {
        // 成功时的业务逻辑
        console.log((results))
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`新建计划失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 删除计划
   */
  static deletePlanByName (name) {
    return new Promise((resolve, reject) => {
      let sql = 'DELETE FROM plan WHERE name = ?'
      this.query(sql, [name]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`删除计划失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }
}