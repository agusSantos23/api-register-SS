import { createUser } from "../models/model.js";

export const register = async (req, res) => {

  try {
    const result = await createUser(req.body)
    
    if(result){
      res.status(201).json({message: 'User create'})
    }else{
      res.status(400).json({message: 'User no create, repeated email'})
    }

  } catch (error) {
    
    console.error('Error inserting the user:', error);
    res.status(500).json({ error: 'Error inserting the user' });

  }
}