const socket = io();
let paramsId = location.href.split('/game/')[1];
socket.emit('join', paramsId)
console.log(paramsId);
let xWin = 0;
let oWin = 0;
let body = document.getElementsByTagName('body')[0];
body.innerHTML += `<p id='wins'>x: ${xWin}<br>o: ${oWin}</p>`
let content = document.getElementById('content');
let count = 0;
for(let i = 0; i < 9; i++) {
    content.innerHTML += `<div class='item-${i} cell' ></div>`;
}
socket.on('result',(msg)=>{
    document.querySelector(`.${msg.cell.split(' ')[0]}`).textContent = msg.choise
    win()
    content.style.pointerEvents = 'all';
})
function win() {      
    if(content.childNodes[0].textContent === 'x' && content.childNodes[1].textContent === 'x' && content.childNodes[2].textContent === 'x') {
        victory("x")
    } else if(content.childNodes[3].textContent === 'x' && content.childNodes[4].textContent === 'x' && content.childNodes[5].textContent === 'x') {
        victory("x")
    }else if(content.childNodes[6].textContent === 'x' && content.childNodes[7].textContent === 'x' && content.childNodes[8].textContent === 'x') {
        victory("x")
    }
    else if(content.childNodes[0].textContent === 'x' && content.childNodes[4].textContent === 'x' && content.childNodes[8].textContent === 'x') {
        victory("x")
    }
    else if(content.childNodes[2].textContent === 'x' && content.childNodes[4].textContent === 'x' && content.childNodes[6].textContent === 'x') {
        victory("x")
    }
    else if(content.childNodes[1].textContent === 'x' && content.childNodes[4].textContent === 'x' && content.childNodes[7].textContent === 'x') {
        victory("x")
    }
    else if(content.childNodes[0].textContent === 'x' && content.childNodes[3].textContent === 'x' && content.childNodes[6].textContent === 'x') {
        victory("x")
    }
    else if(content.childNodes[2].textContent === 'x' && content.childNodes[5].textContent === 'x' && content.childNodes[8].textContent === 'x') {
        victory("x")
    }
    else if(content.childNodes[0].textContent === 'o' && content.childNodes[1].textContent === 'o' && content.childNodes[2].textContent === 'o') {
        victory("o")
    }
     else if(content.childNodes[3].textContent === 'o' && content.childNodes[4].textContent === 'o' && content.childNodes[5].textContent === 'o') {
        victory("o")
    }
    else if(content.childNodes[6].textContent === 'o' && content.childNodes[7].textContent === 'o' && content.childNodes[8].textContent === 'o') {
        victory("o")
    }
    else if(content.childNodes[0].textContent === 'o' && content.childNodes[4].textContent === 'o' && content.childNodes[8].textContent === 'o') {
        victory("o")
    }
    else if(content.childNodes[2].textContent === 'o' && content.childNodes[4].textContent === 'o' && content.childNodes[6].textContent === 'o') {
        victory("o")
    }
    else if(content.childNodes[1].textContent === 'o' && content.childNodes[4].textContent === 'o' && content.childNodes[7].textContent === 'o') {
        victory("o")
    }
    else if(content.childNodes[0].textContent === 'o' && content.childNodes[3].textContent === 'o' && content.childNodes[6].textContent === 'o') {
        victory("o")
    }
    else if(content.childNodes[2].textContent === 'o' && content.childNodes[5].textContent === 'o' && content.childNodes[8].textContent === 'o') {
        victory("o")
    } 
};
content.addEventListener('click',(e)=>{
    let target = e.target;
    let current = e.currentTarget
    current.style.pointerEvents = 'none';
    if(target.className.includes('item')){
        if(target.textContent != 'o' && target.textContent != 'x' && (localStorage.getItem('choise') === 'x' || localStorage.getItem('choise') === 'o')) { 
            socket.emit('run', {choise: localStorage.getItem('choise'), cell: target.className,uuid: paramsId});
            target.textContent = localStorage.getItem('choise');
            win()
            count++;
            socket.emit('hs',{hs: `<br>player ${localStorage.getItem('choise')} click cell ${target.attributes[0].nodeValue.split(' ')[0]}`,uuid: paramsId})
        }
        let isOver = 0;
        content.childNodes.forEach(e=>{
            if(e.textContent != '') {
                isOver++;
            } 
        });
    }
})
function isOverFunc(params) {
    alert(`${params}`)
    content.childNodes.forEach(e=>{
        e.textContent = '';
    })
}

function victory(player) {
    alert(`user ${player} victory`);
    content.childNodes.forEach(e=>{
        socket.emit('reset', {data: '',uuid: paramsId})
        socket.on('delete',(msg)=>{
            e.textContent = msg
        })
    })
    if(player === 'o') {
        oWin++
        document.getElementById('wins').innerHTML = `x: ${xWin}<br>o: ${oWin}`;
    } else if (player === 'x') {
        xWin++
        document.getElementById('wins').innerHTML = `x: ${xWin}<br>o: ${oWin}`;
    }
}
let choise = document.getElementById('choise');
choise.addEventListener('click',e=>{
    let history = document.getElementById('historyContent');
    socket.on('history',(msg)=>{
        history.innerHTML += msg;
    })
    let target = e.target;
    if(target.textContent == "x" || target.textContent == "o") {
        localStorage.setItem('choise', target.textContent)
        socket.emit('choise', {choise: localStorage.getItem('choise'),uuid: paramsId})
        content.style.visibility = 'visible';
        document.getElementById('wins').style.visibility = 'visible';
        choise.style.display = 'none'
        document.getElementById('history').style.visibility = 'visible';
    }
})