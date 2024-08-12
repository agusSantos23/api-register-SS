import { v4 as uuidv4 } from 'uuid';

import { createUser, findUser, loginUser } from "../models/model.js";
import { hashPassword, verifyPassword } from "../lib/bcryptHash.js";
import { createdAccessToken, verifyJWT } from "../lib/jwt.js";

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
        app_visted: user.app_visted
      })

      res.cookie('token',token)


      res.status(201).json(result)
    }else{
      res.status(400).json({message: ['User no create']})
    }

  } catch (error) {
    
    res.status(500).json({ error: 'Error inserting the user' });

  }
}

export const login = async (req, res) => {

  const { email, password } = req.body;

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
      app_visted: user.app_visted
    })

    res.cookie('token',token)
    res.status(200).json({message: "User correct"})

  }catch (err){

    res.status(500).json({error:["Error login"]})
  }
}

export const verifyToken = async (req, res) => {
  
  try {
    const {token} = req.cookies || {}

    if(!token) return res.status(401).json({message: "Unauthorized"})
  
    const user = await verifyJWT(token)
    
  
    const userFound = await loginUser(user.email)
  
    if(!userFound) return res.status(401).json({message: "Unauthorized"})

    userFound.id = uuidv4({ random: [...userFound.id] });
    
    

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      picture: userFound.picture,
      date: userFound.date,
      app_visted: userFound.app_visted
    })

  } catch (error) {
    
    res.status(401).json({message: "Error server, Unauthorized"})
  }
}