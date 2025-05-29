import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdOutlineAddToPhotos } from "react-icons/md";

function CreateButton({ to = '/', label = 'Back' }) {
  const navigate = useNavigate();
 
   return (
     <button
       className="back-button"
       onClick={() => navigate(to)}
     >
       <MdOutlineAddToPhotos className="back-icon" />
       {label}
     </button>
   );
 };
export default CreateButton