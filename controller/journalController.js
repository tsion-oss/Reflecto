
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
  const { journalId } = req.params;
  try {
    const journalEntry = await Journal.findById(journalId);
    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json(journalEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function updateJournalEntryById(req, res) {
  const { journalId } = req.params;
  try {
    const updatedJournalEntry = await Journal.findByIdAndUpdate(journalId, req.body, { new: true });
    if (!updatedJournalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json(updatedJournalEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteJournalEntryById(req, res) {
  const { journalId } = req.params;
  try {
    const deletedJournalEntry = await Journal.findByIdAndDelete(journalId);
    if (!deletedJournalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createJournalEntry,
  getAllJournalEntries,
  getJournalEntryById,
  updateJournalEntryById,
  deleteJournalEntryById,
};
