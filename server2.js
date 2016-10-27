var fs = require('fs');

var app = require('http').createServer();
var io = require('socket.io')(app);
var Redis = require('ioredis');
var redis = new Redis();
app.listen(4000, function() {
    console.log('Server is running!');
});
function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.end('');
}
io.on('connection', function(socket) {
    console.log('connected client');
});
redis.psubscribe('*', function(err, count) {
    //
});
redis.on('pmessage', function(subscribed, channel, message) {
    console.log(message);
    //message = JSON.parse(message);
    console.log('Channel is ' + channel + ' and message is ' + message);
    io.emit(channel, message.data);
});
