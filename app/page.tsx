"use client"

import { useRouter } from "next/navigation";
import {useState,useEffect} from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import MuiAlert from "@mui/material/Alert";
import Typewriter from "@/components/Typewriter";

const Home: React.FC = () => {
  const router = useRouter();
  const [isHovered,setIsHovered] = useState(false);
  const [showSecondaryText, setShowSecondaryText] = useState(false);
  const [openlogin, setOpenlogin] = useState(true);
  const [open, setOpen] = useState(false);

  const handleSignIn = () => router.push("/login");

  useEffect(()=>{
    if(openlogin){
      setTimeout(()=>{
        setOpenlogin(false);
      },3000);
    }
  })

  const buttonStyle = {
    width: "300px", 
    padding: "20px 2rem",
    margin:"10px",
    border: "1px solid #CBD5E0",
    display: "flex",
    gap: "2rem",
    borderRadius: "0.5rem",
    color: "white",
    background: "#334244",
    cursor: "pointer",
    transition: "all 0.5s ease",
  };
  const hoverStyle = {
    border: "1px solid #CBD5E0",
    color: "white",
    background: "transparent",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  };

  return(
    <>
      <div style={{
        height:"100vh",
        width:"100vw",
        backgroundImage:"url('./bg.png')",
        // border:"2px solid red",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
      <div  
        style={{
          textAlign: "center",
          padding: "20px",
          boxShadow: "0 5px 30px rgba(0, 0, 0, 1.3)",
          borderRadius: "20px",
          width:"90vw",
          backgroundImage: "url('/bg.png')",
        }}
      >
          <div style={{height:'85vh',display:'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography
              style={{
                fontFamily: "'Graphik', sans-serif",
                color: "white",
                marginTop: "10vh",
              }}
              variant="h1"
              gutterBottom
              color="white"
              fontWeight="bold"
            >
               Welcome to Your App
            </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {showSecondaryText && (
                    <Typewriter
                      words={[
                        "We ",
                        "make ",
                        "IIT ",
                        "JEE ",
                        "PREP ",
                        "EASIER ",
                        "FOR ",
                        "YOU ",
                      ]}
                      speed={40}
                    />
                  )}
                  <br/>

                  <button
                    onClick={handleSignIn}
                    style={isHovered ? {...buttonStyle,...hoverStyle}:buttonStyle}
                    onMouseEnter={()=>{setIsHovered(true)}}
                    onMouseLeave={()=>{setIsHovered(false)}}
                  >
                    <img
                      style={{ width: "2.5rem", height: "2.5rem" }}
                      src="https://www.svgrepo.com/show/227633/login.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span style={{ fontSize: "20px", marginTop: "6px" }}>
                      Login in With
                    </span>
                  </button>
                </div>
                <Snackbar
                open={openlogin}
                TransitionComponent={Grow}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
              >
                <MuiAlert severity="info" style={{ width: "100%" }}>
                  Sign In using the button above
                </MuiAlert>
              </Snackbar> 
              </div>  

      </div>
      </div>

    </>
  )
}


export default Home;
