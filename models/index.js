const mongoose = require('mongoose')

const userSchema = require('./user')
const moodSchema = require('./mood')
const journalSchema = require('./journal')


const User = mongoose.model('User', userSchema)
const Mood = mongoose.model('Mood', moodSchema)
const Journal = mongoose.model('Journal', journalSchema)


module.exports = {
    User,
    Mood, 
    Journal
}