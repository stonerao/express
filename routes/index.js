var express = require('express');
var router = express.Router();
var MySql = require("../sql/index.js")
var _SQL = require("../sql/sql.js")
const TABLE_NAME = 'member';
const Canvas = require('canvas');
const echarts = require('echarts');

/* GET home page. */
router.get('/', function (req, res, next) {
  const canvas = new Canvas(parseInt(size.width,10), parseInt(size.height,10));
  const ctx = canvas.getContext('2d');
  ctx.font = '12px';
  echarts.setCanvasCreator(function () {
    return canvas;
  });
  const chart = echarts.init(canvas);
  options.animation = false;
  options.textStyle = { 
    fontSize: 12,
  };
  
  chart.setOption(options);
  res.json({a:1})
  // res.json(chart.getOption())
  // res.render('index', {
  //   title: 'Express'
  // });
  
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