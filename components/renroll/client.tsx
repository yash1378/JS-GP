"use client";
import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  class: string;
  sub: string;
  mentor: string;
}

interface EnrollmentProps {
  data: Student[];
  d: any[]; // Assuming d is an array of any type for now
}

function Enroll({ data, d }: EnrollmentProps) {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Student[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [studentData, setStudentData] = useState<Student[]>(data);
  const [selectedMentor, setSelectedMentor] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [classs, setClasss] = useState<string>("");
  const [sub, setSub] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API and set it to studentData
    // ...
  }, [data, d]);

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredNames = studentData.filter(
      (student, index, self) =>
        student.phone.toLowerCase().startsWith(value.toLowerCase()) &&
        index === self.findIndex((s) => s.phone === student.phone)
    );

    setSearchText(value);
    setSuggestions(filteredNames);
  };

  const handleSuggestionClick = (student: Student) => {
    setSearchText(student.name);
    setSelectedMentor(student.mentor);
    setPhone(student.phone);
    setEmail(student.email);
    setClasss(student.class);
    setSub(student.sub);
    console.log("clicked");

    const studentWithDate = d.find((s) => s.phone === student.phone);

    if (studentWithDate) {
      const originalDate = new Date(studentWithDate.date);
      const newDate = new Date(
        originalDate.getTime() + 30 * 24 * 60 * 60 * 1000
      );
      console.log(newDate);
      setSelectedDate(newDate.toISOString().split("T")[0]);
    } else {
      setSelectedDate("");
      console.error("Date not found for the selected student.");
    }

    setSuggestions([]);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    closeModal(e);
    try {
      const response = await fetch("https://js-gp-backend.onrender.com/renrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: searchText,
          mentorName: selectedMentor,
          date: selectedDate,
          phone: phone,
          email: email,
          classs: classs,
          sub: sub,
        }),
      });

      if (response.ok) {
        setSearchText("");
        setSelectedMentor("");
        setSelectedDate("");
        setMessage("Renrolled Successfully");
        setColor("green");
        toast();
      } else {
        console.error("Error submitting data to the backend.");
        setMessage("Failed to submit for Data");
        setColor("red");
        toast();
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to submit for Data");
      setColor("red");
      toast();
    }
  };

  const toast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  console.log(suggestions);
  return (
    <div className="bg-gray-700 w-screen min-h-screen overflow-hidden">
      <h1 className="relative py-7 w-[100vw] text-center text-4xl text-white font-Damion-cursive mx-auto">
        <b> Type the Name of the Student to Search</b>
      </h1>
      <form className="flex flex-wrap justify-center">
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-Damion-cursive text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div
            className="relative mt-5 w-[80vw] mx-auto"
            style={{ position: "sticky", top: "0" }}
          >
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-base text-gray-900 font-Damion-cursive border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Student by PhoneNo..."
              required
              value={searchText}
              onChange={handleSearchChange}
            />
            {searchText.length > 0 && (
              <div className="suggestions text-white">
                {suggestions.length > 0 && (
                  <ul>
                    {suggestions
                      .filter((student) => student.mentor !== "") // Filter students with a non-empty mentor
                      .map((student, index) => (
                        <li
                          className={`
                ${
                  index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                } hover:bg-indigo-600 hover:text-white
              `}
                          style={{ cursor: "pointer" }}
                          key={student.name}
                          onClick={() => {
                            handleSuggestionClick(student);
                            setSuggestions([]);
                          }}
                        >
                          {student.name} - Mentor: {student.mentor}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="ml-4 px-2 mt-4 w-[25vw] font-Damion-cursive ">
          <label className="text-white">Select Date&nbsp;:&nbsp;</label>
          <input
            type="date"
            className="rounded-md px-1 py-3 transition-all ease-in duration-75 bg-gradient-to-br from-purple-600 to-blue-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 ml-4">
          <button
            id="classButton"
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
            type="submit"
            onClick={openModal}
          >
            <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit
            </span>
          </button>
          {isModalVisible && (
            <>
              <div
                className=" fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
                onClick={() => closeModal} // Close the sidebar when overlay is clicked
              ></div>
              <Modal onClose={() => closeModal}>
                <div className="p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  ></svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-400">
                    Are you sure you want to Renroll this Student?
                  </h3>
                  <button
                    onClick={handleSubmit} // Call handleSubmit when "Yes, I'm sure" is clicked
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-Damion-cursive rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I&apos;m sure
                  </button>
                  <button
                    onClick={closeModal} // Close the modal when "No, cancel" is clicked
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-Damion-cursive px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </Modal>
            </>
          )}
          <button
            onClick={() => {
              router.push("/registration");
            }}
            className="fixed bottom-2 right-5"
          >
            <span className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Go Back
              </span>
            </span>
          </button>
        </div>
      </form>

      {showToast && (
        <Toast
          message={message}
          bgColor={color}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default Enroll;
