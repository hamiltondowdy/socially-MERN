import React from "react";

const Pic = ({ photo }) => {
    if (!photo) {
      return <h3>Pic</h3>;
    }
  
    return (
      <div>
        <h3>{photo._id}</h3>
        
              </div>
    
    );
  };
  
  export default Pic;
  