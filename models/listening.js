const mongoose = require('mongoose')

const listeningSchema = new mongoose.Schema({
    title: String,
    description: String,
    image_name: String,
    image_url: String,
    price: Number,
    location: String,
    country: String
})

module.exports = new mongoose.model("Listning", listeningSchema)