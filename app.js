const express=require("express")
const cors=require("cors")
const collection=require("./mongo")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
  const {kp}=req.body
  const {td}=req.body
  const {setpoint}=req.body
  const {ti}=req.body

  const data = {
    setpoint:setpoint,
    kp:kp,
    td:td,
    ti:ti
  }

  await collection.insertMany([data])

})

app.listen(3000,()=>{
  console.log("port connected")
})