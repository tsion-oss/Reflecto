
const { Journal } = require('../models/index.js');
const db = require('../db') 


async function createJournalEntry(req, res) {
  try {
    const newJournalEntry = new Journal(req.body);
    const savedJournalEntry = await newJournalEntry.save();
    res.status(201).json(savedJournalEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function getAllJournalEntries(req, res) {
  try {
    const journalEntries = await Journal.find();
    res.json(journalEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getJournalEntryById(req, res) {
  const { id } = req.params;
  console.log('updating journal entry with Id', id)
  try {
    const journalEntry = await Journal.findById(id);
    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json(journalEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function updateJournalEntryById(req, res) {
  try {
    let { id } = req.params;
   
    const updatedJournalEntry = await Journal.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedJournalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json(updatedJournalEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteJournalEntryById(req, res) {
  try{
    const { id } = req.params
    const deleted = await Journal.findByIdAndDelete(id)
    if (deleted) {
        return res.status(200).send('Journal deleted')
    }
    throw new Error('Journal not found')
} catch (error) {
    return res.status(500).send(error.message)
}
}

module.exports = {
  createJournalEntry,
  getAllJournalEntries,
  getJournalEntryById,
  updateJournalEntryById,
  deleteJournalEntryById,
};
