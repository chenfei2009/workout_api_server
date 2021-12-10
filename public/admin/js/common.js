// 表单数据格式化
function serializeToJson(form) {
  let result = {};
  let array = form.serializeArray();
  array.forEach(v => {
    result[v.name] = v.value;
  })
  return result;
}