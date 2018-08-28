/* config */
var mysql = require('mysql');
var $sql = require("./sql")
var md5 = require('md5')
var connection = mysql.createConnection({
    host: '47.98.160.248',
    user: 'express',
    password: 'Raoyan19940529',
    database: "express"
});
connection.connect();
/* async (SQL, fun) => {
    connection.query(SQL, (err, rows, fields) => {
        if (err) throw err;
        fun(rows)
    });} */
function determine(token, fn) {
    //根据token值获取当前账号
    if (typeof token !== 'string') {
        fn(false)
    }
    connection.query(`SELECT * FROM member WHERE token='${token}'`, function (err, reslut) {
        if (reslut) {
            fn(reslut)
        } else {
            fn(false)
        }
    })
}

let SQL = {
    getUser(req, res, next) {
        //读取是否有token
        let {
            token
        } = res.cookie;
        if (!token) {
            res.redirect("/member/reg")
        }
    },
    getToken(token, fun) {
        connection.query(`SELECT * FROM member WHERE token='${token}'`, function (err, reslut) {
            fun(reslut)
        })
    },
    regUser(req, res, next) {
        //判断是否已经注册 
        let params = req.body
        connection.query(`SELECT * FROM member WHERE username='${params.username}'`, function (err, reslut) {
            if (reslut.length != 0) {
                res.render("reg", {
                    title: "注册失败，该账号已存在",
                    state: 3
                })
            } else {
                connection.query($sql.inser_user, [params.username, params.password], function (err, reslut) {
                    res.render("reg", {
                        title: "注册成功",
                        state: 2
                    })
                })
            }
        })
    },
    loginUser(req, res, next) {
        //TOKEN =  时间戳 MD5
        let params = req.body;
        let errorMsg = {
            code: 400,
            msg: "账号或者密码错误"
        }
        //如果账号密码为空
        if (!params.username || !params.password) {
            res.json(errorMsg)
            return
        }
        connection.query(`SELECT * FROM member WHERE username='${params.username}' and password='${params.password}'`, function (err, reslut) {
            if (reslut) {
                //存入token值
                var token = md5(params.username + Date.parse(new Date))
                connection.query(`UPDATE member SET token='${token}' WHERE username='${params.username}'`)
                res.cookie('token', {
                    token: token
                }, {
                    maxAge: 60000
                })
                res.json({
                    code: 200,
                    data: token
                })
            } else {
                res.json(errorMsg)
            }
        })
    }
}
module.exports = SQL