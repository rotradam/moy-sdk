// src/MoonPayWidget.js
import React, { useState, useEffect } from 'react';
import { MoonPayBuyWidget } from '@moonpay/moonpay-react';

const MoonPayWidget = ({ visible }) => {
  // Initialize state for all parameters
  const [params, setParams] = useState({
    baseCurrencyCode: 'USD',
    baseCurrencyAmount: '100',
    defaultCurrencyCode: 'ETH',
    walletAddress: '',
    colorCode: '#3B4BE3',
    theme: 'light',
    language: navigator.language.split('-')[0] || 'en',
    lockAmount: false,
    email: '',
    showWalletAddressForm: false,
  });

  // Function to handle the signature request
  const handleGetSignature = async (url) => {
    const response = await fetch(`/api/sign?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.signature;
  };

  // Effect to parse URL parameters and set widget properties
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams({
      ...params,
      baseCurrencyCode: searchParams.get('baseCurrencyCode') || params.baseCurrencyCode,
      baseCurrencyAmount: searchParams.get('baseCurrencyAmount') || params.baseCurrencyAmount,
      defaultCurrencyCode: searchParams.get('currencyCode') || params.defaultCurrencyCode,
      walletAddress: searchParams.get('walletAddress') || params.walletAddress,
      colorCode: searchParams.get('colorCode') || params.colorCode,
      theme: searchParams.get('theme') || params.theme,
      language: searchParams.get('language') || params.language,
      lockAmount: searchParams.get('lockAmount') === 'true',
      email: searchParams.get('email') || params.email,
      showWalletAddressForm: searchParams.get('showWalletAddressForm') === 'true',
    });
  }, []);

  return (
    <MoonPayBuyWidget
      variant="overlay"
      baseCurrencyCode={params.baseCurrencyCode}
      baseCurrencyAmount={params.baseCurrencyAmount}
      defaultCurrencyCode={params.defaultCurrencyCode}
      walletAddress={params.walletAddress}
      colorCode={params.colorCode}
      theme={params.theme}
      language={params.language}
      lockAmount={params.lockAmount}
      email={params.email}
      showWalletAddressForm={params.showWalletAddressForm}
      onUrlSignatureRequested={handleGetSignature}
      visible={visible}
    />
  );
};

export default MoonPayWidget;
