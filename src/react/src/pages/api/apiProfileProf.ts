import type { NextApiRequest, NextApiResponse } from "next";
import pool from '../../../components/db';

export default async function ApiProfile(req: NextApiRequest, res: NextApiResponse){
    const { action, idProfessional, userProfissional, emailProfissional, passwordProfessional } = req.query;
    if(req.method === "GET"){
        if(action === "getDataProfessional"){
            try{
                const connection = await pool.getConnection();
                const [data]:any[] = await connection.query(`
                    SELECT * FROM professional WHERE prof_id = ?;
                `,[idProfessional]
                );

                connection.release();
                if (Array.isArray(data) && data.length > 0) {
                    const response = data[0]
                    return res.status(200).json(response);
                }else{
                    return res.status(401).json({message:"Unauthorized"})
                }
            }catch(error){
                console.error("Erro na API de login:", error);
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }else if (req.method === "POST"){
        if(action === "saveDataProfessional"){
            try{
                const connection = await pool.getConnection();
                const [data]:any[] = await connection.query(`
                    UPDATE professional SET 
                    prof_email = ?,
                    prof_user = ?,
                    prof_password = ?
                    WHERE prof_id = ?;
                `,[emailProfissional, userProfissional, passwordProfessional, idProfessional]
                );

                connection.release();
                return res.status(200).json("Ok");
            }catch(error){
                console.error("Erro na API de login:", error);
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }else{
        return res.status(405).json({ message: "Method unauthorized" });
    }
}
