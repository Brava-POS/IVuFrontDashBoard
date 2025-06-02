import React from "react";

const justifyMap = {
  s: "flex-start",
  e: "flex-end",
  in: "space-between",
  around: "space-around",
  even: "space-evenly",
};

const AppFlexBox = ({
  justify = "s",
  gap = "12px",
  padding = "8px",
  borderRadius = "6px",
  backgroundColor,
  style = {},
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: justifyMap[justify] || "flex-start",
        gap,
        padding,
        borderRadius,
        backgroundColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default AppFlexBox;
