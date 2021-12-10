const db = {}
const mysql = require('mysql')

// 创建连接池对象
const pool = mysql.createPool({
  host: 'localhost',
  user: 'workout',
  password: '123456',
  database : 'workout',
  port: '3306',
  multipleStatements: true,
  timezone: '08:00'
})

db.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err)
        pool.releaseConnection() // 释放连接对象
      } else {
        if (params) {
          conn.query(sql, params, (err, result)=>{
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
            conn.release() // 释放连接对象
          })
        } else {
          conn.query(sql, (err, result)=>{
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
            conn.release() // 释放连接对象
          })
        }
      }
    })
  })
}


// // 封装 sql 方法
// db.query = (sql, params, callback) => {
//   pool.getConnection((err, conn) => {
// 	  if (err) {
// 	    console.log(err)
// 	    pool.releaseConnection() // 释放连接对象
// 	  }
//     conn.query(sql, params, (err, result, fields) => {
//       if (err) {
//         callback(err, null)
//         conn.release() // 释放连接对象
//         return console.log('执行sql失败', err.message)
//       }
//       // console.log(result)
//       callback(null, result, fields)
//       conn.release() // 释放连接对象
//     })
// 	})
// }

// function sqlQuery(strSql,arr){
//   return new Promise((resolve,reject) =>{
//     con.query(strSql,arr,(err,results)=>{
//       if(err){
//         reject('错误信息：'+err)
//       }else{
//         resolve(results)
//       }
//     })
//   })
// }

module.exports = db