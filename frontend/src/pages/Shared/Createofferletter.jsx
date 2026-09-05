

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../Api/axios";

function CreateOfferletter() {

  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);

  const [formData, setFormData] = useState({
    applicationId: "",
    candidateId: "",
    jobId: "",
    companyName: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "sent"
  });
  // GET APPLICATION
 const getApplication = async () => {
    try {

      console.log("Application ID:", applicationId);

      const res = await API.get(`/application/${applicationId}`);

      console.log("APPLICATION DATA:", res.data);

      const app = res.data.application;

      if (!app) {
        alert("Application not found");
        return;
      }

      setApplication(app);

      setFormData((prev) => ({
        ...prev,
        applicationId: app._id,

        candidateId:
          app.candidateId?._id || app.candidateId || "",

        jobId:
          app.jobId?._id || app.jobId || "",

        companyName:
          app.jobId?.companyName || "",

      }));

    } catch (error) {

      console.log(
        "Get application error:",
        error.response?.data || error.message
      );

      alert("Application not found");
    }
  };

  useEffect(() => {

    if (applicationId) {
      getApplication();
    }

  }, [applicationId]);

  // INPUT CHANGE


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };



  // CREATE OFFER LETTER
  

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("applicationId", formData.applicationId);
    data.append("candidateId", formData.candidateId);
    data.append("jobId", formData.jobId);
    data.append("companyName", formData.companyName);
    data.append("designation", formData.designation);
    data.append("salary", formData.salary);
    data.append("joiningDate", formData.joiningDate);
    data.append("status", formData.status);

    if (formData.offerletter) {
      data.append("offerletter", formData.offerletter);
    }

    const res = await API.post(
      "/offerletter/create",
      data
    );

    console.log("OFFER CREATED:", res.data);

    alert("Offer Letter Created & Sent Successfully");

    navigate(-1);

  } catch (error) {
    console.log(
      "Create offerletter failed:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Offer Letter could not be created"
    );
  }
};

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Create Offer Letter
        </h1>

        <p className="mt-2 text-gray-500">
          Create Offer Letter for the user
        </p>

      </div>


      <div className="max-w-3xl rounded-xl bg-white p-8 shadow-md">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Candidate */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Candidate Name
            </label>

            <input
              type="text"
              name="name"
              value={
                application?.candidateId?.username || ""
              }
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
            />

          </div>


          {/* Company */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Company Name
            </label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter the company name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>


          {/* Job */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Job Name
            </label>

            <input
              type="text"
              value={
                application?.jobId?.tittle || ""
              }
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
            />

          </div>


          {/* Designation */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter the designation"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>


          {/* Salary */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter the salary"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>


          {/* Joining Date */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Joining Date
            </label>

            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>
          <div>
  <label className="block mb-2 font-semibold text-gray-700">
    Offer Letter PDF
  </label>

  <input
    type="file"
    name="offerletter"
    accept="application/pdf"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        offerletter: e.target.files[0]
      }))
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
    required
  />
</div>


          {/* Submit */}

          <div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Create Offer Letter and Send Email
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default CreateOfferletter;