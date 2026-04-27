const date = new Date()
document.getElementById("year").innerText = date.getFullYear()
const btn = document.getElementById('menu')
const navBar = document.getElementById('nav')
const buttons = document.getElementById('buttons')
const buttonsF = document.getElementById('buttons1')
const buttonsS = document.getElementById('buttons2')
const buttonsT = document.getElementById('buttons3')

btn.addEventListener('click', () => {
    navBar.classList.toggle('active')
})


buttons.addEventListener('click', () => {
    navBar.classList.toggle('active')
})
buttons1.addEventListener('click', () => {
    navBar.classList.toggle('active')
})
buttons2.addEventListener('click', () => {
    navBar.classList.toggle('active')
})
buttons3.addEventListener('click', () => {
    navBar.classList.toggle('active')
})