// src/App.js
import React, { useState } from 'react';
import { MoonPayProvider } from '@moonpay/moonpay-react';
import MoonPayWidget from './MoonPayWidget';

function App() {
  const [visible, setVisible] = useState(true);

  // Environment is either 'sandbox' or 'live'
  const environment = process.env.REACT_APP_MOONPAY_ENVIRONMENT;

  return (
    <MoonPayProvider 
        apiKey={process.env.REACT_APP_MOONPAY_PUBLIC_KEY} 
        environment={environment} 
        debug={environment === 'sandbox'}
    >
        <MoonPayWidget visible={visible} />
        <button onClick={() => setVisible(!visible)}>Toggle MoonPay Widget</button>
    </MoonPayProvider>
  );
}

export default App;
