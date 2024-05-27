"use client"
import React, { useState } from 'react';
import Server from './serverComponent';
// const Client: React.FC = () => {
    const Client = ({children}:{
        children:React.ReactNode
    }) => {
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  return (
    <div style={{
        border:"2px solid red"
    }}>
      <h1>This is a Client Component</h1>
      <p>This component is rendered on the client-side.</p>
      <p>Counter: {counter}</p>
      <button onClick={incrementCounter}>Increment Counter</button>
      {children}
      {/* <Server/> */}
    </div>
  );
};

export default Client;
