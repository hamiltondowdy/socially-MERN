const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const FileSchema = new Schema(
    {
        fileUpload: {
          type: Buffer
        },
        fileUploadType: {
          type: String
        }
      }
    );


module.exports = mongoose.model('File', FileSchema);