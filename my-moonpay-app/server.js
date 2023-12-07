// server.js
import express from 'express';
import { MoonPay } from '@moonpay/moonpay-node';

const app = express();
const moonPay = new MoonPay(process.env.MOONPAY_SECRET_KEY);

app.get('/api/sign', (req, res) => {
  const urlToSign = req.query.url;
  const signature = moonPay.url.generateSignature(urlToSign);
  res.json({ signature });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
