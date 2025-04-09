import type { NextApiRequest, NextApiResponse } from "next";
import pool from '../../../components/db';

export default async function RegisterProfessional(req: NextApiRequest, res: NextApiResponse){
  const { nome, descricao, email, username, password} = req.query;
  try{
    const connection = await pool.getConnection();
    const [rowsUser]:any[] = await connection.query(`
      SELECT * FROM professional WHERE user_professional = ?;
        `,[username]
      );
    connection.release();
    if (Array.isArray(rowsUser) && rowsUser.length > 0) {
      res.status(400).json({message: "Bad Request"});
    }else{
      try{
        const connection = await pool.getConnection();
        const [result]:any[] = await connection.query("SELECT MAX(id_professional) AS lastId FROM professional");
        const lastId = (result)[0].lastId || 0;
        const newId = lastId + 1;  
        const [rows_user]:any[] = await connection.query(`
          insert into professional (id_professional, desc_professional, name_professional, email_professional, user_professional, password_professional) values
        (?, ?, ?, ?, ?, ?);`,[newId, descricao, nome, email, username, password]
          );
        connection.release();
        res.status(200).json({'id': newId})
      }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
      }
    }
  }catch(error){
    console.error(error)
    res.status(500).json({message:"Internal Server Error"});
  }
}


