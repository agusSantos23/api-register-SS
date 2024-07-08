import dotenv from 'dotenv'

import app from "./app.js"


dotenv.config()

const port = process.env.PORT


app.listen(port, () => {

    console.log(`El servidor se levanto en el puerto http://localhost:${port}`)

})