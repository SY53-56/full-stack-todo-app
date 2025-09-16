const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true,  },
  email:{type:String,required:true,unique: true},
  passwordHash: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('User', userSchema);
