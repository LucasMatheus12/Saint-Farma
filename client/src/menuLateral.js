// Seletor de Menu lateral 
const list = document.querySelectorAll('.list');

function ativarLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active')
}

list.forEach((item) =>
    item.addEventListener('click', ativarLink));


// -------------------------------------------------


