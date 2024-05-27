'use client'
import React, { useState, useEffect } from "react";
import DataPage from "./DataPage";

// Type for additional data format
interface AdditionalData {
    _id: string;
    name: string;
    number: number;
    college: string;
    date: string;
    handle: number;
    __v: number;
    on: number;
    total: number;
  }
  
  // Type for data format
  interface StudentData {
    _id: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    class: string;
    sub: string;
    mentor: string;
    __v: number;
  }

  interface ParentProps {
    data:StudentData[];
    additionalData:AdditionalData[];
  }

  
const ParentComponent:React.FC<ParentProps>=({data,additionalData})=> {

  const [studentsWithoutMentor, setStudentsWithoutMentor] = useState<StudentData[]>([]);

  useEffect(() => {
    // Filter students without mentors
    const studentsWithoutMentors:StudentData[] = data.filter((student) => !student.mentor);
    setStudentsWithoutMentor(studentsWithoutMentors);
  }, [data]);




  // Function to update data and remove assigned students
  const updateData = (newData:StudentData[]) => {
    // Update the data array with the new data
    // This will trigger a re-render of DataPage with the updated data
    data = newData;

    // Filter students without mentors
    const studentsWithoutMentors = data.filter((student) => !student.mentor);
    setStudentsWithoutMentor(studentsWithoutMentors);
  };



  return (
    <DataPage
    data={studentsWithoutMentor} // Pass the filtered data without mentors
    updateData={updateData}
    additionalData={additionalData}
    />
  );
}

export default ParentComponent;

