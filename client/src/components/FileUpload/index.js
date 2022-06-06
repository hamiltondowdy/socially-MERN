import React, { useState } from "react";
import ReactDOM from "react-dom";
// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

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
  const [files] = useState([
    {
      source: "https://picsum.photos/200/300",
      options: { type: "local" }
    }
  ]);

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