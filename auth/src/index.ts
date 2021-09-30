import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './router/user'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.use('/users', usersRouter)

app.get('/', (req, res) => {
  return res.json({
    ok: true
  })
})

async function main () {
  await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/ticketing`)
  app.listen(PORT, () => {
    console.log('Started on ' + PORT)
  })
}

main().catch(err => console.log(err))
