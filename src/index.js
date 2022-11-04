import express from "express";
const app = express();

app.listen(3000, () => {  
    console.log("Server running on 3000");
});


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


