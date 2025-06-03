import React from 'react';
import { MdOutlineAddToPhotos } from "react-icons/md";
import {   MdSearch,MdEdit, MdDelete, MdVisibility, MdUpdate, MdOutlineAddToPhotos as MdCreate } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";
import { CgUnblock } from "react-icons/cg";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { CiUnlock } from "react-icons/ci";
import { FcExpired } from "react-icons/fc";
import { FaUser, FaUserShield } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";




function ButtonCustomizedAction({ onClick, label = 'Click Me', action ,disabled = false}) {
  const renderIcon = () => {
    switch (action) {

        case 'back':
        return <IoMdArrowRoundBack  className="back-icon" />;
        case 'unblock':
        return <CgUnblock  className="back-icon" />;
         case 'activate':
        return <VscActivateBreakpoints  className="back-icon" />;
        case 'unlock':
        return <CiUnlock   className="back-icon" />;
        case 'expire':
        return <FcExpired className="back-icon" />;
        case 'refresh':
        return <FiRefreshCw  className="back-icon" />;
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
              case 'guest': return <FaUser className="back-icon" />;        
      case 'admin': return <FaUserShield className="back-icon" />;  
      default:
        return <MdOutlineAddToPhotos className="back-icon" />;
    }
  };

  return (
    <button className="back-button" onClick={onClick}  disabled={disabled} >
      {renderIcon()}
      {label}
    </button>
  );
}

export default ButtonCustomizedAction;

































// import React from 'react';
// import {
//   MdOutlineAddToPhotos,
//   MdSearch,
//   MdEdit,
//   MdDelete,
//   MdVisibility,
//   MdUpdate,
//   MdOutlineAddToPhotos as MdCreate
// } from "react-icons/md";
// import { FiRefreshCw } from "react-icons/fi";
// import { CgUnblock } from "react-icons/cg";
// import { VscActivateBreakpoints } from "react-icons/vsc";
// import { CiUnlock } from "react-icons/ci";
// import { FcExpired } from "react-icons/fc";

// function ButtonCustomizedAction({ onClick, label = 'Click Me', action }) {
//   const renderIcon = () => {
//     switch (action) {
//       case 'unblock':
//         return <CgUnblock className="back-icon" />;
//       case 'activate':
//         return <VscActivateBreakpoints className="back-icon" />;
//       case 'unlock':
//         return <CiUnlock className="back-icon" />;
//       case 'expire':
//         return <FcExpired className="back-icon" />;
//       case 'refresh':
//         return <FiRefreshCw className="back-icon" />;
//       case 'edit':
//         return <MdEdit className="back-icon" />;
//       case 'delete':
//         return <MdDelete className="back-icon" />;
//       case 'view':
//         return <MdVisibility className="back-icon" />;
//       case 'update':
//         return <MdUpdate className="back-icon" />;
//       case 'create':
//         return <MdCreate className="back-icon" />;
//       case 'search':
//         return <MdSearch className="back-icon" />;
//       default:
//         return <MdOutlineAddToPhotos className="back-icon" />;
//     }
//   };

//   return (
//     <button className="back-button" onClick={onClick}>
//       {renderIcon()}
//       {label}
//     </button>
//   );
// }

// export default ButtonCustomizedAction;

























































