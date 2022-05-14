const socket = io();
let uuid = document.cookie.split('gameUuid=')[1].split(';')[0].replace(';','');
socket.emit('join', uuid);
console.log(`join`);
let users = document.getElementById('users');
socket.on('load',(data)=>{
    console.log(data,1);
    users.innerHTML += data
})
socket.on('redir',(uuid)=>{
    location.href = '/game/' + uuid
})