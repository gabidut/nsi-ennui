const socket = require('socket.io');
const express = require('express');
const { addGame, Game } = require('../games/game');
const game = require('../games/game');

module.exports = (server, sessionSystem) => {
    console.log('📨 Socket.io ready');
    
    const io = socket(server);
    io.engine.use(sessionSystem);
    io.on('connection', (socket) => {
        let username = socket.request.session.user;
        console.log('🔗 Connected', username);
        
        socket.on('chat message', (msg) => {            
            if(username == "admin") {
                io.emit('chat admin', "> " + username + " : " + msg);
                return;
            }
            io.emit('chat message', "> " + username + " : " + msg);
        });

        socket.on('game link', (msg) => {
            
            let domainName = msg.split('/')[2];
            
            
            let game = new Game(
                domainName,
                `https://www.google.com/s2/favicons?domain=${msg}`,
                msg
            )

            addGame(game);

            io.emit('game link', game);
        });

        socket.on('game delete', (msg) => {
            if(username == "admin") {
                io.emit('game delete', msg);
                game.delGame(msg);
            }
        });

        socket.on('admin prof', (msg) => {
            if(username == "admin") {
                io.emit('admin prof', msg);
            }
        });

        socket.on('disconnect', () => {
            console.log('🔗 Disconnected', username);
        });
        
    });
    return io;
}