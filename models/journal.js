const { Schema } = require('mongoose')

const journalSchema = new Schema (
    {
        entry_id: { type: String, required: false},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: false},
        date: {type: Schema.Types.Mixed, required: true},
        content: {type: String, required: true}
    },
    {
        timestamps: true
    }
)



module.exports = journalSchema