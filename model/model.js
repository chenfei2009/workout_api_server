const mysql = require('mysql')

/**
 * 数据模型的基类
 * 封装了数据库操作
 */

module.exports = class Model {
  // 创建连接池对象
  static pool = null

  /**
   * 数据库连接方法
   */
  static connection () {
    // 创建连接池对象
    Model.pool = mysql.createPool({
      host: 'localhost',
      user: 'workout',
      password: '123456',
      database : 'workout',
      port: '3306',
      multipleStatements: true
      // timezone: '08:00'
    })
  }

  /**
   * 通用查询方法
   * @param {String} sql 要执行的 sql 语句
   * @param {Array} params 给 sql 语句的占位符进行赋值操作的参数数组
   */
  static query (sql, params) {
    return new Promise((resolve, reject) => {
      this.connection()
      Model.pool.getConnection((err, conn) => {
        if (err)  {
          console.log('数据库连接失败' + err.message)
        } else {
          if (params) {
            conn.query(sql, params, (err, result)=>{
              if (err) {
                reject(err)
              } else {
                resolve(result)
              }
              // conn.release() // 释放连接对象
            })
          } else {
            conn.query(sql, (err, result)=>{
              if (err) {
                reject(err)
              } else {
                resolve(result)
              }
              // conn.release() // 释放连接对象
            })
          }
        }
        conn.release()
      })
      // this.end()
    })
  }
}