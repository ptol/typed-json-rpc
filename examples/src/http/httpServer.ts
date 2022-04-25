import express from 'express'
import { requestHandler } from '../api'
const app = express()
app.use(express.json())
const port = 9000

app.post('/', async (req, res) => {
  const response = await requestHandler.handleRequest(req.body)
  return res.status(200).json(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
