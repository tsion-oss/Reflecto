const { Mood } = require('../models/index.js');
const db = require('../db')


async function createMoodEntry(req, res) {
  try {
    const newMoodEntry = new Mood(req.body);
    const savedMoodEntry = await newMoodEntry.save();
    res.status(201).json(savedMoodEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function getAllMoodEntries(req, res) {
  try {
    const moodEntries = await Mood.find();
    res.json(moodEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getMoodEntryById(req, res) {
  const { id } = req.params;
  try {
    const moodEntry = await Mood.findById(id);
    if (!moodEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }
    res.json(moodEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function updateMoodEntryById(req, res) {
  const { moodId } = req.params;
  try {
    const updatedMoodEntry = await Mood.findByIdAndUpdate(moodId, req.body, { new: true });
    if (!updatedMoodEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }
    res.json(updatedMoodEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteMoodEntryById = async (req, res) => {
  try{
    const { id } = req.params
    const deleted = await Mood.findByIdAndDelete(id)
    if (deleted) {
        return res.status(200).send('Mood deleted')
    }
    throw new Error('comment not found')
} catch (error) {
    return res.status(500).send(error.message)
}
}


module.exports = {
  createMoodEntry,
  getAllMoodEntries,
  getMoodEntryById,
  updateMoodEntryById,
  deleteMoodEntryById,
};