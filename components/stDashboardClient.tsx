'use client'
import React, { useEffect, useState, ChangeEvent } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FaBars } from "react-icons/fa";

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

  
interface DataPageProps {
  data: Student[];
}

const StDashboardClient: React.FC<DataPageProps> = ({ data }) => {
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [activeStudents, setActiveStudents] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [final, setFinal] = useState<Student[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Student[]>([]);
  const [isSearchBoxEmpty, setIsSearchBoxEmpty] = useState<boolean>(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  let filteredData = data;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredNames = data.filter(
      (student, index, self) =>
        student.phone.toLowerCase().startsWith(value.toLowerCase()) &&
        index === self.findIndex((s) => s.phone === student.phone)
    );

    setSearchText(value);
    setSuggestions(filteredNames);
    setIsSearchBoxEmpty(value.trim() === "");
  };

  const handleSuggestionClick = (student: Student) => {
    setFinal([student]);
    setSuggestions([]);
  };

  useEffect(() => {
    // const { mentorName, enddate, enrolled } = router.query;
    const mentorName = searchParams.get('mentorName');
    const enddate = searchParams.get('enddate')
    const enrolled = searchParams.get('enrolled');
    const endDate = new Date(enddate as string);
    endDate.setDate(endDate.getDate() - 30);

    if (mentorName) {
      filteredData = filteredData.filter((item) => item.mentor === mentorName);
    }
    if (enddate) {
      const formattedEndDate = endDate.toISOString().slice(0, 10);
      filteredData = filteredData.filter(
        (item) => item.date === formattedEndDate
      );
    }
    if (enrolled) {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      filteredData = filteredData.filter((item) => {
        const enrollmentDate = new Date(item.date);
        return enrollmentDate >= thirtyDaysAgo && enrollmentDate <= today;
      });
    }

    setFinal(filteredData);
    setTotalStudents(filteredData.length);

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const activeStudentCount = filteredData.filter((item) => {
      const enrollmentDate = new Date(item.date);
      return enrollmentDate >= thirtyDaysAgo && enrollmentDate <= today;
    }).length;

    const appliedFilters: string[] = [];
    setActiveStudents(activeStudentCount);

    if (mentorName) {
      appliedFilters.push(`Mentor: ${mentorName}`);
    }
    if (enddate) {
      appliedFilters.push(`Enrollment Date: ${enddate}`);
    }
    if (enrolled) {
      appliedFilters.push("Enrolled Within Last 30 Days");
    }

    filteredData = filteredData.reverse();
    setActiveFilters(appliedFilters);
  }, [searchParams, searchText]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div
        className="w-20 bg-zinc-800 z-100 absolute"
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

      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      <div className="flex flex-col items-center bg-gray-700 w-screen min-h-screen mt-0">
        <h1 className="text-white text-2xl font-Damion-cursive mt-1.5 mb-1.5">
          <b>Data Table</b>
        </h1>
        <div className="relative">
          <label
            htmlFor="default-search"
            className="text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <input
            type="search"
            id="default-search"
            className="block w-[84vw] h-[6vh] p-4 pl-9 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by Student Phone No..."
            required
            value={searchText}
            onChange={handleSearchChange}
          />
          {searchText.length > 0 && (
            <div
              className="suggestions text-white absolute z-50 top-[6vh] w-[84vw] bg-gray-600"
              style={{ maxHeight: "20vh", overflowY: "auto", zIndex: 50 }}
            >
              {suggestions.length > 0 && (
                <ul>
                  {suggestions.map((student, index) => (
                    <li
                      className={`w-full ${
                        index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                      } hover:bg-indigo-600 hover:text-white`}
                      style={{ cursor: "pointer" }}
                      key={student.name}
                      onClick={() => {
                        handleSuggestionClick(student);
                        setSuggestions([]);
                      }}
                    >
                      {student.name}
                      &nbsp;&nbsp;-&nbsp;&nbsp;[Mentor:&nbsp;&nbsp;
                      {student.mentor}
                      ]&nbsp;&nbsp;-&nbsp;&nbsp;PhoneNo:&nbsp;&nbsp;
                      {student.phone}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col w-[85vw] h-[85vh] mt-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-2xl overflow-hidden sm:rounded-lg">
                <table className="min-w-full text-sm text-white sm:table">
                  <thead
                    className="bg-gray-800 text-sm uppercase font-mono"
                    style={{ position: "sticky", top: "0" }}
                  >
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>No.</b>
                        </i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>Student Name</b>
                        </i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>Enrollment Date</b>
                        </i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>Mobile.No</b>
                        </i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>Mentor Name</b>
                        </i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>Sub Type</b>
                        </i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>Class</b>
                        </i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        <i>
                          <b>Email</b>
                        </i>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800" >
                    {final.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`text-base ${
                          index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                        }`}
                      >
                        <td className="pl-4">{index + 1}</td>
                        <td className="px-6 py-2 text-base font-mono text-left sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.name}</span>
                        </td>
                        <td className="px-6 py-2 text-base font-mono text-left sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.date}</span>
                        </td>
                        <td className="px-6 py-2 text-base font-mono sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.phone}</span>
                        </td>
                        <td className="px-6 py-2 text-base font-mono sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.mentor}</span>
                        </td>
                        <td className="px-6 py-2 text-base font-mono sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.sub}</span>
                        </td>
                        <td className="px-6 py-2 text-base font-mono sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.class}</span>
                        </td>
                        <td className="px-6 py-2 text-base font-mono sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.email}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div className="relative text-white mt-35 z-100 ml-0">
            <div className="relative mb-5 font-Damion-cursive text-2xl">
              Total Students: {totalStudents}
            </div>
            <div className="relative mb-5 font-Damion-cursive text-2xl">
              Active Students (Last 30 Days): {activeStudents}
            </div>
            <div className="relative font-Damion-cursive text-xl">
              Active Filters: {activeFilters.join(", ")}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          router.push("/home");
        }}
        className="fixed bottom-6 right-12"
      >
        <span className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Go Back
          </span>
        </span>
      </button>
    </>
  );
};

export default StDashboardClient;
