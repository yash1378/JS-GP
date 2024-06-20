"use client";
import React, { useState } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
interface MentorInputFormProps {}

const MentorInputForm: React.FC<MentorInputFormProps> = () => {
  const [mentorName, setMentorName] = useState<string>("");
  const [mentorPhoneNumber, setMentorPhoneNumber] = useState<string>("");
  const [mentorCollegeName, setMentorCollegeName] = useState<string>("");
  const [dateOfJoining, setDateOfJoining] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const router = useRouter();

  const toast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebar: any = document.getElementById("drawer-navigation");
    sidebar.classList.toggle("-translate-x-full");
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    const sidebar: any = document.getElementById("drawer-navigation");
    sidebar.classList.add("-translate-x-full");
  };

  // Function to open the modal
  const openModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    closeModal(e);

    if(mentorPhoneNumber.length!=10){
        setMessage("Input Proper Phone Number");
        setColor("red");
        toast();
        return
    }

    const formData = {
      name: mentorName,
      phone: mentorPhoneNumber,
      college: mentorCollegeName,
      date: dateOfJoining,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        // "http://4.224.114.194:8080/mentorData",
        "https://www.jsgp.xyz/mentorData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setMentorName("");
      setMentorPhoneNumber("");
      setMentorCollegeName("");
      setDateOfJoining("");
      setEmail("");
      setPassword("");

      if (response.ok) {
        setMessage("Data Sent Successfully");
        setColor("green");
        toast();
      } else {
        console.error(response);
        setMessage("Failed to submit for Data");
        setColor("red");
        toast();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred");
      setColor("red");
      toast();
    }
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className=" fixed top-0 left-0 z-30 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
          onClick={() => {
            setIsSidebarOpen(false);
            toggleSidebar();
          }} // Close the sidebar when overlay is clicked
        ></div>
      )}
      <div
        className="w-20  bg-zinc-800 z-100000 absolute left-0 top-0"
        style={{ height: "100%", boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.5)" }}
      >
        <FaBars
          style={{
            color: isHover ? "white" : "white",
            height: isHover ? "55px" : "45px", // Increase size on hover
            width: isHover ? "55px" : "45px", // Increase size on hover
            transition: "all 0.2s ease", // Add transition effect
            position: "absolute",
            left: "13px",
            top: "13px",
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
      </div>

      {/* Sliding sidebar */}
      <div
        id="drawer-navigation"
        className="absolute top-0 left-0 z-40 w-64  p-4 overflow-y-auto transition-transform -translate-x-full bg-gray-900 dark:bg-gray-800"
        tabIndex={-1}
        style={{ height: "100%" }}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-lg font-Damion-cursive text-white uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            closeSidebar();
            setIsSidebarOpen(false);
          }}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-Damion-cursive">
            <li className="hover:bg-gray-800 ">
              <a
                href="/mentdelete"
                className="flex items-center p-2 text-white rounded-lg "
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Delete Mentor</span>
              </a>
            </li>
            {/* Add more menu items here */}
          </ul>
        </div>
      </div>

      <div className="bg-gray-700 dark:bg-gray-900 pt-4 w-screen min-h-screen">
        <div
          className="mx-auto relative p-4 rounded-lg bg-gray-900 dark:bg-gray-800"
          style={{
            maxWidth: "60vw",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <form>
            <div className="mb-4">
              <label
                htmlFor="mentorName"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Mentor Name
              </label>
              <input
                type="text"
                id="mentorName"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2.5 w-full text-base text-gray-900 bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  mentorName ? "has-value" : ""
                }`}
                placeholder="Enter Mentor's Name"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mentorPhoneNumber"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Mentor Phone Number
              </label>
              <input
                type="tel"
                id="mentorPhoneNumber"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2.5 w-full text-base text-gray-900 bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  mentorPhoneNumber ? "has-value" : ""
                }`}
                placeholder="Enter Mentor's Phone Number"
                value={mentorPhoneNumber}
                onChange={(e) => setMentorPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2.5 w-full text-base text-gray-900 bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  email ? "has-value" : ""
                }`}
                placeholder="Enter Mentor's Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2.5 w-full text-base text-gray-900 bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  password ? "has-value" : ""
                }`}
                placeholder="Enter Mentor's Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mentorCollegeName"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Mentor College Name
              </label>
              <input
                type="text"
                id="mentorCollegeName"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2.5 w-full text-base text-gray-900 bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  mentorCollegeName ? "has-value" : ""
                }`}
                placeholder="Enter Mentor's College Name"
                value={mentorCollegeName}
                onChange={(e) => setMentorCollegeName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dateOfJoining"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Date of Joining
              </label>
              <input
                type="date"
                id="dateOfJoining"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2.5 w-full text-base text-white bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark-text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  dateOfJoining ? "has-value" : ""
                }`}
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                required
              />
            </div>
            {/* Other input fields */}
            <div className="mb-4 md:flex">
              <div
                className="w-full md:w-1/3 mb-2 md:mb-0"
                // style={{ border: "2px solid red" }}
              >
                <button
                  id="submitButton"
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
                    mentorName &&
                    mentorPhoneNumber &&
                    mentorCollegeName &&
                    dateOfJoining
                      ? "has-value"
                      : ""
                  }`}
                  type="submit"
                  onClick={openModal}
                >
                  <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Submit
                  </span>
                </button>
              </div>
              <div
                className="w-full md:w-1/3 mb-2 md:mb-0"
                // style={{ border: "2px solid red" }}
              ></div>
              <div
                className="w-full md:w-1/3 mb-1 md:mb-0 flex justify-end"
                // style={{
                //   border: "2px solid red",
                // //   paddingLeft: "40px",
                // //   paddingRight: "10px",
                // }}
              >
                <button
                  id="subscriptionTypeButton"
                  onClick={() => router.push("/home")}
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden text-base font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
                  type="button"
                  //   style={{ border: "2px solid red" }}
                >
                  <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Go Back
                  </span>
                </button>
              </div>

              {isModalVisible && (
                <>
                  <div className="fixed top-0 left-0 z-10 w-full min-h-screen bg-black opacity-70 transition-opacity duration-700 ease-in-out"></div>
                  <Modal onClose={closeModal}>
                    <div className="p-6 text-center">
                      <h3 className="mb-5 text-xl font-normal text-gray-800 dark:text-gray-400">
                        Are you sure you want to appoint this Mentor ?
                      </h3>
                      <button
                        onClick={handleSubmit}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-Damion-cursive rounded-lg text-base inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, I&apos;m sure
                      </button>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg                       border-gray-200 text-base font-Damion-cursive px-5 py-2.5 hover:text-black focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </Modal>
                </>
              )}
            </div>
          </form>
          <div
            className="mx-auto mt-8 p-4 rounded-lg bg-gray-900 dark:bg-gray-800"
            style={{ maxWidth: "60vw" }}
          >
            {showToast && (
              <Toast
                message={message}
                bgColor={color}
                onClose={() => setShowToast(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorInputForm;
