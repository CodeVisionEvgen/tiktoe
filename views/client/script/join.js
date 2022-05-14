const socket = io();
let form = document.getElementById('form');
let sumbit = document.getElementById('submitBTN');
socket.on('redir',(uuid)=>{
    location.href = '/game/' + uuid
})
sumbit.onclick = async() => {
    let uuid = document.getElementsByName('uuid')[0].value;
    document.cookie = 'gameUuid=' + uuid;
    await socket.emit('join',uuid);
    await socket.emit('update', {uuid:uuid,nick: localStorage.getItem('nick')})
}