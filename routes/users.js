var express = require('express');
var router = express.Router();
var $sql = require("../lib/index.js")
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/push', function (req, res, next) {
  let params = req.body;
  //接受前端2个参数 title 和 value 
  let   token   = {...req.cookies.token};
   
  if (!token) {
    res.json({
      code: 200,
      msg: "请登录"
    })
    return
  } else {
    $sql.getToken(token.token, function (re) {
     res.json({
       code:200,
       data:req.headers
     })
    })
  }
  if (!params.title || !params.value) {
    res.json({
      code: 400,
      msg: "标题或者内容不能为空"
    })
    return
  }


});

module.exports = router;