var io = require('socket.io')(4000);
//var redis = require('socket.io-redis');
//io.adapter(redis({ host: 'localhost', port: 6379 }));
var Redis = require('ioredis');
var _ = require('lodash');
var moderators = [];
var redis = new Redis({
    port: 6379});
redis.subscribe('private-message-created-channel', function (err, count) {
});
io.sockets.on('connection', function(socket){
    var clients = io.sockets.clients();
    moderators.push(socket.id);
    console.log(moderators);

    redis.on('message', function (channel, message) {
        console.log('Receive message %s from channel %s', message, channel);
        var data = JSON.parse(message);
console.log('message');
        socket.broadcast.emit(channel, message);
    });

    socket.on('join', function(data){
        io.sockets.emit('joined', data);
        //socket.username = data.username;
    });
    socket.on('ping', function(data){
        io.sockets.emit('ping', {username: socket.username});
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
