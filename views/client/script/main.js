setStorage('Введіть ваш нік')

function setStorage(param) {
    localStorage.setItem('nick', prompt(param))
    if((localStorage.getItem('nick') ===  "" || localStorage.getItem('nick').includes(' ') )) {
        setStorage('Мінімальна ширина ніку 1 символ\nНік не може мати пробіл')
    }
    document.cookie = `nick=${localStorage.getItem('nick')}`
}