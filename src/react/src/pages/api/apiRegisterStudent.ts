import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../components/db";

export default async function RegisterStudent(req: NextApiRequest, res: NextApiResponse){
    const {idReq, nome, idade, diagnostico, username, password} = req.query;
    let userID = "";
    // legenda IdReq POST: 1 = POST nome, 2 = POST idade, 3 POST diagnostico, 4 POST user e senha
    if (idReq == "1"){
        try{
            const connection = await pool.getConnection();
            const [result]:any[] = await connection.query("SELECT MAX(id_student) AS lastId FROM student");
            const lastId = (result)[0].lastId || 0;
            const newId = lastId + 1;  
            const [rows_user]:any[] = await connection.query(`
              insert into student (id_student, name_student) values
                (?, ?);`,[newId, nome]
              );
            connection.release();
            userID = newId;
            res.status(200).json({message:"ok"})
          }catch(error){
            console.error(error)
            res.status(500).json({message:"Internal Server Error"});
          }
    }else if (idReq == "2"){
        try{
            const connection = await pool.getConnection();
             
            const [rows_user]:any[] = await connection.query(`
              insert into student (id_student, name_student) values
                (?, ?);`,[userID, nome]
              );
            connection.release();
            res.status(200).json({message:"ok"})
          }catch(error){
            console.error(error)
            res.status(500).json({message:"Internal Server Error"});
          }
    }else if (idReq == "3"){
        
    }else if (idReq == "4"){
        
    }
}