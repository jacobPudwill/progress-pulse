const { Schema, model } = require('mongoose');
const Exercise = require('./Exercise');

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  exercises: [Exercise.schema]
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;
