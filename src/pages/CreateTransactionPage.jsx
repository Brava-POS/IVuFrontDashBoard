import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { CiSquareRemove } from 'react-icons/ci';
import MainAppSpinner from '../components/MainAppSpinner';
import MerchantDropdownSelector from '../components/MerchantDropdownSelector';
import 'react-datepicker/dist/react-datepicker.css';
import BackButton from '../components/BackButton';
import Input from '../components/Input ';
import ButtonCustomizedAction from '../components/ButtonCustomizedAction';
import DateInput from '../components/DateInput';
import TimeInputComponent from '../components/TimeInputComponenet';

const CreateTransactionPage = () => {
  const navigate = useNavigate();
  const { axiosInstance } = useAuth();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    posEntryModePos75_76L2: '',// slect between / default  "M " , "S " , "I " , "P " , "O " , "MO", "SO","IO", "PO", "OO"
    transactionTypePos165_166L2: '',// selct netween //  default DB, CR, VP, VR, NA
    paymentMethodPos14_17L4: '',// select //  default CASH, CHCK, DEBT, CRED, EBTC, EBTF, MULT, GIFT, STCR
    transactionDatePos81_88L8: '',
    transactionTimePos89_94L6: '',
    transactionAmountPos95_103L9: '',
    salesAmountPos104_112L9: '',
    stateTaxAmountPos113_121L9: '',
    cityTaxAmountPos122_130L9: '',
    reducedStateTaxPos153_163L11: '',
    controlNumberCodePrefixPos18_19L2: 'BR',
    controlNumberCodePos20_29L10: 'ASWERKLRTE',
    terminalBatchNumberPos60_62L3: '001',
    transactionSequencePos63_74L12: '000000000001',
    terminalNumberPos44_59L16: '1111111111111111',
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


 


//   const handleDateChange = (date) => {
//     if (!date) {
//       setFormData((prev) => ({ ...prev, transactionDatePos81_88L8: '' }));
//       return;
//     }
//     const formatted = format(date, 'yyyyMMdd');
//     setFormData((prev) => ({ ...prev, transactionDatePos81_88L8: formatted }));
//   };
//   const handleTimeChange = (e) => {
//     // Allow only digits and max length 6
//     let val = e.target.value.replace(/\D/g, '').slice(0, 6);
//     setFormData((prev) => ({ ...prev, transactionTimePos89_94L6: val }));
//   };

//  // Convert time Date object to HHMMSS string
//   const formatTime = (date) => {
//     if (!date) return '';
//     return format(date, 'HHmmss');
//   };

const handleDateChange = (value) => {
  // value comes as "YYYY-MM-DD"
  if (!value) {
    setFormData(prev => ({ ...prev, transactionDatePos81_88L8: '' }));
    return;
  }
  // Remove dashes to get YYYYMMDD format
  const formatted = value.replace(/-/g, '');
  setFormData(prev => ({ ...prev, transactionDatePos81_88L8: formatted }));
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
    if (originalFormData[field]) { 
      const converted = convertValue(originalFormData[field], len);
      newData[field] = converted || originalFormData[field]; 
    }
  });

  return newData;
};

  const validate = () => {
    const newErrors = {};



if (!formData.posEntryModePos75_76L2) {
  newErrors.posEntryModePos75_76L2 = 'POS Entry Mode is required';
}

if (!formData.transactionTypePos165_166L2) {
  newErrors.transactionTypePos165_166L2 = 'Transaction Type is required';
}

if (!formData.paymentMethodPos14_17L4) {
  newErrors.paymentMethodPos14_17L4 = 'Payment Method is required';
}













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



//  setFormData({
  //  posEntryModePos75_76L2: '',// slect between / default  "M " , "S " , "I " , "P " , "O " , "MO", "SO","IO", "PO", "OO"
  //   transactionTypePos165_166L2: '',// selct netween //  default DB, CR, VP, VR, NA
  //   paymentMethodPos14_17L4: '',// select //  default CASH, CHCK, DEBT, CRED, EBTC, EBTF, MULT, GIFT, STCR
//     transactionDatePos81_88L8: '',
//     transactionTimePos89_94L6: '',
//     transactionAmountPos95_103L9: '',
//     salesAmountPos104_112L9: '',
//     stateTaxAmountPos113_121L9: '',
//     cityTaxAmountPos122_130L9: '',
//     reducedStateTaxPos153_163L11: '',
//     controlNumberCodePrefixPos18_19L2: 'BR',
//     controlNumberCodePos20_29L10: 'ASWERKLRTE',
//     terminalBatchNumberPos60_62L3: '001',
//     transactionSequencePos63_74L12: '000000000001',
//     terminalNumberPos44_59L16: '1111111111111111',
//   });




  // navigate('/transactions');
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
<>





<div className="createdr-section-title">Create New Transaction</div>
<BackButton to="/transactions" label="Back to Transactions " />

  <div className="filter-item">
        <MerchantDropdownSelector onSelect={handleSelectMerchant} />
      </div>



     
    <div className="createdr-section">



 
    
      <div className="createdr-form">
{/* POS Entry Mode */}
<div className="createdr-form-group">
  <label htmlFor="posEntryModePos75_76L2">POS Entry Mode</label>
  <select
    name="posEntryModePos75_76L2"
    value={formData.posEntryModePos75_76L2}
    onChange={handleChange}
    className="createdr-form-input"
  >
    <option value="">Select Mode</option>
    <option value="M ">M</option>
    <option value="S ">S</option>
    <option value="I ">I</option>
    <option value="P ">P</option>
    <option value="O ">O</option>
    <option value="MO">MO</option>
    <option value="SO">SO</option>
    <option value="IO">IO</option>
    <option value="PO">PO</option>
    <option value="OO">OO</option>
  </select>
</div>
{errors.posEntryModePos75_76L2 && (
  <div className="createdr-error">{errors.posEntryModePos75_76L2}</div>
)}
{/* Transaction Type */}
<div className="createdr-form-group">
  <label htmlFor="transactionTypePos165_166L2">Transaction Type</label>
  <select
    name="transactionTypePos165_166L2"
    value={formData.transactionTypePos165_166L2}
    onChange={handleChange}
    className="createdr-form-input"
  >
    <option value="">Select Type</option>
    <option value="DB">DB</option>
    <option value="CR">CR</option>
    <option value="VP">VP</option>
    <option value="VR">VR</option>
    <option value="NA">NA</option>
  </select>
</div>
{errors.transactionTypePos165_166L2 && (
  <div className="createdr-error">{errors.transactionTypePos165_166L2}</div>
)}
{/* Payment Method */}
<div className="createdr-form-group">
  <label htmlFor="paymentMethodPos14_17L4">Payment Method</label>
  <select
    name="paymentMethodPos14_17L4"
    value={formData.paymentMethodPos14_17L4}
    onChange={handleChange}
    className="createdr-form-input"
  >
    <option value="">Select Method</option>
    <option value="CASH">CASH</option>
    <option value="CHCK">CHCK</option>
    <option value="DEBT">DEBT</option>
    <option value="CRED">CRED</option>
    <option value="EBTC">EBTC</option>
    <option value="EBTF">EBTF</option>
    <option value="MULT">MULT</option>
    <option value="GIFT">GIFT</option>
    <option value="STCR">STCR</option>
  </select>
</div>

{errors.paymentMethodPos14_17L4 && (
  <div className="createdr-error">{errors.paymentMethodPos14_17L4}</div>
)}
<DateInput
  value={
    // convert stored YYYYMMDD to YYYY-MM-DD for input display
    formData.transactionDatePos81_88L8
      ? formData.transactionDatePos81_88L8.replace(
          /^(\d{4})(\d{2})(\d{2})$/,
          '$1-$2-$3'
        )
      : ''
  }
  onChange={handleDateChange}
  error={errors.transactionDatePos81_88L8}
/>


<TimeInputComponent
  value={formData.transactionTimePos89_94L6}
  onChange={(value) =>
    setFormData((prev) => ({ ...prev, transactionTimePos89_94L6: value }))
  }
  error={errors.transactionTimePos89_94L6}
/>

         <Input
          label="Transaction Amount"
          name="transactionAmountPos95_103L9"
          value={formData.transactionAmountPos95_103L9}
          onChange={handleChange}
          prefix="$"
          type="number"
          step="0.01"
          error={errors.transactionAmountPos95_103L9}
        />


         <Input
          label="Sales Amount"
          name="salesAmountPos104_112L9"
          value={formData.salesAmountPos104_112L9}
          onChange={handleChange}
          prefix="$"
          type="number"
          step="0.01"
          error={errors.salesAmountPos104_112L9}
        />

     
         <Input
          label="State Tax Amount"
           name="stateTaxAmountPos113_121L9"
            value={formData.stateTaxAmountPos113_121L9}
            onChange={handleChange}
          prefix="$"
          type="number"
          step="0.01"
          error={errors.stateTaxAmountPos113_121L9}
        />


         <Input
          label="City Tax Amount"
          name="cityTaxAmountPos122_130L9"
            value={formData.cityTaxAmountPos122_130L9}
            onChange={handleChange}
          prefix="$"
          type="number"
          step="0.01"
          error={errors.cityTaxAmountPos122_130L9}
        />


         <Input
          label="Reduced State Tax"
          name="reducedStateTaxPos153_163L11"
          value={formData.reducedStateTaxPos153_163L11}
          onChange={handleChange}
          prefix="$"
          type="number"
          step="0.01"
          error={errors.reducedStateTaxPos153_163L11}
        />


<div className="createdr-section">

<div className="createdr-section-title">Additional Amounts</div>
 

      
{additionalAmounts.map((item, index) => (


<div >
  <div key={index} className="adding-item-row">



    <div className="adding-item-group">
    <label className="adding-item-label">Amount $</label>
      <input
        value={item.amount}
        onChange={(e) => handleAdditionalChange(index, 'amount', e.target.value)}
         className="adding-item-input"
      />
    </div>




  <div className="adding-item-group">
    <label className="adding-item-label">Type</label>
      <select
        value={item.type}
        onChange={(e) => handleAdditionalChange(index, 'type', e.target.value)}
      className="adding-item-input"
      >
        {typeOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>





    <div className="createdr-delete-icon" onClick={() => handleDeleteAmount(index)}>
       <CiSquareRemove  className="createdr-delete-icon"  size={28} />
    </div>




  


     
  </div>

<div className="adding-item-error">


    {(errors[`additional_amount_${index}`] || errors[`additional_type_${index}`]) && (
      <div className="createdr-additional-error">

        {errors[`additional_amount_${index}`] || errors[`additional_type_${index}`]}
       
      </div>




    )}
     </div>

</div>




))}












 <ButtonCustomizedAction action="create" label="Add  new Additional Amount " onClick={handleAddAnother} />




</div>








 <ButtonCustomizedAction action="create" label="Create new transaction" onClick={handleSubmit} />














       

     

  
      </div>


      
    </div>


    




</>


  );
};

export default CreateTransactionPage;






