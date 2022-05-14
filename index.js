const express = require('express');
const server = express();
const mongoose = require('mongoose');
const parser = require('body-parser');
const http = require('http');
const app = http.createServer(server);
const cookieParser = require('cookie-parser');
const util = require('./backend/generator/gen');
const {Server} = require('socket.io');
const io = new Server(app);
const gameSchema = require('./backend/schema/game');
server.use(parser.urlencoded({ extended: false }));
server.use(parser.json());
server.use(cookieParser());
let db = async () => {
    await mongoose.connect('mongodb://localhost:27017/tiktaktoe').then(e=>{
        console.log(`connect to db`);
    })
}
db()
io.on('connection',async(socket)=>{
    console.log(`connect`);
    socket.on('run',(msg)=>{
        socket.to(msg.uuid).emit('result',{choise: msg.choise, cell: msg.cell})
    })
    socket.on('reset',(msg)=>{
        io.to(msg.uuid).emit('delete', msg.data)
    })
    socket.on('choise', (choise)=>{
        socket.to(choise.uuid).emit('history', `<br>user select ${choise.choise}`)

    })
    socket.on('hs', (msg)=>{
       io.to(msg.uuid).emit('history', msg.hs)
    })
    socket.on('join',(uuid)=>{
        socket.join(uuid)
        console.log(socket.rooms);
    })
    socket.on('test',(info)=>{
        console.log(info,socket.rooms);
    })
    socket.on('redirect',(uuid)=>{
        io.to(uuid).emit('redir', uuid);
    })
    socket.on('upload',async(data)=>{
        console.log(data, 'test');
        await socket.join(data.uuid)
setTimeout(()=>{
    io.to(data.uuid).emit('load',data.nick)
},2000)
    })
    socket.on('sendUuid',async (uuid)=>{
        socket.emit('getUuid', uuid)
    })
    socket.on('update',(data)=>{
        socket.join(data.uuid)
        io.to(data.uuid).emit('update',data.nick)
    })
    socket.on('disconect',(pipe)=>{
        console.log(pipe);
    })
})
server
.set('view engine', 'pug')
.use(express.static('views'))
.get('/game/:gameId',(req,res)=>{
    res.render('game')
})
.get('/',(req,res)=>{
    res.render('main')
})
.get('/create',async (req,res)=>{
    if(req.cookies.gameUuid) {
        await gameSchema.deleteMany({uuid: req.cookies.gameUuid})
    }
    const uuid = util.prototype.generateUUID();
    let game = await gameSchema.findOne({uuid: uuid});
    if(game) {
        res.json({'message': 'error'})
    } else {
        await gameSchema({
            name: req.body.name,
            uuid: uuid
        }).save();
        res.cookie('gameUuid', uuid)
    res.render('create', {
        game: uuid,
        nick: req.cookies.nick
    })
}})
.get('/join',(req,res)=>{
    res.render('join.pug')
})
.post('/api/join/',(req,res)=>{
    res.redirect('/game/join/' + req.body.uuid)
})
.get('/game/join/:id',async (req,res)=>{
        await gameSchema.findOne({uuid: req.params.id}).then(e=>{
            res.render('awaitGame',{game:e.uuid})    
        }).catch(err=>{
            console.log(err);
        })
})


app.listen(4000,()=>{
console.log(`server start`);
})