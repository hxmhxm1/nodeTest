var express = require('express');
var router = express.Router();
// const fs = require('fs')
// const path = require('path')

const List = require('../data/list.js')

// const { accounts } = require('../data/list.json')

// 首页 列表页面
router.get('/', function(req, res, next) {
  List.find().then((data) => {
    console.log('Retrieved data:', data);
    // res.render('index', { title: 'Express11122', accounts: data });
    res.send(data)
    // mongoose.connection.close(); // Close the connection after querying
  })
  .catch((error) => {
    console.error('Failed to query data:', error);
  });
});

// 新增列表
router.post('/account', (req, res, next) => {
  const params = req.body;

  // 根据具体业务逻辑生成唯一标识符，比如唯一的用户名、邮箱等
  const uniqueIdentifier = params.title; // 假设使用用户名作为唯一标识

  List.findOne({ title: uniqueIdentifier }) // 查询数据库中是否已存在该数据
    .then(existingData => {
      if (existingData) {
        console.log('数据已存在：', existingData);
        return;
        // 返回提示信息，数据已存在
        // res.render('index', { title: '数据已存在', accounts: existingData });
      } else {
        let data = { id: Math.random(), ...params };
        List.create(data)
          .then(result => {
            // res.redirect('/');
            res.send(data)
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
router.get('/delete/:id', (req, res, next) => {
  const { id } = req.params
  List.deleteOne({ id: id })
  .then((result) => {
    if (result.deletedCount === 1) {
      console.log('数据删除成功');
    } else {
      console.log('未找到要删除的数据');
    }
    // res.redirect('/');
    res.send('删除成功')
  })
  .catch((error) => {
    console.error('数据删除失败：', error);
    // 处理错误
  });
})

module.exports = router;
