const {Schema, model} = require("mongoose")

const Movie = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    description: {type: String, required: true},
})

module.exports = model("Movie", Movie)