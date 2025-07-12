import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DemoPopup.css';

const DemoPopup = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleDemoClick = () => {
    handleClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className={`demo-popup-overlay ${isClosing ? 'closing' : ''}`}>
      <div className="demo-popup-content">
        <button className="close-button" onClick={handleClose}>×</button>
        <h2>Try Our Demo</h2>
        <p>Experience the full functionality of our platform with our interactive demo.</p>
        <div className="demo-features">
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Real-time Analytics</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💳</span>
            <span>Payment Processing</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📱</span>
            <span>Mobile Responsive</span>
          </div>
        </div>
        <button className="demo-button" onClick={handleDemoClick}>
          Launch Demo
        </button>
      </div>
    </div>
  );
};

export default DemoPopup; 