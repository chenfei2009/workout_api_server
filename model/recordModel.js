/**
 * 训练详情数据模型
 */
module.exports = class Record extends require('./model') {
  /**
   * 查询待删除动作是否有历史记录数据
   * @param {interger} id 当前动作编号
   */
  static getRecordCount (id) {
    return new Promise((resolve, reject) => {
      // 根据 id 和 count 查询历史记录
      let sql = `SELECT COUNT(*) as count FROM record WHERE move_id = ?`
      this.query(sql, [id]).then(results => {
        // 成功时的业务逻辑
        resolve(results[0])
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取历史记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询当前动作当前组别历史记录数据
   * @param {interger} id 当前动作编号
   * @param {interger} count 当前组别 
   */
  static getRecordsByCount (id, count) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM record WHERE move_id = ? AND count = ?`
      this.query(sql, [id, count]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取历史记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询上一组记录数据
   * @param {interger} id 当前动作编号
   * @param {interger} count 当前组别
   */
  static getLastRecord (id, count) {
    return new Promise((resolve, reject) => {
      // let sql = `SELECT * FROM record WHERE id = ?`
      let sql = `SELECT * FROM record WHERE move_id = ? AND count = ?
      ORDER BY DATE DESC LIMIT 1`
      this.query(sql, [id, count]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取上一组记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 新增训练记录
   * record 表 插入数据
   * @param { Object } recordItem 当前训练记录
   */
  static addRecord (record) {
    return new Promise((resolve, reject) => {
      // 新增训练记录
      let sql = `INSERT INTO record SET ?; select @@identity as id`
      this.query(sql, [record]).then(results => {
        // 成功时的业务逻辑
        resolve(results[1][0])
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取历史记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 更新训练记录
   * record 表 更新数据
   * @param { Object } recordItem 当前训练记录
   */
  static putRecord (record, recordId) {
    return new Promise((resolve, reject) => {
      let params = [record.unit, record.weight, record.times, record.volume, record.timer, record.distance, recordId]
      let sql = `UPDATE record SET unit=?, weight=?, times=?, volume=?, timer=?, distance=?
      WHERE id = ?;
      select @@identity as id`
      this.query(sql, params).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`更新历史记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 更新训练记录
   * record 表 更新 组间休息 数据
   * @param { interger } breaktime
   * @param { string } comment
   * @param { interger } detailId
   */
  static updateBreak (breaktime, comment, detailId) {
    return new Promise((resolve, reject) => {
      // 更新训练记录
      let sql = `UPDATE record SET breaktime = ?, COMMENT = ? WHERE id = ?`
      this.query(sql, [breaktime, comment, detailId]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`更新记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询当前日期范围部位记录数据
   * @param {string} startDate 起始日期
   * @param {string} endDate 结束日期
   */
  static getPartsByCale (startDate, endDate) {
    return new Promise((resolve, reject) => {
      // let sql = `SELECT * FROM record WHERE id = ?`
      let sql = `SELECT DISTINCT DATE_FORMAT(r.date, '%Y-%m-%d') AS date, part
      FROM record AS r, movement AS m
      WHERE r.move_id = m.id
      HAVING DATE_FORMAT(date, '%Y-%m-%d') BETWEEN ? AND ?`
      this.query(sql, [startDate, endDate]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询当前日期范围容量数据
   * @param {string} startDate 起始日期
   * @param {string} endDate 结束日期
   */
   static getVolumesByCale (startDate, endDate) {
    return new Promise((resolve, reject) => {
      // let sql = `SELECT * FROM record WHERE id = ?`
      let sql = `SELECT DATE_FORMAT(r.date, '%Y-%m-%d') AS date, SUM(volume) as volume
      FROM record AS r
      WHERE DATE_FORMAT(date, '%Y-%m-%d') BETWEEN ? AND ?
      GROUP BY DATE_FORMAT(date, '%Y-%m-%d')`
      this.query(sql, [startDate, endDate]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询日期对应的训练记录
   * @param {string} date 日期
   */
  static getRecordsByDate (date) {
    return new Promise((resolve, reject) => {
      // let sql = `SELECT * FROM record WHERE id = ?`
      let sql = `SELECT DISTINCT m.*, DATE_FORMAT(r.date, '%Y-%m-%d') AS DATE
      FROM record AS r, movement AS m
      WHERE r.move_id = m.id
      HAVING DATE_FORMAT(date, '%Y-%m-%d') = ?;
      SELECT * FROM record
      WHERE date_format(date, '%Y-%m-%d') = ?
      order by count`
      this.query(sql, [date, date]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询日期对应的总容量
   * @param {string} date 日期
   */
  static getVolumeByDate (date) {
    return new Promise((resolve, reject) => {
      // let sql = `SELECT r.move_id, r.weight, r.unit, m.part
      // FROM record AS r, movement AS m
      // WHERE r.move_id = m.id AND DATE_FORMAT(r.date, '%Y-%m-%d') = ?
      // GROUP BY m.part;`
      let sql = `SELECT SUM(r.volume) AS volume, m.part
      FROM record AS r, movement AS m
      WHERE r.move_id = m.id AND DATE_FORMAT(r.date, '%Y-%m-%d') = ?
      GROUP BY m.part;
      SELECT DATE AS end FROM record 
      WHERE DATE_FORMAT(DATE, '%Y-%m-%d') = ?
      ORDER BY DATE DESC LIMIT 1;
      SELECT DATE AS start FROM record 
      WHERE DATE_FORMAT(DATE, '%Y-%m-%d') = ?
      ORDER BY DATE LIMIT 1`
      this.query(sql, [date, date, date]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 删除指定训练记录
   * @param {string} date 日期
   */
   static deleteRecordById (id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM record WHERE id = ?`
      this.query(sql, [id]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`删除记录失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询 指定范围每个部位的训练天数
   * @param {interger} range 查询范围 7 30 90 近7天 近30天 近90天
   */
  static getPartDataByRange (range) {
    return new Promise((resolve, reject) => {
      // 查询训练天数
      let sql = `SELECT COUNT(DISTINCT DATE_FORMAT(r.date, '%Y-%m-%d')) AS value, part AS name
      FROM record AS r, movement AS m
      WHERE DATE_SUB(CURDATE(), INTERVAL ? DAY) <= DATE(r.date) AND r.move_id=m.id
      GROUP BY part`
      this.query(sql, [range]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取训练天数失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询 指定范围的训练量数据
   * @param {interger} range 查询范围 7 30 90 近7天 近30天 近90天
   */
  static getVolumeDataByRange (range) {
    return new Promise((resolve, reject) => {
      // 查询训练天数
      let sql = `SELECT SUM(volume) AS volume, DATE_FORMAT(r.date, '%Y-%m-%d') AS date
      FROM record AS r
      WHERE DATE_SUB(CURDATE(), INTERVAL ? DAY) <= DATE(r.date)
      GROUP BY DATE_FORMAT(date, '%Y-%m-%d')`
      this.query(sql, [range]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取训练量失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询 指定范围的动作排行数据
   * @param {interger} range 查询范围 7 30 90 近7天 近30天 近90天
   */
  static getMoveDataByRange (range) {
    return new Promise((resolve, reject) => {
      // 查询训练天数
      let sql = `SELECT COUNT(DISTINCT DATE_FORMAT(r.date, '%Y-%m-%d')) AS value, m.id, m.name
      FROM record AS r, movement AS m
      WHERE DATE_SUB(CURDATE(), INTERVAL ? DAY) <= DATE(r.date) AND r.move_id = m.id
      GROUP BY m.id
      ORDER BY VALUE DESC
      LIMIT 10`
      this.query(sql, [range]).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取动作排行数据失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }

  /**
   * 查询最近10个日期对应的训练记录
   * @param 无
   */
  static getRecentRecords () {
    return new Promise((resolve, reject) => {
      let sql = `SELECT DISTINCT m.*, DATE_FORMAT(r.date, '%Y-%m-%d') AS date
      FROM record AS r,movement AS m
      WHERE r.move_id = m.id AND date IN (SELECT DATE_FORMAT(t.date, '%Y-%m-%d')
      FROM (SELECT DISTINCT DATE_FORMAT(date, '%Y-%m-%d') AS date
      FROM record
      ORDER BY date DESC LIMIT 10) AS t)
      ORDER BY date DESC`
      this.query(sql).then(results => {
        // 成功时的业务逻辑
        resolve(results)
      }).catch(err => {
        // 失败时的业务逻辑
        console.log(`获取数据失败：${err.message}`)
        // 将错误传递给中间件进行处理
        reject(err)
      })
    })
  }
}