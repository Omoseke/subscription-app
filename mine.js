import express from "express";

const app = express();

app.get("v1/auth", (req, res) =>{
    res.send("Server is up")
})

app.listen(3000, ()=>{
    console.log("Server is up yippie")
})

export default app;