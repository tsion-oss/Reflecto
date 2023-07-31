
const db = require('../db')
const { User, Mood, Journal } = require('../models/index');

const main = async () => {


    const userData = [
      {
        user_id: 'user_id_1',
        username: 'user_1_username',
        email: 'user1@example.com',
        password: 'user1_password',
      },
      {
        user_id: 'user_id_2',
        username: 'user_2_username',
        email: 'user2@example.com',
        password: 'user2_password',
      },
    ];

    await User.deleteMany();
    await User.insertMany(userData);


    const insertedUsers = await User.find();

    const moodData = [
      {
        entry_id: 'mood_entry_1',
        user: insertedUsers[0]._id, 
        mood: 'happy',
        date: '2023-07-24',
      },
      {
        entry_id: 'mood_entry_2',
        user: insertedUsers[0]._id, 
        mood: 'sad',
        date: '2023-07-25',
      },
      {
        entry_id: 'mood_entry_3',
        user: insertedUsers[0]._id,
        mood: 'excited',
        date: '2023-07-26',
      },
      {
        entry_id: 'mood_entry_4',
        user: insertedUsers[0]._id,
        mood: 'calm',
        date: '2023-07-27',
      },
      {
        entry_id: 'mood_entry_5',
        user: insertedUsers[0]._id, 
        mood: 'angry',
        date: '2023-07-28',
      },
      {
        entry_id: 'mood_entry_6',
        user: insertedUsers[1]._id,
        mood: 'content',
        date: '2023-07-24',
      },
    ];

    await Mood.deleteMany();
    await Mood.insertMany(moodData);

    const journalData = [
      {
        entry_id: 'journal_entry_1',
        user: insertedUsers[1]._id, 
        date: '2023-07-24',
        content: 'Today was a great day!',
      },
      {
        entry_id: 'journal_entry_2',
        user: insertedUsers[1]._id, 
        date: '2023-07-25',
        content: 'Feeling a bit tired today.',
      },
      {
        entry_id: 'journal_entry_3',
        user: insertedUsers[0]._id,
        date: '2023-07-26',
        content: 'Had a productive meeting.',
      },
      
    ];

    await Journal.deleteMany();
    await Journal.insertMany(journalData);


};

const run = async () => {
    await main()
    db.close()
}
run()
