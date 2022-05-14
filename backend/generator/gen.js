class util {
    generateUUID() {
        let text = 'qwertyuiopasdfgjklzxcvbnm'.split('');
let uuid = '';
for (let i = 0; i < 26; i++) {
    let random = Math.floor(Math.random() * 10)
    gen(text[random],random)
}

async function gen(letter,random) {
    if(uuid.length > 7) {
        return false
    } else if (uuid.length < 7) {
            return uuid = uuid.concat(letter + random);
    }
}
console.log(uuid);
return uuid
}
}
util.prototype.generateUUID()

module.exports=util;