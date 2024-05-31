import Student from "@/components/edit/student/client";
import Loading from "./loading";
import { Suspense } from "react";

interface StudentData {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  class: string;
  sub: string;
  mentor: string;
}

interface Mentor {
  id: string;
  name: string;
  number: number;
  college: string;
  date: string;
  handle: number;
  on: number;
  total: number;
}

// as these are server components in this caching doesn't work
async function getData() {
  const res = await fetch("http://52.190.11.22:80/api/data/", {
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
  const response2 = await fetch("http://52.190.11.22:80/api/mentorData", {
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

async function MentServer({ params }: { params: { phone: string } }) {
  const data: StudentData[] = await getData();
  const d: Mentor[] = await getAdditionalData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Student data={data} d={d} params={params} />
      </Suspense>
    </>
  );
}

export default MentServer;
