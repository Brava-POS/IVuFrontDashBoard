import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import TableComponent from "../components/TableComponent";
import MainAppSpinner from "../components/MainAppSpinner";
import SelectedDurationDisplay from "../components/SelectedDurationDisplay";
import MerchantDropdownSelector from "../components/MerchantDropdownSelector";
import ButtonCustomizedAction from "../components/ButtonCustomizedAction";
import CreateButton from "../components/CreateButton";
import { showAlert } from "../components/SweetAlertComponent";
import BackButton from "../components/BackButton";
import AppFlexBox from "../components/AppFlexBox";
import MainFilterInput from "../components/MainFilterInput";

const MerchantSubscribtionsPage = () => {
  const navigate = useNavigate();
  const { axiosInstance, loading, setLoading, user, hasPermission } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const mounted = useRef(false);

  const [filters, setFilters] = useState({
    deleted:false,
    active:null,
     id:"",
    subscriptionPlanId: "",
    merchantId: "",

  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 0, filtersParam = null) => {
    setIsFetching(true);
    try {
      const activeFilters = filtersParam || filters;
      let url = `/elavonMerchantSubscriptions/search?page=${page}&size=10`;

    Object.entries(activeFilters).forEach(([key, value]) => {
  if (value !== null && value !== undefined && (typeof value === "boolean" || value !== "")) {
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

  const handlePageChange = (newPage) => fetchData(newPage);

  const handleApplyFilters = () => fetchData(0);

  const handleDateRangeApply = (range) => {
    const updated = { ...filters, dateRange: range };
    setFilters(updated);
    fetchData(0, updated);
  };

  const handleSelectMerchant = (merchant) => {
     const updated = { ...filters, id: merchant?.id || "" };

    setFilters(updated);
    fetchData(0, updated);
  };
const deleteSubscription = async (id) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(`/elavonMerchantSubscriptions/${id}`);


    const { id: deletedId, message } = res.data || {};

    if (deletedId && message?.toLowerCase().includes("deleted successfully")) {
      showAlert("success", `Deleted successfully: ${message}`);
      fetchData();
    } else {
      showAlert("error", "Delete failed");
    }
  } catch {
    showAlert("error", "Delete failed");
  } finally {
    setLoading(false);
  }
};


  const handleFilterChange = (field) => (e) => {
  const updated = { ...filters, [field]: e.target.value };
  setFilters(updated);
  fetchData(0, updated);
};

  if (loading || initialLoad) return <MainAppSpinner />;

  return (
    <>
 <div className="createdr-section-title-large">  Subscriptions</div>
      {hasPermission("Transactions", "delete") && (
        <MerchantDropdownSelector onSelect={handleSelectMerchant} />
      )}



<div className="createdr-section-title-start">Filter by:</div>
      <div className="createdr-section">
        

        <AppFlexBox justify="start" wrap>
         <MainFilterInput
            label="Subscrption ID"
            value={filters.id}
           onChange={handleFilterChange("id")}
          />
         <MainFilterInput
            label="Status"
            value={filters.status}
          onChange={handleFilterChange("status")}
          />
       <MainFilterInput
            label=" Subscription Plan "
            value={filters.subscriptionPlanId}
           onChange={handleFilterChange("subscriptionPlanId")}
          />
        </AppFlexBox>

    
        <AppFlexBox justify="start" gap="12px">

        </AppFlexBox>
      </div>

<AppFlexBox justify="start" wrap>

<ButtonCustomizedAction
  action="delete"
  label="Clear"
  onClick={() => {
    const resetFilters = {
      deleted: false,
      idOfMerchant: "",
      controlNumber: "",
      authorizationCode: "",
      lastCardNumber: "",
      dateRange: "",
    };
    setFilters(resetFilters);
    fetchData(0, resetFilters);
  }}
/>

</AppFlexBox>

      {isFetching ? (
        <MainAppSpinner />
      ) : (
        <TableComponent
          data={drData}
          currentPage={pageInfo.pageNumber}
          totalPages={pageInfo.totalPages}
          onPageChange={handlePageChange}
          handleDelete={deleteSubscription }
          viewRoute="/subscriptions-view"
          updateRoute="/subscriptions-update"
         showUpdateButton ={false} 
          visibleColumns={[
            "id",
            "status",
            "nextBillingDate",
            "active",
            "createdAt",
            "updatedAt",
          ]}
          columnNameOverrides={{
           id: "Subscription ID",
            status: "Status",
            nextBillingDate: "next Billing Date",
            active: "Active",
            createdAt: "Created dAt",
            updatedAt : " Updated At",
          }}

          customCellRenderers = {{ active: (val) => (val ? "Yes" : "No"),}}    

        />
      )}
    </>
  );
};

export default MerchantSubscribtionsPage;
