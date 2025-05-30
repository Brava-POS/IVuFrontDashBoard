import React from 'react';
import { MdOutlineAddToPhotos } from "react-icons/md";
import {   MdSearch,MdEdit, MdDelete, MdVisibility, MdUpdate, MdOutlineAddToPhotos as MdCreate } from "react-icons/md";

function ButtonCustomizedAction({ onClick, label = 'Click Me', action }) {
  const renderIcon = () => {
    switch (action) {
      case 'edit':
        return <MdEdit className="back-icon" />;
      case 'delete':
        return <MdDelete className="back-icon" />;
      case 'view':
        return <MdVisibility className="back-icon" />;
      case 'update':
        return <MdUpdate className="back-icon" />;
      case 'create':
        return <MdCreate className="back-icon" />;
         case 'search': 
        return <MdSearch className="back-icon" />;
      default:
        return <MdOutlineAddToPhotos className="back-icon" />;
    }
  };

  return (
    <button className="back-button" onClick={onClick}>
      {renderIcon()}
      {label}
    </button>
  );
}

export default ButtonCustomizedAction;
