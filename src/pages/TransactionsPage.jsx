import React, { useState, useEffect, useRef } from 'react';
import TableComponent from '../components/TableComponent';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import { FaSearch } from 'react-icons/fa';
import SelectedDurationDisplay from '../components/SelectedDurationDisplay';
import MerchantDropdownSelector from '../components/MerchantDropdownSelector';

const TransactionsPage = () => {
  const { loading, axiosInstance, user, hasPermission } = useAuth();
  const isAdmin = user?.role === 'ROLE_ADMIN';

  const [drData, setDrData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(false); // Spinner for table
  const [initialLoad, setInitialLoad] = useState(true); // Show MainAppSpinner just once

  const [filters, setFilters] = useState({
    idOfMerchant: '',
    controlNumber: '',
    authorizationCode: '',
    lastCardNumber: '',
    dateRange: '',
    selectedMerchant: '',
  });

  const mounted = useRef(false); // avoid firing fetch on mount from filters effect

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
    console.error('Error during fetch request:', err.message);
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


  // Set initial dateRange and trigger fetch once
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const defaultRange = `${today}-${today}`;
    setFilters((prevFilters) => ({ ...prevFilters, dateRange: defaultRange }));
  }, []);

  useEffect(() => {
    if (mounted.current) return;
    if (filters.dateRange) {
      mounted.current = true;
      fetchData(); // Initial fetch
    }
  }, [filters.dateRange]);

  if (loading || initialLoad) return <MainAppSpinner />; // Only on full app load

  const canDeleteTransactions = hasPermission('Transactions', 'delete');





const handleDownloadPDF = async () => {
  try {
    const response = await axiosInstance.post('http://localhost:9999/pdf/generate', {
      controlNumber: "333333",
      amount: "444444",
    });

    if (response.data) {
      const filename = response.data; // e.g. "99e93e41-...pdf"
      const downloadUrl = `http://localhost:9999/pdf/download/${filename}`;

      // Open the file in new tab to trigger download
      window.open(downloadUrl, '_blank');
    }
  } catch (err) {
    console.error('Error generating PDF:', err.message);
    alert("Failed to generate PDF. Please try again.");
  }
};







  return (
    <>

 <button onClick={handleDownloadPDF}>Download PDF</button>
      {canDeleteTransactions && (
        <div className="filter-item">
          <MerchantDropdownSelector onSelect={handleSelectMerchant} />
        </div>
      )}

      <div className="filter-search-container">
        <div className="filter-row">
          <div className="filter-item">
            <SelectedDurationDisplay range={filters.dateRange} onApply={handleDateRangeApply} />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-item">
            <label>Control Number:</label>
            <input
              type="text"
              value={filters.controlNumber}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, controlNumber: e.target.value }))
              }
            />
          </div>

          <div className="filter-item">
            <label>Authorization Code:</label>
            <input
              type="text"
              value={filters.authorizationCode}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, authorizationCode: e.target.value }))
              }
            />
          </div>

          <div className="filter-item">
            <label>Last 4 Card Number:</label>
            <input
              type="text"
              value={filters.lastCardNumber}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, lastCardNumber: e.target.value }))
              }
            />
          </div>

          <div className="filter-item search-button">
            <button onClick={handleApplyFilters}>
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>

      {isFetching ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <MainAppSpinner />
        </div>
      ) : (
        <TableComponent
          currentPage={pageInfo.pageNumber}
          totalPages={pageInfo.totalPages}
          onPageChange={handlePageChange}
          data={drData}
          showCreateButton={true}
          createRoute="/create-transaction-page"
          viewRoute="/view-transaction-page"
          updateRoute="/update-transaction-page"
          handleDelete={(id) => console.log(`Delete transaction with ID: ${id}`)}
          columnNameOverrides={{
            id: 'ID',
            additionalAmountTotalAmount: 'Total Amount',
            additionalAmountOutcomeType: 'Outcome Type',
          }}
          columnOrder={['id', 'additionalAmountTotalAmount', 'additionalAmountOutcomeType']}
        />
      )}
    </>
  );
};

export default TransactionsPage;







































// import React, { useState, useEffect, useRef } from 'react';
// import TableComponent from '../components/TableComponent';
// import { useAuth } from '../context/AuthContext';
// import MainAppSpinner from '../components/MainAppSpinner';
// import { FaSearch } from 'react-icons/fa';
// import SelectedDurationDisplay from '../components/SelectedDurationDisplay';
// import MerchantDropdownSelector from '../components/MerchantDropdownSelector';

// const TransactionsPage = () => {
//   const { loading, customFetch, user, hasPermission } = useAuth();
//   const isAdmin = user?.role === 'ROLE_ADMIN';

//   const [drData, setDrData] = useState([]);
//   const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
//   const [isFetching, setIsFetching] = useState(false); // Spinner for table
//   const [initialLoad, setInitialLoad] = useState(true); // Show MainAppSpinner just once

//   const [filters, setFilters] = useState({
//     controlNumber: '',
//     authorizationCode: '',
//     lastCardNumber: '',
//     dateRange: '',
//     selectedMerchant: '',
//   });

//   const mounted = useRef(false); // avoid firing fetch on mount from filters effect

//   const fetchData = async (page = 0) => {
//     setIsFetching(true);
//     try {
//       let url = `/drs/search?page=${page}&size=10`;
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value) url += `&${key}=${value}`;
//       });

//       const data = await customFetch(url, { method: 'POST' });

//       if (data?.content) {
//         setDrData(data.content || []);
//         setPageInfo({ pageNumber: data.number, totalPages: data.totalPages });
//       }
//     } catch (err) {
//       console.error('Error during fetch request:', err.message);
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
//     setFilters((prevFilters) => ({ ...prevFilters, dateRange: range }));
//   };

//   const handleSelectMerchant = (merchant) => {
//     setFilters((prevFilters) => ({ ...prevFilters, selectedMerchant: merchant.id }));
//   };

//   // Set initial dateRange and trigger fetch once
//   useEffect(() => {
//     const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
//     const defaultRange = `${today}-${today}`;
//     setFilters((prevFilters) => ({ ...prevFilters, dateRange: defaultRange }));
//   }, []);

//   useEffect(() => {
//     if (mounted.current) return;
//     if (filters.dateRange) {
//       mounted.current = true;
//       fetchData(); // Initial fetch
//     }
//   }, [filters.dateRange]);

//   if (loading || initialLoad) return <MainAppSpinner />; // Only on full app load

//   const canDeleteTransactions = hasPermission('Transactions', 'delete');

//   return (
//     <>
//       {canDeleteTransactions && (
//         <div className="filter-item">
//           <MerchantDropdownSelector onSelect={handleSelectMerchant} />
//         </div>
//       )}

//       <div className="filter-search-container">
//         <div className="filter-row">
//           <div className="filter-item">
//             <SelectedDurationDisplay range={filters.dateRange} onApply={handleDateRangeApply} />
//           </div>
//         </div>

//         <div className="filter-row">
//           <div className="filter-item">
//             <label>Control Number:</label>
//             <input
//               type="text"
//               value={filters.controlNumber}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, controlNumber: e.target.value }))
//               }
//             />
//           </div>

//           <div className="filter-item">
//             <label>Authorization Code:</label>
//             <input
//               type="text"
//               value={filters.authorizationCode}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, authorizationCode: e.target.value }))
//               }
//             />
//           </div>

//           <div className="filter-item">
//             <label>Last 4 Card Number:</label>
//             <input
//               type="text"
//               value={filters.lastCardNumber}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, lastCardNumber: e.target.value }))
//               }
//             />
//           </div>

//           <div className="filter-item search-button">
//             <button onClick={handleApplyFilters}>
//               <FaSearch /> Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {isFetching ? (
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           <MainAppSpinner />
//         </div>
//       ) : (
//         <TableComponent
//           currentPage={pageInfo.pageNumber}
//           totalPages={pageInfo.totalPages}
//           onPageChange={handlePageChange}
//           data={drData}
//           showCreateButton={true}
//           createRoute="/create-transaction-page"
//           viewRoute="/view-transaction-page"
//           updateRoute="/update-transaction-page"
//           handleDelete={(id) => console.log(`Delete transaction with ID: ${id}`)}
//           columnNameOverrides={{
//             id: 'ID',
//             additionalAmountTotalAmount: 'Total Amount',
//             additionalAmountOutcomeType: 'Outcome Type',
//           }}
//           columnOrder={['id', 'additionalAmountTotalAmount', 'additionalAmountOutcomeType']}
//         />
//       )}
//     </>
//   );
// };

// export default TransactionsPage;
