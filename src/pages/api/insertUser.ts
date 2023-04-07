
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise' 

// retorno
type Data = {
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // Recupera informações da requisição
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  // Cria conexão com o banco
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
    // executa o sql para inserir
    await pool.query('INSERT INTO users SET ?', { name, email, password })

    // manda retorno (sucesso)
    res.status(200).json({ success: true })
  } catch (error) {
     
    console.error(error)
    // manda retorno (erro)
    res.status(500).json({ success: false })
  } finally {
    // finaliza conexão
    pool.end()
  }
}
