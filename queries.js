require('dotenv').config()
const mongoose = require('mongoose');
const models = require('./schemas');

const mongoDbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

console.log(mongoDbURI)

mongoose.connect(mongoDbURI, { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const getUsers = async (req, res, next) => {

  try {
    console.log(models.Users)
    const monRes = await models.Users.find({})
    res.status(200).json(monRes)
    console.log(monRes)
  } catch (err) {
    res.status(404).json({
      message: '404, Nothing here!',
      error: true
    })
  }


}

module.exports = {
  getUsers
}


/* Replicate



const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const toNumberHelper = (queryInput) => {
  const toNumber = parseInt(queryInput, 10)
  if (typeof toNumber === 'number' && !isNaN(toNumber)) {
    return toNumber
  }
  return ''
}

const resultsToDisplay = (limit) => {
  const parsedLimit = toNumberHelper(limit)
  return parsedLimit ? 'LIMIT ' + parsedLimit : ''
}

const resultsFromOffset = (offset) => {
  const parsedOffset = toNumberHelper(offset)
  return parsedOffset ? 'OFFSET ' + toNumberHelper(offset) : ''
}

const getUsers = (req, res, next) => {
  pool.query('SELECT * FROM ' + process.env.DB_TABLE +
    ' ORDER BY user_id ASC ' +
    resultsToDisplay(req.query.limit) +
    resultsFromOffset(req.query.offset),
  (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers
}
*/
