const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: Number,
      default: 0,
    },
    due_date: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;