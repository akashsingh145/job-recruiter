import { useState } from "react";
import API from "../../Api/axios";

function CreateJob() {
  const [formData, setFormData] = useState({
    tittle: "",
    companyName:"",
    description: "",
    type:"",
    skill:"",
    salary: "",
    location: "",
    experience:"",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/job/create", formData);

      console.log("Job created:", res.data);

      alert("Job created successfully");

      setFormData({
        tittle: "",
        companyName:"",
        description: "",
        type:"",
        skill:"",
        salary: "",
        location: "",
        experience:"",
        requirements: "",
      });
    } catch (error) {
      console.log("Create job error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to create job"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Create Job
        </h1>

        <p className="text-gray-500 mb-6">
          Add a new job opportunity
        </p>

        <form onSubmit={handleSubmit}>

          {/* Job Title */}
          <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="tittle"
              value={formData.tittle}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

           <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Type
            </label>
             <select
    name="type"
    value={formData.type}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select Job Type</option>
    <option value="Full Time">Full Time</option>
    <option value="Part Time">Part Time</option>
    <option value="Internship">Internship</option>
    <option value="Contract">Contract</option>
  </select>
           </div>
          {/* company name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2"> 
              Company Name</label>
          <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter Company Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
</div>
          {/* Description */}
          <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Salary */}
          <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Example: 6 LPA"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Example: Lucknow"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Requirements
            </label>

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Example: React, JavaScript, Node.js"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Skill */}
           <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Skill
            </label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              placeholder="Example: html ,css"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            </div>
                {/* Skill */}
           <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Example: html ,css"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Job
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateJob;