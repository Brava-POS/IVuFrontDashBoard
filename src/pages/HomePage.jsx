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
import { format } from 'date-fns';

function HomePage() {
    const { loading, customFetch ,user,hasPermission ,axiosInstance} = useAuth();
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
  

const canDeleteTransactions = hasPermission('Transactions', 'delete')


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
  const today = format(new Date(), 'yyyyMMdd');
  const todayRange = `${today}-${today}`;
  setSelectedDateRange(todayRange);
  fetchData(todayRange, '', true); 
}, []);


const handleDateRangeApply = (range) => {
  console.log('Applying selected range:', range);
  setSelectedDateRange(range);
   fetchData(range, selectedMerchant?.id);
 
};


const handleSelectMerchant = (merchant) => {
  console.log('========Selected Merchant: from home page ==========', merchant);
  console.log('========Selected Merchant id : from home page ==========', merchant.id);
   console.log('===Selected Merchant merchantSerialCode : from home page ===========', merchant.merchantSerialCode);


   fetchData(selectedDateRange, merchant?.id);


  setSelectedMerchant(merchant); 

};
















if (appLoading) return <MainAppSpinner />;

return (
  <>
   



{ canDeleteTransactions && (

  <MerchantDropdownSelector onSelect={handleSelectMerchant} />
)}








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












