const mongoose = require('mongoose');


const connectDB = (success, fail) => {
  // 连接数据库
  mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('连接成功');
    if(success){
      success()
    }
  })
  .catch((error) => {
    console.error('连接失败:', error);
    if(fail){
      fail()
    }
  });
}

module.exports = connectDB