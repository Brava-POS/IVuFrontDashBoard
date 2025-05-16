import React, { useState, useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import { useAuth } from '../context/AuthContext';
import PaginationComponent from '../components/PaginationComponent';
import MainAppSpinner from '../components/MainAppSpinner';
import { FaSearch } from 'react-icons/fa';


const TransactionsPage = () => {
  const { loading, customFetch ,user,hasPermission } = useAuth();
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [filters, setFilters] = useState({
    dateRangeStart: '',  // Format: "YYYY-MM-DD"
    dateRangeEnd: '',    // Format: "YYYY-MM-DD"
    timeRangeStart: '',  // Format: "HH:MM"
    timeRangeEnd: '',    // Format: "HH:MM"
    controlNumber: '',
    authorizationCode: '',
    lastCardNumber: '',
    idOfMerchant: ''
  });



  const fetchData = async (page = 0, size = 10) => {
    try {
      const { dateRangeStart, dateRangeEnd, timeRangeStart, timeRangeEnd, controlNumber, authorizationCode, lastCardNumber , idOfMerchant} = filters;
  
      let formattedDateRange = '';
      if (dateRangeStart && dateRangeEnd) {
        formattedDateRange = `${dateRangeStart.replaceAll('-', '')}-${dateRangeEnd.replaceAll('-', '')}`;
      }
  
      let formattedTimeRange = '';
      if (timeRangeStart && timeRangeEnd) {
        formattedTimeRange = `${timeRangeStart.replaceAll(':', '')}-${timeRangeEnd.replaceAll(':', '')}`;
      }
  
      let url = `/drs/search?page=${page}&size=${size}`;



      if (idOfMerchant) url += `&idOfMerchant=${idOfMerchant}`;
      if (formattedDateRange) url += `&dateRange=${formattedDateRange}`;
      if (formattedTimeRange) url += `&timeRange=${formattedTimeRange}`;
      if (controlNumber) url += `&controlNumber=${controlNumber}`;
      if (authorizationCode) url += `&authorizationCode=${authorizationCode}`;
      if (lastCardNumber) url += `&lastCardNumber=${lastCardNumber}`;
  
      console.log('Constructed URL for API request:', url);
  
      const data = await customFetch(url, { method: 'POST' });
  
      console.log('data.data.content  ', data.content);
      
  
   if (data?.content) {
        setDrData(data.content || []);
        setPageInfo({ pageNumber: data.number, totalPages: data.totalPages });
      }
    } catch (err) {
      console.error('Error during fetch request:', err.message);
    }
  };
  
  const handlePageChange = (newPage) => {
    setPageInfo((prev) => ({
      ...prev,
      pageNumber: newPage
    }));
    fetchData(newPage); 
  };
  const handleApplyFilters = () => {
    console.log('Applied Filters:');
    console.log('merchant id:', filters.idOfMerchant);
    console.log('Date Range Start:', filters.dateRangeStart);
    console.log('Date Range End:', filters.dateRangeEnd);
    console.log('Time Range Start:', filters.timeRangeStart);
    console.log('Time Range End:', filters.timeRangeEnd);
    console.log('Control Number:', filters.controlNumber);
    console.log('Authorization Code:', filters.authorizationCode);
    console.log('Last Card Number:', filters.lastCardNumber);
    fetchData(0);  
  };
  const handleTransactionDelete = (id) => {
    console.log(`Delete transaction with ID: ${id}`);
  };
  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value
    });
  };

  useEffect(() => {
    fetchData(0);
  }, []);








const canDeleteTransactions = hasPermission('Transactions', 'delete');













  if (loading) return <MainAppSpinner />;

  return (
    <>
    
      <div className="filter-search-container">



        <div className="filter-row">
          <div className="filter-item">
            <label>Start Date:</label>
            <input
              type="date"
              value={filters.dateRangeStart || ''}
              onChange={(e) => handleInputChange(e, 'dateRangeStart')}
            />
          </div>
          <div className="filter-item">
            <label>End Date:</label>
            <input
              type="date"
              value={filters.dateRangeEnd || ''}
              onChange={(e) => handleInputChange(e, 'dateRangeEnd')}
            />
          </div>


        
        </div>

        <div className="filter-row">


 { canDeleteTransactions && (

  <div className="filter-item">
    <label>Merchants:</label>
    <input
      type="text"
      placeholder="ID or name"
      value={filters.idOfMerchant}
      onChange={(e) => handleInputChange(e, 'idOfMerchant')}
    />
  </div>
)}




          <div className="filter-item">
            <label>Control Number:</label>
            <input
              type="text"
            
              value={filters.controlNumber}
              onChange={(e) => handleInputChange(e, 'controlNumber')}
            />
          </div>
          <div className="filter-item">
            <label>Authorization Code:</label>
            <input
              type="text"
              placeholder=" "
              value={filters.authorizationCode}
              onChange={(e) => handleInputChange(e, 'authorizationCode')}
            />
          </div>
          <div className="filter-item">
            <label>Last 4 Card Number:</label>
            <input
              type="text"
              placeholder=" "
              value={filters.lastCardNumber}
              onChange={(e) => handleInputChange(e, 'lastCardNumber')}
            />
          </div>
          <div className="filter-item search-button">
            <button onClick={handleApplyFilters}>
             Search
            </button>
          </div>
        </div>
      </div>


      
      <TableComponent




       currentPage={pageInfo.pageNumber}
       totalPages={pageInfo.totalPages}
       onPageChange={handlePageChange}




        data={drData}
        showCreateButton={true}
        createRoute="/create-transaction-page"
        viewRoute="/view-transaction-page"
        updateRoute="/update-transaction-page"
        handleDelete={handleTransactionDelete}
        columnNameOverrides={{
          id: 'ID',
          additionalAmountTotalAmount: 'Total Amount',
          additionalAmountOutcomeType: 'Outcome Type',
          additionalAmountTotalAmount: 'Additional AmountTotal Amount',
        }}
        columnOrder={[
          'id',
          'additionalAmountTotalAmount',
          'additionalAmountOutcomeType',
        ]}
      />

  
    
    </>
  );
};

export default TransactionsPage;
