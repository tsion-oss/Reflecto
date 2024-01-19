// const { MongoClient} = require('mongodb')

// module.export = {
//   connectToDb: () => {
//     MongoClient.connect('mongodb://localhost:27017/reflecto')
//     .then((client) => {
//       dbConnection = client.db()
//     })
//   },
//   getDb: () => {}
// }


const mongoose = require('mongoose')
require('dotenv').config()

const mongoUri = process.env.MONGO_URI

mongoose
.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })
mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db