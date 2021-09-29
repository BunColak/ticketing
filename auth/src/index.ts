import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  return res.json({
    ok: true
  })
})

app.listen(PORT, () => {
  console.log('Started on ' + PORT)
})
