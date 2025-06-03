import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import ButtonCustomizedAction from '../components/ButtonCustomizedAction';

// Helper to format amounts
const formatAmount = (val) => {
  if (!val || isNaN(val)) return '-';
  const numeric = parseFloat(val);
  return `$ ${(numeric).toFixed(2)}`;
};

// Fields to hide
const hiddenFields = new Set([
  'deleted', 'sslPs2000Data', 'sslCardNumber', 'sslToken', 'sslCustomerId',
  'sslCvv2Response', 'sslDepartureDate', 'sslCompletionDate',
  'sslTokenFormat', 'sslTokenProvider', 'sslIssuerResponse'
]);

// Optional label overrides
const keyLabelMap = {
  sslTxnTime: 'Transaction Time',
  sslAmount: 'Amount',
  sslResult: 'Result',
  sslTxnId: 'Transaction ID',
  sslApprovalCode: 'Approval Code',
  sslCardShortDescription: 'Card Type',
  sslVendorId: 'Vendor ID',
  sslAccountBalance: 'Account Balance',
  sslInvoiceNumber: 'Invoice Number',
  sslTransactionType: 'Transaction Type',
  sslResultMessage: 'Result Message',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
};

const ElavonPaymentView = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const { axiosInstance } = useAuth();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axiosInstance.get(`/elavonPaymentTransactions/${id}`);
        setPayment(res.data);
      } catch (err) {
        console.error('Failed to fetch payment:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  if (loading) return <MainAppSpinner />;
  if (!payment) return <div className="main-header">No payment found.</div>;

  return (
    <div className="view-container">
      <div className="createdr-section-title"> Payment Details </div>








 <ButtonCustomizedAction
        onClick={() => navigate(-1)}  
        label="Back"
        action="back" 
      />


      <div className="createdr-section">
        {Object.entries(payment).map(([key, value], index) => {
          if (hiddenFields.has(key) || value === null || value === '') return null;

          const label = keyLabelMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
          let displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;

          if (key.toLowerCase().includes('amount') || key === 'sslAccountBalance') {
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
              <div style={{ fontWeight: '500', color: '#333' }}>{label}</div>
              <div className="table-value" style={{ textAlign: 'right', color: '#000' }}>
                {displayValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElavonPaymentView;
