module.exports = {
    html: function(description, inputform, table, view) {
        return `
        <html>
        <head>
            <title></title>
        </head>
        <body>
        <h1>Node.js를 활용해서 CRUD 작성하기</h1>
        <p>
            <button type="button" onclick="location.href='/'">home</button> &nbsp;
            <button type="button" onclick="location.href='/list'">list</button>
        </p>
        ${description} <!--페이지 소개 메시지-->
        ${inputform} <!--list 페이지의 input form-->
        ${table} <!--list 페이지의 table-->
        ${view}
        </body>
        </html>
        `;},
    inputform: function () {
        return `
        <form action="/proc_create" method="post">
        <p><input type="text" name="title" placeholder="제목을 입력하세요"></p>
        <p><textarea name="desc" placeholder="내용을 입력하세요"></textarea></p> 
        <button type="submit">입력 완료</button>
        </form>
        `;},
    table: function (list) {
        var i = 0;
        var total = list.length;
        table = `<table><tr><th>글번호</th><th>제목</th><th>작성일</th></tr>`;
        while(i<list.length) {
            table = table + `<tr><td>${total}</td><td><a href="view?id=${list[i].id}">${list[i].title}</a></td>
                             <td>${list[i].created_at.toISOString().replace(/T/, ' ').replace('.000Z','')}</td></td></tr>`;
            i = i+1;
            total = total - 1;
        }
        table = table + '</table>';

        return table;
    },
    view: function (view){
        return `
        <h3>${view[0].title}</h3>
        <p>${view[0].description}</p>
        <button type="button" onclick="location.href='/update?id=${view[0].id}'">수정</button> 
        <button type="button" onclick="location.href='/delete?id=${view[0].id}'">삭제</button>
        `;
    },
    updateform: function (data) {
        return `
        <form action="/proc_update" method="post">
        <p><input type="text" name="title" placeholder="제목을 입력하세요" value="${data[0].title}"></p>
        <p><textarea name="desc" placeholder="내용을 입력하세요">${data[0].description}</textarea></p> 
        <input type="hidden" name="id" value="${data[0].id}">
        <button type="submit">입력 완료</button>
        </form>
        `;}
}