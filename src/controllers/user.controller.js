import { updatePicture } from "../models/model.js";



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
    
    console.log(error);
  }




}