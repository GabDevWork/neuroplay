import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../components/db";

export default async function RegisterStudent(req: NextApiRequest, res: NextApiResponse){
  const {idReq} = req.query;
    // legenda IdReq POST: 1 = POST nome, 2 = POST idade, 3 = POST diagnostico, 4 = POST user e senha, 5 = POST criança vinculada a um profissional
    if (idReq == "1"){
      const {nome} = req.query;
      try{
        const connection = await pool.getConnection();
        const [result]:any[] = await connection.query("SELECT MAX(stu_id) AS lastId FROM student");
        const lastId = (result)[0].lastId || 0;
        const newId = lastId + 1;  
        const [rows_user]:any[] = await connection.query(`
          INSERT INTO student (stu_id, stu_name) VALUES
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
          UPDATE student SET stu_age = ? WHERE stu_id = ?;`,[idade, id]
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
          UPDATE student SET stu_diagnostic = ? WHERE stu_id = ?;`,[diagnostico, id]
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
          SELECT prof_user AS username FROM professional 
          WHERE prof_user = ?
          UNION
          SELECT stu_user AS username FROM student
          WHERE stu_user = ?;
          `,[user, user]
        );
        connection.release();
        if (Array.isArray(rowsUser) && rowsUser.length > 0) {
          res.status(400).json({message: "Bad Request"});
        }else{
          try{
            const [rows_user]:any[] = await connection.query(`
              UPDATE student SET stu_user = ?, stu_password = ? WHERE stu_id = ?;`,[user, password, id]
            );
            connection.release();
            if (rows_user.serverStatus === 2){
              const connection = await pool.getConnection();
              const [resultID_progress]:any[] = await connection.query("SELECT MAX(prog_id) AS lastId FROM progress");
              const lastId = (resultID_progress)[0].lastId || 0;
              const newIdProgress = lastId + 1; 
              const [resultID_levels]:any[] = await connection.query('SELECT MIN(lev_id) AS firstId FROM levels;');
              const firtsID = (resultID_levels)[0].firstId || 0;
              const [rows_progress]:any[] = await connection.query(`
                INSERT INTO progress (prog_id, prog_stu_id, prog_lev_id) VALUES (?, ?, ?)`,[newIdProgress, id, firtsID]
              );
              connection.release();
            }
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
    if (idReq == "5"){
      const {idProfessional, nameChild, ageChild, diagnosticChild, userChild, passwordChild} = req.query;
      try{
        const connection = await pool.getConnection();
        const [rowsUser]:any[] = await connection.query(`
          SELECT prof_user AS username FROM professional 
          WHERE prof_user = ?
          UNION
          SELECT stu_user AS username FROM student
          WHERE stu_user = ?;
          `,[userChild, userChild]
        )
        if (Array.isArray(rowsUser) && rowsUser.length > 0) {
          res.status(400).json({message: "Bad Request"});
        }else{
          const connection = await pool.getConnection();
          const [result]:any[] = await connection.query("SELECT MAX(stu_id) AS lastId FROM student");
          const lastId = (result)[0].lastId || 0;
          const newId = lastId + 1;  
          const [rows_user]:any[] = await connection.query(`
            INSERT INTO student (stu_id, stu_name, stu_age, stu_diagnostic, stu_user, stu_password, stu_prof_id) VALUES
              (?, ?, ?, ?, ?, ?, ?);`,[newId, nameChild, ageChild, diagnosticChild, userChild, passwordChild, idProfessional]
          );
          if (rows_user.serverStatus === 2){
            const connection = await pool.getConnection();
            const [resultID_progress]:any[] = await connection.query("SELECT MAX(prog_id) AS lastId FROM progress");
            const lastId = (resultID_progress)[0].lastId || 0;
            const newIdProgress = lastId + 1; 
            const [resultID_levels]:any[] = await connection.query('SELECT MIN(lev_id) AS firstId FROM levels;');
            const firtsID = (resultID_levels)[0].firstId || 0;
            const [rows_progress]:any[] = await connection.query(`
              INSERT INTO progress (prog_id, prog_stu_id, prog_lev_id) VALUES (?, ?, ?)`,[newIdProgress, newId, firtsID]
            );
          }else{
          res.status(400).json({message: "Bad Request"});
          }
        }
        connection.release();
        res.status(200).json({message: "Ok"});
      }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
      }
    }
}