const express = require("express"); // ✅
const app = express()


app.get("/",(req,res)=>{
    res.send("sahul")
})

app.listen(3000)