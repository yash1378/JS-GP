"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();
  // The text to simulate typing
  const typingText = "Hi Pratham, Here you can access the Designated Page";
  const [isHovered, setIsHovered] = useState(false);
  // State to manage the displayed text
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Simulate typing animation
    if (textIndex < typingText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(typingText.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 100); // Adjust the typing speed as needed

      return () => clearTimeout(timer);
    }
  }, [textIndex, typingText]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for Pratham" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column", // Comma instead of semicolon
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <main
          className={`font-Damion-cursive`}
          style={{
            padding: "5rem 0",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "2rem",
            }}
          >
            <b>{displayedText}</b>
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                margin: "1rem",
                padding: "1rem 2rem",
                border: "2px solid #333",
                borderRadius: "8px",
                backgroundColor: isHovered ? "#0052cc" : "#0070f3",
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => router.push("/mentavail")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Mentor Availability Update
            </button>
            <button
              style={{
                margin: "1rem",
                padding: "1rem 2rem",
                border: "2px solid #333",
                borderRadius: "8px",
                backgroundColor: isHovered ? "#0052cc" : "#0070f3",
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => router.push("/mentdashboard")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Mentor Dashboard
            </button>
            <button
              style={{
                margin: "1rem",
                padding: "1rem 2rem",
                border: "2px solid #333",
                borderRadius: "8px",
                backgroundColor: isHovered ? "#0052cc" : "#0070f3",
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => router.push("/mregis")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Mentor Data Input
            </button>
            <button
              style={{
                margin: "1rem",
                padding: "1rem 2rem",
                border: "2px solid #333",
                borderRadius: "8px",
                backgroundColor: isHovered ? "#0052cc" : "#0070f3",
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => router.push("/registration")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Student Checkin
            </button>
            <button
              style={{
                margin: "1rem",
                padding: "1rem 2rem",
                border: "2px solid #333",
                borderRadius: "8px",
                backgroundColor: isHovered ? "#0052cc" : "#0070f3",
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => router.push("/stdashboard")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Student Dashboard
            </button>
            <button
              style={{
                margin: "1rem",
                padding: "1rem 2rem",
                border: "2px solid #333",
                borderRadius: "8px",
                backgroundColor: isHovered ? "#0052cc" : "#0070f3",
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => router.push("/pending")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Student Assigning
            </button>
          </div>
        </main>
        {/* Footer content */}
        <footer
          style={{
            width: "100%",
            padding: "1rem",
            textAlign: "center",
            backgroundColor: "#333",
            color: "white",
            position: "fixed",
            bottom: 0,
          }}
        >
          <p>&copy; 2023 JEE Simplified. All rights reserved.</p>
          <p>Terms of Service | Privacy Policy</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
