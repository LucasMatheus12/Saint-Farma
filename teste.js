const express = require('express')
const app = express();
const path = require('path')
const router = express.Router();

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/client/src/pages/index.html'));
})

router.get('/estoque.html',function(req,res){
    res.sendFile(path.join(__dirname+'/client/src/pages/estoque.html'));
})

router.get('/cliente.html',function(req,res){
    res.sendFile(path.join(__dirname+'/client/src/pages/cliente.html'));
})

router.get('/venda.html',function(req,res){
    res.sendFile(path.join(__dirname+'/client/src/pages/venda.html'));
})

router.get('/venda-a-prazo.html',function(req,res){
    res.sendFile(path.join(__dirname+'/client/src/pages/venda-a-prazo.html'));
})

app.use('/',router);

app.listen(process.env.port || 3000)
console.log()