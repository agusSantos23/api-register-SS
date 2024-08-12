import { v4 as uuidv4 } from 'uuid';

import { hashPassword } from "../lib/bcryptHash.js";
import { loginUser, updatePicture, updateProfile, findUser } from "../models/model.js";
import { createdAccessToken } from "../lib/jwt.js";


export const picture = async (req, res) =>{

  const { email, pictureNumber } = req.body

  try {
    
    const result = await updatePicture(email,pictureNumber)

    
    if (result.changedRows === 1) {
      res.status(200).json({ message: "Nuevo logo aplicado"});
    } else {
      res.status(200).json({ message: 'No se realizó ningún cambio' });
    }

  } catch (error) {
    throw new error(error.message)
  }
}


export const profile = async (req, res) =>{

  const { emailUser, dataUser } = req.body

  const {email, username, password} = dataUser
  
  
  try {

    let passwordHashed
    let user

    if (password) {
      passwordHashed = await hashPassword(password)
    }
    
    if (email) {
      const userExists = await findUser(email)
      if(userExists) return res.status(409).json({message: ["The email is already in use"]})
    }
    
    const result = await updateProfile(emailUser ,email, username, passwordHashed)
    
    if(result){

      let response = {}

      if (result.resultEmail){
        if(result.resultEmail.changedRows === 1){
          response.resultEmail = true
        }else{
          response.resultEmail = false
        }
      }
  
      if (result.resultUsername){
        if(result.resultUsername.changedRows === 1){
          response.resultUsername = true
        }else{
          response.resultUsername = false
        }
      }
  
      if (result.resultPassword){
        if(result.resultPassword.changedRows === 1){
          response.resultPassword = true
        }else{
          response.resultPassword = false
        }
      }
      
      
      if (result.resultEmail) {
        user = await loginUser(email)
      }else{
        
        user = await loginUser(emailUser)
      }
      
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
    
      
      res.status(200).json(response)
      
    }else{

      res.status(500).json({message: ["Error response update profile"]})
    }
    
    
  
  } catch (error) {
    throw new error(error.message)
    
  }
  
  
}