// ClientButton.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
type ClientButtonProps = {
  onClick: () => void;
};

const ClientButton: React.FC = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        // Your button click handler here
        router.push("/home");
      }}
      className="fixed bottom-6 right-3"
    >
      <span className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Go Back
        </span>
      </span>
    </button>
  );
};

export default ClientButton;
