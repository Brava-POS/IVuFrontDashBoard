import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
  
function PaymentForm() {
  const [showIframe, setShowIframe] = useState(true);

useEffect(() => {
  const handleMessage = (event) => {
    console.log("Message event received from react :", event);
    console.log("Event Origin from react :", event.origin);
    console.log("Event Data from react :", event.data);

    if (event.origin !== "https://converge.bravuspos.com") return;

    if (typeof event.data === 'string') {
      if (event.data === 'closeIframe') {
        setShowIframe(false);
      }
    } else if (typeof event.data === 'object') {
      if (event.data?.type === "CONVERGE_PAYMENT_APPROVED") {
        const response = event.data.payload;
        console.log("response back from iframe to react", response);

        setShowIframe(false);

        Swal.fire({
          title: "✅ Payment Approved",
          html: `
            <strong>Approval Code:</strong> ${response.ssl_approval_code}<br/>
            <strong>Card:</strong> ${response.ssl_card_number}<br/>
            <strong>Txn ID:</strong> ${response.ssl_txn_id}<br/>
            <strong>Token:</strong> ${response.ssl_token}
          `,
          icon: "success",
          allowOutsideClick: false,
        });
      }
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);


  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", backgroundColor: "#fff"
    }}>
      {showIframe && (
        <iframe
          src="https://converge.bravuspos.com/brava_paymenet_gateway.html"
          title="Secure Payment Form"
          width="100%"
          height="600"
          style={{
            maxWidth: "600px",
            border: "none",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
        />
      )}
    </div>
  );
}

export default PaymentForm;
