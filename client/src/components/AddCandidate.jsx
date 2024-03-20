import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCandidate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "NULL",
    email: "NULL",
    phone: "NULL",
    skills: [{ skill: "", experience: "" }],
    status: "Contacted",
    salary: 0,
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
      const response = await fetch("http://localhost:9876/api/add", {
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

  const handleSkillChange = (index, event) => {
    const newSkills = [...formData.skills];
    newSkills[index].skill = event.target.value;
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const handleExperienceChange = (index, event) => {
    const newSkills = [...formData.skills];
    newSkills[index].experience = event.target.value;
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { skill: "", experience: "" }],
    });
  };

  const removeSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black bg-opacity-75 overflow-y-scroll">
        <div className="p-10 rounded-md bg-white shadow-2xl">
          <div className="w-full text-center  m-2  p-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-3xl dark:text-white">
            Add A Candidate
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
                  placeholder="John Doe"
                  name="name"
                  onChange={handleChange}
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
              <div className="w-full  px-3 mt-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-phone"
                >
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-phone"
                  type="text"
                  placeholder="0000000000"
                  onChange={handleChange}
                  name="phone"
                  maxLength={10}
                  minLength={10}
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
              <div className="w-full  px-3 mb-6 md:mb-1">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-status"
                >
                  Skills
                </label>
                <div className="space-y-4">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder={`Skill ${index + 1}`}
                        value={skill.skill}
                        onChange={(event) => handleSkillChange(index, event)}
                        className="border rounded-md px-3 py-2 w-1/2"
                        required
                      />
                      <select
                        value={skill.experience}
                        onChange={(event) =>
                          handleExperienceChange(index, event)
                        }
                        className="border rounded-md px-3 py-2 w-1/2"
                        required
                      >
                        <option value="" disabled>
                          Select experience
                        </option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="2+">More than 2 years</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
                >
                  Add Skill
                </button>
              </div>
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
                  placeholder={10}
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
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCandidate;
