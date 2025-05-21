import type { NextApiRequest, NextApiResponse } from "next";
import pool from '../../../components/db';

export default async function Login(req: NextApiRequest, res: NextApiResponse){
    const { action, idStudent, idLevel, date } = req.query;
    if(req.method === "GET"){
        if(action === "getProgressStamp"){
            try{
                const connection = await pool.getConnection();
                const [progress]:any[] = await connection.query(`
                    SELECT 
                        p.prog_id AS progressId,
                        prog_stu_id AS studentId,
                        ps.progSta_sta_id AS stampId,
                        sta.sta_photo AS stampPhoto,
                        ani.ani_name AS aniName
                    FROM 
                        progress p
                    LEFT JOIN 
                        progress_stamp ps
                    ON 
                        ps.progSta_prog_id = p.prog_id
                    LEFT JOIN
                        stamp sta
                    ON
                        sta.sta_id = ps.progSta_sta_id
                    LEFT JOIN
                        progress_animal progAni
                    ON
                        progAni.progAni_prog_id = p.prog_id
                    LEFT JOIN
                        animal ani
                    ON
                        ani.ani_id = progAni.progAni_ani_id
                    WHERE prog_stu_id = ?;
                `,[idStudent]
                );
                connection.release();
                if (Array.isArray(progress) && progress.length > 0) {
                const level = progress
                return res.status(200).json(level)
                }else{
                return res.status(401).json({message:"Unauthorized"})
                }
            }catch(error){
                console.error("Erro na API de login:", error);
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }else if(req.method === "POST"){
        if(action === "savePogressStudent"){
            try{
                
                const connection = await pool.getConnection();

                const [result]:any[] = await connection.query("SELECT MAX(prog_id) AS lastId FROM progress");
                const lastId = (result)[0].lastId || 0;
                const newId = lastId + 1; 

                const [progress]:any[] = await connection.query(`
                    INSERT INTO progress (prog_id, prog_stu_id, prog_lev_id, prog_date) VALUES (?, ?, ?, ?);
                `,[newId, idStudent, idLevel, date]
                );

                const [progress_animal]:any[] = await connection.query(`
                    INSERT INTO progress_animal (progAni_id, progAni_prog_id, progAni_ani_id, progAni_date) VALUES (?, ?, ?, ?);
                `,[ newId, newId, newId, date]
                );

                const [progress_stamp]:any[] = await connection.query(`
                    INSERT INTO progress_stamp (progSta_id, progSta_prog_id, progSta_sta_id, progSta_date) VALUES (?, ?, ?, ?);
                `,[ newId, newId, newId, date]
                );

                connection.release();
                res.status(200).json("Ok")
            }catch(error){
                console.error("Erro na API de login:", error);
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    } else{
        return res.status(405).json({ message: "Method unauthorized" });
    }
}
