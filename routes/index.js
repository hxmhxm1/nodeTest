var express = require('express');
var router = express.Router();
// 导入模型
const ListModel = require("../models/listModel")
//导入中间件
let checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

// 首页 列表页面
router.get('/', checkTokenMiddleware, function(req, res, next) {
  ListModel.find().then((data) => {
    console.log('Retrieved data:', data);
    res.send({
      code: '0000',
      msg: 'success', 
      data: data
    })
  })
  .catch((error) => {
    console.error('Failed to query data:', error);
  });
});

// 新增列表
router.post('/account', checkTokenMiddleware, (req, res, next) => {
  const params = req.body;

  // 根据具体业务逻辑生成唯一标识符，比如唯一的用户名、邮箱等
  const uniqueIdentifier = params.title; // 假设使用用户名作为唯一标识

  ListModel.findOne({ title: uniqueIdentifier }) // 查询数据库中是否已存在该数据
    .then(existingData => {
      if (existingData) {
        console.log('数据已存在：', existingData);
        return;
      } else {
        let data = { id: Math.random(), ...params };
        ListModel.create(data)
          .then(result => {
            res.send({
              code: '0000',
              data: data,
              msg: 'success'
            })
          })
          .catch(error => {
            console.error('数据插入失败：', error);
            // 处理错误，可能进行回滚操作或返回错误信息等
          });
      }
    })
    .catch(error => {
      console.error('查询数据失败：', error);
      // 处理错误
    });
})

// 删除列表
router.get('/delete/:id', checkTokenMiddleware, (req, res, next) => {
  const { id } = req.params
  ListModel.deleteOne({ id: id })
  .then((result) => {
    if (result.deletedCount === 1) {
      console.log('数据删除成功');
    } else {
      console.log('未找到要删除的数据');
    }
    // res.redirect('/');
    res.send({
      code: '0000',
      msg: 'success', 
      data: data,
    })
  })
  .catch((error) => {
    console.error('数据删除失败：', error);
    // 处理错误
  });
})

module.exports = router;
