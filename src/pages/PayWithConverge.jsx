
import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/brava.png';
import { useAuth } from '../context/AuthContext';

function PayWithConverge() {
  const iframeRef = useRef(null);
  const navigate = useNavigate();
  const { axiosInstance ,fetchMenu,saveTokens} = useAuth();

  useEffect(() => {




 const handleMessage = async (event) => {
  const data = event?.data;
  if (!data || typeof data !== 'object') return;

  console.log("=== message received data by React ===", data);

  const { ssl_result, ssl_result_message, ssl_approval_code, ssl_amount } = data;

  if (ssl_result === "0" && ssl_result_message === "APPROVAL") {
    await Swal.fire({
      icon: 'success',
      title: 'Payment Approved',
      html: `<strong>Approval Code:</strong> ${ssl_approval_code}<br/><strong>Amount:</strong> $${ssl_amount}`,
      confirmButtonText: 'Continue'
    });

    Swal.fire({
      title: 'Please wait',
      text: 'Creating your merchant account and POS device...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      if (iframeRef.current) {
        iframeRef.current.style.display = 'none';
      }

      // ✅ Construct DTO-compliant object
      const payload = {
        sslTxnId: data.ssl_txn_id,
        sslAmount: data.ssl_amount,
        sslResultMessage: data.ssl_result_message,
        sslCardNumber: data.ssl_card_number,
        sslCardType: data.ssl_card_type,
        sslApprovalCode: data.ssl_approval_code,
        sslCustomerCode: data.ssl_customer_code,
        sslCardShortDescription: data.ssl_card_short_description,
        sslExpDate: data.ssl_exp_date,
        sslDepartureDate: data.ssl_departure_date,
        sslTxnTime: data.ssl_txn_time,
        sslCompletionDate: data.ssl_completion_date,
        sslToken: data.ssl_token,
        sslCustomerId: data.ssl_customer_id,
        sslSalestax: data.ssl_salestax,
        sslAccountBalance: data.ssl_account_balance,
        sslOarData: data.ssl_oar_data,
        sslCvv2Response: data.ssl_cvv2_response,
        sslVendorId: data.ssl_vendor_id,
        sslTokenResponse: data.ssl_token_response,
        sslGetToken: data.ssl_get_token,
        sslTokenFormat: data.ssl_token_format,
        sslTokenProvider: data.ssl_token_provider,
        sslTransactionType: data.ssl_transaction_type,
        sslAvsResponse: data.ssl_avs_response,
        sslPartnerAppId: data.ssl_partner_app_id,
        sslPs2000Data: data.ssl_ps2000_data,
        sslInvoiceNumber: data.ssl_invoice_number,
        sslMerchantInitiatedUnscheduled: data.ssl_merchant_initiated_unscheduled,
      };

      console.log("🔁 Cleaned payload to backend:", payload);

      const response = await axiosInstance.post(
        `/elavonMerchantSubscriptions/onboard?subscriptionId=1`,
        payload
      );

      if (response.status === 201) {

                const {
                        accessToken,
                        refreshToken,
                        user,
                        amountPaid,
                        cardType,
                        approvalCode,
                        nextBillingDate,
                      } = response.data;


saveTokens({ accessToken, refreshToken, user });


 await fetchMenu();




        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          html: `
          <p><strong>Amount Paid:</strong> $${amountPaid}</p>
            <p><strong>Card Type:</strong> ${cardType}</p>
            <p><strong>Approval Code:</strong> ${approvalCode}</p>
            <p><strong>Next Billing Date:</strong> ${nextBillingDate}</p>
          `,
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/'); 
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'Could not create account. Please try again.',
        });
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Server error occurred.',
      });
    }
  }
};














    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate, axiosInstance]);

  return (
    <div className="elavo_subscribe_pay-container">
      <div className="elavo_subscribe_sidebar">
        <img src={logo} alt="Brava Logo" className="elavo_subscribe_logo" />
        <h2>Subscribe to Brava Control</h2>
        <p className="elavo_subscribe_price">Price: $10 monthly</p>
      </div>

      <div className="elavo_subscribe_iframe-container">
        <iframe
          ref={iframeRef}
          src="https://converge.bravuspos.com/brava_iframe.html"
          title="Converge Payment"
          frameBorder="0"
        />
      </div>
    </div>
  );
}

export default PayWithConverge;
































// import React, { useEffect, useRef, useState } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import logo from '../assets/images/brava.png';
// import { useAuth } from '../context/AuthContext';

// function PayWithConverge() {
//   const iframeRef = useRef(null);
//   const navigate = useNavigate();
// const { loading, login, axiosInstance } = useAuth();
//   useEffect(() => {
//     const handleMessage = async (event) => {
//       const data = event?.data;
//       if (!data || typeof data !== 'object') return;

//       console.log("=== message received by React ===", event);
//       console.log("=== message received data by React ===", data);

//       const { ssl_result, ssl_result_message, ssl_approval_code, ssl_amount } = data;

//       if (ssl_result === "0" && ssl_result_message === "APPROVAL") {
//         await Swal.fire({
//           icon: 'success',
//           title: 'Payment Approved',
//           html: `<strong>Approval Code:</strong> ${ssl_approval_code}<br/><strong>Amount:</strong> $${ssl_amount}`,
//           confirmButtonText: 'Continue'
//         });

//         Swal.fire({
//           title: 'Please wait',
//           text: 'Creating your merchant account and POS device...',
//           allowOutsideClick: false,
//           allowEscapeKey: false,
//           didOpen: () => {
//             Swal.showLoading();
//           }
//         });

//         try {



//        if (iframeRef.current) {iframeRef.current.style.display = 'none';}


//      console.log("data to be sent ", data)
// await axiosInstance.post(
//   `/elavonMerchantSubscriptions/onboard?subscriptionId=123`,
//   data 
// );
   

//     window.addEventListener('message', handleMessage);
//     return () => window.removeEventListener('message', handleMessage);
//   }, [navigate]);

//   return (
//     <div className="elavo_subscribe_pay-container">
//       <div className="elavo_subscribe_sidebar">
//         <img src={logo} alt="Brava Logo" className="elavo_subscribe_logo" />
//         <h2>Subscribe to Brava Control</h2>
//         <p className="elavo_subscribe_price">Price: $10 monthly</p>
//       </div>

//       <div className="elavo_subscribe_iframe-container">
//         <iframe
//           ref={iframeRef}
//           src="https://converge.bravuspos.com/brava_iframe.html"
//           title="Converge Payment"
//           frameBorder="0"
//         />
//       </div>
//     </div>
//   );
// }

// export default PayWithConverge;
