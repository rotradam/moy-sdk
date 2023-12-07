// src/MoonPayWidget.js
import React from 'react';
import { MoonPayBuyWidget } from '@moonpay/moonpay-react';

const MoonPayWidget = ({ visible }) => {
  // Function to handle the signature request
  const handleGetSignature = async (url) => {
    const response = await fetch(`/api/sign?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.signature;
  };

  return (
    <MoonPayBuyWidget
        variant="overlay"
        baseCurrencyCode="usd"
        baseCurrencyAmount="100"
        defaultCurrencyCode="eth"
        onUrlSignatureRequested={handleGetSignature}
        visible={visible}
    />
  );
};

export default MoonPayWidget;
