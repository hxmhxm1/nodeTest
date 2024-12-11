var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
// 导入配置文件
const { secret } = require('../config/config')
// 导入用户模型
const userModel = require('../models/userModel')
const md5 = require('md5')

router.post('/register', (req, res) => {
  const { username, password } = req.body
  userModel.create({
    username: username,
    password: password
  }).then((result) => {
    res.send({
      code: '0000',
      msg: '注册成功',
      data: null
    })
  });
})

router.post('/login', (req, res) => {
  let { username, password } = req.body
  userModel.findOne({username: username}).then((data) => {
    // 判断data
    if(!data){
      return res.status(401).json({
        code: '2002',
        msg: '用户名或密码错误',
        data: null
      });
    }
    let token = jwt.sign({
      username: data.username,
      _id: data._id
    }, secret, {
      expiresIn: 60*60*24*7
    });
    res.json({
      code: '0000',
      msg: '登录成功',
      data: token
    });
  }).catch((err) => {
    if(err){
      return res.status(500).json({
        code: '2001',
        msg: '数据库读取失败',
        data: null
      });
    }
  })
})

router.post('/logout', (req, res) => {
  //销毁 session
  req.session.destroy(() => {
    res.render('success', {msg: '退出成功', url: '/login'});
  })
})

module.exports = router
