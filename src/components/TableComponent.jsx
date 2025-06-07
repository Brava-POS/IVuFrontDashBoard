import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import aditional from "../assets/images/addtax.jpg";
import label from "../assets/images/label.png";
import PaginationComponent from "./PaginationComponent";
import { useAuth } from "../context/AuthContext";
import AppFlexBox from "./AppFlexBox";
import ButtonCustomizedAction from "./ButtonCustomizedAction";
import  placeHolder  from '../assets/images/placeHolder.png';

const TableComponent = ({
  visibleColumns,
  currentPage,
  totalPages,
  onPageChange,
  data,
  viewRoute = "/view-transaction-page",
  updateRoute = "/update-transaction-page",
  columnNameOverrides = {},
  columnOrder = [],
  customCellRenderers = {},
  showViewButton = true,
  showUpdateButton = true,
  showDeleteButton = true,
  handleDelete = (id) => console.log(`Delete clicked for row with ID: ${id}`),
  restore = null,
  handleblock = (id) => console.log(`Block clicked for row with ID: ${id}`),
  handleAccountLocked = (id) => console.log(`Unlock clicked for row with ID: ${id}`),
  handlecrdentialsExpired = (id) => console.log(`Reset credentials clicked for row with ID: ${id}`),
  handleAccountExpired = (id) => console.log(`Reactivate clicked for row with ID: ${id}`),
  handleActive = (id) => console.log(`Activate clicked for row with ID: ${id}`),
}) => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const canDeleteTransactions = hasPermission("Transactions", "delete");

  const [selectedRow, setSelectedRow] = useState(null);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="no-data-container">
        <div className="no-data-message">No Record Found</div>
      </div>
    );
  }

  const handleRowSelect = (id) => {
    const newRow = data.find((row) => row.id === id);
    setSelectedRow((prev) => (prev?.id === id ? null : newRow));
  };

  const handleBulkView = () => {
    if (selectedRow) navigate(`${viewRoute}/${selectedRow.id}`);
  };

  const handleBulkUpdate = () => {
    if (selectedRow) navigate(`${updateRoute}/${selectedRow.id}`);
  };

  const handleBulkDelete = () => {
    if (selectedRow) {
      handleDelete(selectedRow.id);
      setSelectedRow(null);
    }
  };

  const handleBulkBlock = () => {
    if (selectedRow) {
      handleblock(selectedRow.id);
      setSelectedRow(null);
    }
  };

  const handleBulkAccountLocked = () => {
    if (selectedRow) {
      handleAccountLocked(selectedRow.id);
      setSelectedRow(null);
    }
  };

  const handleBulkCredentialsExpired = () => {
    if (selectedRow) {
      handlecrdentialsExpired(selectedRow.id);
      setSelectedRow(null);
    }
  };

  const handleBulkAccountExpired = () => {
    if (selectedRow) {
      handleAccountExpired(selectedRow.id);
      setSelectedRow(null);
    }
  };

  const handleBulkActivate = () => {
    if (selectedRow) {
      handleActive(selectedRow.id);
      setSelectedRow(null);
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

  const hasFlags =
    selectedRow?.active ||
    selectedRow?.blocked ||
    selectedRow?.deleted ||
    selectedRow?.accountExpired ||
    selectedRow?.accountLocked ||
    selectedRow?.credentialsExpired;

  return (
    <div className="table-outer-container">
      <AppFlexBox justify="s">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </AppFlexBox>

      <div style={{ marginBottom: "20px" }}></div>



{selectedRow && !canDeleteTransactions && selectedRow.active !== false && (
  <>
    {showViewButton && (
      <ButtonCustomizedAction
        action="view"
        label="View"
        onClick={handleBulkView}
      />
    )}
  </>
)}





























      

      {canDeleteTransactions && (
        <div className="table-controls top-controls">
          <AppFlexBox justify="s">
            {selectedRow && (
              <>
                {selectedRow.blocked && (
                  <ButtonCustomizedAction
                    action="unblock"
                    label="Unblock"
                    onClick={handleBulkBlock}
                  />
                )}

                {selectedRow.active === false && (
                  <ButtonCustomizedAction
                    action="activate"
                    label="Activate"
                    onClick={handleBulkActivate}
                  />
                )}

                {selectedRow.accountExpired && (
                  <ButtonCustomizedAction
                    action="activate"
                    label="Reactivate"
                    onClick={handleBulkAccountExpired}
                  />
                )}

                {selectedRow.accountLocked && (
                  <ButtonCustomizedAction
                    action="unlock"
                    label="Unlock"
                    onClick={handleBulkAccountLocked}
                  />
                )}

                {selectedRow.credentialsExpired && (
                  <ButtonCustomizedAction
                    action="expire"
                    label="Reset Credentials"
                    onClick={handleBulkCredentialsExpired}
                  />
                )}

          
                {selectedRow.active !== false && (
                  <>
                    {showViewButton && (
                      <ButtonCustomizedAction
                        action="view"
                        label="View"
                        onClick={handleBulkView}
                      />
                    )}

                    {showUpdateButton && (
                      <ButtonCustomizedAction
                        action="update"
                        label="Update"
                        onClick={handleBulkUpdate}
                      />
                    )}

                    {showDeleteButton && (
                      <ButtonCustomizedAction
                        action="delete"
                        label="Delete"
                        onClick={handleBulkDelete}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </AppFlexBox>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Select</th>
              {columnKeys
                .filter((key) => visibleColumns.includes(key))
                .map((key, index) => (
                  <th key={index}>{getColumnLabel(key)}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  ${row.deleted ? "row-deleted-table " : ""}
                  ${row.blocked ? "row-blocked-table" : ""}
                  ${row.active === false ? "row-inactive-table" : ""}
                  ${row.accountExpired ? "row-expired-table" : ""}
                  ${row.accountLocked ? "row-locked-table" : ""}
                  ${row.credentialsExpired ? "row-credentials-expired-table" : ""}
                `}
              >
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    type="checkbox"
                    checked={selectedRow?.id === row.id}
                    onChange={() => handleRowSelect(row.id)}
                    style={{
                      accentColor: selectedRow?.id === row.id ? "red" : "",
                    }}
                  />
                </td>
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


