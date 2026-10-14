import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config(); // to load environment variables in numerous files 

const app = express();

connectDB()

app.get("/", (req, res) => {
        console.log("Believe us we will not let your server down");
        res.send("Believe us we will not let your server down")
})

app.listen(8000, () => {
       console.log("Server is running at port: 8000");
       
})

