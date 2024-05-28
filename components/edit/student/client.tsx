'use client'

import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";


interface Student {
    _id: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    class: string;
    sub: string;
    mentor: string;
}

interface Mentor {
    _id: string;
    name: string;
    number: number;
    college: string;
    date: string;
    handle: number;
    __v: number;
    on: number;
    total: number;
  }

interface Props {
  data: Student[];
  d: Mentor[];
  params:{phone:string};
}

const Student: React.FC<Props> = ({ data, d,params }) => {
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); 
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [newmentor, setNewMentor] = useState<string>("");

//   const { phone } = router.query as { phone: string };
  const phone = params.phone;

  const back = () => {
    // router.replace("/registration");
    window.location.href="/edit";
  };

  const toast = async () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  useEffect(() => {
    const today = new Date();
    const studentData = data
      .filter((item) => item.phone === phone)
      .filter((item) => new Date(item.date) <= today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (studentData.length > 0) {
      const mostRecentStudent = studentData[0];
      setStudentName(mostRecentStudent.name);
      setStudentEmail(mostRecentStudent.email);
      setPhoneNumber(mostRecentStudent.phone);
      setSelectedDate(mostRecentStudent.date);
      setSelectedClass(mostRecentStudent.class);
      setNewMentor(mostRecentStudent.mentor);
    }
  }, [data, phone]);

  const handleEditSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal(e);

    try {
      const response = await fetch(`https://gp-backend-u5ty.onrender.com/student/${phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          studentEmail,
          phoneNumber,
          selectedDate,
          selectedClass,
          newmentor,
        }),
      });

      setStudentName("");
      setStudentEmail("");
      setPhoneNumber("");
      setSelectedDate("");
      setSelectedClass("");

      if (response.ok) {
        setMessage("Data Updated Successfully");
        setColor("green");
        setShowToast(true);
        setIsButtonEnabled(true);
      } else {
        console.error("Failed to update student data.");
        setMessage("Failed to update data");
        setColor("red");
        setShowToast(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred");
      setColor("red");
      setShowToast(true);
    }
  };

  return (
    <>
      <body className="bg-gray-700 pt-1 ">
        <div className="mx-auto mt-8 p-4 rounded-lg bg-gray-800 dark:bg-gray-800" style={{ maxWidth: "60vw" }}>
        <form>
            <div className="mb-4">
              <label
                htmlFor="studentName"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm font-Damion-cursive text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter Student's Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mentorName"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                New Mentor Name
              </label>
              <select
                id="mentorName"
                name="mentorName"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full font-Damion-cursive text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={newmentor}
                onChange={(e) => setNewMentor(e.target.value)}
              >
                {/* <option value="">Select a Mentor</option> */}
                {d.map((mentor) => (
                  <option key={mentor._id} value={mentor.name}>
                    {mentor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="studentEmail"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                Student Email
              </label>
              <input
                type="email"
                id="studentEmail"
                name="studentEmail"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm font-Damion-cursive text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter Student's Email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm font-Damion-cursive text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="selectedDate"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                id="selectedDate"
                name="selectedDate"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm font-Damion-cursive text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="selectedClass"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                Class
              </label>
              <select
                id="selectedClass"
                name="selectedClass"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm font-Damion-cursive text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select a Class</option>
                <option value="Class A">10th Grade</option>
                <option value="Class B">11th Grade</option>
                <option value="Class C">12th Grade</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <span className="mb-4">
              <button
                // type="submit"
                onClick={openModal}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Update Data
                </span>
              </button>
            </span>
            <span className="mb-4">
              <button
                type="button"
                className="text-white bg-blue-400 dark:bg-blue-500 font-Damion-cursive rounded-lg text-sm px-5 py-2.5 text-center 
                 bg-blue-400 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600"
                // disabled={!isButtonEnabled}
                onClick={()=>back()}
              >
                Go Back
              </button>
            </span>
            {isModalVisible && (
              <>
                <div
                  className=" fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
                  onClick={()=>closeModal} // Close the sidebar when overlay is clicked
                ></div>
                <Modal onClose={()=>closeModal}>
                  <div className="p-6 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    ></svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-400">
                      Are you sure you want to confirm this edit ?
                    </h3>
                    <button
                      onClick={handleEditSubmit} // Call handleSubmit when "Yes, I'm sure" is clicked
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-Damion-cursive rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Yes, I&apos;m sure
                    </button>
                    <button
                      onClick={closeModal} // Close the modal when "No, cancel" is clicked
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-Damion-cursive px-5 py-2.5 hover:text-black focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                  </div>
                </Modal>
              </>
            )}
          </form>
        </div>
          {showToast && (
            <Toast
              message={message}
              bgColor={color}
              onClose={() => setShowToast(false)}
            />
          )}
      </body>
    </>
  );
};

export default Student;
