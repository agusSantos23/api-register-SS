import { closeDB, connectDB } from "../config/db.js";

export async function insertDocument(data) {
    try{
        const { collection } = await connectDB()
        const result = await collection.insertOne(data)
        await closeDB()
        return result
    }catch(error){
        console.error('Error al insertar el documento:', error);
        throw new Error('Error al insertar el documento');
    }
}

export async function findDocument(query) {
    const { collection } = await connectDB();
    const documento = await collection.findOne(query);
    await closeDB();
    return documento;
}
  
export async function findDocuments(query) {
    const { collection } = await connectDB();
    const documentos = await collection.find(query).toArray();
    await closeDB();
    return documentos;
}
  
export async function updateDocument(filter, update) {
    const { collection } = await connectDB();
    const result = await collection.updateOne(filter, update);
    await closeDB();
    return result;
}
  
export async function deleteDocument(filter) {
    const { collection } = await connectDB();
    const result = await collection.deleteOne(filter);
    await closeDB();
    return result;
}