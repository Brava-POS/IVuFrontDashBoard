import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import aditional from '../assets/images/addtax.jpg'; 
import label from '../assets/images/label.png'; 
import PaginationComponent from './PaginationComponent';


const TableComponent = ({

  currentPage,
  totalPages,
  onPageChange,

  data,
  showCreateButton = true,
  createRoute = "/create-transaction-page",
  viewRoute = "/view-transaction-page",
  updateRoute = "/update-transaction-page",
  handleDelete = (id) => console.log(`Delete clicked for row with ID: ${id}`),
  columnNameOverrides = {},
  columnOrder = [],
}) => {

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="no-data-container">
        <div className="no-data-message">No Data Available.</div>
      </div>
    );
  }


  const allKeys = Object.keys(data[0]);


  const columnKeys = [
    ...columnOrder,
    ...allKeys.filter((key) => !columnOrder.includes(key))
  ];


  const getColumnLabel = (key) => {
    for (const [matchKey, label] of Object.entries(columnNameOverrides)) {
      if (key.includes(matchKey)) {
        return label;
      }
    }
    return key;
  };

  return (
    <div className="table-outer-container">
   
   <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />


      <div className="table-container">
   

     
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              {columnKeys.map((key, index) => (
                <th key={index}>{getColumnLabel(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <Link to={`${viewRoute}/${row.id}`} className="action-btn view">
                    View
                  </Link>
                  <Link to={`${updateRoute}/${row.id}`} className="action-btn update">
                    Update
                  </Link>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>

                {columnKeys.map((key, cellIndex) => (
                  <td key={cellIndex}>
                    {/* Check if the row data for this key is an array (like additionalAmounts) */}
                    {Array.isArray(row[key]) ? (
                   <ul>
                   {row[key].map((item, idx) => (
                     <li key={idx} className="showTransactionLi">
                       {/* Image before amount */}
                       <img src={aditional} alt="Amount Icon" />
                       <span>{item.amount}</span>
                       
                       {/* Image before type */}
                       <img src={label} alt="Type Icon" />
                       <span>{item.type}</span>
                     </li>
                   ))}
                 </ul>
                    ) : (
                      row[key]  // Display the value for non-array data
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;

























// import React from 'react';
// import { FaPlus } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const TableComponent = ({
//   data,
//   showCreateButton = true,
//   createRoute = "/create-transaction-page",
//   viewRoute = "/view-transaction-page",
//   updateRoute = "/update-transaction-page",
//   handleDelete = (id) => console.log(`Delete clicked for row with ID: ${id}`),
//   columnNameOverrides = {},
//   columnOrder = [],
// }) => {

//   if (!Array.isArray(data) || data.length === 0) {
//     return (
//       <div className="no-data-container">
//         <div className="no-data-message">No Data Available.</div>
//       </div>
//     );
//   }




//   const allKeys = Object.keys(data[0]);

//   const columnKeys = [
//     ...columnOrder,
//     ...allKeys.filter((key) => !columnOrder.includes(key))
//   ];

//   const getColumnLabel = (key) => {
//     for (const [matchKey, label] of Object.entries(columnNameOverrides)) {
//       if (key.includes(matchKey)) {
//         return label;
//       }
//     }
//     return key;
//   };


//   return (
//     <div className="table-outer-container">
//       {showCreateButton && (
//         <div className="table-controls">
//           <Link to={createRoute} className="create-btn">
//             <span className="plus-icon">
//               <FaPlus />
//             </span>
//             Create New
//           </Link>
//         </div>
//       )}

//       <div className="table-container">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th></th>
//               {columnKeys.map((key, index) => (
//                 <th key={index}>{getColumnLabel(key)}</th>



//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 <td>
//                   <Link to={`${viewRoute}/${row.id}`} className="action-btn view">
//                     View
//                   </Link>
//                   <Link to={`${updateRoute}/${row.id}`} className="action-btn update">
//                     Update
//                   </Link>
//                   <button
//                     className="action-btn delete"
//                     onClick={() => handleDelete(row.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//                 {columnKeys.map((key, cellIndex) => (
//                   <td key={cellIndex}>{row[key]}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;


















