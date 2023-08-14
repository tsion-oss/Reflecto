const express = require('express')
const app = express()
const cors = require('cors')
// const db = require('./db')
const PORT = process.env.PORT || 3001
const AppRouter = require('./Router/appRouter')
const bcrypt = require('bcrypt');
const { User, Journal } = require('./models/index')
const { Mood } = require('./models/index')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// const middleware = require('./middleware')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const jSecretKey = process.env.jwtSecretKey





// app.use(middleware.stripToken)

app.use('/api', AppRouter)

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))




app.post('/api/register', async(req, res) => {  
    try{
            const { username, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
          
            const newUser = new User({ username, password: hashedPassword })
            await newUser.save()
            
            
            res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
         res.status(500).json({ error: 'Something went wrong' })
    }

})
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        
        const payload = { userId: user._id, username: user.username };

      
        const token = jwt.sign(payload, jSecretKey, { expiresIn: '1h' });
     
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});


function authenticateToken(req, res, next) {
    console.log('working')
    const token = req.headers['authorization']
    console.log(token)

    if(!token) {
        return res.status(401).json({ message: 'No token provided' })
    }

    jwt.verify(token, jSecretKey, (err, decodedToken) => {
        if(err) {
            return res.status(403).json({ message: 'Invalid token' })
        }
        req.user = decodedToken
        next()
    })
}
app.get('/api/user', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId)
        .populate('moodEntries')
        .populate('journalEntries')
        .exec();
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/api/user/mood', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId; 
      const { mood, date, note } = req.body;
  
      const newMoodEntry = await Mood.create({ mood, date, note });
  
      const user = await User.findById(userId);
      user.moodEntries.push(newMoodEntry);
      await user.save();
  
      res.json(newMoodEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/api/journal', authenticateToken, async (req, res) => {
    console.log('post working')

    console.log('post', token)
    try {
      const userId = req.user.userId; // Get the userId from the authenticated user's token
      console.log(userId)
      const { content, date } = req.body;
  
      const newJournalEntry = await Journal.create({ content, date });
  
      const user = await User.findById(userId);
      user.journalEntries.push(newJournalEntry);
      await user.save();
  
      res.json(newJournalEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
