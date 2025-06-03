import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import BackButton from '../components/BackButton';
import TableComponent from '../components/TableComponent';
import { useNavigate } from 'react-router-dom';


// Format cents to dollars
const formatAmount = (val) => {
  if (!val || isNaN(val)) return '-';
  const numeric = parseFloat(val);
  return `$ ${(numeric).toFixed(2)}`;
};

// Hidden fields
const hiddenFields = new Set([
  'id', 'deleted', 'merchantId', 'appUserAvatar', 'merchantUserrname',
  'merchantSerialNumber', 'additionalAmounts', 'additionalAmountsSummary'
]);

// Label overrides
const keyLabelMap = {
  subscriptionPlanId: 'Subscription Plan ID',
  nextBillingDate: 'Next Billing Date',
  active: 'Active',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
};

const MerchantSubscribtionsViewPage = () => {
  const { id } = useParams();
  const { axiosInstance } = useAuth();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });

  // Fetch subscription details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/elavonMerchantSubscriptions/${id}`);
        setSubscription(res.data);
      } catch (err) {
        console.error('Failed to fetch subscription:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Fetch related payments
  const fetchPayments = async (page = 0) => {
    try {
      setIsFetching(true);
      const res = await axiosInstance.get(
        `/elavonPaymentTransactions/search?subscriptionId=${id}&page=${page}&size=10`
      );

      const data = res.data;
      setPayments(data.content || []);
      setPageInfo({ pageNumber: data.number, totalPages: data.totalPages });
    } catch (err) {
      console.error('Failed to fetch payments:', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [id]);

  const handlePageChange = (newPage) => fetchPayments(newPage);

  if (loading) return <MainAppSpinner />;
  if (!subscription) return <div className="main-header">No subscription found.</div>;

  return (
    <div className="view-container">
      <div className="createdr-section-title"> Subscription Details </div>

      <BackButton to="/subscriptions" label="Back to Subscriptions" />

      <div className="createdr-section">
        {/* Standard Fields */}
        {Object.entries(subscription).map(([key, value], index) => {
          if (
            hiddenFields.has(key) ||
            value === null ||
            value === ''
          ) return null;

          const readableLabel = keyLabelMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
          const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value.toString();

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
              <div style={{ fontWeight: '500', color: '#333' }}>{readableLabel}</div>
              <div className="table-value" style={{ textAlign: 'right', color: '#000' }}>
                {displayValue}
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{ marginTop: '50px' }}>Payments</h3>
      {isFetching ? (
        <MainAppSpinner />
      ) : (
        <TableComponent
          data={payments}
          currentPage={pageInfo.pageNumber}
          totalPages={pageInfo.totalPages}
          onPageChange={handlePageChange}
          showUpdateButton={false}
           showDeleteButton ={false}
           viewRoute={"/elavon-payment-view"}



          visibleColumns={[
            "id",
            "sslCardShortDescription",
            "sslAmount",
            "sslTxnTime",
            "sslApprovalCode",
            "sslTxnId",
            "sslResult",
          ]}
          columnNameOverrides={{
            id: "Payment ID",
            sslCardShortDescription: "Card Type",
            sslAmount: "Amount",
            sslTxnTime: "Time",
            sslApprovalCode: "Approval Code",
            sslTxnId: "Transaction ID",
            sslResult: "Result",
          }}
          customCellRenderers={{
            sslAmount: (val) => formatAmount(val),
            sslResult: (val) => (
              <span style={{ color: val === 'APPROVAL'  ? 'green' : 'red' }}>{val}</span>
            ),
          }}
        />
      )}
    </div>
  );
};

export default MerchantSubscribtionsViewPage;
