"use client";
import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

type Todo = {
  id: string;
  email: string;
  password: string;
  ownername: string;
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [mpp, setMpp] = useState(new Map());
  const [foundUser, setFoundUser] = useState<string | undefined>();
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  useEffect(() => {
    // http://20.204.209.69:8080/api/ownerData
    async function handleRouteChange() {
      const response = await fetch("http://20.204.209.69:8080/api/ownerData");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInitialTodos(data);
        setFoundUser(data[0].id);
      }
    }
    handleRouteChange();
  }, []);

  const toast = async () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");

    const mpp = new Map();
    mpp.set(initialTodos[0]?.email, 1);
    mpp.set(initialTodos[0]?.password, 1);
    if (mpp.get(formData.email) === 1 && mpp.get(formData.password) === 1) {
      router.push("/home");
      document.cookie = `id=${initialTodos[0].id}; max-age=3600; path=/; SameSite=None; Secure`;
    } else {
      setMessage("Password or email is incorrect!");
      setColor("red");
      toast();
    }
    console.log("executed");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#E1AD01",
          zIndex: 1,
          // border: "2px solid red",
          // paddingTop:"21vh",
          // paddingLeft:"27vw"
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "47vw",
            height: "56vh",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border:"2px solid red",

            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)",
            overflow: "hidden",
          }}
        >
          {/* Background image with reduced opacity */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "url(./back.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              zIndex: -1,
              opacity: 0.8, // Adjusted opacity value
            }}
          ></div>

          <form
            onSubmit={handleSubmit}
            style={{ width: "80%", height: "60%", marginTop: "0.2vh" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  fontFamily: "'Graphik', sans-serif",
                  color: "white",
                  marginTop: "2vh",
                }}
                variant="h3"
                gutterBottom
                color="white"
                fontWeight="bold"
              >
                LOGIN
              </Typography>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="email"
                style={{
                  color: "white",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  display: "block",
                  fontWeight: "600",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  backgroundColor: "transparent",
                  boxShadow:
                    "0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  color: "#ffffff",
                  lineHeight: "1.25",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="password"
                style={{
                  color: "white",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  display: "block",
                  fontWeight: "600",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{
                  backgroundColor: "transparent",
                  boxShadow:
                    "0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  color: "#ffffff",
                  lineHeight: "1.25",
                  outline: "none",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-y-2",
              }}
            >
              <button
                onClick={() => handleSubmit}
                id="slide-button"
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid white",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              <p
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: hovered1 ? "1.2rem" : "1.125rem",
                }}
                onClick={() => router.push("/forgpassword")}
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
              >
                Forgot Password?
              </p>
              <p
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: hovered2 ? "1.2rem" : "1.125rem",
                }}
                onClick={() => router.push("/password-change")}
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
              >
                Change Password?
              </p>
              <p
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: hovered3 ? "1.2rem" : "1.125rem",
                }}
                onClick={() => router.push("/")}
                onMouseEnter={() => setHovered3(true)}
                onMouseLeave={() => setHovered3(false)}
              >
                Back to Home
              </p>
            </div>
          </form>
        </div>
        {showToast && (
          //   <div
          //     style={{
          //       marginLeft: "auto",
          //       marginRight: "auto",
          //       marginTop: "1rem",
          //       marginBottom: "4rem",
          //       padding: "1rem",
          //       borderRadius: "0.75rem",
          //       backgroundColor: "transparent",
          //       maxWidth: "60vw",
          //       boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
          //     }}
          //   >
          <Toast
            message={message}
            bgColor={color}
            onClose={() => setShowToast(false)}
          />
          //   </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
