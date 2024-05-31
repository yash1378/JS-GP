// "use client"

import DataPage from "@/components/mentDashboard/mentDashboardClient";
import Loading from "./loading";
import MentServer from "@/components/mentDashboard/mentDashboard";
import { Suspense } from "react";
import { CircularProgress, Typography } from "@mui/material";
export default async function Trial() {
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
  return (
    <>
      <div className="display-flex justify-center">
        {/* <Client/> 
            <Suspense fallback={<div>Loading...</div>}><Server/></Suspense> */}
        <DataPage>
          <Suspense fallback={<Load />}>
            <MentServer />
          </Suspense>
        </DataPage>
      </div>
    </>
  );
}
