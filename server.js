import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app=express();
app.use(express.json());
app.use(cors());
const db=mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"",
     database:"NODE1"
})
db.connect((err)=>{
   if(err) { 
     console.log("Failed",err);
     return

   }
   else{
   console.log("connected")
   return;
}
})
app.get("/",(req,res)=>{
     const sql= "SELECT * FROM users";
     db.query(sql,(err,data)=>{
          if(err) return res.status(500).json({Message:"Failed"});
          return res.status(200).json(data);
     })
})
app.post("/users",(req,res)=>{
     const {username,Password} =req.body;
     const sql="INSERT INTO users(username,Password) VALUES(?,?)";
    db.query(sql,[username,Password],(err,data)=>{
     if(err) return res.status(500).json("Failed");
     return res.status(200).json(data);
    })
})

app.listen(5000,()=>{
     console.log("My App is running on http://localhost:5000")
})