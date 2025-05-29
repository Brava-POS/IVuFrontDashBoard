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

const TransactionsPage = () => {
  const navigate = useNavigate();
  const { loading,setLoading, axiosInstance, user, hasPermission } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [filters, setFilters] = useState({
    idOfMerchant: "",
    controlNumber: "",
    authorizationCode: "",
    lastCardNumber: "",
    dateRange: "",
    selectedMerchant: "",
  });

  const mounted = useRef(false);

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

      if (data?.content) {
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







const deleteDR = async (id) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(`/drs/update/${id}`,  { delete: true});
    setLoading(false);

  console.log("res",  res);
     if ((res.status >= 200 && res.status < 300) && res.data && res.data.updated === true) {
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















  if (loading || initialLoad) return <MainAppSpinner />;

  const canDeleteTransactions = hasPermission("Transactions", "delete");

  return (
    <>
      {canDeleteTransactions && (
        <div className="filter-item">
          <MerchantDropdownSelector onSelect={handleSelectMerchant} />
        </div>
      )}

      <div className="filter-search-container">
        <div className="filter-row">
          <div className="filter-item">
            <SelectedDurationDisplay
              range={filters.dateRange}
              onApply={handleDateRangeApply}
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-item">
            <label>Control Number:</label>
            <input
              type="text"
              value={filters.controlNumber}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  controlNumber: e.target.value,
                }))
              }
            />
          </div>

          <div className="filter-item">
            <label>Authorization Code:</label>
            <input
              type="text"
              value={filters.authorizationCode}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  authorizationCode: e.target.value,
                }))
              }
            />
          </div>

          <div className="filter-item">
            <label>Last 4 Card Number:</label>
            <input
              type="text"
              value={filters.lastCardNumber}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  lastCardNumber: e.target.value,
                }))
              }
            />
          </div>

          <div className="filter-item search-button">
            <button onClick={handleApplyFilters}>
              <FaSearch /> Search
            </button>
          </div>
        </div>
        <div style={{ height: '20px' }} /> 
        <CreateButton to="/create-transaction-page" label="Add New Detailed Record "/>
         </div>

  

      {isFetching ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <MainAppSpinner />
        </div>
      ) : (
        <TableComponent
          visibleColumns={[
            "controlNumberCode",
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
            transactionDate: "Date",
            controlNumberCode: "Control Number",
            transactionDate: "Date",
            transactionTime: "Time",
            transactionAmount: "Transaction Amount",
            salesAmount: "Sales Amount",
            stateTaxAmount: "State Tax Amount",
            reducedStateTax: "Reduced State Tax",
            cityTaxAmount: "City Tax",
            additionalAmountOutcomeType: "Additional Type",
            additionalAmountTotalAmount: "Additional Tax ",
          }}
          columnOrder={[]}
          // columnOrder={['id', 'additionalAmountTotalAmount', 'additionalAmountOutcomeType']}

          currentPage={pageInfo.pageNumber}
          totalPages={pageInfo.totalPages}
          onPageChange={handlePageChange}
          data={drData}
         
          createRoute="/create-transaction-page"
          viewRoute="/view-transaction-page"
          updateRoute="/edit-transaction-page"
          handleDelete={deleteDR}
            showCreateButton={false}
        />
      )}
    </>
  );
};

export default TransactionsPage;
