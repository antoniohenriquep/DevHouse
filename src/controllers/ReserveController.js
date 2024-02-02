const Reserve = require('../models/Reserve')
const User = require('../models/User')
const House = require('../models/House')


async function store(req,res)
{
    const {user_id} = req.headers
    const {id} = req.params
    const {date} = req.body

    //Validaçoes da casa
    const house = await House.findById(id)
    if(!house)
    {
        return res.status(400).json({error:"Essa casa nao existe"})
    }

    if(house.available !== true)
    {
        return res.status(400).json({error:"Casa indisponivel"})
    }

    //Validaçoes do usuario
    const user = await User.findById(user_id)

    if(String(user._id ) === String(house.user))
    {
        return res.status(401).json({error:"Reserva nao permitida"})
    }

    const reserve = await Reserve.create({
        user:user_id,
        house:id,
        date
    })

    //Populate preenche os campos de id estrangeiro com suas devidas informações
    await reserve.populate('house').populate('user').execPopulate()

    return res.json(reserve)

}


async function index(req,res)
{
    const {user_id} = req.headers
    const reserves = await Reserve.find({user:user_id}).populate('house')

    return res.json(reserves)
}

async function destroy(req,res)
{
    const {id} = req.body
    await Reserve.findByIdAndDelete(id)

    return res.send()
}

module.exports = {index,store,destroy}