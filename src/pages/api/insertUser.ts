
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'


type Data = {
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Parse the request body to get the data to insert
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  // Create a MySQL connection pool
  const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root',
    password: '123456',
    database: 'simulacao',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })

  try {
    // Execute the SQL query to insert the data
    await pool.query('INSERT INTO users SET ?', { name, email, password })

    // Send a success response
    res.status(200).json({ success: true })
  } catch (error) {
    // Handle errors and send an error response
    console.error(error)
    res.status(500).json({ success: false })
  } finally {
    // Release the connection from the pool
    pool.end()
  }
}
