var express = require('express');
var router = express.Router();
var $sql = require("../../lib/index.js")
/* GET home page. */
router.post('/login', function (req, res, next) {
    $sql.loginUser(req, res, next)
});
router.get('/reg', function (req, res, next) {
    res.render("reg", {
        title: "注册",
        state: 1
    })
});
router.post('/reg', function (req, res, next) {
    $sql.regUser(req, res, next)   
});
module.exports = router;