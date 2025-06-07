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
import MainFilterInput from "../components/MainFilterInput";
import AppFlexBox from "../components/AppFlexBox";
import logo from '../assets/images/brava.png';
import RoleToggle from "../components/RoleToggle";
import  placeHolder  from '../assets/images/placeHolder.png';

const LeadsPage = () => {

// Define column lists and mappings outside JSX
const visibleColumns = [
  "id", "userRole", "avatarUrl", "username", "email", "active", "blocked",
  "accountExpired", "credentialsExpired", "accountLocked", "notificationsEnabled",
  "createdAt", "updatedAt", "createdByIp", "lastLoginAt", "lastLoginIp",
];

const columnOrder = [
  "avatarUrl", "active", "blocked", "id", "userRole",
  "firstName", "middleName", "lastName", "secondLastName",
  "phone", "address", "city", "state", "zip",
  "country", "language", "timezone",
];

const columnNameOverrides = {
  id: "User ID",
  userRole: "User Role",
  avatarUrl: "Avatar",
  username: "Username",
  email: "Email",
  active: "Active",
  blocked: "Blocked",
  accountExpired: "Account Expired",
  credentialsExpired: "Credentials Expired",
  accountLocked: "Account Locked",
  notificationsEnabled: "Notifications Enabled",
  createdAt: "Created At",
  updatedAt: "Updated At",
  createdByIp: "Created From IP",
  lastLoginAt: "Last Login At",
  lastLoginIp: "Last Login IP",
};

const customCellRenderers = {
  avatarUrl: (url) => (
    <img
      src={url ?url:placeHolder}
      alt="User Avatar"
      style={{ width: "40px", height: "40px", borderRadius: "50%" }}
    />
  ),
  active: (val) => (val ? "Yes" : "No"),
  deleted: (val) => (val ? "Yes" : "No"),
  blocked: (val) => (val ? "Yes" : "No"),
  accountExpired: (val) => (val ? "Yes" : "No"),
  credentialsExpired: (val) => (val ? "Yes" : "No"),
  accountLocked: (val) => (val ? "Yes" : "No"),
  notificationsEnabled: (val) => (val ? "Yes" : "No"),
};


  const navigate = useNavigate();
  const { loading,setLoading, axiosInstance, user, hasPermission } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [filters, setFilters] = useState({
  role:"guest",
  deleted: false,
  active: null,
  blocked: null,
  accountExpired: null,
  credentialsExpired: null,
  accountLocked: null,
  notificationsEnabled: null,
  id: "",
  username: "",
  email: "",
  state: "",
  phone: "",
  city: "",
});

const resetFilters =()=>{

setFilters({
   role: null,
  deleted: false,
  active: true,
  blocked: null,
  accountExpired: null,
  credentialsExpired: null,
  accountLocked: null,
  notificationsEnabled: null,
  id: "",
  username: "",
  email: "",
  state: "",
  phone: "",
  city: "",
});


 fetchData(0,{
  deleted: false,
  active: true,
  blocked: null,
  accountExpired: null,
  credentialsExpired: null,
  accountLocked: null,
  notificationsEnabled: null,
  id: "",
  username: "",
  email: "",
  state: "",
  phone: "",
  city: "",
});



}

  const mounted = useRef(false);

  const fetchData = async (page = 0, filtersParam = null) => {
    setIsFetching(true);
    try {
      const activeFilters = filtersParam || filters;
      let url = `/app-users/searchguests?page=${page}&size=10`;
      Object.entries(activeFilters).forEach(([key, value]) => {
  if (value !== "" && value !== null && value !== undefined) {
    url += `&${key}=${value}`;
  }
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

useEffect(() => {
  if (!initialLoad) {
    fetchData(0);
  }
}, [filters]);






const handleDelete = async (id) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(`/app-users/${id}`,  { delete: true});
    setLoading(false);

  console.log("res",  res);
     if ((res.status >= 200 && res.status < 300) && res.data && res.data.message === "User marked as deleted successfully") {
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


 
const  handleblock = async (id) => {
  try {
    setLoading(true);
      const res = await axiosInstance.put(`/app-users/${id}`, { blocked: false});
    setLoading(false);

  console.log("res",  res);
     if (res.status === 200 && res.data?.message) {
      showAlert('success', 'Daccount Unblocked   Successfully');
     fetchData();
    } else {
      showAlert('error', 'SUpdated failed');
    }
  } catch (error) {
    setLoading(false);
     showAlert('error', 'SUpdated failed');
  }
};



const   handleAccountLocked= async (id) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(`/app-users/${id}`, { accountLocked: false});
    setLoading(false);

  console.log("res",  res);
    if (res.status === 200 && res.data?.message) {
      showAlert('success', 'DAccount unlocked s  Successfully');
     fetchData();
    } else {
      showAlert('error', 'SUpdated failed');
    }
  } catch (error) {
    setLoading(false);
     showAlert('error', 'SUpdated failed');
  }
};


const  handlecrdentialsExpired = async (id) => {
  try {
    setLoading(true);
      const res = await axiosInstance.put(`/app-users/${id}`, { credentialsExpired: false});
    setLoading(false);

  console.log("res",  res);
    if (res.status === 200 && res.data?.message) {
      showAlert('success', 'Credentials set validated   Successfully');
     fetchData();
    } else {
      showAlert('error', 'SUpdated failed');
    }
  } catch (error) {
    setLoading(false);
     showAlert('error', 'SUpdated failed');
  }
};




const  handleAccountExpired = async (id) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(`/app-users/${id}`, { accountExpired: false});
    setLoading(false);

  console.log("res",  res);
    if (res.status === 200 && res.data?.message) {
      showAlert('success', 'Account Set valid Successfully');
     fetchData();
    } else {
      showAlert('error', 'SUpdated failed');
    }
  } catch (error) {
    setLoading(false);
     showAlert('error', 'SUpdated failed');
  }
};













  if (loading || initialLoad) return <MainAppSpinner />;

  const canDeleteTransactions = hasPermission("Transactions", "delete");

  return (
    <>

  
  <div className="createdr-section-title-large">Leads</div>





 <div className="createdr-section-title-start">Filter  by :</div>
 <div className="createdr-section">
 <div className="createdr-row">



<FilterCheckbox
  label="Only Active"
  checked={filters.active === true}
  onChange={(e) => {
    const isChecked = e.target.checked;
    setFilters((prev) => ({
      ...prev,
      active: isChecked ? true : null,
      blocked: isChecked ? false : prev.blocked,
      accountExpired: isChecked ? false : prev.accountExpired,
      credentialsExpired: isChecked ? false : prev.credentialsExpired,
      accountLocked: isChecked ? false : prev.accountLocked,
      deleted: isChecked ? false : prev.deleted,
    }));
  }}
/>







  <FilterCheckbox
  label=" Credentials Expired"
  checked={filters.credentialsExpired === true}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      credentialsExpired: e.target.checked ? true : null,
    }))
  }
/>













  <FilterCheckbox
    label="Blocked"
    checked={filters.blocked=== true}
    onChange={(e) =>
      setFilters((prev) => ({
        ...prev,
        blocked: e.target.checked? true : null,
      }))
    }
  />

<FilterCheckbox
  label="Account Locked"
  checked={filters.accountLocked === true}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      accountLocked: e.target.checked ? true : null,
    }))
  }
/>
<FilterCheckbox
  label=" Account Expired"
  checked={filters.accountExpired === true}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      accountExpired: e.target.checked ? true : null,
    }))
  }
/>



  
</div>
</div>
<div className="createdr-section-title-start">Search  by :</div>
 <div className="createdr-section">
 <div className="createdr-row">



<MainFilterInput
  label="User ID"
  value={filters.id}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, id: e.target.value }))
  }
/>


<MainFilterInput
  label="Username"
  value={filters.username}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, username: e.target.value }))
  }
/>



<MainFilterInput
  label="Email"
  value={filters.email}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, email: e.target.value }))
  }
/>

<MainFilterInput
  label="Phone"
  value={filters.phone}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, phone: e.target.value }))
  }
/>

<MainFilterInput
  label="City"
  value={filters.city}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, city: e.target.value }))
  }
/>


<MainFilterInput
  label="State"
  value={filters.state}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, state: e.target.value }))
  }
/>



</div>
</div>


{/* 
"s" → flex-start

"e" → flex-end

"in" → space-between

"around" → space-around

"even" → space-evenly */}



<AppFlexBox justify="s">

<ButtonCustomizedAction action="delete" label="Clear all Filters" onClick={resetFilters}/>

<ButtonCustomizedAction action="refresh" label="Refresh" onClick={handleApplyFilters}/>

<CreateButton to="/users-create" label="Add New User"/>

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
    viewRoute="/users-view"
    updateRoute="/users-update"
    handleDelete={handleDelete}

    handleblock={handleblock}
    handleAccountLocked={handleAccountLocked}
    handlecrdentialsExpired={handlecrdentialsExpired}
    handleAccountExpired={handleAccountExpired}
 


   
  />
)}

    </>
  );
};

export default LeadsPage;