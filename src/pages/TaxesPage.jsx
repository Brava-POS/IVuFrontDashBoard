import React from 'react';
import CardGrid from '../components/CardGrid'; 
import logo from '../assets/images/brava.png'; 

function TaxesPage() {
  const taxData = [
    {
  
      title: 'VAT Report',
      details: {
        Amount: '$2,500',
        Period: 'Jan - Mar',
        Status: 'Paid'
      }
    },
    {
      image: logo ,
      title: 'Income Tax Filing',
      details: {
        Amount: '$4,200',
        Due: 'Apr 30, 2025',
        Status: 'Pending'
      }
    },
    {
    image: logo ,
      title: 'Corporate Tax',
      details: {
        Amount: '$9,000',
        Period: '2024 Annual',
        Status: 'Filed'
      }
    }
  ];

  return <CardGrid cardData={taxData} />;
}

export default TaxesPage;
