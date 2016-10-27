var io = require('socket.io')(4000);
//var redis = require('socket.io-redis');
//io.adapter(redis({ host: 'localhost', port: 6379 }));
var Redis = require('ioredis');
var _ = require('lodash');
var moderators = [];
io.sockets.on('connection', function(socket){
    console.log('connected');
    moderators.push(socket);
    var redis = new Redis({
        port: 6379});
    redis.subscribe('private-message-created-channel', function (err, count) {
    });
    redis.on('message', function (channel, message) {
       // console.log('Receive message %s from channel %s', message, channel);
        console.log(moderators.length);
        var data = JSON.parse(message);

        socket.broadcast.emit(channel, message);
    });

    socket.on('join', function(data){
        io.sockets.emit('joined', data);
        //socket.username = data.username;
    });
    socket.on('ping', function(data){
        io.sockets.emit('ping', {username: socket.username});
    });
});
