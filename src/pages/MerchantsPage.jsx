import React, { useState, useEffect, useRef } from "react";
import TableComponent from "../components/TableComponent";
import { useAuth } from "../context/AuthContext";
import MainAppSpinner from "../components/MainAppSpinner";
import { FaSearch } from "react-icons/fa";
import SelectedDurationDisplay from "../components/SelectedDurationDisplay";
import MerchantDropdownSelector from "../components/MerchantDropdownSelector";
import { useParams, useNavigate } from "react-router-dom";
import { showAlert } from '../components/SweetAlertComponent';
import CreateButton from "../components/CreateButton";
import ButtonCustomizedAction from "../components/ButtonCustomizedAction";
import FilterInput from "../components/FilterInput";
import FilterCheckbox from "../components/FilterCheckbox";

const MerchantsPage = () => {
  const navigate = useNavigate();
  const { loading,setLoading, axiosInstance, user, hasPermission } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [filters, setFilters] = useState({
    appUserId: "",
    merchantSerialCode: "",
  });

  const mounted = useRef(false);

  const fetchData = async (page = 0, filtersParam = null) => {
    setIsFetching(true);
    try {
      const activeFilters = filtersParam || filters;
      //let url = `/drs/search?page=${page}&size=10`;
      let url = `/merchants/search?page=${page}&size=10`;

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value) url += `&${key}=${value}`;
      });

      const response = await axiosInstance.get(url);
      const data = response.data;

      if (data?.content) {

        console.log("dtae",data?.content)
        setDrData(data.content || []);
        setPageInfo({ pageNumber: data.number, totalPages: data.totalPages });
      }
    } catch (err) {
      console.error("Error during fetch request:", err.message);
    } finally {
      setIsFetching(false);
      setInitialLoad(false);
    }
  };

  const handleApplyFilters = () => {
    fetchData(0);
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };

  const handleDateRangeApply = (range) => {
    const updatedFilters = { ...filters, dateRange: range };
    setFilters(updatedFilters);
    fetchData(0, updatedFilters);
  };

  const handleSelectMerchant = (merchant) => {
    const updatedFilters = { ...filters, idOfMerchant: merchant.id };
    setFilters(updatedFilters);
    fetchData(0, updatedFilters);
  };

  useEffect(() => {
    fetchData();
  }, []);







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
  }
};












  if (loading || initialLoad) return <MainAppSpinner />;

  const canDeleteTransactions = hasPermission("Transactions", "delete");

  return (
    <>

    


 <div className="createdr-section-title">Merchants</div>

   

 <div className="createdr-section">

  <div className="createdr-section-title-start">Filter  by :</div>
  
    






<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px', 
    
    padding: '8px',
   
 
    borderRadius: '6px',
  }}
>

<FilterInput
    label="User ID :"
    value={filters.appUserId}
    onChange={(e) =>
      setFilters((prev) => ({
        ...prev,
        appUserId: e.target.value,
      }))
    }
  />

  <FilterInput
    label="Merchant Serial Code"
    value={filters.merchantSerialCode}
    onChange={(e) =>
      setFilters((prev) => ({
        ...prev,
        merchantSerialCode: e.target.value,
      }))
    }
  />





</div>



<div
  style={{
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '12px', 

    padding: '8px',
 
    borderRadius: '6px',
  }}
>


  <ButtonCustomizedAction action="delete" label="Clear"   onClick={() =>{
        setFilters({ appUserId: "",merchantSerialCode: "", });

         fetchData(0, {
           appUserId: "",
           merchantSerialCode: "",
     
    });


  }


      }/> 

<ButtonCustomizedAction action="search" label="Search" onClick={handleApplyFilters}/> 
 
</div>



  

  </div>




    







 <CreateButton to="/merhantcreate" label="Add New Mechant "/>



 

      {isFetching ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <MainAppSpinner />
        </div>
      ) : (
        <TableComponent
          visibleColumns={[
               "id",
            "merchantSerialCode",
             "avatarUrl",
         
            
          ]}
          columnNameOverrides={{
            id: "ID",
            merchantSerialCode: "Merchant Serial Code",
            avatarUrl: "Logo ",
        
          }}
         // columnOrder={[]}
           columnOrder={["avatarUrl","id", "merchantSerialCode"]}

          currentPage={pageInfo.pageNumber}
          totalPages={pageInfo.totalPages}
          onPageChange={handlePageChange}
          data={drData}
         
          
          viewRoute="/merhantview"
          updateRoute="/merhantupdate"
          handleDelete={deleteMercahnt}
          restoreDR={restoreDR}

           customCellRenderers={{
            avatarUrl: (url) => (
           <img
           src={url}
           alt="Merchant Logo"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
    ),
  }}

        
        />
      )}
    </>
  );
};

export default MerchantsPage;


