
import { useState, useEffect } from "react";
import API from "../../Api/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

function Resume() {
  const [formData, setFormData] = useState({
    username: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const queryClient = useQueryClient();

  const getMyResume = async () => {
    const api = await API.get("/resume/my");
    return api.data.resume;
  };

  const {
    data: resume = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-resume"],
    queryFn: getMyResume,
  });

  useEffect(() => {
    if (resume) {
      setFormData({
        username: resume.candidateName || "",
        skills: resume.skills || "",
        experience: resume.experience || "",
        education: resume.education || "",
      });
    } else {
      setFormData({
        username: "",
        skills: "",
        experience: "",
        education: "",
      });
    }
  }, [resume]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const saveResume = async (data) => {
    if (resume) {
      const api = await API.put(`/resume/${resume._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return api.data;
    }

    data.append("username", formData.username);

    const api = await API.post("/resume/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return api.data;
  };

  const resumeMutation = useMutation({
    mutationFn: saveResume,

    onSuccess: (data) => {
      alert(data.message);

      setResumeFile(null);
      setEditMode(false);

      queryClient.invalidateQueries({
        queryKey: ["my-resume"],
      });
    },

    onError: (error) => {
      console.log("Resume Submit Error:", error);

      alert(
        error.response?.data?.message ||
          "Resume operation failed"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("skills", formData.skills);
    data.append("experience", formData.experience);
    data.append("education", formData.education);

    if (resumeFile) {
      data.append("resumeFile", resumeFile);
    }

    resumeMutation.mutate(data);
  };

  const deleteResume = async (id) => {
    const api = await API.delete(`/resume/${id}`);
    return api.data;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteResume,

    onSuccess: (data) => {
      alert(data.message);

      setResumeFile(null);
      setEditMode(false);

      queryClient.invalidateQueries({
        queryKey: ["my-resume"],
      });
    },

    onError: (error) => {
      console.log("Delete Resume Error:", error);

      alert(
        error.response?.data?.message ||
          "Resume delete failed"
      );
    },
  });

  const handleDelete = () => {
    if (!resume) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your resume?"
    );

    if (!confirmDelete) {
      return;
    }

    deleteMutation.mutate(resume._id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lg font-semibold text-blue-600">
          Loading resume...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lg font-semibold text-red-600">
          Resume fetching error..
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-5 sm:p-8">
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

        {resume && !editMode && (
          <div className="space-y-5">
            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-semibold text-lg">
                {resume.candidateName}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">Skills</p>
              <p className="font-semibold">
                {resume.skills}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">Experience</p>
              <p className="font-semibold">
                {resume.experience}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">Education</p>
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
                <a
                  href={`http://localhost:5000/uploads/${resume.resumeFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                >
                  View Resume
                </a>

                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {deleteMutation.isPending
                    ? "Deleting..."
                    : "Delete Resume"}
                </button>
              </div>
            </div>
          </div>
        )}

        {editMode && (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={resumeMutation.isPending}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {resumeMutation.isPending
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

