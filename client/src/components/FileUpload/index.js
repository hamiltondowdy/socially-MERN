import React, { Component } from 'react';
export default class FileUpload extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form>
                        <h3>Profile Picture Upload</h3>
                        <div className="form-group">
                            <input type="file" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
<<<<<<< HEAD
}
=======
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
>>>>>>> ae24bbf1121b4352fc717039c54d8b051dce3a93
