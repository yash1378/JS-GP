"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
interface AdditionalData {
  id: string;
  name: string;
  phone: number;
  college: string;
  date: string;
  handle: number;
  on: number;
  total: number;
}

// Type for data format
interface StudentData {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  class: string;
  sub: string;
  mentor: string;
}

interface DataPageProps {
  updateData: (newData: StudentData[]) => void;
  data: StudentData[];
  additionalData: AdditionalData[];
}

const DataPage: React.FC<DataPageProps> = ({
  data,
  additionalData,
  updateData,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [value, setValue] = useState(0);
  const router = useRouter();
  //   console.log(data)

  // State variable to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };



  const toggleSelect = (id: string) => {
    // Check if the ID is already selected
    const isSelected = selectedRows.includes(id);

    // If the ID is selected, remove it from the arrays
    // If not, add it to the arrays
    if (isSelected) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setSelectedStudentIds(
        selectedStudentIds.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedRows([...selectedRows, id]);
      setSelectedStudentIds([...selectedStudentIds, id]);
    }
    console.log(selectedRows);
    console.log(selectedStudentIds);
  };

  // Handle mentor selection
  const handleMentorSelect = (mentor: string) => {
    console.log(selectedMentor);
    console.log(mentor);
    if (selectedMentor === mentor) {
      setSelectedMentor("");
    } else {
      setSelectedMentor(mentor);
    }
    console.log(selectedMentor);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedMentor) {
      // Handle mentor not selected
      // openModal();
      return;
    }

    console.log(selectedStudentIds);

    try {
      // Send an API request to update mentor and students
      console.log(selectedMentor)
      console.log(selectedStudentIds)
      const response = await fetch("https://js-gp-backend.onrender.com/api/finalMentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentorName: selectedMentor,
          studentIds: selectedStudentIds,
        }),
      });
      console.log(selectedMentor);
      if (response.ok) {
        // Handle success
        console.log("Mentor and students updated successfully");

        // Unselect all checkboxes
        setSelectedRows([]);
        setSelectedMentor("");

        // Fetch the latest data from the server
        const response1 = await fetch("https://js-gp-backend.onrender.com/api/data"); // Replace with your API URL
        const updatedData = await response1.json();
        console.log(updatedData);
        // Update the 'data' prop by calling a parent function (if you have one)
        // This will ensure the parent component re-renders and passes the updated 'data' prop
        if (updateData) {
          updateData(updatedData);
        }

        // You can fetch updated 'additionalData' here if it has changed on the server
      } else {
        // Handle error
        console.error("Failed to update mentor and students");
      }
    } catch (error) {
      console.error("An error occurred while updating data:", error);
    }
  };

  useEffect(() => {
    // Update the selectedStudentIds whenever selectedRows change
    const ids = data
      .filter((item) => selectedRows.includes(item.id))
      .map((item) => item.id);
    setSelectedStudentIds(ids);
  }, [selectedRows]);

  //   console.log(data)

  return (
    <>
      <div className="flex bg-gray-700 w-screen min-h-screen ">
        <div className="w-1/2 pr-4">
          <div
            className="relative ml-5 mt-20 overflow-x-auto shadow-md sm:rounded-lg"
            style={{ maxWidth: "70vw", maxHeight: "70vh", overflow: "auto" }}
          >
            <table
              className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              style={{ minWidth: "100%" }} // Ensure the table is at least as wide as the container
            >
              <thead
                className="text-x text-white uppercase font-Damion-cursive bg-gray-800 dark:bg-gray-700 dark:text-white-400"
                style={{ position: "sticky", top: "0" }}
              >
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Select
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sub Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Class
                  </th>
                </tr>
              </thead>
              <tbody className="font-Damion-cursive">
                {data?.length > 0 ? (
                  data
                    .filter((item) => item.mentor === "") // Filter by mentor name being empty
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        className={
                          index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                        }
                      >
                        <td
                          className="px-6 py-4"
                        //   style={{ border: "2px solid red" }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => {
                              toggleSelect(item.id);
                              console.log(item.id);
                            }}
                          />
                        </td>
                        <td className="text-x text-white px-6 py-4">
                          {item.name}
                        </td>
                        <td className="text-white px-6 py-4">{item.phone}</td>
                        <td className="text-white px-6 py-4">{item.date}</td>
                        <td className="text-white px-6 py-4">{item.sub}</td>
                        <td className="text-white px-6 py-4">{item.class}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/2 pl-4">
          <div
            className="relative ml-0 mt-20 overflow-x-auto shadow-md sm:rounded-lg"
            style={{ maxWidth: "70vw", maxHeight: "70vh", overflow: "auto" }}
          >
            <table
              className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              style={{ minWidth: "100%" }} // Ensure the table is at least as wide as the container
            >
              <thead
                className="text-x text-white font-Damion-cursive uppercase bg-gray-800 dark:bg-gray-700 dark:text-white"
                style={{ position: "sticky", top: "0" }}
              >
                <tr>
                  {/* Add headers for additional data */}
                  <th scope="col" className="px-6 py-3">
                    Mentor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ongoing
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Available
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody className="font-Damion-cursive text-base">
                {additionalData?.length >0 ?(
                additionalData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-black bg-opacity-20" : ""}
                    >
                      <td className="text-white text-x text-white px-6 py-4">
                        {item.name}
                      </td>
                      <td className="text-white px-6 py-4">{item.on}</td>
                      <td className="text-white px-6 py-4">
                        {item.handle - item.on >= 1 ? ( // Check if the difference is greater than or equal to 1
                          item.handle - item.on
                        ) : (
                          <span>Not available</span> // Display a message if not available
                        )}
                      </td>
                      <td className="text-white px-6 py-4">
                        {item.handle - item.on < 1 ? ( // Check if the condition is met
                          <input
                            className="cursor-pointer"
                            type="checkbox"
                            disabled // Disable the checkbox when condition is not met
                          />
                        ) : (
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={selectedMentor === item.name}
                            onChange={() => handleMentorSelect(item.name)}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                ):(
                    <tr>
                    <td colSpan={4} className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-[-4.5rem]">
        <button
          onClick={openModal}
          className="px-4 py-2 font-Damion-cursive text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
      <button
        onClick={() => {
          // Your button click handler here
          router.push("/home");
        }}
        className="fixed bottom-6 right-12"
      >
        <span className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Go Back
          </span>
        </span>
      </button>
      {/* Modal */}
      {isModalVisible && (
        <>
          <div
            className=" fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
            onClick={closeModal} // Close the sidebar when overlay is clicked
          ></div>
          <Modal onClose={closeModal}>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              ></svg>
              <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-400">
                Are you sure you want to assign this mentor to Selected
                Students?
              </h3>
              <button
                onClick={() => {
                  handleSubmit();
                  closeModal();
                }} // Call handleSubmit when "Yes, I'm sure" is clicked
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
    </>
  );
};

export default DataPage;
