"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import ClientButton from "../button";

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

interface DataPageProps {
  data: Student[];
}

const Client = ({ children }: { children: React.ReactNode }) => {




  return (
    <>
      <div className="flex flex-col items-center  bg-gray-700 w-screen min-h-screen  mt-0 zIndex-2">
        <h1 className=" text-white text-4xl font-'Roboto Slab' mt-3">
          <b>New Enrolls Data </b>
        </h1>
        {children}
      </div>

      <ClientButton />
    </>
  );
};

export default Client;
