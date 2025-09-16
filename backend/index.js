const express = require("express"); // ✅
const mongoose = require("mongoose")
const app = express()
const Todo = require("./schema")
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User= require("./users")
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("✅ Database connected");
});



app.use(express.json())
app.get("/sahul",(req,res)=>{
    res.send("sahul")
})

function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

app.post("/singup",async(req,res)=>{
  const {username,email,password} = req.body
   if (!username || !password || !email)
    return res.status(400).json({ error: 'Username , email and password are required' });
const existingUser = await User.findOne({email})
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
    // Create new user
  const newUser = new User({ username , email, passwordHash });
  await newUser.save()
  // Generate token
  const token = generateToken(newUser);

  res.status(201).json({ message: 'Signup successful', token });
})

app.post("/login",async(req,res)=>{
  const {email, password} = req.body
    if (!email|| !password)
    return res.status(400).json({ error: 'Username and password are required' });

  const emailExisting = await User.findOne({email})
  if(!emailExisting)return res.status(400).json({error:"email is not match"})


    const isMatch = await bcrypt.compare(password,emailExisting.passwordHash)
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
      let token = generateToken(emailExisting)
      res.status(202).json({message:"login successfully", token})
})


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}



app.get("/api", authenticateToken,async(req,res)=>{
 try{
 
  let todo = await Todo.find({userId:req.user.id})
  res.json(todo)

 }catch(e){
  console.log(e , "error")
 }

})

app.post("/api/addTask",authenticateToken, async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    
    res.status(201).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/api/task/:id",authenticateToken,async (req,res)=> {
     try{
       
      const updatedTodo =await  Todo.findByIdAndUpdate(
       {_id: req.params.id, userId:req.user.id},
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
    const deleted = await Todo.findByIdAndDelete({_id:req.params.id , userId:req.user.id});
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted", todo: deleted });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(3000,()=>{
    console.log("app is running now .......")
})