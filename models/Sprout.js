const mongoose = require('mongoose');

const SproutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    care: {
        type: String,
        required: true,
    },
    varieties: {
        type: String,
        required: false,
    },
    // TODO: When "++" is funcitoning for favs, make favs required
    favs: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Sprout', SproutSchema);
