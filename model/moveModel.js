const mysql = require('mysql')

/**
 * 动作数据模型
 */
module.exports = class Movement extends require('./model') {
  /**
   * 请求动作列表数据
   * 包含当前日期对应的 count
   * @param {interger}  pid 部位编号
   * @param {string}  date 当前日期
   */
  static getMoves (pid, date) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(r.move_id) AS count,m.*
      FROM movement AS m LEFT OUTER JOIN
      (SELECT * FROM record WHERE date_format(date, '%Y-%m-%d') = ? ) AS r
      ON m.id = r.move_id
      GROUP BY m.id
      HAVING pid = ?
      ORDER BY CONVERT(m.name USING gbk) COLLATE gbk_chinese_ci`
      this.query(sql, [date, pid]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取动作列表失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 更新动作列表数据
   * @param {array}  formData 值组成的列表
   */
  static putMoves (formData) {
    return new Promise((resolve, reject) => {
      // 拼接sql语句
      let model_sql = 'update movement set name = ? where id = ?'
      let sqls = ''
      formData.forEach((v, i) => {
        sqls += mysql.format(model_sql, [v.value, v.id]) + ';'
      })
      this.query(sqls).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`更新动作列表失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 删除指定动作
   * @param {interger}  id 动作编号
   */
  static deleteMove (id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM movement WHERE id = ?`
      this.query(sql, [id]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`删除动作失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 新增动作
   * @param {object}  item 动作对象
   */
  static addMove (item) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO movement SET ?`
      this.query(sql, [item]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`新增动作失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }
}