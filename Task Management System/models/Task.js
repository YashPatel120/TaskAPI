const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: { type: String, required: true },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  labels: [{ type: String }],
});

module.exports = mongoose.model('Task', taskSchema);
