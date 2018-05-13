var express = require('express');
var router = express.Router();
var MySql = require("../sql/index.js")
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Express'
  });
});
router.get('/member', function (req, res, next) {
  const SQL = 'SELECT * FROM member;'
  MySql(SQL,(data)=>{
     res.json(data);
  }) 
  
})

module.exports = router;