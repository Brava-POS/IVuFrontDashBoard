import React from "react";
import { FaTimes } from "react-icons/fa";

const MainFilterInput = ({ label, value, onChange, ...rest }) => {
  const handleClear = () => {
    const fakeEvent = {
      target: { value: "" },
    };
    onChange(fakeEvent);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minWidth: "160px",
      }}
    >
      {label && (
        <label
          style={{
            marginBottom: "4px",
            fontWeight: 500,
            color: "black",
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: "relative" }}>
        <input
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "8px 30px 8px 10px",
            borderRadius: "6px",
            border: "1px solid rgb(129, 134, 129)",
            backgroundColor: "#fff",
            color: "black",
            fontWeight: 500,
          }}
          {...rest}
        />

        {value && (
          <FaTimes
            onClick={handleClear}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#b00020",
              cursor: "pointer",
              fontSize: "14px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MainFilterInput;
