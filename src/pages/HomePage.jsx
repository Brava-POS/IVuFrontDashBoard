import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'; 
import aditional from '../assets/images/addtax.jpg'; 
import city from '../assets/images/citytax.png'; 
import reduced from '../assets/images/reduced.jpg'; 
import state from '../assets/images/statetax.png'; 
import total from '../assets/images/total.png'; 
import MainAppSpinner from '../components/MainAppSpinner';
import CardComponent from '../components/CardComponent';
import MerchantDropdownSelector from '../components/MerchantDropdownSelector';
import DateRangeSelector from '../components/DateRangeSelector';
import FilterPanel from '../components/FilterPanel';
import SelectedDurationDisplay from '../components/SelectedDurationDisplay';
import TransactionCountCard from '../components/TransactionCountCard';

function HomePage() {
  const { axiosInstance } = useAuth();
  const { loading,customFetch,permissions} = useAuth();
  const [tranactionsCount, setTranactionsCount] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [hasMounted, setHasMounted] = useState(false);
  const [appLoading, setAppLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);


const [selectedMerchant, setSelectedMerchant] = useState('');
const [selectedDateRange, setSelectedDateRange] = useState("");
  






// const fetchData = async (dateRange = '', merchantId = '') => {
//   try {
//     let url = 'http://localhost:9999/drs/sums';
//     const params = new URLSearchParams();

//     if (dateRange) params.append('dateRange', dateRange);
//     if (merchantId) params.append('merchantIdQuery', merchantId);

//     url += `?${params.toString()}`;

//     const data = await customFetch(url);
//         const formattedData = [
//           {
//             image: city,
//             title: 'Total Transactions',
//             details: {
//               Amount: `$${(data.txnAmount / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: state,
//             title: 'Total State Tax',
//             details: {
//               Amount: `$${(data.stateTax / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: city,
//             title: 'Total City Tax',
//             details: {
//               Amount: `$${(data.cityTax / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: reduced,
//             title: 'Total Reduced State Tax',
//             details: {
//               Amount: `$${(data.reducedTax / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: aditional,
//             title: 'Total Additional Amount',
//             details: {
//               Amount: `$${(data.additionalAmount / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: total,
//             title: 'Number of Records',
//             details: {
//               Count: data.count
//             }
//           },
          
//         ];

//         setSummaryData(formattedData);
//   } catch (err) {
//     console.error('Fetch error:', err);
//   }
// };





const fetchData = async (dateRange = '', merchantId = '', isInitial = false) => {
  if (isInitial) {
    setAppLoading(true);
  } else {
    setCardLoading(true);
  }

  try {
    let url = 'http://localhost:9999/drs/sums';
    const params = new URLSearchParams();

    if (dateRange) params.append('dateRange', dateRange);
    if (merchantId) params.append('merchantIdQuery', merchantId);

    url += `?${params.toString()}`;

    const data = await customFetch(url);
    const formattedData = [
      {
        image: city,
        title: 'Total Transactions',
        details: { Amount: `$${(data.txnAmount / 100).toFixed(2)}` }
      },
      {
        image: state,
        title: 'Total State Tax',
        details: { Amount: `$${(data.stateTax / 100).toFixed(2)}` }
      },
      {
        image: city,
        title: 'Total City Tax',
        details: { Amount: `$${(data.cityTax / 100).toFixed(2)}` }
      },
      {
        image: reduced,
        title: 'Total Reduced State Tax',
        details: { Amount: `$${(data.reducedTax / 100).toFixed(2)}` }
      },
      {
        image: aditional,
        title: 'Total Additional Amount',
        details: { Amount: `$${(data.additionalAmount / 100).toFixed(2)}` }
      },
   
    ];
    setSummaryData(formattedData);
    setTranactionsCount( {
        image: total,
        title: 'Number of Records',
        details: { Count: data.count }
      })
  } catch (err) {
    console.error('Fetch error:', err);
  } finally {
    if (isInitial) {
      setAppLoading(false);
    } else {
      setCardLoading(false);
    }
  }
};



















useEffect(() => {
  fetchData('', '', true); // initial load
}, []);




const handleDateRangeApply = (range) => {
  console.log('Applying selected range:', range);
  setSelectedDateRange(range);
   fetchData(range, selectedMerchant?.id);
 
};


const handleSelectMerchant = (merchant) => {
  console.log('===================================00Selected Merchant: from home page =================', merchant);
  console.log('===================================00Selected Merchant id : from home page =================', merchant.id);
   console.log('===================================00Selected Merchant merchantSerialCode : from home page =================', merchant.merchantSerialCode);


   fetchData(selectedDateRange, merchant?.id);


  setSelectedMerchant(merchant); 

};
















if (appLoading) return <MainAppSpinner />;

return (
  <>
    <MerchantDropdownSelector onSelect={handleSelectMerchant} />
  <SelectedDurationDisplay range={selectedDateRange} onApply={handleDateRangeApply} />



<div style={{ width: '100%' }}>
<TransactionCountCard data={tranactionsCount} />
</div>



   <div className="home_page_taxes_container">
    


      {cardLoading ? <MainAppSpinner /> : <CardComponent cardData={summaryData} />}
    </div>







  </>
);
}

export default HomePage;

















//  const fetchData = async ( dateRange = '') => {
//       try {
//   const url = dateRange
  
//   ?  `http://localhost:9999/drs/sums?dateRange=${dateRange}`
//       : 'http://localhost:9999/drs/sums';

//       const data = await customFetch(url);
//       // const data = await customFetch('drs/sums?dateRange=20250401-20250507');
//        console.log('sums received: fom hoempage ', data);

//         const formattedData = [
//           {
//             image: city,
//             title: 'Total Transactions',
//             details: {
//               Amount: `$${(data.txnAmount / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: state,
//             title: 'Total State Tax',
//             details: {
//               Amount: `$${(data.stateTax / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: city,
//             title: 'Total City Tax',
//             details: {
//               Amount: `$${(data.cityTax / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: reduced,
//             title: 'Total Reduced State Tax',
//             details: {
//               Amount: `$${(data.reducedTax / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: aditional,
//             title: 'Total Additional Amount',
//             details: {
//               Amount: `$${(data.additionalAmount / 100).toFixed(2)}`
//             }
//           },
//           {
//             image: total,
//             title: 'Number of Records',
//             details: {
//               Count: data.count
//             }
//           },
          
//         ];

//         setSummaryData(formattedData);
//       } catch (err) {
//         console.error('Fetch error:', err);
        
//       }
//     };






















// const fetcMerchants = async (dateRange = '') => {
//   setIsLoading(true);
//   try {
//     // Append dateRange param only if provided
//     const url = dateRange
//       ? `http://localhost:9999/merchants/search?dateRange=${dateRange}`
//       : 'http://localhost:9999/merchants/search';

//     const res = await axiosInstance.get(url);
//     setUsers(res.data);
//   } catch (err) {
//     console.error('Failed to fetch users:', err);
//   } finally {
//     setIsLoading(false);
//   }
// };
