const Pool = require('pg').Pool
const pool = new Pool({
  user: 'product',
  host: 'localhost',
  database: 'product',
  password: 'product',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createUser = (request, response) => {
  const { id,pname,pcost,quantity } = request.body

  pool.query('INSERT INTO products (id, pname, pcost, quantity) VALUES ($1, $2, $3, $4)', [id,pname,pcost,quantity], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { id,pname,pcost,quantity } = request.body

  pool.query(
    'UPDATE products SET pname = $2, pcost = $3, quantity = $4 WHERE id = $1',
    [pname,pcost,quantity,id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
