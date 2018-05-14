var express = require('express');
var router = express.Router();
var MySql = require("../sql/index.js")
var _SQL = require("../sql/sql.js")
const TABLE_NAME = 'member';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/member', function (req, res, next) {
  const SQL = 'SELECT * FROM member;'
  MySql(_SQL.INSERT({
    username: "stonerao",
    password: "raoyan19940529",
    name: "ptt",
    phone_number: "18583671750"
  }), (data) => { 
    if (data.affectedRows === 1) {
      MySql(SQL, (data) => {
        res.json(data);
      })
    } else {
      res.render(data)
    }
  }) 
})

module.exports = router;