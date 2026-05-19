import type { NextApiRequest, NextApiResponse } from "next";
import pool from '../../../components/db';

export default async function Login(req: NextApiRequest, res: NextApiResponse){
  const { username, password} = req.query;
  try{
    const connection = await pool.getConnection();
    const [rows_user]:any[] = await connection.query(`
      SELECT prof_user AS username, prof_desc AS role, prof_id AS id 
      FROM professional 
      WHERE prof_user = ? AND prof_password = ?
      UNION
      SELECT stu_user AS username, 'Estudante' AS role, stu_id AS id 
      FROM student 
      WHERE stu_user = ? AND stu_password = ?
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


