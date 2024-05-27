import React from 'react';
import Client from './clientComponent';
async function fetchData() {
  // Fetch data from API
  // Simulate a 5-second delay
  await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

async function Server(){

  const data = await fetchData();
  console.log(data)

  return (
    <div style={{
        border:"2px solid blue"
    }}>
      <h1>Server Component</h1>
      <p>This component is rendered on the server-side.</p>
      <h2>Data from API:</h2>
      <ul>
        {data.map((item:any, index:any) => (
            <ul>
                <li key={index}>{item.id}</li>
                <li>{item.title}</li>
            </ul>
        ))}
      </ul>
      {/* <Client/> */}
    </div>
  );
};

export default Server;
