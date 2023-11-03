const { Schema, model } = require('mongoose');
const Set = require('./Set');

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sets: [Set.schema]
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
