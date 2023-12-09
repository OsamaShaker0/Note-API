const mongoose = require('mongoose');
const User = require('./User')
const NoteSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, 'please provide header to your note'],
      minlength: 4,
    },
    content: {
      type: String,
      required: [true, 'please provide content to your note'],
      minlength: 4,
      maxlength: 1000,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema); 

