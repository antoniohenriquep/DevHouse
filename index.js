const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const {mongoURI} = require('./src/config/db')

//Importando rotas
const sessions = require('./src/routes/sessions')
const houses = require('./src/routes/houses')
const dashboard = require('./src/routes/dashboard')

//Instanciando express
const app = express()

//Banco de dados
mongoose.connect(mongoURI,
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Conectou ao banco de dados')
})

//Middlewares
app.use('/files', express.static(path.resolve(__dirname,'uploads')))
app.use(cors())
app.use(express.json())

//Rotas
    //Sessions
app.use('/sessions',sessions)

    //Houses
app.use('/houses',houses)

    //Dashboard
app.use('/dashboard',dashboard)

    //Raiz
app.get('/',(req,res)=>{
    return res.json({ok:true})
})

app.listen(7072,()=>{
    console.log('Servidor rodando')
})