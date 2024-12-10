const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('连接成功');
  })
  .catch((error) => {
    console.error('连接失败:', error);
  });

// 定义 Schema
const Schema = mongoose.Schema;

// 创建文档结构
const listSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: String },
  type: { type: String },
  account: { type: String },
  remarks: { type: String }
});

// 创建 Model
const List = mongoose.model('list', listSchema);
// const { accounts } = require('./list.json');

// 插入数据
// List.insertMany(accounts)
//   .then(() => {
//     console.log('数据插入成功');
//     // mongoose.connection.close(); // 插入完成后关闭连接
//   })
//   .catch((error) => {
//     console.error('数据插入失败:', error);
//   });

module.exports = List;