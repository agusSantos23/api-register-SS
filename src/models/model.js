import {connection} from "../config/db.js"


export const createUser = async (username, email, passwordHashed) =>{

    try { 
        const [uuidResult] = await connection.execute('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        const randomPicture = Math.floor(Math.random() * 5);
        
        const today = new Date()

        const app_visitadaSS = JSON.stringify({ register: true });

        await connection.execute(
            `INSERT INTO users (id, username, email, password, picture, date, app_visted)
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
            [uuid, username, email, passwordHashed, randomPicture, today, app_visitadaSS]
        );
          
        return true;     
    } catch (error) {

        console.error(error);
        throw error; 
    }
}

export const loginUser = async email => {

    try {
        const [row] = await connection.execute("SELECT id, username, email, picture, date, app_visted FROM users WHERE email = ?", [email])
        return row[0]

    } catch (err) {

        console.error("Error searching for user:", err);
        throw new Error("Error searching for user");
    }
}


export const findUser = async email => {
    
    try {
        const [row] = await connection.execute("SELECT password FROM users WHERE email = ?", [email])
        if(row.length > 0) return row[0]
        
    } catch (err) {
        throw new Error("Error searching for user")
    }
}

export const findUserId = async email => {
    try {
        const [row] = await connection.execute("SELECT id FROM users WHERE email = ?", [email])
        if(row.length > 0) return row[0]
    } catch (error) {
        console.log(error);
        throw new Error("Error searching for user")
    }

}


