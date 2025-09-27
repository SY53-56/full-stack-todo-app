// schema.js
const mongoose = require("mongoose");

// 1️⃣ Create a schema using mongoose.Schema
const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description:{type:String,required:true},

});

// 2️⃣ Create a model from the schema
module.exports = mongoose.model("Todo", todoSchema);

// 3️⃣ Export the model

