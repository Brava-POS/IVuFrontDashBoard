import React from "react";
import ButtonCustomizedAction from "./ButtonCustomizedAction";
import AppFlexBox from "./AppFlexBox";

const RoleToggle = ({
  value,
  onChange,
  options = ["guest", "admin"],
  label = "",
}) => {
  const getLabel = (option) => {
    if (option === "guest") return "Select by Guests";
    if (option === "admin") return "Select by Admins";
    return option.charAt(0).toUpperCase() + option.slice(1);
  };

  return (
    <div className="role-toggle-container">
      {label && <label className="role-toggle-label">{label}:</label>}
      {options.map((option) => (
        <AppFlexBox key={option} justify="s">
          <ButtonCustomizedAction
            action={option} // icon is chosen here
            label={getLabel(option)} // friendly label
            onClick={() => onChange(option)}
            disabled={value === option} // disable if already selected
          />
        </AppFlexBox>
      ))}
    </div>
  );
};

export default RoleToggle;

{/* 
"s" → flex-start

"e" → flex-end

"in" → space-between

"around" → space-around

"even" → space-evenly */}



{/* <AppFlexBox justify="s"> */}

