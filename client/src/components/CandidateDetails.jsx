import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidateDetails = ({ candidate }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: candidate.name,
    email: candidate.email,
    status: candidate.status,
    salary: candidate.salary,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://recruita.onrender.com/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data); // Handle response from backend
      if (data.success) {
        alert(data.message);
        navigate("/");
      } else {
        alert("Operation failed. Please try again. " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black bg-opacity-75">
        <div className="p-10 rounded-md bg-white shadow-2xl">
          <div className="w-full text-center  m-2  p-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-3xl dark:text-white">
            Update Candidate Details
          </div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-row flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-full-name"
                >
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-full-name"
                  type="text"
                  value={candidate.name}
                  name="name"
                  readOnly
                  required
                />
              </div>
              <div className="w-full  px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
                  type="text"
                  value={candidate.email}
                  readOnly
                  name="email"
                  required
                />
              </div>
              <div className="w-full  px-3 mb-6 md:mb-3 py-1">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2"
                  for="grid-status"
                >
                  Current Status
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-status"
                    onChange={handleChange}
                    name="status"
                    required
                    value={formData.status}
                  >
                    <option value="Contacted">Contacted</option>
                    <option value="Interview Scheduled">
                      Interview Scheduled
                    </option>
                    <option value="Application Received">
                      Application Received
                    </option>
                    <option value="Application Under Review">
                      Application Under Review
                    </option>
                    <option value="Shortlisted">Application Shortlisted</option>
                    <option value="Assessment/Test">
                      Assessment/Test Completed
                    </option>
                    <option value="Interview Completed">
                      Interview Completed
                    </option>
                    <option value="Reference Check">Reference Check</option>
                    <option value="Background Check">Background Check</option>
                    <option value="Offer Extended">Offer Extended</option>
                    <option value="Offer Pending">
                      Offer Acceptance Pending
                    </option>
                    <option value="Offer Accepted">Offer Accepted</option>
                    <option value="Hired">Hired</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full  px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="salary"
                >
                  Expected Salary(in LPA)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="salary"
                  type="number"
                  name="salary"
                  value={formData.salary}
                  min={5}
                  max={200}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <a
                href="/"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Update Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CandidateDetails;
