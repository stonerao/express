var express = require('express');
var router = express.Router();
var MySql = require("../lib/index.js") 
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("<h1>hello word</h1>")

}); 
module.exports = router;