//file : models/task.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  list: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  status: { type: String, enum: ['todo', 'done'], default: 'todo' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  due_date: { type: Schema.Types.Date},
  notes: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

