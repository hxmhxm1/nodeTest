// 导入jwt
const jwt = require('jsonwebtoken')
// 读取配置项
const { secret } = require('../config/config')
// 声明中间件
module.exports = (req, res, next) => {
  const { token } = req.headers
  console.log('中间件获取token-----', token)
  if(!token){
    return res.status(401).json({
        code: '2003',
        msg: 'token缺失',
        data: null
    })
  }
  jwt.verify(token, secret, (err, data) => {
    if(err){
      return res.status(401).json({
        code: '2003',
        msg: 'token缺失',
        data: null
      })
    }
    req.user = data
    next()
  })
}