/*
-Funcoes de um controller
-index: Listagem de sessoes
-store: Criar uma sessao
-show: Listar uma unica sessao
-update: Alterar uma sessao
-destroy: Deletar uma sessao
*/ 

const User = require('../models/User')
const Yup = require('yup')

async function store(req,res)
{
    const schema = Yup.object().shape({
        email: Yup.string().email().required()
    })

    if(!(await schema.isValid(req.body)))
    {
        return res.status(400).json({error:'Falha na validação'})
    }
    const {email} = req.body

    let user = await User.findOne({email})

    if(!user)
        user = await User.create({email})

    return res.json(user)
}

async function index(req,res){
    let users = await User.find()

    return res.json(users)
}

module.exports = {store,index}