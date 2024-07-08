import {connection} from "../config/db.js"
import { hashPassword, verifyPassword } from "../lib/bcryptHash.js";

export const createUser = async (userData) =>{
    const {username, mail, password} = userData

    try {
        const [row] = await connection.execute("SELECT mail FROM users WHERE mail = ?", [mail])
        if(row.length > 0) return false
            
        const [uuidResult] = await connection.execute('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        const passwordHashed = await hashPassword(password)

        const randomPicture = Math.floor(Math.random() * 5);
        
        const today = new Date()

        const app_visitadaSS = JSON.stringify({ register: true });

        await connection.execute(
            `INSERT INTO users (id, username, mail, password, picture, date, app_visitadas)
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
            [uuid, username, mail, passwordHashed, randomPicture, today, app_visitadaSS]
        );
          
        return true;     

    } catch (error) {
        console.error(error);
        throw error; 
    }
}

