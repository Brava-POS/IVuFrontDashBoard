import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import { showAlert } from '../components/SweetAlertComponent';
import BackButton from '../components/BackButton';
import RedTitle from '../components/RedTitle';
import Input from '../components/Input ';
import EditButton from '../components/EditButton';


const picFields = [
  { field: "transactionAmount", length: 9 },
  { field: "salesAmount", length: 9 },
  { field: "stateTaxAmount", length: 9 },
  { field: "cityTaxAmount", length: 9 },
  { field: "reducedStateTax", length: 11 },
  { field: "additionalAmountTotalAmount", length: 9 },
];

// Convert from string to zero-padded PIC format
const convertValue = (val, length) => {
  if (!val?.toString().trim() || !/^-?\d+(\.\d{1,2})?$/.test(val)) return null;
  const number = parseFloat(val);
  const max = length === 11 ? 999999999.99 : 9999999.99;
  if (Math.abs(number) > max) return null;
  const intVal = Math.round(Math.abs(number) * 100);
  return intVal.toString().padStart(length, "0");
};

// Convert back to regular decimal on fetch
const reverseConvertValue = (val) => {
  if (!val || !/^-?\d+$/.test(val)) return "";
  return (parseInt(val, 10) / 100).toFixed(2);
};



const UpdateTransactionPage = () => {
  const { axiosInstance } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    merchantId: null,
    merchantSerialNumber:null,
    merchantTaxId:null,
    appUserAvatar: '',
    transactionDate: '',
    transactionTime: '',
    controlNumberCode: '',
    transactionAmount: '',
    salesAmount: '',
    stateTaxAmount: '',
    cityTaxAmount: '',
    reducedStateTax: '',
    controlNumberPrefix: '',
    terminalBatchNumber: '',
    transactionSequence: '',
    terminalNumber: '',
    additionalAmountOutcomeType:'',
    additionalAmountTotalAmount: '',
    additionalAmounts: [],
  });

  const fetchTransaction = async () => {
    try {
      const { data } = await axiosInstance.get(`/drs/getdr/${id}`);
      setForm((prev) => ({
        ...prev,
        merchantSerialNumber: data.merchantSerialNumber,
        merchantTaxId: data.merchantTaxId,
        appUserAvatar: data.appUserAvatar,
        merchantId: data.merchantId || null,
        transactionDate: data.transactionDate || '',
        transactionTime: data.transactionTime || '',
        transactionAmount: reverseConvertValue(data.transactionAmount) || '',
        salesAmount: reverseConvertValue(data.salesAmount) || '',
        stateTaxAmount: reverseConvertValue(data.stateTaxAmount) || '',
        cityTaxAmount: reverseConvertValue(data.cityTaxAmount) || '',
        reducedStateTax: reverseConvertValue(data.reducedStateTax) || '',
        controlNumberPrefix: data.controlNumberCodePrefix || '',
        controlNumberCode: data.controlNumberCode || '',
        terminalBatchNumber: data.terminalBatchNumber || '',
        transactionSequence: data.transactionSequence || '',
        terminalNumber: data.terminalNumber || '',
        additionalAmountOutcomeType: data.additionalAmountOutcomeType,
        additionalAmountTotalAmount: reverseConvertValue(data.additionalAmountTotalAmount) || '',
        additionalAmounts: (data.additionalAmountsSummary || []).map((item) => ({
          amount: reverseConvertValue(item.amount) || '',
          type: item.type || '  ',
        })),
      }));
    } catch {
      showAlert('error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!id) {
      showAlert('error', 'Missing ID!');
      navigate('/transactions');
      return;
    }
    fetchTransaction();
    // eslint-disable-next-line
  }, []); // fetch only once

  const validate = () => {
    const errors = {};
    picFields.forEach(({ field, length }) => {
      const converted = convertValue(form[field], length);
      if (converted === null) {
        errors[field] = `Invalid or exceeds max value ${"9".repeat(length)}. Must have at most 2 decimals.`;
      }
    });
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };














const sunmitTaxesNoAdditioanlAmount = async () => {
  const isValid = validate();


  if (!isValid) return;


   console.log("form",  form);




  const patchRequest = {
    transactionAmountPos95_103L9: convertValue(form.transactionAmount, 9),
    salesAmountPos104_112L9: convertValue(form.salesAmount, 9),
    stateTaxAmountPos113_121L9: convertValue(form.stateTaxAmount, 9),
    cityTaxAmountPos122_130L9: convertValue(form.cityTaxAmount, 9),
    reducedStateTaxPos153_163L11: convertValue(form.reducedStateTax, 11),
    clearAdditionalAmounts: false,
  };

   console.log("patchRequest",  patchRequest)


  try {
    setLoading(true);
    const res = await axiosInstance.put(`/drs/update/${id}`, patchRequest);
    setLoading(false);

  console.log("res",  res);
     if ((res.status >= 200 && res.status < 300) && res.data && res.data.updated === true) {
      showAlert('success', 'Updated Successfully');
      navigate('/transactions');
    } else {
      // backend could return 200 but not updated
      showAlert('error', 'SUpdated failed');
    }
  } catch (error) {
    setLoading(false);
    Swal.fire('Update failed', error?.response?.data?.message || '', 'error');
  }
};


 

  if (loading) return <MainAppSpinner />;
  return (
    <div className="createdr-container">
      <RedTitle title={`Update Transaction with control number: ${form.controlNumberCode}`} />
      <BackButton to="/transactions" label="Back to Transactions " />
      {/* Merchant Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {form.appUserAvatar && (
          <img
            src={form.appUserAvatar}
            alt="Merchant Avatar"
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '20px' }}
          />
        )}
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{form.merchantSerialNumber}</div>
          <div style={{ color: '#555' }}>{form.merchantTaxId}</div>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="createdr-section">
        <div className="createdr-section-title">Transaction Tax Details</div>
        <Input
          label="Transaction Amount"
          name="transactionAmount"
          value={form.transactionAmount}
          onChange={handleChange}
          prefix="$"
          type="number"
          step="0.01"
          error={errors.transactionAmount}
        />
        <Input
          label="Sales Amount"
          name="salesAmount"
          value={form.salesAmount}
          onChange={handleChange}
          prefix="$"
          type="number"
          step="0.01"
          error={errors.salesAmount}
        />
        <Input
          label="State Tax Amount"
          name="stateTaxAmount"
          value={form.stateTaxAmount}
          onChange={handleChange}
          prefix="$"
           step="0.01"
          type="number"
          error={errors.stateTaxAmount}
        />
        <Input
          label="City Tax Amount"
          name="cityTaxAmount"
          value={form.cityTaxAmount}
          onChange={handleChange}
          prefix="$"
          step="0.01"
          type="number"
          error={errors.cityTaxAmount}
        />
        <Input
          label="Reduced State Tax"
          name="reducedStateTax"
          value={form.reducedStateTax}
          onChange={handleChange}
          prefix="$"
         step="0.01"
          type="number"
          error={errors.reducedStateTax}
        />
        {/* <Input
          label="Additional Amount Total"
          name="additionalAmountTotalAmount"
          value={form.additionalAmountTotalAmount}
          onChange={handleChange}
          prefix="$"
          step="0.01"
          type="number"
          error={errors.additionalAmountTotalAmount}
        />
        <Input
          label="Outcome Type"
          name="additionalAmountOutcomeType"
          value={form.additionalAmountOutcomeType}
          onChange={handleChange}
        /> */}
        <EditButton title="Edit" onClick={sunmitTaxesNoAdditioanlAmount}  />

      </div>

      {/* SECTION 2 */}
      <div className="createdr-section">
       <div className="createdr-section-title">Additional Amounts Summary</div>
         <div className="createdr-section-sub-title">  {`Overall Total : $ ${form.additionalAmountTotalAmount}`} </div>
         <div className="createdr-section-sub-title"> {`Type Outcome : ${form.additionalAmountOutcomeType}`} </div>

        <div className="additional-summary">
          {/* Data Rows */}
          {form.additionalAmounts.map((item, idx) => (
            <div key={idx} className="additional-summary-item">
              <span className="summary-cell">{item.type}</span>
              <span className="summary-cell">${item.amount}</span>
              <div className="summary-actions">
                <button 
                  className="edit-button" 
                  onClick={() => console.log("Edit clicked", idx)
                }>Edit</button>
                <button 
                  className="remove-button" 
                  onClick={() => handleDeleteAdditional(idx)
                }>Remove</button>
              </div>
            </div>
          ))}
     
        </div>
      </div>
    </div>
  );
};

export default UpdateTransactionPage;