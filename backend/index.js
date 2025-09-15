const express = require("express"); // ✅
const mongoose = require("mongoose")
const app = express()
const Todo = require("./schema")
const cors = require("cors");
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("✅ Database connected");
});

app.use(express.json())
app.get("/sahul",(req,res)=>{
    res.send("sahul")
})
app.get("/api",async(req,res)=>{
 try{
 
  let todo = await Todo.find()
  res.json(todo)

 }catch(e){
  console.log(e , "error")
 }

})


app.post("/api/addTask", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    
    res.status(201).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/api/task/:id",async (req,res)=> {
     try{
       
      const updatedTodo =await  Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
         { new: true, runValidators: true }

      )
      if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json(updatedTodo);
     }catch(e){
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
     }
})

app.delete("/api/task/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted", todo: deleted });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(3000,()=>{
    console.log("app is running now .......")
})