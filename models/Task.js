const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  dueDate: Date
}, {
  timestamps: true
});

// Auto-increment `id` on save
TaskSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const lastTask = await this.constructor.findOne().sort('-id').exec();
  this.id = lastTask ? lastTask.id + 1 : 1;
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
