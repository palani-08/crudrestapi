const Pool = require('pg').Pool
const pool = new Pool({
  user: 'product',
  host: 'localhost',
  database: 'product',
  password: 'product',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY productid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM products WHERE productid = $1', [productid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createUser = (request, response) => {
  const { productid,productname,quantity,price } = request.body

  pool.query('INSERT INTO products (productid, productname, quantity, price) VALUES ($1, $2, $3, $4)', [productid,productname,quantity,price], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { productid,productname,quantity,price } = request.body

  pool.query(
    'UPDATE products SET productname = $2, quantity = $3, price = $4 WHERE productid = $1',
    [productname, quantity,price,productid],
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

  pool.query('DELETE FROM products WHERE productid = $1', [id], (error, results) => {
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
