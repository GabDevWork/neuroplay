import type { NextApiRequest, NextApiResponse } from "next";
import pool from '../../../components/db';

export default async function Login(req: NextApiRequest, res: NextApiResponse){
  const { username, password} = req.query;
  try{
    const connection = await pool.getConnection();
    const [rows_user]:any[] = await connection.query(`
      SELECT user_professional, user_student FROM student, professional WHERE user_student = ? AND password_student = ? OR user_professional = ? AND password_professional = ?;
        `,[username, password, username, password]
      );
    connection.release();

    if (Array.isArray(rows_user) && rows_user.length > 0) {
      const user = rows_user[0];
      res.status(200).json(user)
    }else{
      res.status(401).json({message:"Unauthorized"})
    }

  }catch(error){
    console.error("Erro na API de login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
  
}


