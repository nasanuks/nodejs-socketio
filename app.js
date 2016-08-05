var express = require('express');
var socketio = require('socket.io');

var app = express();
var path = require('path');
var port = 8081;

var server = app.listen(port, function() {
  console.log('listening on port:' + port)
});
var io = socketio.listen(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});
/*--------SOCKET------*/
io.on('connection', function(socket) {
  console.log('a user connected')
  socket.on('chat',  function(tran) {
    console.log(tran);
    io.emit('chat', {username: tran.username, message: tran.message});
  })
});
