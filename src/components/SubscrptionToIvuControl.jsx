// src/components/SubscrptionToIvuControl.jsx
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/brava.png';
import img2 from '../assets/images/brava2.png';
import img3 from '../assets/images/brava3.png';
import img4 from '../assets/images/brava4.png';
import CardGridLayout from '../layouts/CardGridLayout';


function SubscrptionToIvuControl() {
  const { customFetch, loading } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const prices = {
    monthly: 10,
    annually: 10 * 12,
  };

  const handleSubscribe = async () => {
    try {
      const duration = {
        monthly: 1,
        annually: 12,
      }[selectedPlan];

      const res = await customFetch('http://localhost:9999/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ plan: selectedPlan, duration }),
      });

      alert('Subscription request sent successfully!');
      console.log(res);
    } catch (err) {
      alert('Failed to subscribe: ' + err.message);
    }
  };









  return (
    <div className="guest_page_container">




 
















      <h2 className="guest_page_title">Subscribe to IVU Control</h2>

      <div className="guest_page_card">
        <h3 className="guest_page_plan_title">$10 / month</h3>

        <div className="guest_page_tabs">
          <button onClick={() => setSelectedPlan('monthly')} className={selectedPlan === 'monthly' ? 'guest_page_active' : ''}>Monthly</button>
          <button onClick={() => setSelectedPlan('annually')} className={selectedPlan === 'annually' ? 'guest_page_active' : ''}>Annually</button>
        </div>

        <p className="guest_page_price">
          Total: <strong>${prices[selectedPlan]}</strong>
        </p>

        <button onClick={handleSubscribe} disabled={loading} className="guest_page_subscribe_btn">
          {loading ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </div>



      <div className="guest_page_carousel">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
        >
          <div>
            <img src= {img2}  alt="Slide 1" />
      
          </div>
          <div>
            <img src={img3} alt="Slide 2" />
         
          </div>
          <div>
            <img src={img3} alt="Slide 3" />
          
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default SubscrptionToIvuControl;
