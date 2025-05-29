// src/components/UpdateAdditionalAmountModal.js
import React, { useState, useEffect } from "react";
import Input from "./Input "; // fix typo/path if needed!


const convertValue = (val, length) => {
  if (!val?.toString().trim() || !/^-?\d+(\.\d{1,2})?$/.test(val)) return null;
  const number = parseFloat(val);
  const max = length === 11 ? 999999999.99 : 9999999.99;
  if (Math.abs(number) > max) return null;
  const intVal = Math.round(Math.abs(number) * 100);
  return intVal.toString().padStart(length, "0");
};

const reverseConvertValue = (val) => {
  if (!val || !/^-?\d+$/.test(val)) return "";
  return (parseInt(val, 10) / 100).toFixed(2);
};

const UpdateAdditionalAmountModal = ({
  open,
  onClose,
  additionalAmountId,
  drId,
  axiosInstance,
  onSuccess,
  loading,
}) => {

  const [form, setForm] = useState({ amount: "", type: "  " }); 
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !additionalAmountId) return;
    setFetching(true);
    axiosInstance
      .get(`/additional-amounts/${additionalAmountId}`)
      .then((res) => {
        // Amount is in pic9, convert to decimal for field
        setForm({
          amount: reverseConvertValue(res.data.amount),
          type: res.data.type || "",
        });
      })
      .catch(() => setErrors({ amount: "Failed to load" }))
      .finally(() => setFetching(false));
  }, [open, additionalAmountId, axiosInstance]);

  if (!open) return null;

  const validate = () => {
    const errs = {};
    if (convertValue(form.amount, 9) === null)
      errs.amount =
        "Amount required, max 9 digits including 2 decimals. Use format 9999999.99";
 
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      // Convert amount to pic9 string for payload (as appears to be your backend usage)
      const pic9Amount = convertValue(form.amount, 9);
      await axiosInstance.put(`/additional-amounts/${additionalAmountId}`, {
        drId: drId,
        amount: pic9Amount, // send as pic9 string here
        type: form.type, 
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setErrors({
        amount: err?.response?.data?.message || "Failed to update amount.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="additional-modal-overlay">
      <div className="additional-modal-card">
        <div className="additional-modal-title">Update Additional Amount</div>
        {fetching ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : (
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
                disabled={saving}
              >
                Cancel
              </button>
              <button className="modal-btn" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default UpdateAdditionalAmountModal;