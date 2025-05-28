import React from "react";


const EditButton = ({ title, onClick }) => {
  return (
    <div   className="buttoninput-wrapper">

      <button className="edit-button-full" onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default EditButton;
