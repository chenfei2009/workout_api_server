// 引入 express 框架
// const { decodeBase64 } = require('bcryptjs')
const express = require('express')

// 引入路由中间件
const movement = require('../middleware/movement')
const record = require('../middleware/record')

// 创建页面路由
const movementRouter = express.Router()

/**
 * 请求动作列表
 */
movementRouter.get('/', [movement.getMoves], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: { moves: req.moves }
  })
})

/**
 * 更新动作列表
 */
movementRouter.put('/update', [movement.putMoves], (req, res) => {
  // if(req.errMessage) {
  //   return res.json({
  //     meta: { status: 409, msg: req.errMessage },
  //     data: null
  //   })
  // }
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: null
  })
})

/**
 * 查询该动作是否有历史记录数据
 */
movementRouter.get('/record/:id', [record.getRecordCount], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: { count: req.count }
  })
})

/**
 * 删除指定动作
 */
movementRouter.delete('/delete/:id', [movement.deleteMove], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 新增动作
 */
movementRouter.post('/add', [movement.addMove], (req, res) => {
  return res.json({
    meta: { status: 200, msg: 'OK' },
    data: req.data
  })
})

/**
 * 
 * @param {object} moveItem 动作对象 {id, pid, part, name, type}
 */
movementRouter.post('/', async (req, res) => {
  // const { id, pid, part, name, type } = req.body
  const post = req.body
  // let curList = listData.find(v => v.id == id).moves
  // 判断名称是否重复
  let sql = 'INSERT INTO movement SET ?'
  try {
    const result = await db.query(sql, post)
    return res.json({
      meta: { status: 200, msg: 'OK' },
      data: result
    })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.json({
        meta: { status: 204, msg: '名称重复' },
        data: null
      })
    }
    return console.log(err)
  }
})

// 导出路由对象
module.exports = movementRouter