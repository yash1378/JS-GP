"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import Toast from "../Toast";

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

interface ParentComponentProps {
  data: Student[];
}

function ParentComponent({ data }: ParentComponentProps): JSX.Element {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedmentors, setSelectedmentors] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [dat, setDat] = useState<Student[]>(data);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Student[]>([]);

  const [searchTextName, setSearchTextName] = useState<string>("");
  const [suggestionsName, setSuggestionsName] = useState<Student[]>([]);


  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [studentData, setStudentData] = useState<Student[]>(data);
  const [selectedMentor, setSelectedMentor] = useState<string>("");
  const [mess, setMess] = useState("");
  const [showToast, setshowToast] = useState(false);
  const [color, setColor] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API and set it to studentData
    // ...
  }, [dat]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedIds([]);
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

  const handleSearchChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredNames = studentData.filter(
      (student, index, self) =>
        student.name.toLowerCase().startsWith(value.toLowerCase()) &&
        index === self.findIndex((s) => s.name === student.name)
    );

    setSearchTextName(value);
    setSuggestionsName(filteredNames);
  };


  const toast = async () => {
    setshowToast(true);
    setTimeout(() => {
      setshowToast(false); // Hide the toast after 3 seconds
    }, 3000);
  };

  const handleSuggestionClick = (student: Student) => {
    setSearchText(student.phone);
    setSelectedMentor(student.mentor); // Assuming mentor is the correct property name
    setSelectedIds([student.id]); // Assuming phone is the unique identifier for a student
    setSelectedmentors([student.mentor]);
  };

  const handleSuggestionClickName = (student: Student) => {
    console.log(student)
    setSearchTextName(student.name);
    setSelectedMentor(student.mentor); // Assuming mentor is the correct property name
    setSelectedIds([student.id]); // Assuming phone is the unique identifier for a student
    setSelectedmentors([student.mentor]);

  };

  const handleCheckboxChange = (id: string, ment: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      setSelectedmentors(selectedmentors.filter((mentor) => mentor !== ment));
    } else {
      setSelectedIds([...selectedIds, id]);
      const selectedStudent = dat.find((student) => student.id === id);
      if (selectedStudent) {
        setSelectedmentors([...selectedmentors, selectedStudent.mentor]);
      }
    }
  };

  const handleDeleteClick = async () => {
    console.log(selectedIds);
    console.log(selectedmentors);

    try {
      const response = await fetch("https://www.jsgp.xyz/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedIds,
          mentors: selectedmentors,
        }),
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
        setMess("Valid Rows Deleted Successfully");
        setColor("green");
        toast();
        // setMessage("All Valid rows have been Deleted successfully.");
        const response1 = await fetch("https://www.jsgp.xyz/api/data");
        const updatedData = await response1.json();
        if (updatedData) {
          setDat(updatedData);
        }
        setSearchText("");
        setSelectedMentor("");
        setSelectedDate(undefined);
      } else {
        // setMessage("Failed to Delete selected rows.");
        setMess("Failed to Delete the Data");
        setColor("red");
        toast();
      }
    } catch (error) {
      console.error("Error Deleting rows:", error);
      setMessage("An error occurred while Deleting rows.");
    }
  };

  return (
    <div>
      <Head>
        <title>Your Page Title</title>
      </Head>
      <div className="flex flex-col items-center bg-gray-700 w-screen min-h-screen mt-0">
        <h1 className="text-white text-4xl font-Damion-cursive mt-1">
          <b>Delete Page</b>
        </h1>
        <div>
          <div
            className="relative mt-3 w-[80vw] mx-auto"
            style={{ position: "sticky", top: "0",display:"flex",flexDirection:"column",flexShrink:0 }}
          >
            <input
              type="search"
              id="default-search"
              className="block w-[80vw] p-4 mb-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Student by Phone No..."
              required
              value={searchText}
              onChange={handleSearchChange}
            />
            {searchText.length > 0 && (
              <div className="suggestions text-white">
                {suggestions.length > 0 && (
                  <ul>
                    {suggestions.map((student, index) => (
                      <li
                        className={`${
                          index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                        } hover:bg-indigo-600 hover:text-white`}
                        style={{ cursor: "pointer" }}
                        key={student.phone}
                        onClick={() => {
                          handleSuggestionClick(student);
                          setSuggestions([]);
                        }}
                      >
                        {student.name} - <b> Mentor:</b> {student.mentor}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <br />
            <br />
            <input
              type="search"
              id="default-search"
              className="block w-[80vw] p-4 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Student by Name..."
              required
              value={searchTextName}
              onChange={handleSearchChangeName}
            />
            {searchTextName.length > 0 && (
              <div className="suggestions text-white">
                {suggestionsName.length > 0 && (
                  <ul>
                    {suggestionsName.map((student, index) => (
                      <li
                        className={`${
                          index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                        } hover:bg-indigo-600 hover:text-white`}
                        style={{ cursor: "pointer" }}
                        key={student.phone}
                        onClick={() => {
                          handleSuggestionClickName(student);
                          setSuggestionsName([]);
                        }}
                      >
                        {student.name} - <b> Mentor:</b> {student.mentor}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <button
              onClick={() => {
                router.push("/registration");
              }}
                className="fixed top-13 right-5 w-[7vw]"
            //   style={{border:"2px solid red"}}
            >
              <span className="relative h-[5.5vh] inline-flex items-center justify-center p-0.5 mb-0 mr-2 overflow-hidden text-base font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span className="relative px-6 py-3.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Go Back
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[80vw] h-[75vh] mt-4">
          <button
            onClick={openModal}
            className="px-4 py-2 mb-4 text-white w-[80vw] bg-blue-500 rounded hover:bg-blue-600"
          >
            Delete Selected
          </button>
          <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-2xl overflow-hidden sm:rounded-lg">
                <table className="min-w-full text-base text-white sm:table">
                  <thead className="bg-gray-800 text-base uppercase font-Damion-cursive">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Select
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Phone No
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 text-base font-Damion-cursive">
                    {dat != null ? (
                      dat.map((item, index) => (
                        <tr
                          key={item.phone} // Assuming phone is the unique identifier for a student
                          className={
                            index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                          }
                        >
                          <td className="px-6 py-2">
                            <input
                              type="checkbox"
                              onChange={() =>
                                handleCheckboxChange(item.id, item.mentor)
                              }
                              checked={selectedIds.includes(item.id)}
                            />
                          </td>
                          <td className="pl-4">{index + 1}</td>
                          <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                            <span className="sm:block">{item.name}</span>
                          </td>
                          <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                            <span className="sm:block">{item.phone}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
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
        </div>
        {message && <p className="text-white mt-4">{message}</p>}
      </div>
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
                Are you sure you want to Delete the Selected Students?
              </h3>
              <button
                onClick={() => {
                  handleDeleteClick();
                  closeModal();
                }} // Call handleSubmit when "Yes, I'm sure" is clicked
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

      {showToast && (
        <Toast
          message={mess}
          bgColor={color}
          onClose={() => setshowToast(false)}
        />
      )}
    </div>
  );
}

export default ParentComponent;
