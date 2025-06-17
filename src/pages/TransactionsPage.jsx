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

const TransactionsPage = () => {
 
  const navigate = useNavigate();
  const { axiosInstance, loading, setLoading, user, hasPermission } = useAuth();
    const canDeleteTransactions = hasPermission("Transactions", "delete");
  const isAdmin = user?.role === "ROLE_ADMIN";

  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const mounted = useRef(false);

  const [filters, setFilters] = useState({
    deleted: false,
    idOfMerchant: "",
    controlNumber: "",
    authorizationCode: "",
    lastCardNumber: "",
    dateRange: "",
  });

  useEffect(() => {
    fetchData();
  }, []);









  const fetchData = async (page = 0, filtersParam = null) => {
    setIsFetching(true);
    try {
      const activeFilters = filtersParam || filters;
      let url = `/drs/search?page=${page}&size=10`;
      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value) url += `&${key}=${value}`;
      });

      const response = await axiosInstance.post(url);
      const data = response.data;

      console.log("drs",data.content)
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
     const updated = { ...filters, idOfMerchant: merchant?.id || "" };
   // const updated = { ...filters, idOfMerchant: merchant.id };
    setFilters(updated);
    fetchData(0, updated);
  };

  const deleteDR = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/drs/update/${id}`, { delete: true });
      if (res.data?.updated) {
        showAlert("success", "Deleted Successfully");
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

  const restoreDR = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/drs/update/${id}`, { delete: false });
      if (res.data?.updated) {
        showAlert("success", "Restored Successfully");
        fetchData();
      } else {
        showAlert("error", "Restore failed");
      }
    } catch {
      showAlert("error", "Restore failed");
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
 <div className="createdr-section-title-large">  Transactions</div>
      {hasPermission("Transactions", "delete") && (
        <MerchantDropdownSelector onSelect={handleSelectMerchant} />
      )}




  <AppFlexBox justify="start" wrap>
          <SelectedDurationDisplay range={filters.dateRange} onApply={handleDateRangeApply} />
        </AppFlexBox>






<div className="createdr-section-title-start">Filter by:</div>
      <div className="createdr-section">
        

        <AppFlexBox justify="start" wrap>
         <MainFilterInput
            label="Control Number"
            value={filters.controlNumber}
           onChange={handleFilterChange("controlNumber")}
          />
         <MainFilterInput
            label="Authorization Code"
            value={filters.authorizationCode}
          onChange={handleFilterChange("authorizationCode")}
          />
       <MainFilterInput
            label="Last 4 Card Number"
            value={filters.lastCardNumber}
           onChange={handleFilterChange("lastCardNumber")}
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

     {canDeleteTransactions && ( <CreateButton to="/create-transaction-page" label="Add New Detailed Record" />)}
     


</AppFlexBox>



      {isFetching ? (
        <MainAppSpinner />
      ) : (
        <TableComponent
          data={drData}
          currentPage={pageInfo.pageNumber}
          totalPages={pageInfo.totalPages}
          onPageChange={handlePageChange}
          restore={restoreDR}
          handleDelete={deleteDR}
          restoreDR={restoreDR}
          createRoute="/create-transaction-page"
          viewRoute="/view-transaction-page"
          updateRoute="/edit-transaction-page"
          showViewButton = {true}
          visibleColumns={[
            "controlNumberCode",
               "processed",
            "informativeFileName",
            "batchType",
            //  "bhcashIndicator",
            // "bhcardIndicator",
            "transactionDate",
            "transactionTime",
            "transactionAmount",
            "salesAmount",
            "stateTaxAmount",
            "reducedStateTax",
            "cityTaxAmount",
            "additionalAmountOutcomeType",
            "additionalAmountTotalAmount",
          ]}
          columnNameOverrides={{
             processed :"Processed",
             informativeFileName:"File Name",
              batchType: "Batch Type",
            //   bhcashIndicator:"Batch Type",
            // bhcardIndicator:"Batch Type",
            controlNumberCode: "Control Number",
            transactionDate: "Date",
            transactionTime: "Time",
            transactionAmount: "Transaction Amount",
            salesAmount: "Sales Amount",
            stateTaxAmount: "State Tax Amount",
            reducedStateTax: "Reduced State Tax",
            cityTaxAmount: "City Tax",
            additionalAmountOutcomeType: "Additional Type",
            additionalAmountTotalAmount: "Additional Tax",
          }}

            customCellRenderers = {{
                processed: (val) => (val ? "Yes" : "No"),
                 batchType: (val) => val || "Pending",
                   informativeFileName: (val) => val || "Pending",
                
              }
                }


         columnOrder = {["processed","batchType","informativeFileName"]}


        />
      )}
    </>
  );
};

export default TransactionsPage;




























