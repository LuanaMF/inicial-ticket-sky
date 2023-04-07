import type { NextApiRequest, NextApiResponse } from 'next'
import mysql, { RowDataPacket } from 'mysql2/promise'

type User = {
  id: number
  name: string
  email: string
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
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
    // Execute the SQL query to get all users
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users')

    // Map over the rows and extract the values for each field
    const users = rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password
    }))

    // Send the array of users as a response
    res.status(200).json(users)
  } catch (error) {
    // Handle errors and send an error response
    console.error(error)
    res
  }
}