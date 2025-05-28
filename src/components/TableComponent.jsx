import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import aditional from "../assets/images/addtax.jpg";
import label from "../assets/images/label.png";
import PaginationComponent from "./PaginationComponent";
import { useAuth } from "../context/AuthContext";

const TableComponent = ({
  visibleColumns,
  currentPage,
  totalPages,
  onPageChange,
  data,
  createRoute = "/create-transaction-page",
  viewRoute = "/view-transaction-page",
  updateRoute = "/update-transaction-page",
  handleDelete = (id) => console.log(`Delete clicked for row with ID: ${id}`),
  columnNameOverrides = {},
  columnOrder = [],
  customCellRenderers = {},
}) => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const canDeleteTransactions = hasPermission("Transactions", "delete");

  const [selectedRowId, setSelectedRowId] = useState(null);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="no-data-container">
        <div className="no-data-message">No Data Available.</div>
      </div>
    );
  }

  const handleRowSelect = (id) => {
    setSelectedRowId((prev) => (prev === id ? null : id));
  };

  const handleBulkView = () => {
    if (selectedRowId) navigate(`${viewRoute}/${selectedRowId}`);
  };

  const handleBulkUpdate = () => {
    if (selectedRowId) navigate(`${updateRoute}/${selectedRowId}`);
  };

  const handleBulkDelete = () => {
    if (selectedRowId) {
      handleDelete(selectedRowId);
      setSelectedRowId(null);
    }
  };

  const allKeys = Object.keys(data[0]);
  const columnKeys = [
    ...columnOrder,
    ...allKeys.filter((key) => !columnOrder.includes(key)),
  ];

  const getColumnLabel = (key) => {
    for (const [matchKey, label] of Object.entries(columnNameOverrides)) {
      if (key.includes(matchKey)) {
        return label;
      }
    }
    return key;
  };

  return (
    <div className="table-outer-container">
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {/* Top Action Controls */}
      {canDeleteTransactions && (
        <div className="table-controls top-controls">
          <button
            className="action-btn view"
            disabled={!selectedRowId}
            onClick={handleBulkView}
          >
            View
          </button>
          <button
            className="action-btn update"
            disabled={!selectedRowId}
            onClick={handleBulkUpdate}
          >
            Update
          </button>
          <button
            className="action-btn delete"
            disabled={!selectedRowId}
            onClick={handleBulkDelete}
          >
            Delete
          </button>
          <button
            className="action-btn create"
            onClick={() => navigate(createRoute)}
          >
            <FaPlus style={{ marginRight: "5px" }} />
            Create
          </button>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {/* Checkbox Header */}
              <th style={{ textAlign: "center" }}>Select</th>

              {/* Dynamic Column Headers */}
              {columnKeys
                .filter((key) => visibleColumns.includes(key))
                .map((key, index) => (
                  <th key={index}>{getColumnLabel(key)}</th>
                ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Single-Selection Checkbox */}
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectedRowId === row.id}
                    onChange={() => handleRowSelect(row.id)}
                    style={{
                      backgroundColor:
                        selectedRowId === row.id ? "red" : "transparent",
                      accentColor: selectedRowId === row.id ? "red" : "",
                    }}
                  />
                </td>

                {/* Dynamic Data Cells */}

                {columnKeys
                  .filter((key) => visibleColumns.includes(key))
                  .map((key, cellIndex) => (
                    <td key={cellIndex}>
                      {Array.isArray(row[key]) ? (
                        <ul>
                          {row[key].map((item, idx) => (
                            <li key={idx} className="showTransactionLi">
                              <img src={aditional} alt="Amount Icon" />
                              <span>{item.amount}</span>
                              <img src={label} alt="Type Icon" />
                              <span>{item.type}</span>
                            </li>
                          ))}
                        </ul>
                      ) : customCellRenderers[key] ? (
                        customCellRenderers[key](row[key])
                      ) : (
                        row[key]
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
