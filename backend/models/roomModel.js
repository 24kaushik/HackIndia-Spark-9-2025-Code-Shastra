// models/roomModel.js

import mongoose from "mongoose";
const { Schema } = mongoose;

// Define Room Schema
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  participant: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  chatHistory: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the model
const Room = mongoose.model('Room', roomSchema);

export default Room;
