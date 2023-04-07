import type { NextApiRequest, NextApiResponse } from 'next'
import mysql, { RowDataPacket } from 'mysql2/promise'

// constroi o "tipo" pq typescript É CHATO PRA CARALHO
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

  // Conexão com o banco
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
    // executa sql no banco
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users')

    // percorre e extrai resultado (users)
    const users = rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password
    }))

    // manda o retorno (lista de users)
    res.status(200).json(users)
  } catch (error) {
    
    console.error(error)
    res
  }
}