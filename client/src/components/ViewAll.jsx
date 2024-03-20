import React, { useState, useEffect } from "react";

const ViewAll = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(
          "https://recruita.onrender.com/api/viewall",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("data: " + data);
        if (data.success) {
          console.log(data.data);
          setCandidates(data.data);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);
  return (
    <>
      <div className="w-full bg-black bg-opacity-75">
        <div className="overflow-x-auto m-5 p-5 flex flex-col justify-center items-center  h-screen">
          <div className="p-5 flex flex-col justify-center items-center bg-slate-50 border border-gray-800 rounded-lg overflow-scroll">
            <div className="w-full text-center bg-gray-300 p-4  text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Candidate List
            </div>
            <table className="table-auto min-w-full divide-y divide-gray-200 border border-black shadow-2xl">
              <thead className="bg-gray-300 text-lg font-bold border border-gray-800">
                <tr className="">
                  <th className="px-6 py-3 text-left  text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left  text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left  text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left  text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left  text-gray-500 uppercase">
                    Skills(with experience in years)
                  </th>
                  <th className="px-6 py-3 text-left  text-gray-500 uppercase">
                    Salary(LPA)
                  </th>
                  <th className="px-6 py-3 text-left  text-gray-500 uppercase">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate._id} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul className="list-disc list-inside">
                        {candidate.skills.map((skill, index) => (
                          <li key={index}>
                            {skill.skill} - {skill.experience}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.salary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded m-2">
                <a href="/">Back</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAll;
