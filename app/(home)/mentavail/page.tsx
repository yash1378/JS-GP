"use client";
import React, { useEffect, useState, FormEvent } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

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

const Registration: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<string>("");
  const [selectedStudentCount, setSelectedStudentCount] = useState<number>(0);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openModal = (e: FormEvent) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const closeModal = (e: FormEvent) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await fetch(
        "https://gp-backend-u5ty.onrender.com/api/mentorData"
      );
      if (response.ok) {
        const data: Mentor[] = await response.json();
        setMentors(data);
      } else {
        console.error("Failed to fetch mentors.");
      }
    } catch (error) {
      console.error("An error occurred while fetching mentors:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    closeModal(e);

    try {
      const response = await fetch(
        "https://gp-backend-u5ty.onrender.com/api/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mentorName: selectedMentor,
            studentCount: selectedStudentCount,
          }),
        }
      );

      if (response.ok) {
        setMessage("Data Sent Successfully");
        setColor("green");
        showToastMessage();
      } else {
        console.error("Failed to update data.");
        setMessage("Failed");
        setColor("Red");
        showToastMessage();
      }
    } catch (error) {
      console.error("An error occurred while updating data:", error);
    }

    setSelectedMentor("");
    setSelectedStudentCount(0);
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <div className="bg-emerald-950 w-screen min-h-screen pt-4 dark:bg-gray-900">
        <div
          className="mx-auto p-4 rounded-lg bg-emerald-900 dark:bg-gray-800"
          style={{
            maxWidth: "60vw",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <form>
            <div className="mb-4">
              <label
                htmlFor="mentorSelect"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                Select Mentor
              </label>
              <select
                id="mentorSelect"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-emerald-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                required
              >
                <option value="">Select Mentor</option>
                {mentors.map((mentor: Mentor) => (
                  <option key={mentor._id} value={mentor.name}>
                    {mentor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="studentCountSelect"
                className="block mb-2 text-sm font-Damion-cursive text-white dark:text-white"
              >
                Number of Students
              </label>
              <select
                id="studentCountSelect"
                className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-emerald-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                value={selectedStudentCount}
                onChange={(e) =>
                  setSelectedStudentCount(Number(e.target.value))
                }
                required
              >
                <option value="">Select Number of Students</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex justify-center">
              <button
                id="submitButton"
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800${
                  selectedMentor && selectedStudentCount ? "has-value" : ""
                }`}
                type="submit"
                onClick={openModal}
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Submit
                </span>
              </button>

              <button
                id="subscriptionTypeButton"
                onClick={() => router.push("/home")}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                type="button"
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Go Back
                </span>
              </button>
              {isModalVisible && (
                <>
                  <div
                    className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
                    onClick={closeModal}
                  ></div>
                  <Modal onClose={closeModal}>
                    <div className="p-6 text-center">
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to set this mentor's Availability
                        to these no. of Students?
                      </h3>
                      <button
                        onClick={handleSubmit}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-Damion-cursive rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 bg-black hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-Damion-cursive px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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

          {showToast && (
            <Toast
              message={message}
              bgColor={color}
              onClose={() => setShowToast(false)}
            />
          )}

      </div>
    </>
  );
};

export default Registration;
