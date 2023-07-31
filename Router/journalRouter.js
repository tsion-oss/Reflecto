const Router = require('express').Router()
const express = require('express')
const controller = require('../controller/journalController')




Router.get('/', controller.getAllJournalEntries)
Router.post('/',  controller.createJournalEntry)
Router.get('/:id',  controller.getJournalEntryById)
Router.put('/:id', controller.updateJournalEntryById)
Router.delete('/:id', controller.deleteJournalEntryById)

module.exports = Router