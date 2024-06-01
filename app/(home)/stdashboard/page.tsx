import React from "react";
import StDashboardClient from "@/components/stDashboardClient";
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
  // const response = await fetch('http://20.204.209.69:8080/api/data/');
  const response = await fetch("https://js-gp-backend.onrender.com/api/data", {
    next: {
      revalidate: 0,
    },
  });
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
      <StDashboardClient data={data} />
    </Suspense>
  );
}

export default Server;
