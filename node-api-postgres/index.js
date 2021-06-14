const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries.js')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/products', db.getUsers)
app.get('/products/:id', db.getUserById)
app.post('/products', db.createUser)
app.put('/products/:id', db.updateUser)
app.delete('/products/:id', db.deleteUser)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
