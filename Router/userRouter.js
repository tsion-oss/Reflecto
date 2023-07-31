const Router = require('express').Router()
const express = require('express')
const controller = require('../controller/userController')

Router.get('/', controller.getAllUsers)
Router.post('/', controller.createUser)
Router.get('/:id', controller.getUserById)
Router.put('/:id', controller.updateUserById)
Router.delete('/:id', controller.deleteUserById)

// Router.get('/withMoodsAndJournals/:id', controller.getUserWithMoodsAndJournals);




module.exports = Router