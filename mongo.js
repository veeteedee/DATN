const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://votandat2301:9QZxKXzy80z1cLjI@datn.rkyqb7f.mongodb.net/DoAnTotNghiep2023")
.then(()=>{
  console.log("connected");
})
.catch(()=>{
  console.log("failed");
})

const newSchema = new mongoose.Schema({
  setpoint:{
    type: Number,
    required: true
  },

  kp:{
    type: Number,
    required: true
  },

  td:{
    type: Number,
    required: true
  },

  ti:{
    type: Number,
    required: true
  },
},{ versionKey: false })

const collection = mongoose.model("test",newSchema)

module.exports = collection