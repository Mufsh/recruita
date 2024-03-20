import React, { useState } from "react";

const CandidateSearch = ({ onCandidateFound , setCandidate}) => {
  const [formData, setFormData] = useState({
    email: "NULL",
  });
  const [emailError, setEmailError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate email
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    if (!formData.email.match(validRegex)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    try {
      const response = await fetch("http://localhost:9876/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("data: " + data); // Handle response from backend
      if (data.success) {
        setCandidate(data.data);
        onCandidateFound(true);
      } else {
        setCandidate(null);
        onCandidateFound(false);
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
                  placeholder="abc@xyz.com"
                  onChange={handleChange}
                  name="email"
                  required
                />
              </div>
              {emailError ? (
                <p className="text-red-500 text-xs italic">
                  Please enter a valid email.
                </p>
              ) : null}
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
                Search Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CandidateSearch;
