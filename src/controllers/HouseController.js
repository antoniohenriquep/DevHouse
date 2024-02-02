const House = require('../models/House')
const User = require('../models/User')


async function houseStore(req,res)
{
    const {filename} = req.file
    const{description,price,location,available} = req.body
    const {user_id} = req.headers

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

async function houseIndex(req,res)
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

async function houseUpdate(req,res)
{
    const {filename} = req.file
    const {id} = req.params
    const {description,price,location,available} = req.body
    const {user_id} = req.headers

    const user = await User.findById(user_id)
    const house = await House.findById(id)

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

async function houseDestroy(req,res)
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

module.exports = {houseStore, houseIndex, houseUpdate, houseDestroy}