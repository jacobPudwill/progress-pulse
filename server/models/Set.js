const { Schema, model } = require('mongoose');

const setSchema = new Schema({
  reps: {
    type: Number
  },
  weight: {
    type: Number
  }
});

const Set = model('Set', setSchema);

module.exports = Set;
