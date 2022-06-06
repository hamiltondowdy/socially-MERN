import React, { useState } from "react";
import { useMutation } from '@apollo/client';

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";
import { FILE_UPLOAD } from '../../utils/mutations';
import { QUERY_FILE, QUERY_ME } from '../../utils/queries';
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function FileUpload() {
  const [files, setFiles] = useState([]);

  const [fileUpload, { error }] = useMutation(FILE_UPLOAD, {
    update(cache, { data: { fileUpload } }) {
  
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, files: [...me.files, fileUpload] } },
        });
      } catch (e) {
        console.warn("First thought insertion by user!")
      }
  
      // update thought array's cache
      const { files } = cache.readQuery({ query: QUERY_FILE });
      cache.writeQuery({
        query: QUERY_FILE,
        data: { files: [fileUpload, ...files] },
      });
    }
  });

  const handleFileUpload = async event => {
    event.preventDefault();
  
    try {
      // add thought to database
      await fileUpload({
        variables: { blob }
      });
  

    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className="App">
      <FilePond
        files={files}
        allowMultiple={false}
        server={{
          load: (source, load, error, progress, abort, headers) => {
            var myRequest = new Request(source);
            fetch(myRequest).then(function(response) {
              response.blob().then(function(myBlob) {
                load(myBlob);
              });
            });
          }
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
}

export default FileUpload;