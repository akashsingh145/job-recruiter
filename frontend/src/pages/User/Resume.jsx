import { useState, useEffect } from "react";
import API from "../../Api/axios";

function Resume() {
  const [formData, setFormData] = useState({
    username: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  // GET MY RESUME
  
  const getMyResume = async () => {
    try {
      const api = await API.get("/resume/my");

      setResume(api.data.resume);

      setFormData({
        username: api.data.resume.candidateName || "",
        skills: api.data.resume.skills || "",
        experience: api.data.resume.experience || "",
        education: api.data.resume.education || "",
      });
    } catch (error) {
      if (error.response?.status === 404) {
        setResume(null);
      } else {
        console.log("Get Resume Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getMyResume();
  }, []);

  // HANDLE TEXT INPUT
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  // HANDLE FILE
  
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  
  // UPLOAD / UPDATE RESUME
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("skills", formData.skills);
      data.append("experience", formData.experience);
      data.append("education", formData.education);

      // New file selected hai tabhi bhejna
      if (resumeFile) {
        data.append("resumeFile", resumeFile);
      }

      let api;

      // Agar resume already exist karta hai
      if (resume) {
        api = await API.put(`/resume/${resume._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // New resume upload
        data.append("username", formData.username);

        api = await API.post("/resume/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert(api.data.message);

      setResumeFile(null);
      setEditMode(false);

      // Updated resume dobara fetch karo
      await getMyResume();

    } catch (error) {
      console.log("Resume Submit Error:", error);

      alert(
        error.response?.data?.message ||
          "Resume operation failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  
  // DELETE RESUME

  const handleDelete = async () => {
    if (!resume) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your resume?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const api = await API.delete(`/resume/${resume._id}`);

      alert(api.data.message);

      setResume(null);

      setFormData({
        username: "",
        skills: "",
        experience: "",
        education: "",
      });

      setResumeFile(null);
      setEditMode(false);

    } catch (error) {
      console.log("Delete Resume Error:", error);

      alert(
        error.response?.data?.message ||
          "Resume delete failed"
      );
    }
  };

  
  // LOADING
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lg font-semibold text-blue-600">
          Loading resume...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-5 sm:p-8">

        {/* HEADER  */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">

          <h1 className="text-3xl font-bold text-blue-600">
            My Resume
          </h1>

          {resume && !editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Resume
            </button>
          )}
        </div>

        {/* NO RESUME  */}
        {!resume && !editMode && (
          <div className="text-center py-8">

            <p className="text-gray-600 mb-5">
              You have not uploaded a resume yet.
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Upload Resume
            </button>

          </div>
        )}

        {/* RESUME DETAILS  */}
        {resume && !editMode && (
          <div className="space-y-5">

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Name
              </p>

              <p className="font-semibold text-lg">
                {resume.candidateName}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Skills
              </p>

              <p className="font-semibold">
                {resume.skills}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Experience
              </p>

              <p className="font-semibold">
                {resume.experience}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Education
              </p>

              <p className="font-semibold">
                {resume.education}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-2">
                Resume File
              </p>

              <p className="font-medium mb-4">
                {resume.resumeFile}
              </p>

              <div className="flex flex-wrap gap-3">

                {/* VIEW PDF */}
                <a
                  href={`http://localhost:5000/uploads/${resume.resumeFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                >
                  View Resume
                </a>

                {/* DELETE */}
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Resume
                </button>

              </div>
            </div>

          </div>
        )}

         {/* UPLOAD / UPDATE FORM  */}
        {editMode && (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}
            <div>
              <label className="block font-semibold mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!!resume}
                placeholder="Username"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* SKILLS */}
            <div>
              <label className="block font-semibold mb-2">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Example: React, JavaScript, Node.js"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="block font-semibold mb-2">
                Experience
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Example: Fresher"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* EDUCATION */}
            <div>
              <label className="block font-semibold mb-2">
                Education
              </label>

              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Example: BCA"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* FILE */}
            <div>
              <label className="block font-semibold mb-2">
                {resume
                  ? "Upload New Resume (Optional)"
                  : "Upload Resume"}
              </label>

              <input
                type="file"
                name="resumeFile"
                accept=".pdf"
                onChange={handleFileChange}
                required={!resume}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              {resume && (
                <p className="text-sm text-gray-500 mt-2">
                  Current file: {resume.resumeFile}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting
                  ? "Please wait..."
                  : resume
                  ? "Update Resume"
                  : "Upload Resume"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setResumeFile(null);

                  if (resume) {
                    setFormData({
                      username: resume.candidateName || "",
                      skills: resume.skills || "",
                      experience: resume.experience || "",
                      education: resume.education || "",
                    });
                  }
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default Resume;