import React from "react";
import ParentComponent from "@/components/delete/client";
import { Suspense } from "react";
import Loading from "./loading";
interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  class: string;
  sub: string;
  mentor: string;
}

async function fetchData() {
  // Fetch data from API

  //   await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await fetch("https://www.jsgp.xyz/api/data", {
    next: {
      revalidate: 0,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

async function Server() {
  const data: Student[] = await fetchData();
  console.log(data);

  return (
    <Suspense fallback={<Loading />}>
      <ParentComponent data={data} />
    </Suspense>
  );
}

export default Server;
