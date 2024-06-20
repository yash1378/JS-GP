import ParentComponent from "@/components/pending/client";
import Loading from "./loading";
import { Suspense } from "react";
// as these are server components in this caching doesn't work
async function getData() {
  // const res = await fetch('http://20.204.209.69:8080/api/data/',{
  const res = await fetch("https://www.jsgp.xyz/api/data", {
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

// as these are server components in this caching doesn't work
async function getAdditionalData() {
  // const response2 = await fetch("http://20.204.209.69:8080/api/mentordata",{
  const response2 = await fetch("https://www.jsgp.xyz/api/mentorData", {
    next: {
      revalidate: 0,
    },
  });

  if (!response2.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response2.json();
}

async function MentServer() {
  const data = await getData();
  const additionalData = await getAdditionalData();
  console.log(data);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ParentComponent data={data} additionalData={additionalData} />
      </Suspense>
    </>
  );
}

export default MentServer;
