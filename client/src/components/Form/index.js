import React  from 'react';
import { DropzoneArea } from "material-ui-dropzone";
import request from "superagent";


const CLOUDINARY_UPLOAD_PRESET = "md44gre5";
  const CLOUDINARY_UPLOAD_URL =
    "https://api.cloudinary.com/v1_1/dwgyjbl9i/image/upload";
  
  const Form = ({
    formData,
    setFormData,
    setChange,
    setUploadedFileUrl,
    uploadedFileUrl
  }) => {
 

    const onSubmit = e => {
      e.preventDefault();
      setChange(false);
      setUploadedFileUrl({ uploadedFiles: e[0] });
      console.log(uploadedFileUrl.uploadedFiles);
      handleImageUpload(uploadedFileUrl.uploadedFiles);
    };
    /*
  handleChange changes the state of our formData state. It takes the value from the event
  and uses a spread operator to update the state of nested objects.
  It takes the name of the objects and spreads them through the state array.
  */
    const handleChange = e => {
      const value = e.target.value;
      setFormData({ ...formData, [e.target.name]: value });
    };
    /*
  According to the react-dropzone documentation, it will always return
  an array of the uploaded files. We pass that array to the files
  parameter of the onImageDrop function. Since we are only allowing one
  image at a time we know that the image will always be in the first
  position of the array ([0]).
  */
    const onImageDrop = e => {
      setUploadedFileUrl({ uploadedFiles: e[0] });
    };
    /*
  Here we harness the power of superagent request to upload the image to Cloudinary.
  */
    const handleImageUpload = file => {
      let upload = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", file);
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
        if (response.body.secure_url !== "") {
          setUploadedFileUrl({
            uploadedFiles: response.body.secure_url
          });
        }
      });
      console.log(uploadedFileUrl.uploadedFiles);
    };
  
    return (
      <form onSubmit={onSubmit}>
        <div container direction="column" justify="center" alignItems="center" id='formy'>
          <h2 className="addImage">Add Profile Picture</h2>
          <DropzoneArea
          showFileNamesInPreview={true}
          maxFileSize={10000000}
          multiple="false"
          accept="image/*"
          minHeight={100}
          onDrop={console.log}
          dropzoneText="Drag or Click to Add"
          type="file"
          onChange={onImageDrop}
        ></DropzoneArea>
          
         
          <button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Save
          </button>
        </div>
      </form>
    );
  };
  export default Form;