import React, { useState } from "react";
import Input from "./Input "; // Note: check path if you have typo/space!


const convertValue = (val, length) => {
  if (!val?.toString().trim() || !/^-?\d+(\.\d{1,2})?$/.test(val)) return null;
  const number = parseFloat(val);
  const max = length === 11 ? 999999999.99 : 9999999.99;
  if (Math.abs(number) > max) return null;
  const intVal = Math.round(Math.abs(number) * 100);
  return intVal.toString().padStart(length, "0");
};

const AdditionalAmountModal = ({
  open,
  onClose,
  onSubmit,
  drId,
  loading = false,
}) => {
  const [form, setForm] = useState({ amount: "", type: "  " });
  const [errors, setErrors] = useState({});

  if (!open) return null; // Only render if open

  const validate = () => {
    const errors = {};
    // Amount PIC9/2
    if (convertValue(form.amount, 9) === null)
      errors.amount =
        "Amount required, max 9 digits including 2 decimals. Use format 9999999.99";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  

       const pic9Amount = convertValue(form.amount, 9);
    onSubmit({
      drId,
      amount: pic9Amount,
      type: form.type, 
    });
  };

  return (
    <div className="additional-modal-overlay">
      <div className="additional-modal-card">
        <div className="additional-modal-title">Add Additional Amount</div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            error={errors.amount}
            prefix="$"
            autoFocus
          />





      <div style={{ marginBottom: "1.2em" }}>
  <label style={{ fontWeight: 500, color: "#b70707", display: "block", marginBottom: 5 }}>
    Type
  </label>
  <select
    name="type"
    value={form.type}
    onChange={handleChange}
    style={{
      padding: "0.5em",
      width: "100%",
      borderRadius: 5,
      border: "1.5px solid #ce1717",
      background: "#fff6f6",
      fontSize: 16,
      color: "#444",
    }}
  >
    <option value="  ">N/A</option>
    <option value="TP">TIP</option>
    <option value="CB">CASH BACK</option>
    <option value="SC">SERVICE CHARGE</option>
    <option value="GC">GIFT CARD</option>
  </select>
  {errors.type && <div style={{ color: "#db3030", marginTop: 4 }}>{errors.type}</div>}
</div>







          <div className="additional-modal-actions">
            <button
              className="modal-btn red"
              onClick={onClose}
              type="button"
              disabled={loading}
            >
              Cancel
            </button>
            <button className="modal-btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdditionalAmountModal;