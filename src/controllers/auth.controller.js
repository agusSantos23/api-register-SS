import { v4 as uuidv4 } from 'uuid';

import { createUser, findUser, loginUser } from "../models/model.js";
import { hashPassword, verifyPassword } from "../lib/bcryptHash.js";
import { createdAccessToken } from "../lib/jwt.js";

export const register = async (req, res) => {
  const {username, email, password} = req.body

  try {

    const userExists = await findUser(email)
    if(userExists) return res.status(409).json({message: ["The email is already in use"]})

    const passwordHashed = await hashPassword(password)

    const result = await createUser(username, email, passwordHashed)
    
    if(result){
      const user = await loginUser(email)

      user.id = uuidv4({ random: [...user.id] });

      const token = await createdAccessToken({
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
        date: user.date,
        appVisted: user.app_visted
      })

      res.cookie('token',token)


      res.status(201).json({
        message: "User create"
      })
    }else{
      res.status(400).json({message: ['User no create']})
    }

  } catch (error) {
    
    res.status(500).json({ error: 'Error inserting the user' });

  }
}

export const login = async (req, res) => {
  const {email, password} = req.body

  try{
    const userExists = await findUser(email)
    if(!userExists) return res.status(400).json({message: ["Correo electronico no encontrado"]})

    const isMatch = await verifyPassword(password,userExists.password)
    if(!isMatch) return res.status(400).json({message: ["Contraseña incorrecta"]})

    const user = await loginUser(email)

    user.id = uuidv4({ random: [...user.id] });

    const token = await createdAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
      picture: user.picture,
      date: user.date,
      appVisted: user.app_visted
    })

    res.cookie('token',token)
    res.status(200).json({message: "User correct"})

  }catch (err){

    res.status(500).json({error:["Error login"]})
  }
}