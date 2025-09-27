
const jwt = require("jsonwebtoken")


const authenticateToken= async(req,res,next)=>{
     const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
  

       if (!token) return res.status(401).json({ error: "No token" });
       try{
      const user = jwt.verify(token , process.env.JWT_SECRET)
      req.user= user
      next()
       }catch(err){
  return res.status(403).json({ error: "Invalid token" });
       }
}

const authorization = async(req,res,next)=>{
  const token = req.cookies.token
const user = jwt.verify(token,process.env.JWT_SECRET)   
if(user) return

}

module.exports={
  authenticateToken,
  authorization
}