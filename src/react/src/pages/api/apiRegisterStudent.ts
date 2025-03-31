import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../components/db";

export default async function RegisterStudent(req: NextApiRequest, res: NextApiResponse){
  const {idReq} = req.query;
    // legenda IdReq POST: 1 = POST nome, 2 = POST idade, 3 POST diagnostico, 4 POST user e senha
    if (idReq == "1"){
      const {nome} = req.query;
      try{
        const connection = await pool.getConnection();
        const [result]:any[] = await connection.query("SELECT MAX(id_student) AS lastId FROM student");
        const lastId = (result)[0].lastId || 0;
        const newId = lastId + 1;  
        const [rows_user]:any[] = await connection.query(`
          INSERT INTO student (id_student, name_student) VALUES
            (?, ?);`,[newId, nome]
          );
        connection.release();
        res.status(200).json({id_student: newId});
      }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
      }
    }
    if (idReq == "2"){
      const {id, idade} = req.query;
      try{
        const connection = await pool.getConnection();
        const [rows_user]:any[] = await connection.query(`
          UPDATE student SET age_student = ? WHERE id_student = ?;`,[idade, id]
          );
        connection.release();
        res.status(200).json({idUser: id})
      }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
      }
    }
    if (idReq == "3"){
      const {id, diagnostico} = req.query;
      try{
        const connection = await pool.getConnection();
        const [rows_user]:any[] = await connection.query(`
          UPDATE student SET diagnostic_student = ? WHERE id_student = ?;`,[diagnostico, id]
          );
        connection.release();
        res.status(200).json({message:"ok"})
      }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
      }
    }
    if (idReq == "4"){
      const {id, user, password} = req.query;
      try{
        const connection = await pool.getConnection();
        const [rowsUser]:any[] = await connection.query(`
          SELECT * FROM student WHERE user_student = ?;
            `,[user]
          );
        connection.release();
        if (Array.isArray(rowsUser) && rowsUser.length > 0) {
          res.status(400).json({message: "Bad Request"});
        }else{
          try{
            const [rows_user]:any[] = await connection.query(`
              UPDATE student SET user_student = ?, password_student = ? WHERE id_student = ?;`,[user, password, id]
              );
            connection.release();
            res.status(200).json({message:"ok"})
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
}