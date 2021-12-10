// 引入 express 框架
const express = require('express')

const db = require('../model/mysql.js')

// 创建页面路由
const homeRouter = express.Router()

// bodyParser 被弃用
// 用 express 调用 bodyParser 的方法
// homeRouter.use(express.json())
// homeRouter.use(express.urlencoded({ extended: true }))

/*
  查询 本周 本月 总共 的训练天数
  @params 当前日期 date?
*/
homeRouter.get('/data', async (req, res) => {
  // 查询训练天数
  let sql = `SELECT COUNT(DISTINCT DATE_FORMAT(date, '%Y/%m/%d')) AS t_count FROM record;
    SELECT COUNT(DISTINCT DATE_FORMAT(date, '%Y/%m/%d')) AS m_count FROM record AS r
    WHERE MONTH(r.date) = MONTH(CURRENT_DATE)
    AND YEAR(r.date) = YEAR(CURRENT_DATE);
    SELECT COUNT(DISTINCT DATE_FORMAT(date, '%Y/%m/%d')) AS w_count FROM record AS r
    WHERE WEEK(r.date) = WEEK(CURRENT_DATE)`
  try {
    let result = await db.query(sql)
    let resList = {}
    result.map(v => {
      let key = Object.keys(v[0])[0]
      resList[key] = v[0][key]
    })
    return res.json({
      meta: { status: 200, msg: 'OK' },
      data: resList
    })
  } catch (err) {
    return console.log(err)
  }
})

// 导出路由对象
module.exports = homeRouter