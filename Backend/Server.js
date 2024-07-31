import express from 'express'
import cors from 'cors'
import { connectToDB } from './config/db.js';



//app config
const app = express();
const PORT = 4000;

// middleware
app.use(express.json())
app.use(cors())


// Db connection
connectToDB()

app.get('/', (req, res) => {
    res.send('Hello Backend')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


//mongodb+srv://arensin:arensin2002@cluster0.gwixf9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0