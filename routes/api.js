var express = require('express');
var router = express.Router();
var MySql = require("../sql/index.js")
var _SQL = require("../sql/sql.js")
var _MSG = require("../util/msg")
const TABLE_NAME = 'member';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/add_member', function (req, res, next) {
  let query = req.query;
  MySql(`SELECT * FROM member WHERE username='${req.query.username}'`, (data) => {
    if (data.length > 0) {
      res.json({
        code: 400,
        msg: "该用户已注册"
      })
    } else {
      var state = Object.values(query).map(element => {
        if (element === "") {
          return false
        }
      });
      if (state.indexOf(false) !== -1) {
        res.json({
          msg: "信息不能为空",
          code: 400
        })
        return
      }
      if (query.username == "" || !query.username) {
        res.json({
          msg: "账号错误",
          code: 400
        })
        return
      }
      MySql(_SQL.INSERT({
        username: query.username || '',
        password: query.password || '',
        name: query.name || '',
        phone_number: query.phone_number || ''
      }), (data) => {
        if (data.affectedRows === 1) {
          res.json({
            code: 200,
            msg: "成功"
          })
        } else {
          res.json({
            code: 400
          })
        }
      })
    }
  })



})
router.post('/login', function (req, res, next) {
  let query = req.body;
  MySql(`SELECT * member FROM username='${query.username}' and password='${query.password}'`, (data) => {
    if (data.length===0){
      res.json({
        code:200,
        msg:"账号或者密码有误"
      })
    }else{
      
    }
  })
});
module.exports = router;