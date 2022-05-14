const mongoose = require('mongoose');
const {Schema} = mongoose;

    let game = new Schema({
        uuid: {type: String, require: true}
    });
    
let gameEx = mongoose.model('games', game);
    
module.exports = gameEx;