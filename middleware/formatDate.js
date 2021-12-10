// 时间戳格式化
const formatDate = function (date, fmt) {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // M+ 正则表达式规则
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, str)
      // fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : str)
    }
  }
  return fmt
}

// function padLeftZero (str) {
//   return ('00' + str).substr(str.length)
// }
module.exports = formatDate