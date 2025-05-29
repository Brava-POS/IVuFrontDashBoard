import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import BackButton from '../components/BackButton';

// Format cents to dollars
const formatAmount = (val) => {
  if (!val || isNaN(val)) return '-';
  const numeric = parseInt(val, 10);
  return `$ ${(numeric / 100).toFixed(2)}`;
};

// Hidden fields
const hiddenFields = new Set([
  'id', 'posEntryMode', 'testNumber', 'result', 'buyerExemptIndPos164L1',
  'deleted', 'deletedAt', 'merchantId', 'filler1Pos30_32L3', 'filler2Pos36_43L8',
  'filler3Pos181_200L20', 'calendarVersionIdPos177_180L4',
  'indicatorBuyerIsMerchantPos152L1', 'controlNumberPos167_176L10',
  'merchantId', 'paymentMethod', 'terminalNumber', 'posEntryMode', 'cardNumber',
  'transactionType', 'merchantCategoryCode', 'appUserAvatar',
  'merchantUserrname', 'merchantSerialNumber',"additionalAmountsSummary"
]);

// Label overrides
const keyLabelMap = {
  transactionDate: 'Transaction Date',
  transactionTime: 'Transaction Time',
  transactionAmount: 'Transaction Amount',
  salesAmount: 'Sales Amount',
  stateTaxAmount: 'State Tax',
  cityTaxAmount: 'City Tax',
  controlNumberCode: 'Control Number',
  controlNumberCodePrefix: 'Control Number Prefix',
  terminalNumber: 'Terminal Number',
  terminalBatchNumber: 'Terminal Batch #',
  transactionSequence: 'Transaction Sequence',
  merchantTaxId: 'Merchant Tax ID',
  reducedStateTax: 'Reduced State Tax',
  authorizationCode: 'Authorization Code',
  recordType: 'Record Type',
};

// Amount fields
const amountKeys = new Set([
  'transactionAmount',
  'salesAmount',
  'stateTaxAmount',
  'cityTaxAmount',
  'reducedStateTax',
  'additionalAmountTotalAmount',
 
"additionalAmountTotalAmount",
]);

const ViewTransactionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axiosInstance } = useAuth();

  const [transaction, setTransaction] = useState(null);

  


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axiosInstance.get(`/drs/getdr/${id}`);
        setTransaction(res.data);
        setAdditiolaamountTotal(res.data.additionalAmountTotalAmount)
        setAdditiolaamountTotalType(res.data.additionalAmountOutcomeType)


      } catch (err) {
        console.error('Failed to fetch transaction:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) return <MainAppSpinner />;
  if (!transaction) return <div className="main-header">No transaction found.</div>;


  return (
    <div className="view-container">



  <div className="createdr-section-title"> Transaction Details </div>

   

      <BackButton to="/transactions" label="Back to Transactions " />


   <div className="createdr-section">
    

      <div>
        {/* Merchant Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          {transaction.appUserAvatar && (
            <img
              src={transaction.appUserAvatar}
              alt="Merchant Avatar"
              style={{
                width: '60px', height: '60px',
                borderRadius: '50%', marginRight: '20px'
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{transaction.merchantUserrname}</div>
            <div style={{ color: '#555' }}>{transaction.merchantSerialNumber}</div>
          </div>
        </div>

        {/* Standard Fields */}
        {Object.entries(transaction).map(([key, value], index) => {
          if (
            hiddenFields.has(key) ||
            key === 'additionalAmounts' ||
            value === null ||
            value === ''
          ) return null;

          const readableLabel = keyLabelMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();

          let displayValue = value.toString();

          if (typeof value === 'string' && value.match(/^\d{8}$/) && key.toLowerCase().includes('date')) {
            displayValue = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
          }

          if (amountKeys.has(key)) {
            displayValue = formatAmount(value);
          }

          return (


        <div
  className="table-row"
  key={index}
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
    width: '100%',
  }}
>
  <div
   
    style={{
      fontWeight: '500',
      color: '#333',
    }}
  >
    {readableLabel}
  </div>
  <div
    className="table-value"
    style={{
      textAlign: 'right',
      color: '#000',
    }}
  >
    {displayValue}
  </div>
</div>




          );
        })}






    
{/* Additional Amounts Summary Section */}
 <h3 style={{ marginTop: '50px',  }}>Additional Amounts Summary</h3>
{transaction.additionalAmountsSummary?.length > 0 && (






  <div
    className="additional-amounts-summary"
    style={{
      marginTop: '30px',
      backgroundColor: 'white', 
   
      borderRadius: '8px',
      padding: '16px',
   
    }}
  >
   
    <p style={{ marginBottom: '10px',}}>
      Additional Amount Total: {formatAmount(transaction.additionalAmountTotalAmount)}
    </p>
    <p style={{ marginBottom: '20px', }}>
      Additional Amount Type: {transaction.additionalAmountOutcomeType}
    </p>

    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr >
          <th style={{ padding: '10px', borderBottom: '2px solid #d32f2f',  textAlign: 'left' }}>Type</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #d32f2f',  textAlign: 'left' }}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transaction.additionalAmountsSummary.map((item, idx) => (
          <tr key={idx}>
            <td style={{ padding: '10px', borderBottom: '1px solid #ef9a9a' }}>{item.type}</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ef9a9a' }}>{formatAmount(item.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
















      </div>


</div>

    </div>
  );
};

export default ViewTransactionPage;
