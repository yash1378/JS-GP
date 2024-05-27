"use client";
import React from "react";
import { CircularProgress, Typography } from "@mui/material";
export default function Loading() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "black",width:"100vw" }}>
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: 16, color: "white" }}>
                Loading...
            </Typography>
        </div>
    );
}