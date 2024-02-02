const House = require('../models/House')

async function show(req,res)
{
    const {user_id} = req.headers
    const houses = await House.find({user:user_id})

    return res.json(houses)
}

module.exports = {show}