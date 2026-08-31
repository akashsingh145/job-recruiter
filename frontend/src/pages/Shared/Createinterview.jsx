import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../Api/axios";

function CreateInterview() {
  const { applicationId } = useParams();
  console.log("🔥 Create Interview Application ID:", applicationId);

  const [application, setApplication] = useState(null);

  const [formData, setFormData] = useState({
    applicationId: "",
    candidateId: "",
    jobId: "",
    interviewerName: "",
    interviewDate: "",
    interviewTime: "",
    interviewMode: "",
    meetingLink: "",
    location: "",
  });

  // Get application
  const getApplication = async () => {
    try {
      console.log("Application ID:", applicationId);

      const res = await API.get(`/application/${applicationId}`);

      console.log("Application response:", res.data);

      const app = res.data.application;

      if (!app) {
        alert("Application not found");
        return;
      }

      setApplication(app);

      // IDs automatically set
      setFormData((prev) => ({
        ...prev,
        applicationId: app._id,
        candidateId: app.candidateId?._id || "",
        jobId: app.jobId?._id || "",
      }));
    } catch (error) {
      console.log(
        "Get application error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to get application"
      );
    }
  };

  useEffect(() => {
    if (applicationId) {
      getApplication();
    }
  }, [applicationId]);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create interview
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending interview:", formData);

      const res = await API.post(
        "/interview/create",
        formData
      );

      console.log("Interview created:", res.data);

      alert("Interview created successfully!");

      // Reset only interview fields
      setFormData((prev) => ({
        ...prev,
        interviewerName: "",
        interviewDate: "",
        interviewTime: "",
        interviewMode: "",
        meetingLink: "",
        location: "",
      }));
    } catch (error) {
      console.log(
        "Create interview error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to create interview"
      );
    }
  };

  // Application loading
  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-gray-500">
            Loading application...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Interview
        </h1>

        <p className="mt-2 text-gray-500">
          Schedule an interview for this candidate
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
              value={
                application.candidateId?.username|| ""
              }
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
            />
          </div>

          {/* Candidate Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Candidate Email
            </label>

            <input
              type="text"
              value={
                application.candidateId?.email || ""
              }
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
            />
          </div>

          {/* Job */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Job
            </label>

            <input
              type="text"
              value={
                application.jobId?.tittle ||
                application.jobId?.title ||
                ""
              }
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Company
            </label>

            <input
              type="text"
              value={
                application.jobId?.companyName || ""
              }
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
            />
          </div>

          {/* Interviewer */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Interviewer Name
            </label>

            <input
              type="text"
              name="interviewerName"
              value={formData.interviewerName}
              onChange={handleChange}
              placeholder="Enter interviewer name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Interview Date
            </label>

            <input
              type="date"
              name="interviewDate"
              value={formData.interviewDate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Interview Time
            </label>

            <input
              type="time"
              name="interviewTime"
              value={formData.interviewTime}
              onChange={handleChange}
            required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Mode */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Interview Mode
            </label>

            <select
              name="interviewMode"
              value={formData.interviewMode}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                Select interview mode
              </option>

              <option value="online">
                Online
              </option>

              <option value="offline">
                Offline
              </option>
            </select>
          </div>

          {/* Online */}
          {formData.interviewMode === "online" && (
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Meeting Link
              </label>

              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder="https://meet.google.com/..."
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Offline */}
          {formData.interviewMode === "offline" && (
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Interview Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter interview location"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Interview
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateInterview;