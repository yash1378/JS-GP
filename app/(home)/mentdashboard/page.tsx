"use client";

import { useState, useEffect } from "react";
import ClientButton from "@/components/button";
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
interface Data {
  id: string;
  name: string;
  phone: number;
  college: string;
  date: string;
  handle: number;
  on: number;
  total: number;
}

const DataPage: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const Load = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
          backgroundColor: "black",
          width: "80vw",
          marginTop: "3vh",
          borderRadius: "20px",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 16, color: "white" }}>
          Loading...
        </Typography>
      </div>
    );
  };
  useEffect(() => {
    const updateData = async () => {
      try {
        const newData = await fetch("https://www.jsgp.xyz/api/mentorData");
        const res = await newData.json();
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    updateData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-gray-700 w-screen min-h-screen mt-0 zIndex-2">
        <h1 className="text-white text-4xl font-'Roboto Slab' mt-3">
          <b>Mentor Data </b>
        </h1>
        <div className="flex flex-col w-[80vw] h-[85vh] mt-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-2xl overflow-hidden sm:rounded-lg">
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "67vh",
                      backgroundColor: "black",
                      width: "80vw",
                      marginTop: "1vh",
                      borderRadius: "20px",
                    }}
                  >
                    <CircularProgress />
                    <Typography
                      variant="h6"
                      style={{ marginTop: 16, color: "white" }}
                    >
                      Loading...
                    </Typography>

                  </div>
                ) : (
                  <table className="min-w-full text-sm text-white sm:table">
                    <thead
                      className="bg-gray-800 text-sm uppercase font-Damion-cursive"
                      style={{ position: "sticky", top: "0", zIndex: "2" }}
                    >
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center tracking-wider"
                        >
                          No.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center tracking-wider"
                        >
                          Mentor Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center tracking-wider"
                        >
                          Total Students Guided
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center tracking-wider"
                        >
                          No. of Ongoing Students
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center tracking-wider"
                        >
                          Current Availability
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-base font-Damion-cursive">
                      {data !== null ? (
                        data.map((item, index) => (
                          <tr
                            key={item.id}
                            className={
                              index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                            }
                          >
                            <td className="pl-4 text-center">{index + 1}</td>
                            <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap text-center">
                              <span className="sm:block">{item.name}</span>
                            </td>
                            <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap text-center">
                              <span className="sm:block">{item.total}</span>
                            </td>
                            <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap text-center">
                              <span className="sm:block">{item.on}</span>
                            </td>
                            <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap text-center">
                              <span className="sm:block">
                                {item.handle - item.on}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-4">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClientButton />
    </>
  );
};

export default DataPage;

// import DataPage from "@/components/mentDashboard/mentDashboardClient";
// import Loading from "./loading";
// import MentServer from "@/components/mentDashboard/mentDashboard";
// import { Suspense } from "react";
// import { CircularProgress, Typography } from "@mui/material";

// async function getData() {
//     // const res = await fetch('http://20.204.209.69:8080/api/mentorData/',{
//         const timestamp = new Date().getTime(); // Unique timestamp to prevent caching
//         const res = await fetch(`https://www.jsgp.xyz/api/mentorData?timestamp=${timestamp}`, {
//           headers: {
//             'Cache-Control': 'no-store'
//           },
//           next: {
//             revalidate: 0,
//           },
//         });

//     if (!res.ok) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error("Failed to fetch data");
//     }

//     return res.json();
//   }

// export default async function Trial() {
//   const Load = () => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "85vh",
//           backgroundColor: "black",
//           width: "80vw",
//           marginTop: "3vh",
//           borderRadius: "20px",
//         }}
//       >
//         <CircularProgress />
//         <Typography variant="h6" style={{ marginTop: 16, color: "white" }}>
//           Loading...
//         </Typography>
//       </div>
//     );
//   };

//   const data = await getData();
//   return (
//     <>
//       <div className="display-flex justify-center">
//         {/* <Client/>
//             <Suspense fallback={<div>Loading...</div>}><Server/></Suspense> */}
//         <Suspense fallback={<Load />}><DataPage data={data}/></Suspense>

//       </div>
//     </>
//   );
// }
