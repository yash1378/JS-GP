"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Razorpay from 'razorpay';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage: React.FC = () => {
  const [amt, setAmt] = useState(0);
  const [razorpayKey, setRazorpayKey] = useState('');

  useEffect(() => {
    // console.log(window)
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    console.log(window)
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  
  }, []);

  const pay = async () => {
    try {
        const res = await fetch("https://www.jsgp.xyz/getkey")
      const response = await fetch('https://www.jsgp.xyz/order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amt
        }),
      });

      console.log(response.ok)
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const data = await response.json();
      const d = await res.json();
      console.log(d.key)
      console.log(data)
      const options = {
        key: d.key,
        amount: data.message.amount,
        currency: "INR",
        name: "Jee Simplified",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.message.id,
        callbackUrl: "https://www.jsgp.xyz/api/paymentverify", // Changed to callbackUrl
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };
    //   console.log("clicked")
      const razor = new window.Razorpay(options) as any;
      razor.open();
      console.log("clicked")
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <>
      <Head>
        <title>Razorpay Payment</title>
      </Head>
      <div>
        <input
          type="number"
        //   value={amt}
          placeholder="Enter amount in INR"
          onChange={(e) => setAmt(Number(e.target.value))}
          name="amount"
        />
        <button id="rzp-button1" onClick={pay}>Pay with Razorpay</button>
      </div>
    </>
  );
};

export default PaymentPage;