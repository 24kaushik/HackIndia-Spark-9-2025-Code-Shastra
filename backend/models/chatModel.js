// models/chatModel.js

import mongoose from "mongoose";
const { Schema } = mongoose;

// Define Chat Schema
const chatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  }

}, {
  timestamps: true // Optional: tracks creation and update of chat document
});

// Create and export the Chat model
const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
