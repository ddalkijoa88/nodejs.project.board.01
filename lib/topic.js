// CRUD 관련 코드만 모아둔 파일
const template = require('./template.js');
const db = require('./mysql.js');
const qs = require('querystring');

exports.home = function(req, res) {
    const desc = 'this is home!<br> please press list button!';
    const html= template.html(desc,'','','');

    res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"}); //한글처리
    res.end(html);
};

exports.list = function (req, res) {
    db.query('SELECT * FROM node_test order by id desc', function (error, data) {
        // DB에 쿼리문을 날리고 그 결과값을 data라는 변수에 담아와서 화면에 출력한다
        if (error) { console.log(error); }
        const table = template.table(data);

        const desc = 'this is list!<br> you can write post';
        const form = template.inputform();
        const html= template.html(desc,form, table,'');
        res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"}); //한글처리
        res.end(html);
    });
};

exports.proc_create = function (req,res) {
    var body = '';
    req.on('data', function(data){
        body = body + data;
    });
    req.on('end', function(){
        var post = qs.parse(body);
        db.query(`
            INSERT INTO node_test (title, description, created_at) VALUES(?, ?, NOW())`,
            [post.title, post.desc],
            function(error, result){
                if(error){
                    throw error;
                }
                res.writeHead(302, {Location: `/list`});
                res.end();
            }
        )
    });
};

exports.view = function(req, res, id){
    //쿼리 스트링에서 id를 가져온 후에 이것으로 쿼리 검색해야 함
    db.query(`SELECT * FROM node_test where id = ?`, [id], function (error, data) {
        // DB에 쿼리문을 날리고 그 결과값을 data라는 변수에 담아와서 화면에 출력한다
        if (error) { console.log(error); }
        const view = template.view(data);
        const html= template.html('','', '',view);
        res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"}); //한글처리
        res.end(html);
    });
};

exports.update = function (req, res, id) {
    db.query(`SELECT * FROM node_test where id = ?`, [id], function (error, data, fields) {
        if (error) { console.log(error); }
        const form = template.updateform(data);
        const html = template.html('', form, '', '');

        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); //한글처리
        res.end(html);
    });
};

exports.proc_update = function (req,res){
    var body = '';
    req.on('data', function(data){
        body = body + data;
    });
    req.on('end', function () {
        var post = qs.parse(body);
        db.query(`UPDATE node_test SET title = ?, description = ? where id = ?`, [post.title,post.desc,post.id], function (error) {
            if (error) { console.log(error); }

            res.writeHead(302,{location: '/list'});
            res.end();
        });
    });
};

exports.delete = function (req, res, id){
    db.query(`delete FROM node_test where id = ?`, [id], function (error, result, fields) {
        // DB에 쿼리문을 날리고 그 결과값을 data라는 변수에 담아와서 화면에 출력한다
        if (error) { console.log(error); }
        res.writeHead(302,{location: '/list'});
        res.end();
    });
};

exports.errorPage = function (res){
    res.writeHead(404);
    res.end('not found page');
};