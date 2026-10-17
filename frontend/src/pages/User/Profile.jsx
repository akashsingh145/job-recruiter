
import API from "../../Api/axios";
import { useQuery } from "@tanstack/react-query";

function Profile() {
    const getUserProfile = async () => {
        const api = await API.get("/users/profile");
        console.log("USER PROFILE API:", api.data);
        return api.data.user;
    };

    const getMyResume = async () => {
        const api = await API.get("/resume/my");
        console.log("RESUME API:", api.data);
        return api.data.resume;
    };

    const {
        data: user = {},
        isLoading: userLoading,
        isError: userError,
    } = useQuery({
        queryKey: ["user-profile"],
        queryFn: getUserProfile,
    });

    const {
        data: resume = {},
        isLoading: resumeLoading,
        isError: resumeError,
    } = useQuery({
        queryKey: ["my-resume"],
        queryFn: getMyResume,
    });

    if (userLoading || resumeLoading) {
        return (
            <h2 className="p-4 text-lg font-semibold">
                Loading...
            </h2>
        );
    }

    if (userError || resumeError) {
        return (
            <h2 className="p-4 text-lg font-semibold">
                Profile fetching error
            </h2>
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen sm:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    My Profile
                </h1>

                <form className="space-y-5">
                    <label className=" p-2 text-lg font-semibold text-slate-500">Username</label>
                    <input
                        type="text"
                        value={user.username || ""}
                        readOnly
                        placeholder="Enter Your Name"
                        className="w-full border rounded-lg p-3"
                    />
                    <label className="p-2 text-lg font-semibold text-slate-500">Email</label>
                    <input
                        type="text"
                        value={user.email || ""}
                        readOnly
                        placeholder="Enter Your Email"
                        className="w-full border rounded-lg p-3"
                    />
                    <label className = "p-2 text-lg font-semibold text-slate-500">Phone</label>
                    <input
                        type="text"
                        value={user.phone || ""}
                        readOnly
                        placeholder="Enter Your Phone Number"
                        className="w-full border rounded-lg p-3"
                    />
                      <label className="p-2 text-lg font-semibold text-slate-500"> Role</label>
                    <input
                        type="text"
                        value={user.role || ""}
                        readOnly
                        placeholder="Enter Your Role"
                        className="w-full border rounded-lg p-3"
                    />
                    <label className="p-2 text-lg font-semibold text-slate-500">Education</label>
                    <input
                        type="text"
                        value={resume.education || ""}
                        readOnly
                        placeholder="Enter Your Education"
                        className="w-full border rounded-lg p-3"
                    />
                    <label className="p-2 text-lg font-semibold text-slate-500">Experience</label>
                    <input
                        type="text"
                        value={resume.experience || ""}
                        readOnly
                        placeholder="Enter Your Experience"
                        className="w-full border rounded-lg p-3"
                    />
                   <label className="p-2 text-lg font-semibold text-slate-500"> Skill</label>
                    <p className="w-full border rounded-lg p-3">
                        {resume.skills || "No skills added"}
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Profile;

