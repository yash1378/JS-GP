// as these are server components in this caching doesn't work
async function getData() {
  // const res = await fetch('http://20.204.209.69:8080/api/mentorData/',{
  const res = await fetch("https://js-gp-backend.onrender.com/api/mentorData", {
    headers: {
      'Cache-Control': 'no-store'
    },
    next: {
      revalidate: 0,
    },
  });


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function MentServer() {
  const data = await getData();
  console.log(data);
  return (
    <>

    </>
  );
}

export default MentServer;
