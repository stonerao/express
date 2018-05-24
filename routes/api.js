var express = require('express');
var router = express.Router(); 
var MySql = require("../sql/index.js")
var _SQL = require("../sql/sql.js")
var _MSG = require("../util/msg")
var crypto = require("crypto");
var utils = require("../util/constrol")
function sha1(str) {
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
router.post('/add_member', function (req, res, next) {
  let query = req.body;
  MySql(`SELECT * FROM member WHERE username='${query.username}'`, (data) => {
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
        phone_number: query.phone_number || '',
        create_time: Date.parse(new Date())
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
  let body = req.body;
  MySql(`SELECT *  FROM member WHERE username='${body.username}' and password='${body.password}'`, (data) => {
    if (data.length === 0) {
      res.json({
        code: 400,
        msg: "账号或者密码有误"
      })
    } else {
      //Token = 当前时间戳+账号
      let time = Date.parse(new Date())
      let token =  sha1(`${time}${body.username}`) 
      MySql(`UPDATE member SET login_time='${time}',token='${token}' WHERE username='${body.username}' and password='${body.password}';`, (updata) => {
        let infos = data[0];
        res.json({
          data: {
            phone_number: infos.phone_number,
            name: infos.name,
            id: infos.Id,
            token:token,
            time:utils.GetCurrentDate(time)
          },
          msg: "登录成功",
          code: 200
        })
        return
      });
    }
  })
});
router.post("/upFile",function(req,res,next){
  let query = req.query;

})
module.exports = router;