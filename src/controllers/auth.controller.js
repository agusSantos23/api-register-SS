import { 
    insertDocument,
    findDocument,
    findDocuments,
    updateDocument,
    deleteDocument
} from "../models/model.js"; 

export async function register(req, res) {
    try {
      const result = await insertDocument(req.body);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Error al insertar el documento' });
    }
}