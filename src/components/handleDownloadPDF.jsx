const handleDownloadPDF = async (transaction) => {
  try {
    const response = await axiosInstance.post('/pdf/generate', {
      controlNumber: transaction.controlNumber,
      amount: transaction.additionalAmountTotalAmount,
    });

    const pdfKey = response.data;
    const pdfUrl = `http://localhost:9999/s3/download/${pdfKey.split('/').pop()}`;
    window.open(pdfUrl, '_blank');
  } catch (err) {
    console.error("Failed to generate or download PDF", err);
    alert("PDF generation failed.");
  }
};
