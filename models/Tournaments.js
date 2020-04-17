const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    name: {
        type: String
    },
    pricepool: {
        type: String
    },
    entry_fees: {
        type: String
    },
    game: {
        type: String
    },
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }

    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tournament = mongoose.model('tournament', TournamentSchema);
