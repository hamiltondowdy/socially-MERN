import React, { useState } from 'react';




function ProfilePicture ({change, uploadedFileUrl}) {
  

 

return (
<div>
  {change ? (
    <div id='pic'>
<div
    title="Profile Picture" />
    </div>
  ) : (
    <div>
        <img src={uploadedFileUrl.uploadedFiles} id='pic'></img>
    </div>
  )

  }

  </div>

  )
}
  
  export default ProfilePicture;

 