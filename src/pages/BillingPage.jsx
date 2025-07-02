import React, { useEffect, useState, useRef } from 'react';

import Swal from 'sweetalert2';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import MainAppSpinner from '../components/MainAppSpinner';
import { FaCalendarAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaFilePdf } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

function BillingPage() {
  const { axiosInstance } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axiosInstance.get('/app-users/merchant/Billing');

        console.log(" billing data ",response.data)
        setData(response.data);
      } catch (error) {
        console.error('Failed to load billing data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillingData();
  }, []);

  const downloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.5,
      filename: 'billing_invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  if (loading) return <div className="invoice-spinner-wrapper"><MainAppSpinner /></div>;
  if (!data) return <div className="invoice-error-message">Failed to load billing data.</div>;

  // const subscription = data.elavonSubscriptions?.[0];
  // const lastPayment = subscription?.lastPayment;

  const hasSubscriptions = Array.isArray(data.elavonSubscriptions) && data.elavonSubscriptions.length > 0;
const subscription = hasSubscriptions ? data.elavonSubscriptions[0] : null;
const lastPayment = subscription?.lastPayment;

return (
  <div className="invoice-wrapper">
    {!hasSubscriptions ? (
      <div className="invoice-free-plan-message">
        <div className="centered-message">
          <h2>Dear Customer,</h2>
          <p>You have a <strong>free plan subscription</strong> because you are a <strong>Brava</strong> customer.</p>
        </div>
      </div>
    ) : (
      <>
        {/* PDF Download Button - Outside Invoice Card */}
        <div className="invoice-toolbar no-print">
          <button className="invoice-download-btn" onClick={downloadPDF}>
            <FaFilePdf className="pdf-icon" />
            Download PDF
          </button>
        </div>

        <div className="invoice-container">
          <div className="invoice-card" ref={invoiceRef}>
            {/* Header */}
            <div className="invoice-header">
              <div className="invoice-brand">
                <h2 className="invoice-title">Billing Invoice</h2>
                <p className="invoice-issued-date">Issued: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Merchant Info */}
            <div className="invoice-section">
              <h3 className="invoice-section-title">Merchant Information</h3>
              <div className="invoice-info-table">
                <div><span>Username:</span><strong>{data.username}</strong></div>
                <div><span>Email:</span><strong><FaEnvelope /> {data.email}</strong></div>
                <div><span>Address:</span><strong><FaMapMarkerAlt /> {data.address}, {data.city}, {data.zip}, {data.country}</strong></div>
                <div><span>Member Since:</span><strong><FaCalendarAlt /> {data.createdAt}</strong></div>
                <div><span>Merchant Code:</span><strong><FaUser /> {data.merchantSerialCode}</strong></div>
              </div>
            </div>

            {/* Subscription Info */}
            <div className="invoice-section">
              <h3 className="invoice-section-title">Subscription Details</h3>
              <div className="invoice-grid">
                <div><strong>Plan:</strong> {subscription.planName}</div>
                <div><strong>Billing Cycle:</strong> {subscription.planBillingCycle}</div>
                <div><strong>Price:</strong> ${subscription.planPrice.toFixed(2)}</div>
                <div><strong>Status:</strong> {subscription.subscrptionStatus}</div>
                <div><strong>Next Billing:</strong> {subscription.subscrptionNextBillingDate}</div>
              </div>
            </div>

            {/* Last Payment */}
            <div className="invoice-section">
              <h3 className="invoice-section-title">Last Payment</h3>
              {lastPayment ? (
                <div className="invoice-grid">
                  <div><strong>Transaction ID:</strong> {lastPayment.sslTxnId}</div>
                  <div><strong>Amount:</strong> ${lastPayment.sslAmount}</div>
                  <div><strong>Date:</strong> {lastPayment.sslTxnTime}</div>
                  <div><strong>Invoice Number:</strong> {lastPayment.invoiceNymber}</div>
                  <div><strong>Status:</strong> {lastPayment.sslResult}</div>
                </div>
              ) : <p>No payment history found.</p>}
            </div>

            {/* Authority Footer */}
            <div className="invoice-authority">
              <hr />
              <p>
                Issued by: <strong>Brava Business Solution</strong><br />
                Brava Control Processor Number: <strong>123455677</strong>
              </p>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);


}

export default BillingPage;