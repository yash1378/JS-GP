// "use client"

import Client from "@/components/newenroll/client";
import Loading from "./loading";
import Server from "@/components/newenroll/server";
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
        <Client>
          <Suspense fallback={<Load />}>
            <Server />
          </Suspense>
        </Client>
      </div>
    </>
  );
}
