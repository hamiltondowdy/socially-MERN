const { Schema, model } = require('mongoose');


const photoSchema = new Schema(
  {
    photo: {
      type: String
    }
}
);



const Photo = model('Photo', photoSchema);

module.exports = Photo;