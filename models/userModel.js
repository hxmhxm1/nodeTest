//导入mongoose
const mongoose = require('mongoose')

// 创建文档的结构对象
let userScheme = new mongoose.Schema({
  username: {
    require: true,
    type: String
  },
  passname: {
    require: true,
    type: String
  },
})

// 创建模型
let userModel = mongoose.model('auth', userScheme)

module.exports = userModel



