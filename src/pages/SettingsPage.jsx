import React from 'react';
import CardGrid from '../components/CardGrid'; 
import logo from '../assets/images/brava.png';

function SettingsPage() {
  const settingsData = [
    {

      title: 'User Preferences',
      details: {
        Theme: 'Dark Mode',
        Language: 'English',
        Notifications: 'Enabled'
      }
    },
    {
      image: logo,
      title: 'Security Settings',
      details: {
        '2FA': 'Enabled',
        'Password Updated': 'Mar 10, 2025',
        'Login Alerts': 'On'
      }
    },
    {
        image: logo,
      title: 'Billing Settings',
      details: {
        Plan: 'Pro',
        'Next Payment': 'May 1, 2025',
        Status: 'Active'
      }
    }
  ];

  return <CardGrid cardData={settingsData} />;
}

export default SettingsPage;
