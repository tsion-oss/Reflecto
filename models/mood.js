const { Schema } = require('mongoose')

const moodSchema = new Schema (
    {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    date: {type: Schema.Types.Mixed, required: true},
    mood: {type: String, required: false, },
    note: {type: String, required: false},
    },
    {
        timestamps: true
    }
)


module.exports = moodSchema