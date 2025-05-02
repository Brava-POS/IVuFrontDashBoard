import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardGrid from '../components/CardGrid'; 
import { useAuth } from '../context/AuthContext'; 
import aditional from '../assets/images/addtax.jpg'; 
import city from '../assets/images/citytax.png'; 
import reduced from '../assets/images/reduced.jpg'; 
import state from '../assets/images/statetax.png'; 
import total from '../assets/images/total.png'; 
import UserProfile from '../components/UserProfile';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const [summaryData, setSummaryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('http://localhost:9999/drs/sums', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log('sums received :', data);

        const formattedData = [
          {
            image: city,
            title: 'Total Transactions',
            details: {
              Amount: `$${(data.txnAmount / 100).toFixed(2)}`
            }
          },
          {
            image: city,
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
            image: city,
            title: 'Total Reduced State Tax',
            details: {
              Amount: `$${(data.reducedTax / 100).toFixed(2)}`
            }
          },
          {
            image: city,
            title: 'Total Additional Amount',
            details: {
              Amount: `$${(data.additionalAmount / 100).toFixed(2)}`
            }
          },
          {
            image: city,
            title: 'Number of Records',
            details: {
              Count: data.count
            }
          }
        ];

        setSummaryData(formattedData);
      } catch (err) {
        console.error('Fetch error:', err);
        navigate('/login');
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  return (
    <CardGrid cardData={summaryData} />
  );
}

export default HomePage;