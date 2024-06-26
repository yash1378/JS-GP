"use client";
import React, { FormEvent, useState } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { FaBars } from "react-icons/fa";

const Registration: React.FC = () => {
  const [studentName, setStudentName] = useState("");
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class");
  const [subscriptionType, setSubscriptionType] = useState("Type");
  const [reenrollment, setReenrollment] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  // State variables to track dropdown open/closed state
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [subscriptionTypeDropdownOpen, setSubscriptionTypeDropdownOpen] =
    useState(false);
  const [reenrollmentDropdownOpen, setReenrollmentDropdownOpen] =
    useState(false);
  // Add state variable for toast visibility
  const [showToast, setshowToast] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to open the modal
  const openModal = (e: FormEvent) => {
    e.preventDefault(); //this command is necessary otheriwse the form will get reload
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = (e: FormEvent) => {
    e.preventDefault(); //this command is necessary otheriwse the form will get reload
    setIsModalVisible(false);
  };

  const toggleSidebar = () => {
    const sidebar: any = document.getElementById("drawer-navigation");
    sidebar.classList.toggle("-translate-x-full");
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    const sidebar: any = document.getElementById("drawer-navigation");
    sidebar.classList.add("-translate-x-full");
  };

  const toast = async () => {
    setshowToast(true);
    setTimeout(() => {
      setshowToast(false); // Hide the toast after 3 seconds
    }, 3000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    closeModal(e);

    console.log("Form submitted with:", {
      studentName,
      phoneNumber,
      studentEmail,
      paymentDate,
      selectedClass,
      subscriptionType,
    });
    setStudentName("");
    setPhoneNumber("");
    setStudentEmail("");
    setPaymentDate("");
    setSelectedClass("");
    setSubscriptionType("");
    const formData = {
      name: studentName,
      phone: phoneNumber,
      email: studentEmail,
      date: paymentDate,
      class: selectedClass,
      sub: subscriptionType,
    };
    try {
        const response = await fetch("https://www.jsgp.xyz/", {
      // const response = await fetch("https://www.jsgp.xyz/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
        setMessage("Data Sent Successfully");
        setColor("green");
        toast();

        // Set a timer to hide the toast after 3 seconds
        // setTimeout(setshowToast(false), 3000);
      } else {
        console.error("Failed to submit form data.");
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

    // Implement form submission logic here (e.g., send data to the backend)
  };

  const toggleDropdown = (field: string) => {
    // Toggle the dropdown state based on the field
    switch (field) {
      case "class":
        setClassDropdownOpen(!classDropdownOpen);
        break;
      case "subscriptionType":
        setSubscriptionTypeDropdownOpen(!subscriptionTypeDropdownOpen);
        break;
      case "reenrollment":
        setReenrollmentDropdownOpen(!reenrollmentDropdownOpen);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="min-h-screen  pt-4 bg-gray-700">
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
          style={{ height: "100%" }}
        >
          <FaBars
            style={{
              color: "white",
              height: "45px",
              width: "45px",
              position: "absolute",
              left: "13px",
              top: "13px",
              cursor: "pointer",
            }}
            onClick={toggleSidebar}
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
                  href="/delete"
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
                  <span className="ml-3">Delete Student</span>
                </a>
              </li>
              <li className="hover:bg-gray-800 ">
                <a
                  href="/renroll"
                  className="flex items-center p-2 text-white rounded-lg  "
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ml-3 ">Re-Enroll Student</span>
                </a>
              </li>
              <li className="hover:bg-gray-800 ">
                <a
                  href="/edit"
                  className="flex items-center p-2 text-white rounded-lg dark:text-white  dark:hover:bg-gray-700 "
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75  hover:text-white "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ml-3">Edit Student Data</span>
                </a>
              </li>
              {/* Add more menu items here */}
            </ul>
          </div>
        </div>
        <div
          className="mx-auto  mt-2 p-4 rounded-lg bg-gray-800 dark:bg-gray-800"
          style={{
            maxWidth: "60vw",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <form>
            <div className="mb-3">
              <label
                htmlFor="studentName"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2 w-full text-base text-gray-900 bg-white-400 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  studentName ? "has-value" : ""
                }`}
                placeholder="Enter your Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2 w-full text-base text-gray-900bg-white-400 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  phoneNumber ? "has-value" : ""
                }`}
                placeholder="Enter your Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="studentEmail"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Student Email
              </label>
              <input
                type="email"
                id="studentEmail"
                className={`block rounded-lg px-2.5 pb-2.5 pt-2 w-full text-base text-gray-900 bg-white-400 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  studentEmail ? "has-value" : ""
                }`}
                placeholder="Enter your Email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentDate"
                className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
              >
                Date of Payment
              </label>
              <input
                type="date"
                id="paymentDate"
                className={`block rounded-lg cursor-point px-2.5 pb-2.5 pt-2 w-full text-base text-gray-900 bg-white-400 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  paymentDate ? "has-value" : ""
                }`}
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>
            {/* Responsive styling for Class, Subscription Type, and Reenrollment */}
            <div className="mb-4 md:flex md:space-x-2 justify-between">
              {/* Class Field */}
              <div className="w-full md:w-1/2 mb-2 md:mb-0">
                <label
                  htmlFor="selectedClass"
                  className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
                >
                  Class
                </label>
                <button
                  id="selectedClass"
                  // data-dropdown-toggle="dropdown"
                  className={`block rounded-lg px-2.5 pb-1.5 pt-2 w-full text-base text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                    selectedClass ? "has-value" : ""
                  }`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown("class");
                  }}
                >
                  {selectedClass || "Select Class"}{" "}
                  <svg
                    className="w-2.5 h-1.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="classDropdown"
                  className={`z-10 ${
                    classDropdownOpen ? "block" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  style={{ zIndex: 10 }}
                >
                  <ul
                    className="py-2 text-base text-gray-700 dark:text-gray-200"
                    aria-labelledby="classDropdownButton"
                  >
                    <li>
                      <button
                        className="block px-4 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedClass("10th Grade");
                          toggleDropdown("class");
                        }}
                      >
                        10th Grade
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedClass("11th Grade");
                          toggleDropdown("class");
                        }}
                      >
                        11th Grade
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedClass("12th Grade");
                          toggleDropdown("class");
                        }}
                      >
                        12th Grade
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedClass("Dropper");
                          toggleDropdown("class");
                        }}
                      >
                        Dropper
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Subscription Type Field */}
              <div className="w-full md:w-1/2 mb-2 md:mb-0">
                <label
                  htmlFor="subscriptionType"
                  className="block mb-2 text-base font-Damion-cursive text-white dark:text-white"
                >
                  Subscription Type
                </label>
                <button
                  id="subscriptionType"
                  // data-dropdown-toggle="dropdown"
                  className={`block rounded-lg px-2.5 pb-1.5 pt-2 w-full text-base text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                    subscriptionType ? "has-value" : ""
                  }`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown("subscriptionType");
                  }}
                >
                  {subscriptionType || "Select Type"}{" "}
                  <svg
                    className="w-2.5 h-1.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="subscriptionTypeDropdown"
                  className={`z-10 ${
                    subscriptionTypeDropdownOpen ? "block" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  style={{ zIndex: 10 }}
                >
                  <ul
                    className="py-2 text-base text-gray-700 dark:text-gray-200"
                    aria-labelledby="subscriptionTypeDropdownButton"
                  >
                    <li>
                      <button
                        className="block px-4 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setSubscriptionType("Premium");
                          toggleDropdown("subscriptionType");
                        }}
                      >
                        Premium
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setSubscriptionType("Normal");
                          toggleDropdown("subscriptionType");
                        }}
                      >
                        Normal
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="mb-2 md:flex md:space-x-2 justify-between"
              //   style={{ border: "2px solid red" }}
            >
              {/* Class Field */}
              <div className="w-full md:w-1/3 mb-2 md:mb-0">
                <button
                  id="classButton"
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-base font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
                    selectedClass ? "has-value" : ""
                  }`}
                  type="submit"
                  onClick={openModal}
                >
                  <span className="relative px-20 py-2 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Submit
                  </span>
                </button>
              </div>

              {/* Subscription Type Field */}
              <div className="w-full md:w-1/3 mb-2 md:mb-0 flex justify-end">
                <button
                  id="subscriptionTypeButton"
                  onClick={() => router.push("/home")}
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
                    subscriptionType ? "has-value" : ""
                  }`}
                  type="button"
                >
                  <span className="relative px-20 py-2 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Go Back
                  </span>
                </button>
              </div>
              {/* </div> */}

              {isModalVisible && (
                <>
                  <div
                    className=" fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
                    onClick={closeModal} // Close the sidebar when overlay is clicked
                  ></div>
                  <Modal onClose={closeModal}>
                    <div className="p-6 text-center z-50">
                      <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      ></svg>
                      <h3 className="mb-5 text-lg font-Damion-cursive text-gray-800 dark:text-gray-400">
                        Are you sure you want to add this aspirant to Guidance
                        Program?
                      </h3>
                      <button
                        onClick={handleSubmit} // Call handleSubmit when "Yes, I'm sure" is clicked
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-Damion-cursive rounded-lg text-base inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, I&apos;m sure
                      </button>
                      <button
                        onClick={closeModal} // Close the modal when "No, cancel" is clicked
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-Damion-cursive px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </Modal>
                </>
              )}
            </div>
          </form>
        </div>
        {/* Your form and dropdowns here */}

        {/* Display the success toast if showSuccessToast is true */}
        {showToast && (
          <Toast
            message={message}
            bgColor={color}
            onClose={() => setshowToast(false)}
          />
        )}
      </div>
    </>
  );
};

export default Registration;
