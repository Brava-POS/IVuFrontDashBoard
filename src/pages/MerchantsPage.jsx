import React, { useState, useEffect } from "react";
import TableComponent from "../components/TableComponent";
import { useAuth } from "../context/AuthContext";
import MainAppSpinner from "../components/MainAppSpinner";
import { showAlert } from "../components/SweetAlertComponent";
import CreateButton from "../components/CreateButton";
import ButtonCustomizedAction from "../components/ButtonCustomizedAction";
import FilterCheckbox from "../components/FilterCheckbox";
import MainFilterInput from "../components/MainFilterInput";
import AppFlexBox from "../components/AppFlexBox";
import logo from '../assets/images/brava.png';
import  placeHolder  from '../assets/images/placeHolder.png';

const MerchantsPage = () => {
  const { loading, setLoading, axiosInstance } = useAuth();
  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);




const [filters, setFilters] = useState({
  isDeleted: false,
  isActive: null,
  isBlocked: null,
  merchantSerialCode: "",
  username: "",
  appUserId: "",
});

  const visibleColumns = [
    "appUserId",
    "id",
    "avatarUrl",
    "merchantSerialCode",
    "username",
    "active",
    "blocked",
    "deleted",
    "createdAt",
    "updatedAt",
  ];

  const columnOrder = [...visibleColumns];

  const columnNameOverrides = {
    id: "Merchant ID",
      appUserId :  "User ID",
    merchantSerialCode: "Serial Code",
      avatarUrl: "Avatar",
    username: "Username",
    active: "Active",
    blocked: "Blocked",
    deleted: "Deleted",
    createdAt: "Created At",
    updatedAt: "Updated At",
  };

  const customCellRenderers = {
     
              avatarUrl
              : (url) => (
                      <img
                        src={url ?url:placeHolder}
                        alt="User Avatar"
                        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                      />
                    ),
    active: (val) => (val ? "Yes" : "No"),
    blocked: (val) => (val ? "Yes" : "No"),
    deleted: (val) => (val ? "Yes" : "No"),
  };

  const fetchData = async (page = 0, filtersParam = null) => {
    setIsFetching(true);
    try {
      const activeFilters = filtersParam || filters;
      let url = `/merchants/search?page=${page}&size=10`;

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          url += `&${key}=${value}`;
        }
      });

      const response = await axiosInstance.get(url);
      const data = response.data;

      console.log("data",data)
      if (data?.content) {
        setDrData(data.content);
        setPageInfo({ pageNumber: data.number, totalPages: data.totalPages });
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setIsFetching(false);
      setInitialLoad(false);
    }
  };

  const handleApplyFilters = () => {
    fetchData(0);
  };

  const resetFilters = () => {
  const defaultFilters = {
  isDeleted: false,
  isActive: null,
  isBlocked: null,
  merchantSerialCode: "",
  username: "",
  appUserId: "",
};

    setFilters(defaultFilters);
    fetchData(0, defaultFilters);
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };




const deleteMercahnt = async (id) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(`/merchants/${id}`,  { delete: true});
    setLoading(false);

  console.log("res",  res);
     if ((res.status >= 200 && res.status < 300) && res.data && res.data.message === "Merchant soft-deleted successfully") {
      showAlert('success', 'Delete  Successfully');
     fetchData();
    } else {
      showAlert('error', 'SUpdated failed');
    }
  } catch (error) {
    setLoading(false);
     showAlert('error', 'SUpdated failed');
  }
};



const restoreDR = async (id) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(`/drs/update/${id}`, { delete: false });
    setLoading(false);

    if (res.status >= 200 && res.status < 300 && res.data?.updated === true) {
      showAlert('success', 'Restored Successfully');
      fetchData(); 
      showAlert('error', 'Restore failed');
    }
  } catch (error) {
    setLoading(false);
    showAlert('error', 'Restore failed');
  }finally{

    setLoading(false);


  }
};



 const unBlock = async (id) => {
      setLoading(true);
    try {
     
      const res = await axiosInstance.put(`/merchants/${id}`, { isBlocked:false});
      if (res.data?.message === 'Merchant updated successfully') {
        showAlert('success', 'Merchant Unblocked successfully');
         fetchData();
      } else {
        showAlert('error', 'Update failed');
      }
    } catch (err) {
      showAlert('error', err?.response?.data?.message || 'Update failed');
    } finally {
       setLoading(false);
    }
  };

 const activate = async (id) => {
      setLoading(true);
    try {

      const res = await axiosInstance.put(`/merchants/${id}`, { isActive:true});
      if (res.data?.message === 'Merchant updated successfully') {
        showAlert('success', 'Merchant Activated successfully');
         fetchData();
      } else {
        showAlert('error', 'Update failed');
      }
    } catch (err) {
      showAlert('error', err?.response?.data?.message || 'Update failed');
    } finally {
       setLoading(false);
    }
  };




  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      fetchData(0);
    }
  }, [filters]);

  if (loading || initialLoad) return <MainAppSpinner />;

  return (
    <>
      <div className="createdr-section-title-large">Merchants</div>

      <div className="createdr-section-title-start">Filter by:</div>
      <div className="createdr-section">
    




           <AppFlexBox justify="s">


<FilterCheckbox
  label="Active"
  checked={filters.isActive === true}
  onChange={(e) => {
    const isChecked = e.target.checked;
    setFilters((prev) => ({
      ...prev,
      isActive: isChecked ? true : null,
      isDeleted: false, // Always keep this false
    }));
  }}
/>


<FilterCheckbox
  label="Blocked"
  checked={filters.isBlocked === true}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      isBlocked: e.target.checked ? true : null,
    }))
  }
/>


          </AppFlexBox>
      
      </div>

      <div className="createdr-section-title-start">Search by:</div>
      <div className="createdr-section">
        <div className="createdr-row">
          <MainFilterInput
            label="Serial Code"
            value={filters.merchantSerialCode}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, merchantSerialCode: e.target.value }))
            }
          />
          <MainFilterInput
            label="User ID "
            value={filters.appUserId}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, appUserId: e.target.value }))
            }
          />
        </div>
      </div>

      <AppFlexBox justify="s">
        <ButtonCustomizedAction action="delete" label="Clear all Filters" onClick={resetFilters} />
        <ButtonCustomizedAction action="refresh" label="Refresh" onClick={handleApplyFilters} />
        <CreateButton to="/merhantcreate" label="Add New Merchant" />
      </AppFlexBox>

      {isFetching ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <MainAppSpinner />
        </div>
      ) : (
        <TableComponent
            visibleColumns={visibleColumns}
            columnOrder={columnOrder}
            columnNameOverrides={columnNameOverrides}
            customCellRenderers={customCellRenderers}
            currentPage={pageInfo.pageNumber}
            totalPages={pageInfo.totalPages}
            onPageChange={handlePageChange}
            data={drData}
            viewRoute="/merhantview"
            updateRoute="/merhantupdate"
            handleDelete={deleteMercahnt}    
            restoreDR={restoreDR}
              handleblock={unBlock}
              handleActive ={activate}
        />
      )}
    </>
  );
};

export default MerchantsPage;



























// import React, { useState, useEffect, useRef } from "react";
// import TableComponent from "../components/TableComponent";
// import { useAuth } from "../context/AuthContext";
// import MainAppSpinner from "../components/MainAppSpinner";
// import { FaSearch } from "react-icons/fa";
// import SelectedDurationDisplay from "../components/SelectedDurationDisplay";
// import MerchantDropdownSelector from "../components/MerchantDropdownSelector";
// import { useParams, useNavigate } from "react-router-dom";
// import { showAlert } from '../components/SweetAlertComponent';
// import CreateButton from "../components/CreateButton";
// import ButtonCustomizedAction from "../components/ButtonCustomizedAction";
// import FilterInput from "../components/FilterInput";
// import FilterCheckbox from "../components/FilterCheckbox";

// const MerchantsPage = () => {
//   const navigate = useNavigate();
//   const { loading,setLoading, axiosInstance, user, hasPermission } = useAuth();
//   const isAdmin = user?.role === "ROLE_ADMIN";

//   const [drData, setDrData] = useState([]);
//   const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
//   const [isFetching, setIsFetching] = useState(false);
//   const [initialLoad, setInitialLoad] = useState(true);

//   const [filters, setFilters] = useState({
//           deleted: false, 
//           active:null,
//           blocked: null,
//           appUserId: "",
//           appUserId: "",
//           merchantSerialCode: "",
//   });

//   const mounted = useRef(false);

//   const fetchData = async (page = 0, filtersParam = null) => {
//     setIsFetching(true);
//     try {
//       const activeFilters = filtersParam || filters;
//       //let url = `/drs/search?page=${page}&size=10`;
//       let url = `/merchants/search?page=${page}&size=10`;

//       Object.entries(activeFilters).forEach(([key, value]) => {
//         if (value) url += `&${key}=${value}`;
//       });

//       const response = await axiosInstance.get(url);
//       const data = response.data;

//       if (data?.content) {

//         console.log("dtae",data?.content)
//         setDrData(data.content || []);
//         setPageInfo({ pageNumber: data.number, totalPages: data.totalPages });
//       }
//     } catch (err) {
//       console.error("Error during fetch request:", err.message);
//     } finally {
//       setIsFetching(false);
//       setInitialLoad(false);
//     }
//   };

//   const handleApplyFilters = () => {
//     fetchData(0);
//   };

//   const handlePageChange = (newPage) => {
//     fetchData(newPage);
//   };

//   const handleDateRangeApply = (range) => {
//     const updatedFilters = { ...filters, dateRange: range };
//     setFilters(updatedFilters);
//     fetchData(0, updatedFilters);
//   };

//   const handleSelectMerchant = (merchant) => {
//     const updatedFilters = { ...filters, idOfMerchant: merchant.id };
//     setFilters(updatedFilters);
//     fetchData(0, updatedFilters);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);







// const deleteMercahnt = async (id) => {
//   try {
//     setLoading(true);
//     const res = await axiosInstance.delete(`/merchants/${id}`,  { delete: true});
//     setLoading(false);

//   console.log("res",  res);
//      if ((res.status >= 200 && res.status < 300) && res.data && res.data.message === "Merchant soft-deleted successfully") {
//       showAlert('success', 'Delete  Successfully');
//      fetchData();
//     } else {
//       showAlert('error', 'SUpdated failed');
//     }
//   } catch (error) {
//     setLoading(false);
//      showAlert('error', 'SUpdated failed');
//   }
// };



// const restoreDR = async (id) => {
//   try {
//     setLoading(true);
//     const res = await axiosInstance.put(`/drs/update/${id}`, { delete: false });
//     setLoading(false);

//     if (res.status >= 200 && res.status < 300 && res.data?.updated === true) {
//       showAlert('success', 'Restored Successfully');
//       fetchData(); 
//       showAlert('error', 'Restore failed');
//     }
//   } catch (error) {
//     setLoading(false);
//     showAlert('error', 'Restore failed');
//   }
// };












//   if (loading || initialLoad) return <MainAppSpinner />;

//   const canDeleteTransactions = hasPermission("Transactions", "delete");

//   return (
//     <>

    


//  <div className="createdr-section-title">Merchants</div>

   

//  <div className="createdr-section">

//   <div className="createdr-section-title-start">Filter  by :</div>
  
    






// <div
//   style={{
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '12px', 
    
//     padding: '8px',
   
 
//     borderRadius: '6px',
//   }}
// >

// <FilterInput
//     label="User ID :"
//     value={filters.appUserId}
//     onChange={(e) =>
//       setFilters((prev) => ({
//         ...prev,
//         appUserId: e.target.value,
//       }))
//     }
//   />

//   <FilterInput
//     label="Merchant Serial Code"
//     value={filters.merchantSerialCode}
//     onChange={(e) =>
//       setFilters((prev) => ({
//         ...prev,
//         merchantSerialCode: e.target.value,
//       }))
//     }
//   />





// </div>



// <div
//   style={{
//     display: 'flex',
//     justifyContent: 'flex-start',
//     gap: '12px', 

//     padding: '8px',
 
//     borderRadius: '6px',
//   }}
// >


//   <ButtonCustomizedAction action="delete" label="Clear"   onClick={() =>{
//         setFilters({ appUserId: "",merchantSerialCode: "", });

//          fetchData(0, {
//            appUserId: "",
//            merchantSerialCode: "",
     
//     });


//   }


//       }/> 

// <ButtonCustomizedAction action="search" label="Search" onClick={handleApplyFilters}/> 
 
// </div>



  

//   </div>




    







//  <CreateButton to="/merhantcreate" label="Add New Mechant "/>



 

//       {isFetching ? (
//         <div style={{ textAlign: "center", padding: "2rem" }}>
//           <MainAppSpinner />
//         </div>
//       ) : (
//         <TableComponent
//           visibleColumns={[
//                "id",
//             "merchantSerialCode",
//              "avatarUrl",
         
            
//           ]}
//           columnNameOverrides={{
//             id: "ID",
//             merchantSerialCode: "Merchant Serial Code",
//             avatarUrl: "Logo ",
        
//           }}
//          // columnOrder={[]}
//            columnOrder={["avatarUrl","id", "merchantSerialCode"]}

//           currentPage={pageInfo.pageNumber}
//           totalPages={pageInfo.totalPages}
//           onPageChange={handlePageChange}
//           data={drData}
         
          
//           viewRoute="/merhantview"
//           updateRoute="/merhantupdate"
//           handleDelete={deleteMercahnt}
//           restoreDR={restoreDR}

//            customCellRenderers={{
//             avatarUrl: (url) => (
//            <img
//            src={url}
//            alt="Merchant Logo"
//           style={{ width: "40px", height: "40px", borderRadius: "50%" }}
//       />
//     ),
//   }}

        
//         />
//       )}
//     </>
//   );
// };

// export default MerchantsPage;


