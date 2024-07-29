import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export function createdAccessToken(payload){

    return new Promise((resolve,reject)=>{

        jwt.sign(payload,process.env.TOKEN_SECRET, 
            {
                expiresIn: "1d"
            },
            (err,token) =>{
                if(err) reject(err)

                resolve(token)
            }
        )
    })
}

export function verifyJWT(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          return reject(err);
        }
        resolve(user);
      });
    });
  }