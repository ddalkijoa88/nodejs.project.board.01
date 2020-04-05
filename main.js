const http = require('http');
const url = require('url');
const topic = require('./lib/topic.js');

const app = http.createServer(function (req, res) {
    const _url = req.url;
    const pathname = url.parse(_url, true).pathname;
    // console.log(_url, pathname); //_url은 쿼리스트링을 포함한 전체 주소, pathname은 '/'뒤의 주소만
    const id = url.parse(_url, true).query.id;

    if(pathname === '/'){
        topic.home(req,res);
    } else if(pathname === '/list'){
        topic.list(req,res);
    } else if(pathname === '/proc_create'){
        topic.proc_create(req,res);
    } else if(pathname === '/view'){
        topic.view(req,res, id);
    } else if(pathname === '/update'){
        topic.update(req,res, id);
    } else if (pathname === '/proc_update'){
        topic.proc_update(req,res);
    } else if(pathname === '/delete'){
        topic.delete(req,res, id);
    } else{
        topic.errorPage(res);
    }
});

app.listen(3000);
