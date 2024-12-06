var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    data: [1, 2,3]
  });
  // res.send('文字--')
});

module.exports = router;
