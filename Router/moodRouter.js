const Router = require('express').Router()
const express = require('express')
const controller = require('../controller/moodController')





Router.get('/',  controller.getAllMoodEntries)
Router.post('/',  controller.createMoodEntry)
Router.get('/:id',  controller.getMoodEntryById)
Router.put('/:id',  controller.updateMoodEntryById)
Router.delete('/:id', controller.deleteMoodEntryById)

module.exports = Router