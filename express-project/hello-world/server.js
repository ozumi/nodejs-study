//server.js

var app = require('http').createServer(handler),
    io = require('socket.io')(app),
    fs = require('fs');

app.listen(3000);

function handler (req, res) {
    fs.readFile('views/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function (socket) {  // 1
    socket.emit('news', { serverData : "서버 작동" });

    socket.on('client login', function (data) {  // 2
        console.log(data);
    });

    socket.on('disconnect', function(){  // 3
        console.log('접속이 종료되었습니다.');
    });

});
