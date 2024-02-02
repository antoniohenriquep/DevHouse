/*
-Funcoes de um controller
-index: Listagem de sessoes
-store: Criar uma sessao
-show: Listar uma unica sessao
-update: Alterar uma sessao
-destroy: Deletar uma sessao
*/ 

const User = require('../models/User')

async function sessionStore(req,res)
{
    const {email} = req.body

    let user = await User.findOne({email})

    if(!user)
        user = await User.create({email})

    return res.json(user)
}

module.exports = sessionStore