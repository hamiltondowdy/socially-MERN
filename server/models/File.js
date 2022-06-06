const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const FileSchema = new Schema(
    {
        fileUpload: {
          type: String,
          filename: String
        }
      }
    );


module.exports = mongoose.model('File', FileSchema);