
const{ User } = require('../models/index')
const bcrypt = require('bcrypt')

async function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUserById(req, res) {
    try {
      let { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}

async function deleteUserById(req, res) {
  try{
    const { id } = req.params
    const deleted = await User.findByIdAndDelete(id)
    if (deleted) {
        return res.status(200).send('User deleted')
    }
    throw new Error('User not found')
} catch (error) {
    return res.status(500).send(error.message)
}
}


// async function getUserWithMoodsAndJournals(req, res) {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId)
//       .populate('moodEntries')
//       .populate('journalEntries')
//       .exec();

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

  
  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
  }