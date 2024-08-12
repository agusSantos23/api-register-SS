import {connection} from "../config/db.js"


export const createUser = async (username, email, passwordHashed) =>{

    try { 
        const [uuidResult] = await connection.execute('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        const randomPicture = Math.floor(Math.random() * 4);
        
        const today = new Date()

        const app_visitadaSS = JSON.stringify(["Register"]);

        await connection.execute(
            `INSERT INTO users (id, username, email, password, picture, date, app_visted)
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
            [uuid, username, email, passwordHashed, randomPicture, today, app_visitadaSS]
        );
          
        const [row] = await connection.execute("SELECT id, username, email, picture, date, app_visted FROM users WHERE email = ?", [email])
        return row[0]
    } catch (error) {

        console.error(error);
        throw error; 
    }
}

export const loginUser = async email => {

    try {
        const [row] = await connection.execute("SELECT id, username, email, picture, date, app_visted FROM users WHERE email = ?", [email])
        console.log("Linea db:",row[0]);
        
        return row[0]

    } catch (err) {

        throw new Error("Error searching for user");
    }
}

export const findUser = async email => {
    
    try {
        const [row] = await connection.execute("SELECT password FROM users WHERE email = ?", [email])
        if(row.length > 0) return row[0]
        
    } catch (err) {
        console.log(err);
        
        throw new Error("Error searching for user")
    }
}

export const updatePicture = async (email, num) =>{

    try {

        const [result] = await connection.execute("UPDATE users SET picture = ? WHERE email = ?",[num, email])
        
        if (result.affectedRows === 0) throw new Error("No user found with the given email");
        
        return result

    } catch (error) {
        throw new Error("Error update picture")

    }
}

export const updateProfile = async (emailUser, email, username, passwordHashed) =>{

    try {
        let resultEmail, resultUsername, resultPassword

        if(username){
            [resultUsername] = await connection.execute("UPDATE users SET username = ? WHERE email = ?",[username, emailUser])
        }

        if(passwordHashed){
            [resultPassword] = await connection.execute("UPDATE users SET password = ? WHERE email = ?",[passwordHashed, emailUser])
        }
        
        if (email) {
            [resultEmail] = await connection.execute("UPDATE users SET email = ? WHERE email = ?",[email, emailUser])
        }
        
        

        return {resultEmail, resultUsername, resultPassword}

    } catch (error) {
        
        console.log(error);
        
    }
}