import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { CiSquareRemove } from 'react-icons/ci';
import MainAppSpinner from '../components/MainAppSpinner';
import SelectedDurationDisplay from '../components/SelectedDurationDisplay';
import MerchantDropdownSelector from '../components/MerchantDropdownSelector';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';
import TimeInput from '../components/TimeInput';

const CreateTransactionPage = () => {
  const navigate = useNavigate();
  const { axiosInstance } = useAuth();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    transactionDatePos81_88L8: '',
    transactionAmountPos95_103L9: '',
    salesAmountPos104_112L9: '',
    stateTaxAmountPos113_121L9: '',
    cityTaxAmountPos122_130L9: '',
    reducedStateTaxPos153_163L11: '',
    controlNumberCodePrefixPos18_19L2: '',
    controlNumberCodePos20_29L10: '',
    transactionTimePos89_94L6: '',
    terminalBatchNumberPos60_62L3: '',
    transactionSequencePos63_74L12: '',
    terminalNumberPos44_59L16: '',
  });
  const [additionalAmounts, setAdditionalAmounts] = useState([{ amount: '', type: '  ' }]);
  const [errors, setErrors] = useState({});
  const typeOptions = [
  { value: '  ', label: 'NA ' },
  { value: 'TP', label: 'TIP' },
  { value: 'CB', label: 'CASH BACK' },
  { value: 'SC', label: 'SERVICE CHARGE' },
  { value: 'GC', label: 'GIFT CARD' },
];






  const handleAddAnother = () => {
    setAdditionalAmounts([...additionalAmounts, { amount: '', type: '  ' }]);
  };

  const handleAdditionalChange = (index, key, value) => {
    const updated = [...additionalAmounts];
    updated[index][key] = value;
    setAdditionalAmounts(updated);
  };

  const handleDeleteAmount = (index) => {
    const updated = additionalAmounts.filter((_, i) => i !== index);
    setAdditionalAmounts(updated);
  };

  const showAlert = (message) => {
    Swal.fire({
      title: 'Validation Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  };






// Helper: Parse YYYYMMDD string to Date object
  const parseDate = (val) => {
    if (!val || val.length !== 8) return null;
    const year = Number(val.slice(0, 4));
    const month = Number(val.slice(4, 6)) - 1;
    const day = Number(val.slice(6, 8));
    return new Date(year, month, day);
  };

  // Helper: Parse HHMMSS string to a Date object (today + time)
  const parseTime = (val) => {
    if (!val || val.length !== 6) return null;
    const hours = Number(val.slice(0, 2));
    const minutes = Number(val.slice(2, 4));
    const seconds = Number(val.slice(4, 6));
    if (hours > 23 || minutes > 59 || seconds > 59) return null;
    const now = new Date();
    now.setHours(hours, minutes, seconds, 0);
    return now;
  };

 


  const handleDateChange = (date) => {
    if (!date) {
      setFormData((prev) => ({ ...prev, transactionDatePos81_88L8: '' }));
      return;
    }
    const formatted = format(date, 'yyyyMMdd');
    setFormData((prev) => ({ ...prev, transactionDatePos81_88L8: formatted }));
  };
  const handleTimeChange = (e) => {
    // Allow only digits and max length 6
    let val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, transactionTimePos89_94L6: val }));
  };

 // Convert time Date object to HHMMSS string
  const formatTime = (date) => {
    if (!date) return '';
    return format(date, 'HHmmss');
  };





const convertValue = (val, length) => {
  if (![9, 11].includes(length)) {
    throw new Error("Invalid length. Must be 9 or 11.");
  }

  if (!val || val.trim() === '') return null; // Return null for empty values

  // Ensure it's a valid number format
  if (!/^-?\d+(\.\d{1,2})?$/.test(val)) return null;

  const number = parseFloat(val);
  if (isNaN(number)) return null;

  const max = length === 11 ? 999999999.99 : 9999999.99;
  const min = -max;
  
  if (number > max || number < min) return null;

  const intVal = Math.round(Math.abs(number) * 100);
  return intVal.toString().padStart(length, '0');
};
  const picFields = [
    ['transactionAmountPos95_103L9', 9],
    ['salesAmountPos104_112L9', 9],
    ['stateTaxAmountPos113_121L9', 9],
    ['cityTaxAmountPos122_130L9', 9],
    ['reducedStateTaxPos153_163L11', 11],
  ];

const getFormattedFormData = (originalFormData) => {
  const newData = { ...originalFormData };

  picFields.forEach(([field, len]) => {
    if (originalFormData[field]) { // Only convert if value exists
      const converted = convertValue(originalFormData[field], len);
      newData[field] = converted || originalFormData[field]; // Fallback to original if conversion fails
    }
  });

  return newData;
};

  const validate = () => {
    const newErrors = {};


 if (!/^\d{8}$/.test(formData.transactionDatePos81_88L8)) {
      newErrors.transactionDatePos81_88L8 = 'Date must be in YYYYMMDD format';
    }

    // Validate transactionTimePos89_94L6 - must be 6 digits and valid time
    if (!/^\d{6}$/.test(formData.transactionTimePos89_94L6)) {
      newErrors.transactionTimePos89_94L6 = 'Time must be in HHMMSS format';
    } else {
      // Check if valid time (HH < 24, MM < 60, SS < 60)
      const t = formData.transactionTimePos89_94L6;
      const hh = parseInt(t.slice(0, 2), 10);
      const mm = parseInt(t.slice(2, 4), 10);
      const ss = parseInt(t.slice(4, 6), 10);
      if (hh > 23 || mm > 59 || ss > 59) {
        newErrors.transactionTimePos89_94L6 = 'Invalid time value';
      }
    }

  
picFields.forEach(([field, len]) => {
  const converted = convertValue(formData[field], len);
  if (converted === null) {
    newErrors[field] = `Invalid or exceeds max value ${'9'.repeat(len)}. Must have exactly 2 decimals.`;
  }
});



    if (!/^.{2}$/.test(formData.controlNumberCodePrefixPos18_19L2)) {
      newErrors.controlNumberCodePrefixPos18_19L2 = 'Must be 2 characters';
    }
    if (!/^.{10}$/.test(formData.controlNumberCodePos20_29L10)) {
      newErrors.controlNumberCodePos20_29L10 = 'Must be 10 characters';
    }
    if (!/^.{3}$/.test(formData.terminalBatchNumberPos60_62L3)) {
      newErrors.terminalBatchNumberPos60_62L3 = 'Must be 3 characters';
    }
    if (!/^.{12}$/.test(formData.transactionSequencePos63_74L12)) {
      newErrors.transactionSequencePos63_74L12 = 'Must be 12 characters';
    }
    if (!/^.{16}$/.test(formData.terminalNumberPos44_59L16)) {
      newErrors.terminalNumberPos44_59L16 = 'Must be 16 characters';
    }

additionalAmounts.forEach((item, idx) => {
  const keyAmount = `additional_amount_${idx}`;
  const keyType = `additional_type_${idx}`;

  // Validate amount
  const converted = convertValue(item.amount, 9);
  if (!item.amount || !converted) {
    newErrors[keyAmount] = 'Invalid amount or exceeds max allowed';
  }

  // Validate type: must exist and be exactly 2 characters (including spaces)
  if (typeof item.type !== 'string' || item.type.length !== 2) {
    newErrors[keyType] = 'Type must be exactly 2 characters';
  }
});


    if (Object.keys(newErrors).length > 0) {
       console.log("Validation errors:", newErrors);
    //  showAlert('Validation failed. Please fix errors.');
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };








const handleSubmit = async () => {
  console.log("Inside handleSubmit");
  if (!validate()) {
    console.log("Validation failed");
    return;
  }

  try {
    setLoading(true);

    const formattedFormData = getFormattedFormData(formData);

    // Format additional amounts using convertValue (not convertToPic9)
    const formattedAdditionalAmounts = additionalAmounts.map(a => ({
      amount: convertValue(a.amount, 9),
      type: a.type
    }));



if (!userId){


  showAlert(" Selecting a user is obligatory");
   setLoading(false);

return;



}


    const payload = {
      merchantId: userId,
      ...formattedFormData,
      additionalAmounts: formattedAdditionalAmounts
    };

    console.log(" Final payload:", JSON.stringify(payload, null, 2));

    const res = await axiosInstance.post('/drs/create', payload);
    console.log("response from creating ", res);

    await Swal.fire({
      title: 'Success!',
      text: 'Transaction created successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    setLoading(false);
   navigate('/transactions');
  } catch (err) {
    setLoading(false);
    const msg = err?.response?.data?.message || 'Failed to create transaction';
    showAlert(msg);
  }
};

  if (loading) return <MainAppSpinner />;

  const handleSelectMerchant = (merchant) => {
    setUserId(merchant.id);
  };

  return (
    <div className="createdr-container">




  <h2 className="createdr-title">Create DR Transaction</h2>

      <button className="createdr-back-button" onClick={() => navigate('/transactions')}>
        ← Back to Transactions
      </button>













      <div className="filter-item">
        <MerchantDropdownSelector onSelect={handleSelectMerchant} />
      </div>

    
      <div className="createdr-form">

<div className="custom-datepicker-group">
  <label className="custom-datepicker-label">Transaction Date</label>
  <DatePicker
    selected={parseDate(formData.transactionDatePos81_88L8)}
    onChange={handleDateChange}
    dateFormat="yyyyMMdd"
    placeholderText="YYYYMMDD"
    className={`custom-datepicker-input ${
      errors.transactionDatePos81_88L8 ? 'custom-datepicker-error' : ''
    }`}
  />
  {errors.transactionDatePos81_88L8 && (
    <p className="custom-datepicker-error-text">{errors.transactionDatePos81_88L8}</p>
  )}
</div>






<div className="createdr-input-group">
  <label>Transaction Time</label>
  <TimeInput
    value={formData.transactionTimePos89_94L6}
    onChange={(value) => 
      setFormData(prev => ({ ...prev, transactionTimePos89_94L6: value }))
    }
    error={errors.transactionTimePos89_94L6}
  />
</div>

        <div className="createdr-input-group">
          <label>Transaction Amount</label>
          <input
          maxLength={9}
            name="transactionAmountPos95_103L9"
            value={formData.transactionAmountPos95_103L9}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.transactionAmountPos95_103L9 && <div className="createdr-error">{errors.transactionAmountPos95_103L9}</div>}
        </div>

        <div className="createdr-input-group">
          <label>Sales Amount</label>
          <input
              maxLength={8}
            name="salesAmountPos104_112L9"
            value={formData.salesAmountPos104_112L9}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.salesAmountPos104_112L9 && <div className="createdr-error">{errors.salesAmountPos104_112L9}</div>}
        </div>

        <div className="createdr-input-group">
          <label>State Tax Amount</label>
          <input
                maxLength={8}
            name="stateTaxAmountPos113_121L9"
            value={formData.stateTaxAmountPos113_121L9}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.stateTaxAmountPos113_121L9 && <div className="createdr-error">{errors.stateTaxAmountPos113_121L9}</div>}
        </div>

        <div className="createdr-input-group">
          <label>City Tax Amount</label>
          <input
              maxLength={8}
            name="cityTaxAmountPos122_130L9"
            value={formData.cityTaxAmountPos122_130L9}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.cityTaxAmountPos122_130L9 && <div className="createdr-error">{errors.cityTaxAmountPos122_130L9}</div>}
        </div>

        <div className="createdr-input-group">
          <label>Reduced State Tax</label>
          <input
              maxLength={9}
            name="reducedStateTaxPos153_163L11"
            value={formData.reducedStateTaxPos153_163L11}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.reducedStateTaxPos153_163L11 && <div className="createdr-error">{errors.reducedStateTaxPos153_163L11}</div>}
        </div>

        <div className="createdr-input-group">
          <label>Control Number Prefix</label>
             <input
                maxLength={2}
            name="controlNumberCodePrefixPos18_19L2"
            value={formData.controlNumberCodePrefixPos18_19L2}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.controlNumberCodePrefixPos18_19L2 && (
            <div className="createdr-error">
              {errors.controlNumberCodePrefixPos18_19L2}
            </div>
          )}
        </div>

        <div className="createdr-input-group">
          <label>Control Number Code</label>
          <input
             maxLength={10}
            name="controlNumberCodePos20_29L10"
            value={formData.controlNumberCodePos20_29L10}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.controlNumberCodePos20_29L10 && (
            <div className="createdr-error">
              {errors.controlNumberCodePos20_29L10}
            </div>
          )}
        </div>

     

        <div className="createdr-input-group">
          <label>Terminal Batch Number</label>
          <input

             maxLength={3}
            name="terminalBatchNumberPos60_62L3"
            value={formData.terminalBatchNumberPos60_62L3}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.terminalBatchNumberPos60_62L3 && (
            <div className="createdr-error">
              {errors.terminalBatchNumberPos60_62L3}
            </div>
          )}
        </div>

        <div className="createdr-input-group">
          <label>Transaction Sequence</label>
          <input
             maxLength={12}
            name="transactionSequencePos63_74L12"
            value={formData.transactionSequencePos63_74L12}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.transactionSequencePos63_74L12 && (
            <div className="createdr-error">
              {errors.transactionSequencePos63_74L12}
            </div>
          )}
        </div>

        <div className="createdr-input-group">
          <label>Terminal Number</label>
          <input
             maxLength={16}
            name="terminalNumberPos44_59L16"
            value={formData.terminalNumberPos44_59L16}
            onChange={handleChange}
            className="createdr-input"
          />
          {errors.terminalNumberPos44_59L16 && (
            <div className="createdr-error">
              {errors.terminalNumberPos44_59L16}
            </div>
          )}
        </div>

     


      <h3 className="createdr-subtitle">Additional Amounts</h3>

      
{additionalAmounts.map((item, index) => (
  <div key={index} className="createdr-additional">
    <div className="createdr-input-group">
      <label>Amount</label>
      <input
        value={item.amount}
        onChange={(e) => handleAdditionalChange(index, 'amount', e.target.value)}
        className="createdr-input"
      />
    </div>

    <div className="createdr-input-group">
      <label>Type</label>
      <select
        value={item.type}
        onChange={(e) => handleAdditionalChange(index, 'type', e.target.value)}
        className="createdr-input"
      >
        {typeOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>

    <div className="createdr-delete-icon" onClick={() => handleDeleteAmount(index)}>
      <CiSquareRemove size={20} />
    </div>

    {(errors[`additional_amount_${index}`] || errors[`additional_type_${index}`]) && (
      <div className="createdr-additional-error">
        {errors[`additional_amount_${index}`] || errors[`additional_type_${index}`]}
      </div>
    )}
  </div>
))}

<button className="createdr-add-button" onClick={handleAddAnother}>
  + Add Another
</button>





       

     

        <button
          className="createdr-submit-button"
          onClick={handleSubmit}
        >
          Create Transaction
        </button>
      </div>
    </div>
  );
};

export default CreateTransactionPage;






