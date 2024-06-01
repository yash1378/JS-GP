// as these are server components in this caching doesn't work
async function getData() {
  // const res = await fetch('http://20.204.209.69:8080/api/mentorData/',{
  const res = await fetch("https://js-gp-backend.onrender.com/api/mentorData", {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function MentServer() {
  const data = await getData();
  console.log(data);
  return (
    <>
      <div className="flex flex-col w-[80vw] h-[85vh]  mt-6 ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow-2xl overflow-hidden sm:rounded-lg">
              <table className="min-w-full text-sm text-white sm:table">
                <thead
                  className="bg-gray-800 text-sm uppercase font-Damion-cursive"
                  style={{ position: "sticky", top: "0", zIndex: "2" }}
                >
                  <tr>
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
                      Mentor Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Total Students Guided
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      No.of Ongoing Students
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Current Availability
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 text-base font-Damion-cursive">
                  {data?.length > 0 ? (
                    data.map((item: any, index: number) => (
                      <tr
                        key={item.id}
                        className={
                          index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                        }
                      >
                        <td className="pl-4">{index + 1}</td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.name}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.total}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.on}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">
                            {item.handle - item.on}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
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
    </>
  );
}

export default MentServer;
