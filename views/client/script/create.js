const socket = io();
let startGame = document.getElementById('start'); 
const users= document.getElementById('users');
let uuid = document.getElementById('uuid').textContent;
let interval = setInterval(()=>{
    if(users.innerHTML.includes('<br>')) {
        startGame.onclick = ()=> {
            socket.emit('redirect', uuid);
        } 
        clearInterval(interval)
        socket.emit('upload', {nick: users.innerHTML,uuid: uuid});
    } else {
        console.log(`start`);
    }
},1000)
let start = async() => {
    await socket.emit('join', uuid);
    await socket.on('update',async(data)=>{
        users.innerHTML += "<br>" + data
    })
}
    start();
    socket.on('redir',(uuid)=>{
        location.href = '/game/' + uuid
    })