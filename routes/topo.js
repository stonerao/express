var express = require('express');
var router = express.Router();
var MySql = require("../sql/index.js")
var _SQL = require("../sql/sql.js")
const TABLE_NAME = 'member';
/* GET home page. */
router.post('/save', function (req, res, next) {
    let body = req.body;
    MySql(`UPDATE topo SET json='${JSON.stringify(body)}' WHERE id='1';`, (updata) => {
        res.json({
            code: 200
        });
        return
    });
    // res.json(JSON.stringify(body));
})
router.get('/info', function (req, res, next) {
    let body = req.body;
    MySql(`SELECT * FROM topo WHERE id='1';`, (data) => {
        let obj;
        if(JSON.parse(data[0].json)){
            obj= JSON.parse(data[0].json);
        }else{
            obj={
                code:400
            }
        }
        res.json(obj);
        return
    }); 
})

module.exports = router;