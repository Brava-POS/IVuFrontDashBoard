import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TableComponent from "../components/TableComponent";
import MainAppSpinner from "../components/MainAppSpinner";
import ButtonCustomizedAction from "../components/ButtonCustomizedAction";
import AppFlexBox from "../components/AppFlexBox";
import { useNavigate } from "react-router-dom";

const InformativeFile = () => {
    const navigate = useNavigate();
  const { axiosInstance, loading, setLoading } = useAuth();
  const [files, setFiles] = useState([]);
  const [continuationToken, setContinuationToken] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(""); // yyyymmdd

  const fetchFiles = async (token = null, dateParam = null) => {
    setIsLoading(true);
    try {
      let response;

      if (dateParam) {
        const searchUrl = `/informative-files/search?date=${dateParam}${
          token ? `&continuationToken=${token}` : ""
        }`;
        response = await axiosInstance.get(searchUrl);
      } else {
        const payload = {
          pageSize: 10,
          continuationToken: token || null,
        };
        response = await axiosInstance.post(
          "/s3/list/paginated/informative-files",
          payload
        );
      }

      setFiles((prevFiles) => {
        const allFiles = token ? [...prevFiles, ...(response.data.files || [])] : [...(response.data.files || [])];
        const uniqueFiles = Array.from(new Set(allFiles));
        return uniqueFiles;
      });

      setIsTruncated(response.data.isTruncated);
      setNextToken(response.data.nextContinuationToken || null);
    } catch (err) {
      console.error("Error fetching files", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedFile) return;
    const filename = selectedFile.replace("informative-files/", "");
    try {
      const response = await axiosInstance.get(
        `/informative-files/download/${filename}`,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };



const handleParse = async () => {
  if (!selectedFile) return;
  const filename = selectedFile.replace("informative-files/", "");
  try {
    const response = await axiosInstance.get(`/informative-files/parse?filename=${filename}`);

    if (response.status === 200 && response.data) {
      console.log("Parsed Data:", response.data);
      navigate('/informativefiles-parser', { state: {fielname :filename, parsedData: response.data } });
    } else {
      console.error("Invalid response format", response);
    }

  } catch (error) {
    console.error("Parsing failed", error);
  }
};






 const handleSearchByDate = () => {
  console.log("Searching with date:", date);
  setFiles([]);
  setContinuationToken(null);
  fetchFiles(null, date);
};

  const handleClearDate = () => {
    setDate("");
    setFiles([]);
    setContinuationToken(null);
    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading || isLoading) return <MainAppSpinner />;

  return (
    <>
      <div className="createdr-section-title-large">Informative Files</div>


    <div className="createdr-section">
       <AppFlexBox justify="start" gap="12px" style={{ marginTop: "20px" }}>

     <input
          type="date"
          style={{
            border: "1px solid red",
            padding: "6px 10px",
            borderRadius: "6px",
            color: "red",
          }}
      value={
  date
    ? `${date.slice(4, 8)}-${date.slice(2, 4)}-${date.slice(0, 2)}`
    : ""
}

       onChange={(e) => {
  const [year, month, day] = e.target.value.split("-");
  const formatted = `${day}${month}${year}`; // DDMMYYYY
  setDate(formatted);
}}

        />

        
       </AppFlexBox>


     
          <AppFlexBox justify="start" gap="12px" style={{ marginTop: "20px" }}>
           <ButtonCustomizedAction
          action="update"
          label="Search by Date"
          disabled={!date}
          onClick={handleSearchByDate}
        />

        
          <ButtonCustomizedAction
            action="clear"
            label="Clear Date Filter"
            onClick={handleClearDate}
          />
        

        
       </AppFlexBox>
  </div>
      <AppFlexBox justify="start" gap="12px" style={{ marginTop: "20px" }}>
   

        
      <ButtonCustomizedAction
  action="update"
  label="Load More"
  disabled={!isTruncated || !nextToken}
  onClick={() => {
    fetchFiles(nextToken, date || null);
    setContinuationToken(nextToken);
  }}
/>

        {selectedFile && (
          <ButtonCustomizedAction
            action="download"
            label="Parse Selected File"
            onClick={handleParse}
          />
        )}

      {selectedFile && (
          <ButtonCustomizedAction
            action="download"
            label="Download   Selected File"
            onClick={handleDownload}
          />
        )}



      </AppFlexBox>




  
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Select</th>
              <th>Filename</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="radio"
                    name="selectedFile"
                    checked={selectedFile === file}
                    onChange={() => setSelectedFile(file)}
                  />
                </td>
                <td>{file}</td>
              </tr>
            ))}
          </tbody>
        </table>


{!isLoading && files.length === 0 && (
  <div style={{ marginTop: "20px", color: "gray", fontStyle: "italic",  textAlign:"center"}}>
    No informative file found.
  </div>
)}














      </div>
    </>
  );
};

export default InformativeFile;
