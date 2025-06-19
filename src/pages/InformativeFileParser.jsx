import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppFlexBox from "../components/AppFlexBox";
import BackButton from "../components/BackButton";
import RedTitle from '../components/RedTitle';
import { BsDot } from "react-icons/bs";


const COLORS = [
  "#fff6f2", // Level 0
  "#ffede4", // Level 1
  "#ffdacf", // Level 2
  "#ffcab3", // Level 3
  "#fcbca0", // Level 4
];
const getGradientColor = (level) => COLORS[Math.min(level, COLORS.length - 1)];
const getFontSize = level => `${Math.max(26 - level*2, 16)}px`;


const FIELD_LABELS = {
  recordType: "Record Type",
  filler1: "Filler 1",
  filler2: "Filler 2",
  filler3: "Filler 3",
  filler4: "Filler 4",
  fileProcessingDate: "File Processing Date",
  fileType: "File Type",
  processorCertificationNumber: "Processor Certification Number",
  processorName: "Processor Name",
  versionNumber: "Version Number",
  institutionNumber: "Institution Number",
  institutionName: "Institution Name",
  merchantTaxId: "Merchant Tax ID",
  merchantNumber: "Merchant Number",
  merchantName: "Merchant Name",
  merchantCity: "Merchant City",
  merchantState: "Merchant State",
  merchantZipCode: "Merchant Zip Code",
  paymentIndicator: "Payment Indicator",
  paymentMethod: "Payment Method",
  totalBatchRecords: "Total Batch Records",
  totalBatchSalesAmount: "Total Batch Sales Amount",
  totalBatchStateTaxAmount: "Total Batch State Tax Amount",
  totalBatchCityTaxAmount: "Total Batch City Tax Amount",
  totalMerchantRecords: "Total Merchant Records",
  totalMerchantSalesAmount: "Total Merchant Sales Amount",
  totalMerchantStateTaxAmount: "Total Merchant State Tax Amount",
  totalMerchantCityTaxAmount: "Total Merchant City Tax Amount",
  totalInstitutionRecords: "Total Institution Records",
  totalInstitutionSalesAmount: "Total Institution Sales Amount",
  totalInstitutionStateTaxAmount: "Total Institution State Tax Amount",
  totalInstitutionCityTaxAmount: "Total Institution City Tax Amount",
  totalFileRecords: "Total File Records",

  controlNumberCodePrefix: "Control Number Code Prefix",
  controlNumberCode: "Control Number Code",
  controlParticipationNumber: "Control Participation Number",
  terminalNumber: "Terminal Number",
  terminalBatchNumber: "Terminal Batch Number",
  transactionSequence: "Transaction Sequence",
  posEntryMode: "POS Entry Mode",
  cardNumber: "Card Number",
  transactionDate: "Transaction Date",
  transactionTime: "Transaction Time",
  transactionAmount: "Transaction Amount",
  salesAmount: "Sales Amount",
  stateTaxAmount: "State Tax Amount",
  cityTaxAmount: "City Tax Amount",
  additionalAmountType: "Additional Amount Type",
  additionalAmount: "Additional Amount",
  authorizationCode: "Authorization Code",
  merchantCategoryCode: "Merchant Category Code",
  indicatorBuyerIsMerchant: "Indicator Buyer Is Merchant",
  reducedStateTax: "Reduced State Tax",
  buyerExemptInd: "Buyer Exempt Indicator",
  transactionType: "Transaction Type",
  controlNumber: "Control Number",
  calendarVersionId: "Calendar Version ID",


  paymentIndicator :"Payment Indicator",
   fileProcessingDate :"File Processing Date",
   filler1:"Filler 1",
   processorCertificationNumber  :"Processor Certification Number",
  filler2 :"Filler 2",
   totalMerchantRecords:"Total Merchant Records",
   totalMerchantSalesAmount :"Total Merchant Sales Amount",
   totalMerchantStateTaxAmount :"Total Merchant State Tax Amount",
  totalMerchantCityTaxAmount :"Total Merchant City Tax Amount",
   filler3 :"Filler 3",
   merchantNumber :"Merchant Number",
   totalBatchRecords :"Total Batch Records",
   totalBatchSalesAmount :"Total Batch Sales Amount",
   paymentIndicator :"Payment Indicator",
     totalBatchStateTaxAmount :"Total Batch State Tax Amount",
   totalBatchCityTaxAmount :"Total Batch City Tax Amount",
   merchantName :"Merchant City",
   merchantState :"Merchant State",
   merchantZipCode :"Merchant Zip Code",
   institutionNumber :"Institution Number",
   totalInstitutionRecords :"Total Institution Records",
   totalInstitutionSalesAmountr :"Total Institution Sales Amount",
 totalInstitutionStateTaxAmount :"Total Institution State Tax Amount",
  totalInstitutionCityTaxAmount :"Total Institution City TaxAmount",
   processorCertificationNumber :"Processor Certification Number",
   totalFileRecords :"Total File Records",
   processorCertificationNumber :"Processor Certification Number",
     institutionNumber :"Institution Number",
   institutionName :"Institution Name",
   processorCertificationNumber :"Processor Certification Number",
   

};
function FieldDisplay({ field, value }) {

  if (
    value &&
    typeof value === "object" &&
    "value" in value &&
    "spaceCount" in value &&
    "positionDetails" in value
  ) {
    const pos = value.positionDetails;
    return (
      <div style={{ width: "100%" }}>
        <div style={{ fontWeight: "bold", color: "#5e1f04", fontSize: "26px", marginBottom: "16px" }}>{value.value}</div>
        <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic" }}>Character Count : <span style={{ fontWeight: "bold", color: "#af481b", }}>{value.spaceCount}</span></div>
        <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic" }}>Position : <span style={{ fontWeight: "bold", color: "#af481b" }}>{pos.from} - {pos.to}</span></div>
      </div>
    );
  }
  if (typeof value === "object" && value !== null)
    return <pre >{JSON.stringify(value, null, 2)}</pre>;
  return <span>{value?.toString() ?? ""}</span>;
}

function ExpandableSection({ title, children, level = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!isExpanded) return;

      const clickedInsideSection = sectionRef.current?.contains(event.target);
      const isInDrSection = event.target.closest('.dr-section-exception');

      if (clickedInsideSection && !isInDrSection) {
        const titleClicked = event.target.closest('.createdr-section-title-start');
        if (!titleClicked) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isExpanded]);

  const toggleExpansion = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };


  return (
    <div
      ref={sectionRef}
      style={{
        marginLeft: level * 25,
        background: getGradientColor(level),
        borderRadius: 6,
        marginBottom: 8,
        padding: 6,
        borderLeft: `6px solid #dd6e3a`,
      }}>
      <div
        className="createdr-section-title-start"
        onClick={toggleExpansion}
        style={{
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: getFontSize(level),
          color: "#af481b",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
        }}>
        <span style={{ marginRight: 6 }}>
          {isExpanded ? "▼" : "►"}
        </span>
        {title}
      </div>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}

const RawStringDisplay = ({ raw }) => {
  if (!raw) return null;
  const rendered = raw.split("").map((char, index) => {
    if (char === " ") {
      return <BsDot key={index} style={{ color: "#aaa", display: "inline" }} />;
    }
    return <span key={index}>{char}</span>;
  });

  return (
    <div className="createdr-section-if">
      <pre style={{
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
        fontSize: "18px",
        wordBreak: "break-word",
        overflowWrap: "anywhere"
      }}>
        {rendered}
      </pre>
    </div>
  );
};


function FHSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "filler1", "fileProcessingDate", "fileType",
    "processorCertificationNumber", "filler2", "processorName", "versionNumber", "filler3"
  ];
  return (
    <ExpandableSection title="File Header (FH)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function MHSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "filler1", "fileProcessingDate", "filler2",
    "processorCertificationNumber", "institutionNumber", "merchantTaxId",
    "merchantNumber", "merchantName", "merchantCity", "merchantState",
    "merchantZipCode", "filler3"
  ];
  return (
    <ExpandableSection title="Merchant Header (MH)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function BHCASHSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
    "processorCertificationNumber", "institutionNumber", "merchantTaxId",
    "merchantNumber", "filler2"
  ];
  return (
    <ExpandableSection title="Batch Header Cash (BHCASH)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function BHCARDSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
    "processorCertificationNumber", "institutionNumber", "merchantTaxId",
    "merchantNumber", "filler2"
  ];
  return (
    <ExpandableSection title="Batch Header Card (BHCARD)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function BTCASHSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
    "processorCertificationNumber", "institutionNumber", "merchantTaxId",
    "merchantNumber", "totalBatchRecords", "totalBatchSalesAmount",
    "totalBatchStateTaxAmount", "totalBatchCityTaxAmount", "filler2"
  ];
  return (
    <ExpandableSection title="Batch Trailer Cash (BTCASH)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function BTCARDSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
    "processorCertificationNumber", "institutionNumber", "merchantTaxId",
    "merchantNumber", "totalBatchRecords", "totalBatchSalesAmount",
    "totalBatchStateTaxAmount", "totalBatchCityTaxAmount", "filler2"
  ];
  return (
    <ExpandableSection title="Batch Trailer Card (BTCARD)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function MTSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "filler1", "fileProcessingDate", "filler2", "processorCertificationNumber",
    "institutionNumber", "merchantTaxId", "merchantNumber",
    "totalMerchantRecords", "totalMerchantSalesAmount",
    "totalMerchantStateTaxAmount", "totalMerchantCityTaxAmount", "filler3"
  ];
  return (
    <ExpandableSection title="Merchant Trailer (MT)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function ITSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "filler1", "fileProcessingDate", "filler2", "processorCertificationNumber",
    "institutionNumber", "filler3", "totalInstitutionRecords",
    "totalInstitutionSalesAmount", "totalInstitutionStateTaxAmount",
    "totalInstitutionCityTaxAmount", "filler4"
  ];
  return (
    <ExpandableSection title="Institution Trailer (IT)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function FTSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "filler1", "fileProcessingDate", "filler2",
    "processorCertificationNumber", "filler3", "totalFileRecords", "filler4"
  ];
  return (
    <ExpandableSection title="File Trailer (FT)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function IHSection({ data, raw, level = 0 }) {
  if (!data) return null;
  const keys = [
    "recordType", "filler1", "fileProcessingDate", "filler2",
    "processorCertificationNumber", "institutionNumber", "institutionName", "filler3"
  ];
  return (
    <ExpandableSection title="Institution Header (IH)" level={level}>
      <div className="createdr-section">
        <RawStringDisplay raw={raw} />
        {keys.map((key) =>
          <div className="createdr-section-if" key={key}>
            <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              {FIELD_LABELS[key] || key}
            </div>
            <div><FieldDisplay field={key} value={data[key]} /></div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

function DrSection({ title, data, level = 0 }) {
  if (!data || !Array.isArray(data) || !data.length) return null;

  const recordKeys = Object.keys(data[0]).filter(key => key !== 'rawString');

  return (
    <ExpandableSection title={title} level={level}>
      <div className="createdr-section dr-section-exception">
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #f5c2c7',
          borderRadius: '4px'
        }}>
          <table className="table-container" style={{ width: '100%' }}>
            <thead>
              <tr>
                {recordKeys.map(col => (
                  <th key={col} style={{
                    padding: "6px 6px",
                    background: "#f5c2c7",
                    color: "#842029",
                    border: "1px solid #f5c2c7",
                    fontWeight: "bold",
                    position: 'sticky',
                    top: 0
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((dr, i) => (
                <tr key={i}>
                  {recordKeys.map(col => (
                    <td key={col} style={{
                      border: "1px solid #f5c2c7",
                      padding: "4px 3px",
                      background: "#fff"
                    }}>
                      {typeof dr[col] === 'object' && dr[col] !== null ? (
                        <div style={{ fontWeight: "bold", color: "#5e1f04", fontSize: "16px" }}>
                          {dr[col].value}
                        </div>
                      ) : (
                        <div style={{ fontWeight: "bold", color: "#5e1f04", fontSize: "16px" }}>
                          {dr[col]?.toString() ?? ''}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
   


      </div>
    </ExpandableSection>
  );
}


function InformativeFileParser() {
  const location = useLocation();
  const navigate = useNavigate();
  const parsedData = location.state?.parsedData?.parsedInformativeFile;
  const parsMerhantList = location.state?.parsedData?.parsedInformativeFile.merchantSections;
  const nameOfFile = location.state?.fielname;

  if (!parsedData) {
    return (
      <div>
        <h2>No parsed data found.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <BackButton to="/informativefiles" label="Back to Informative Files " />
      <RedTitle title={`Parsing Informative file : ${nameOfFile}`} />
      <div className="createdr-section-if" >
        <FHSection data={parsedData.fh_parsed} raw={parsedData.fh_raw} level={0} />
        <IHSection data={parsedData.ih_parsed} raw={parsedData.ih_raw} level={0} />

        {parsMerhantList &&
          Object.entries(parsMerhantList).map(([merchantId, merchantData], index) => {
            const merchantName = `Merchant #${index + 1} ${merchantData?.mh_parsed?.merchantName?.value }   `;



            // const hasCash = merchantData.BHCash_parsed || merchantData.BtCash_parsed || (merchantData.cashDrs_parsed && merchantData.cashDrs_parsed.length > 0);
            // const hasCard = merchantData.BHCard_parsed || merchantData.BtCard_parsed || (merchantData.cardDrs_parsed && merchantData.cardDrs_parsed.length > 0);
            const hasCash = merchantData.cashDrs_parsed && merchantData.cashDrs_parsed.length > 0;
            const hasCard = merchantData.cardDrs_parsed && merchantData.cardDrs_parsed.length > 0;

            return (
              <div key={merchantId || index} className="merchant-section">
                <ExpandableSection title={merchantName} level={1}>
                  <MHSection data={merchantData.mh_parsed} raw={merchantData.mh_raw} level={2} />

              
                  {hasCash && (
                    <>
                      {merchantData.BHCash_parsed && <BHCASHSection data={merchantData.BHCash_parsed} raw={merchantData.BHCash_raw} level={3} />}
                      {merchantData.cashDrs_parsed && merchantData.cashDrs_parsed.length > 0 && (
                        <DrSection data={merchantData.cashDrs_parsed} title="Cash DRs Records" level={4} />
                      )}
                      {merchantData.BtCash_parsed && <BTCASHSection data={merchantData.BtCash_parsed} raw={merchantData.BtCash_raw} level={3} />}
                    </>
                  )}
              




                  {hasCard && (
                    <>
                      {merchantData.BHCard_parsed && <BHCARDSection data={merchantData.BHCard_parsed} raw={merchantData.BHCard_raw} level={3} />}
                      {merchantData.cardDrs_parsed && merchantData.cardDrs_parsed.length > 0 && (
                        <DrSection data={merchantData.cardDrs_parsed} title="Card DRs Records" level={4} />
                      )}
                      {merchantData.BtCard_parsed && <BTCARDSection data={merchantData.BtCard_parsed} raw={merchantData.BtCard_raw} level={3} />}
                    </>
                  )}

                  <MTSection data={merchantData.mt_parsed} raw={merchantData.mt_raw} level={2} />
                </ExpandableSection>
              </div>
            );
          })}













        <ITSection data={parsedData.it_parsed} raw={parsedData.it_raw} level={0} />
        <FTSection data={parsedData.ft_parsed} raw={parsedData.ft_raw} level={0} />
      </div>
    </>
  );
}

export default InformativeFileParser;

































{/* 
// import React, { useEffect, useState,useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import AppFlexBox from "../components/AppFlexBox";
// import BackButton from "../components/BackButton";
// import RedTitle from '../components/RedTitle';
// import { BsDot } from "react-icons/bs";


// const FIELD_LABELS = {
//   recordType: "Record Type",
//   filler1: "Filler 1",
//   filler2: "Filler 2",
//   filler3: "Filler 3",
//   filler4: "Filler 4",
//   fileProcessingDate: "File Processing Date",
//   fileType: "File Type",
//   processorCertificationNumber: "Processor Certification Number",
//   processorName: "Processor Name",
//   versionNumber: "Version Number",
//   institutionNumber: "Institution Number",
//   institutionName: "Institution Name",
//   merchantTaxId: "Merchant Tax ID",
//   merchantNumber: "Merchant Number",
//   merchantName: "Merchant Name",
//   merchantCity: "Merchant City",
//   merchantState: "Merchant State",
//   merchantZipCode: "Merchant Zip Code",
//   paymentIndicator: "Payment Indicator",
//   paymentMethod: "Payment Method",
//   totalBatchRecords: "Total Batch Records",
//   totalBatchSalesAmount: "Total Batch Sales Amount",
//   totalBatchStateTaxAmount: "Total Batch State Tax Amount",
//   totalBatchCityTaxAmount: "Total Batch City Tax Amount",
//   totalMerchantRecords: "Total Merchant Records",
//   totalMerchantSalesAmount: "Total Merchant Sales Amount",
//   totalMerchantStateTaxAmount: "Total Merchant State Tax Amount",
//   totalMerchantCityTaxAmount: "Total Merchant City Tax Amount",
//   totalInstitutionRecords: "Total Institution Records",
//   totalInstitutionSalesAmount: "Total Institution Sales Amount",
//   totalInstitutionStateTaxAmount: "Total Institution State Tax Amount",
//   totalInstitutionCityTaxAmount: "Total Institution City Tax Amount",
//   totalFileRecords: "Total File Records",

//   controlNumberCodePrefix: "Control Number Code Prefix",
//   controlNumberCode: "Control Number Code",
//   controlParticipationNumber: "Control Participation Number",
//   terminalNumber: "Terminal Number",
//   terminalBatchNumber: "Terminal Batch Number",
//   transactionSequence: "Transaction Sequence",
//   posEntryMode: "POS Entry Mode",
//   cardNumber: "Card Number",
//   transactionDate: "Transaction Date",
//   transactionTime: "Transaction Time",
//   transactionAmount: "Transaction Amount",
//   salesAmount: "Sales Amount",
//   stateTaxAmount: "State Tax Amount",
//   cityTaxAmount: "City Tax Amount",
//   additionalAmountType: "Additional Amount Type",
//   additionalAmount: "Additional Amount",
//   authorizationCode: "Authorization Code",
//   merchantCategoryCode: "Merchant Category Code",
//   indicatorBuyerIsMerchant: "Indicator Buyer Is Merchant",
//   reducedStateTax: "Reduced State Tax",
//   buyerExemptInd: "Buyer Exempt Indicator",
//   transactionType: "Transaction Type",
//   controlNumber: "Control Number",
//   calendarVersionId: "Calendar Version ID",


//   paymentIndicator :"Payment Indicator",
//    fileProcessingDate :"File Processing Date",
//    filler1:"Filler 1",
//    processorCertificationNumber  :"Processor Certification Number",
//   filler2 :"Filler 2",
//    totalMerchantRecords:"Total Merchant Records",
//    totalMerchantSalesAmount :"Total Merchant Sales Amount",
//    totalMerchantStateTaxAmount :"Total Merchant State Tax Amount",
//   totalMerchantCityTaxAmount :"Total Merchant City Tax Amount",
//    filler3 :"Filler 3",
//    merchantNumber :"Merchant Number",
//    totalBatchRecords :"Total Batch Records",
//    totalBatchSalesAmount :"Total Batch Sales Amount",
//    paymentIndicator :"Payment Indicator",
//      totalBatchStateTaxAmount :"Total Batch State Tax Amount",
//    totalBatchCityTaxAmount :"Total Batch City Tax Amount",
//    merchantName :"Merchant City",
//    merchantState :"Merchant State",
//    merchantZipCode :"Merchant Zip Code",
//    institutionNumber :"Institution Number",
//    totalInstitutionRecords :"Total Institution Records",
//    totalInstitutionSalesAmountr :"Total Institution Sales Amount",
//  totalInstitutionStateTaxAmount :"Total Institution State Tax Amount",
//   totalInstitutionCityTaxAmount :"Total Institution City TaxAmount",
//    processorCertificationNumber :"Processor Certification Number",
//    totalFileRecords :"Total File Records",
//    processorCertificationNumber :"Processor Certification Number",
//      institutionNumber :"Institution Number",
//    institutionName :"Institution Name",
//    processorCertificationNumber :"Processor Certification Number",
   

// };

//  function FieldDisplay({ field, value }) {
//   if (
//     value &&
//     typeof value === "object" &&
//     "value" in value &&
//     "spaceCount" in value &&
//     "positionDetails" in value
//   ) {
//     const pos = value.positionDetails;
//     return (
//       <div style={{width: "100%"}}>
//           <div  style={{ fontWeight: "bold" , color:"#5e1f04" ,fontSize :"26px" ,marginBottom:"16px" }} >{value.value}</div>
//           <div style={{ fontWeight: "bold" , color:"#5e1f04" ,fontStyle: "italic" }}>Character Count : <span style={{ fontWeight: "bold" , color:"#af481b" , }}>{value.spaceCount}</span></div>
//           <div style={{ fontWeight: "bold" , color:"#5e1f04" ,fontStyle: "italic" }}>Position : <span style={{ fontWeight: "bold" , color:"#af481b"  }}>{pos.from} - {pos.to}</span></div>

//       </div>
//     );
//   }
//   if (typeof value === "object" && value !== null)
//     return <pre >{JSON.stringify(value, null, 2)}</pre>;
//   return <span>{value?.toString() ?? ""}</span>;
// }

// function ExpandableSection({ title, children }) { */}
//   const [isExpanded, setIsExpanded] = useState(false);
//   const sectionRef = useRef(null);

// useEffect(() => {
//     const handleClick = (event) => {
//       if (!isExpanded) return;

//       const clickedInsideSection = sectionRef.current?.contains(event.target);
//       const isInDrSection = event.target.closest('.dr-section-exception');

//       if (clickedInsideSection && !isInDrSection) {
//         const titleClicked = event.target.closest('.createdr-section-title-start');
//         if (!titleClicked) {
//           setIsExpanded(false);
//         }
//       }
//     };

//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, [isExpanded]);

//   const toggleExpansion = (e) => {
//     e.stopPropagation();
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div ref={sectionRef}>
//       <div 
//         className="createdr-section-title-start" 
//         onClick={toggleExpansion}
//         style={{ cursor: 'pointer' }}
//       >
//         {title} {isExpanded ? '▼' : '►'}
//       </div>
//       {isExpanded && children}
//     </div>
//   );
// }

// const RawStringDisplay = ({ raw }) => {
//   if (!raw) return null;

//   const rendered = raw.split("").map((char, index) => {
//     if (char === " ") {
//       return <BsDot key={index} style={{ color: "#aaa", display: "inline" }} />;
//     }
//     return <span key={index}>{char}</span>;
//   });

//   return (
//     <div className="createdr-section-if">
//       <pre style={{
//         whiteSpace: "pre-wrap",
//         fontFamily: "monospace",
//         fontSize: "18px",
//         wordBreak: "break-word",
//         overflowWrap: "anywhere"
//       }}>
//         {rendered}
//       </pre>
//     </div>
//   );
// };

// function FHSection({ data ,raw}) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "filler1", "fileProcessingDate", "fileType",
//     "processorCertificationNumber", "filler2", "processorName", "versionNumber", "filler3"
//   ];
//   return (
//     <ExpandableSection title="File Header (FH)">


//       <div className="createdr-section">



//   <RawStringDisplay raw={raw} />





//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>




//     </ExpandableSection>
//   );
// }

// function MHSection({ data,raw }) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "filler1", "fileProcessingDate", "filler2",
//     "processorCertificationNumber", "institutionNumber", "merchantTaxId",
//     "merchantNumber", "merchantName", "merchantCity", "merchantState",
//     "merchantZipCode", "filler3"
//   ];
//   return (
//     <ExpandableSection title="Merchant Header (MH)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function BHCASHSection({ data,raw }) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
//     "processorCertificationNumber", "institutionNumber", "merchantTaxId",
//     "merchantNumber", "filler2"
//   ];
//   return (
//     <ExpandableSection title="Batch Header Cash (BHCASH)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function BHCARDSection({ data,raw }) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
//     "processorCertificationNumber", "institutionNumber", "merchantTaxId",
//     "merchantNumber", "filler2"
//   ];
//   return (
//     <ExpandableSection title="Batch Header Card (BHCARD)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }


// function BTCASHSection({ data,raw }) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
//     "processorCertificationNumber", "institutionNumber", "merchantTaxId",
//     "merchantNumber", "totalBatchRecords", "totalBatchSalesAmount",
//     "totalBatchStateTaxAmount", "totalBatchCityTaxAmount", "filler2"
//   ];
//   return (
//     <ExpandableSection title="Batch Trailer Cash (BTCASH)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function BTCARDSection({ data,raw }) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "paymentIndicator", "fileProcessingDate", "filler1",
//     "processorCertificationNumber", "institutionNumber", "merchantTaxId",
//     "merchantNumber", "totalBatchRecords", "totalBatchSalesAmount",
//     "totalBatchStateTaxAmount", "totalBatchCityTaxAmount", "filler2"
//   ];
//   return (
//     <ExpandableSection title="Batch Trailer Card (BTCARD)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function MTSection({ data ,raw}) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "filler1", "fileProcessingDate", "filler2", "processorCertificationNumber",
//     "institutionNumber", "merchantTaxId", "merchantNumber",
//     "totalMerchantRecords", "totalMerchantSalesAmount",
//     "totalMerchantStateTaxAmount", "totalMerchantCityTaxAmount", "filler3"
//   ];
//   return (
//     <ExpandableSection title="Merchant Trailer (MT)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function ITSection({ data ,raw}) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "filler1", "fileProcessingDate", "filler2", "processorCertificationNumber",
//     "institutionNumber", "filler3", "totalInstitutionRecords",
//     "totalInstitutionSalesAmount", "totalInstitutionStateTaxAmount",
//     "totalInstitutionCityTaxAmount", "filler4"
//   ];
//   return (
//     <ExpandableSection title="Institution Trailer (IT)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function FTSection({ data,raw }) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "filler1", "fileProcessingDate", "filler2",
//     "processorCertificationNumber", "filler3", "totalFileRecords", "filler4"
//   ];
//   return (
//     <ExpandableSection title="File Trailer (FT)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function IHSection({ data,raw }) {
//   if (!data) return null;
//   const keys = [
//     "recordType", "filler1", "fileProcessingDate", "filler2",
//     "processorCertificationNumber", "institutionNumber", "institutionName", "filler3"
//   ];
//   return (
//     <ExpandableSection title="Institution Header (IH)">
//       <div className="createdr-section">
//           <RawStringDisplay raw={raw} />
//         {keys.map((key) =>
//           <div className="createdr-section-if" key={key}>
//             <div style={{ fontWeight: "bold", color: "#5e1f04", fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
//               {FIELD_LABELS[key] || key}
//             </div>
//             <div><FieldDisplay field={key} value={data[key]} /></div>
//           </div>
//         )}
//       </div>
//     </ExpandableSection>
//   );
// }

// function DrSection({ title, data,raw }) {
//   if (!data || !Array.isArray(data) || !data.length) return null;
  
//   const recordKeys = Object.keys(data[0]).filter(key => key !== 'rawString');

//   return (
//     <ExpandableSection title={title}>



//       <div className="createdr-section  dr-section-exception">
//         <div style={{ 
//           maxHeight: '400px', 
//           overflowY: 'auto',
//           border: '1px solid #f5c2c7',
//           borderRadius: '4px'
//         }}>
//           <table className="table-container" style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 {recordKeys.map(col => (
//                   <th key={col} style={{
//                     padding: "6px 6px",
//                     background: "#f5c2c7",
//                     color: "#842029",
//                     border: "1px solid #f5c2c7",
//                     fontWeight: "bold",
//                     position: 'sticky',
//                     top: 0
//                   }}>{col}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((dr, i) => (
//                 <tr key={i}>
//                   {recordKeys.map(col => (
//                     <td key={col} style={{
//                       border: "1px solid #f5c2c7",
//                       padding: "4px 3px",
//                       background: "#fff"
//                     }}>
//                       {typeof dr[col] === 'object' && dr[col] !== null ? (
//                         <div style={{ fontWeight: "bold", color: "#5e1f04", fontSize: "16px" }}>
//                           {dr[col].value}
//                         </div>
//                       ) : (
//                         <div style={{ fontWeight: "bold", color: "#5e1f04", fontSize: "16px" }}>
//                           {dr[col]?.toString() ?? ''}
//                         </div>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </ExpandableSection>
//   );
// }
// // --- Main Page ---
// function InformativeFileParser() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const parsedData = location.state?.parsedData?.parsedInformativeFile;
//    const parsMerhantList = location.state?.parsedData?.parsedInformativeFile.merchantSections;
//    const nameOfFile= location.state?.fielname;

//   if (!parsedData) {
//     return (
//       <div>
//         <h2>No parsed data found.</h2>
//         <button onClick={() => navigate(-1)}>Go Back</button>
//       </div>
//     );
//   }

//   return (

// <>

//    <BackButton to="/informativefiles" label="Back to Informative Files " />

//        <RedTitle title={`Parsing Informative file : ${nameOfFile}`} /> 
//     <div className="createdr-section-if" >
//       <FHSection data={parsedData.fh_parsed}    raw={parsedData.fh_raw}    />
//       <IHSection data={parsedData.ih_parsed} raw={parsedData.ih_raw}  />

   







// {parsMerhantList &&
//   Object.entries(parsMerhantList).map(([merchantId, merchantData], index) => {
//     const merchantName =`Merchant # ${index + 1}`;

//     return (
//       <div key={merchantId || index} className="merchant-section">
//         <ExpandableSection title={merchantName}>
//           <MHSection data={merchantData.mh_parsed} raw={merchantData.mh_raw} />
//           <BHCASHSection data={merchantData.BHCash_parsed} raw={merchantData.BHCash_raw} />
//           <DrSection data={merchantData.cashDrs_parsed} title="Cash DRs Records" />
//           <BTCASHSection data={merchantData.BtCash_parsed} raw={merchantData.BtCash_raw} />
//           <BHCARDSection data={merchantData.BHCard_parsed} raw={merchantData.BHCard_raw} />
//           <DrSection data={merchantData.cardDrs_parsed} title="Card DRs Records" />
//           <BTCARDSection data={merchantData.BtCard_parsed} raw={merchantData.BtCard_raw} />
//           <MTSection data={merchantData.mt_parsed} raw={merchantData.mt_raw} />
//         </ExpandableSection>
//       </div>
//     );
//   })}


//       <ITSection data={parsedData.it_parsed} raw={parsedData.it_raw}  />
//       <FTSection data={parsedData.ft_parsed}  raw={parsedData.ft_raw}  />
//     </div>
//     </>
//   );
// }

// export default InformativeFileParser;

