import React, { useState, useEffect } from 'react';
import TableComponent from '../components/TableComponent'; 
import { useAuth } from '../context/AuthContext';

function InformativeFiles() {

const { customFetch } = useAuth();
  const [informativeFilesList, setInformativeFilesList] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const data = await customFetch('/ivu/drs/alldrs');
        console.log("informativeFilesList : ", data);
        setInformativeFilesList(data); 
      } catch (err) {
        console.error("Microservice fetch error ", err.message);
      }
    };

    fetchData(); 
  }, [customFetch]); 














  return (
    <div className='main-header'>InformativeFiles</div>
  )
}

export default InformativeFiles