const { Schema } = require('mongoose')

const userSchema = new Schema (
    {
        user_id: { type: String, required: false},
        username: {type: String, required: true},
        email: {type: String, required: false},
        password: {type: String, required: true},
        moodEntries: [{ type: Schema.Types.ObjectId, ref: 'Mood', required: false}],
        journalEntries: [{ type: Schema.Types.ObjectId, ref: 'Journal', required: false}]
    },
    {
        timestamps: true
    }
)

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}


module.exports = userSchema