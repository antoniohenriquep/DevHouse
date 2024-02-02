const {Schema, model} = require('mongoose')

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price:Number,
    location: String,
    available: Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},
{
    toJSON:{
        virtuals:true
    }
})

HouseSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:7072/files/${this.thumbnail}`
})

module.exports = model('House',HouseSchema)

