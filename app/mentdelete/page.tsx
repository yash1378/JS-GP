import React from "react";
import ParentComponent from "@/components/delete/mentclient";
import { Suspense } from "react";
import Loading from "./loading";
interface Student {
    id: string;
    name: string;
    phone: string;
    college: string;
    date: string;
    handle: number;
    on: number;
    total: number;
}

async function fetchData() {
  // Fetch data from API

  //   await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await fetch("https://www.jsgp.xyz/api/mentdelete", {
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
