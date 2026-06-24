const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
  category: Joi.string().valid('work', 'personal', 'study', 'health'),
  dueDate: Joi.date()
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = validateTask;