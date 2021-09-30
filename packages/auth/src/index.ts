import errorHandler from '@buncolak/ticketing-commons/middlewares/errors'
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import usersRouter from './router/user'
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/users', usersRouter)
app.use(errorHandler)

async function main () {
  await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/ticketing`)

  app.listen(PORT, () => {
    console.log('Started on ' + PORT)
  })
}

main().catch(err => console.log(err))
