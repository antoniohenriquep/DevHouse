const House = require('../models/House')
const User = require('../models/User')
const Yup = require('yup')

async function store(req,res)
{
    //Schema utilizado para a fazer a validação com o Yup
    const schema = Yup.object().shape({
        description:Yup.string().required(),
        price: Yup.number().required(),
        location: Yup.string().required(),
        available: Yup.boolean().required()
    })
    const {filename} = req.file
    const{description,price,location,available} = req.body
    const {user_id} = req.headers

    //Verifica se as informações passadas no body são validas
    if(!(await schema.isValid(req.body)))
    {
        return res.status(400).json({error:'Falha na validação'})
    }

    const house = await House.create({
        user:user_id,
        thumbnail:filename,
        description,
        price,
        location,
        available
    })
    // console.log(req.body)
    // console.log(req.file)
    return res.json({house})
}

async function index(req,res)
{
    
    const {available} = req.query
    //Mostrar apenas as casas disponiveis pelo query params
    if(available)
    {
        const houses = await House.find({available})
        return res.json(houses)
    }
    //Mostrar todas as casas cadastradas
    else
    {
        const houses = await House.find()
        return res.json(houses)
    }
}

async function update(req,res)
{
    //Schema utilizado para a fazer a validação com o Yup
    const schema = Yup.object().shape({
        description:Yup.string().required(),
        price: Yup.number().required(),
        location: Yup.string().required(),
        available: Yup.boolean().required()
    })


    const {filename} = req.file
    const {id} = req.params
    const {description,price,location,available} = req.body
    const {user_id} = req.headers

    const user = await User.findById(user_id)
    const house = await House.findById(id)

    //Verifica se as informações passadas no body são validas
    if(!(await schema.isValid(req.body)))
    {
        return res.status(400).json({error:'Falha na validação'})
    }    

    //Verificando se o usuario logado é o mesmo que cadastrou a casa
    if(String(user._id) !== String(house.user))
    {
        return res.status(401).json({error:'Não autorizado'})
    }
    await House.updateOne({_id:id},{
        user:user_id,
        thumbnail:filename,
        description,
        price,
        location,
        available
    })
    
    return res.send()
}

async function destroy(req,res)
{
    const {id} = req.body
    const {user_id} = req.headers

    const user = await User.findById(user_id)
    const house = await House.findById(id)

    //Verificando se o usuario logado é o mesmo que cadastrou a casa
    if(String(user._id) !== String(house.user))
    {
        return res.status(401).json({error:'Não autorizado'})
    }

    await House.findByIdAndDelete(id)
    return res.send({message:"Excluido com sucesso"})
}

module.exports = {store, index, update, destroy}