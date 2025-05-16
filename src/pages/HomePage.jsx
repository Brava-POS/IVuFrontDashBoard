import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'; 
import aditional from '../assets/images/addtax.jpg'; 
import city from '../assets/images/citytax.png'; 
import reduced from '../assets/images/reduced.jpg'; 
import state from '../assets/images/statetax.png'; 
import total from '../assets/images/total.png'; 
import MainAppSpinner from '../components/MainAppSpinner';
import CardComponent from '../components/CardComponent';

function HomePage() {
    const { axiosInstance } = useAuth();
  const { loading,customFetch,permissions} = useAuth();
  const [summaryData, setSummaryData] = useState([]);
    const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  



const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get('http://localhost:9999/merchants/search'); 
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setIsLoading(false);
      }
    };

     const handleSelectChange = (e) => {
    setSelectedUser(e.target.value);
    console.log('Selected user:', e.target.value);
  }; 
  













 const fetchData = async () => {
      try {
       const data = await customFetch('drs/sums?dateRange=20250401-20250507');
       console.log('sums received: fom hoempage ', data);


  


        const formattedData = [
          {
            image: city,
            title: 'Total Transactions',
            details: {
              Amount: `$${(data.txnAmount / 100).toFixed(2)}`
            }
          },
          {
            image: state,
            title: 'Total State Tax',
            details: {
              Amount: `$${(data.stateTax / 100).toFixed(2)}`
            }
          },
          {
            image: city,
            title: 'Total City Tax',
            details: {
              Amount: `$${(data.cityTax / 100).toFixed(2)}`
            }
          },
          {
            image: reduced,
            title: 'Total Reduced State Tax',
            details: {
              Amount: `$${(data.reducedTax / 100).toFixed(2)}`
            }
          },
          {
            image: aditional,
            title: 'Total Additional Amount',
            details: {
              Amount: `$${(data.additionalAmount / 100).toFixed(2)}`
            }
          },
          {
            image: total,
            title: 'Number of Records',
            details: {
              Count: data.count
            }
          },
          
        ];

        setSummaryData(formattedData);
      } catch (err) {
        console.error('Fetch error:', err);
        
      }
    };


  useEffect(() => {
  fetchUsers
    fetchData();
  }, []);






// useEffect(() => {
//   if (!permissions) return;

 


//       // console.log("Home read permission:", permissions.Home?.read);
//       // console.log("Home update permission:", permissions.Home?.update);
//       // console.log("Devices write permission:", permissions.Home?.write);
//       //  console.log("Home delete permission:", permissions.Home?.delete);


//    console.log('--- All Permissions ---');
//     Object.entries(permissions).forEach(([section, perms]) => {
//       console.log(`Permissions for "${section}":`);
//       Object.entries(perms).forEach(([action, allowed]) => {
//         console.log(`  ${action}: ${allowed}`);
//       });
//     });
//     console.log('-----------------------');

// }, [permissions]);













if (loading) return <MainAppSpinner/>;


  return (

   <>
 <div>
      <label htmlFor="userSelect">Select User:</label>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <select id="userSelect" value={selectedUser} onChange={handleSelectChange}>
          <option value="">-- Choose a user --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.username || `User ${user.id}`}
            </option>
          ))}
        </select>
      )}
    </div>
    <div class ="home_page_taxes_container">
     <CardComponent cardData={summaryData} />
    </div>


</>


  );
}

export default HomePage;