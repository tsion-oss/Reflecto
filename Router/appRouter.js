const Router = require('express').Router()
const userRouter = require('./userRouter')
const moodRouter = require('./moodRouter')
const journalRouter = require('./journalRouter')
// const authRouter = require('./authRouter')



Router.use('/user', userRouter)
Router.use('/mood', moodRouter)
Router.use('/journal', journalRouter)
// Router.use('/auth', authRouter)

module.exports = Router