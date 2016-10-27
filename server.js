var app = require('http').createServer();
var io = require('socket.io')(app);
//var redis = require('socket.io-redis');
//io.adapter(redis({ host: 'localhost', port: 6379 }));
var Redis = require('ioredis');
var _ = require('lodash');
var moderators = [];
var redis = new Redis({
    port: 6379});
app.listen(4000, function() {
});
redis.psubscribe('private-message-created-channel', function (err, count) {
});
redis.on('pmessage', function (channel, message) {
    console.log('message');
    io.emit(channel, message);
});
io.on('connection', function(socket){
    console.log(moderators);

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
