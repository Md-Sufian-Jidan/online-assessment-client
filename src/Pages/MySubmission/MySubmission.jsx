import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AssignmentPreview from "./AssignmentPreview";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MySubmission = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [submittedAssignments, setSubmittedAssignments] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/my-submissions/${user.email}`)
                .then((res) => {
                    setSubmittedAssignments(res.data);
                });
        }
    }, [user, axiosSecure]);

    return (
        <>
            <Helmet>
                <title>StudySync | My Submission</title>
            </Helmet>
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">
                    📚 My Submitted Assignments
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Track your submitted assignments, view your marks and feedback (if available).
                </p>

                {submittedAssignments.length === 0 ? (
                    <p className="text-center text-gray-500">You haven't submitted any assignments yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {submittedAssignments.map((item) => (
                            <div
                                key={item._id}
                                className="border border-gray-200 p-5 rounded-lg shadow hover:shadow-md transition-all"
                            >
                                <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                                    {item.assignment?.title}
                                </h2>

                                <p className="text-sm text-gray-700">
                                    📌 <span className="font-medium">Status:</span>{" "}
                                    <span
                                        className={`font-semibold ${item.status === "pending"
                                            ? "text-yellow-600"
                                            : "text-green-600"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </p>

                                <p className="text-sm text-gray-700">
                                    🏷️ <span className="font-medium">Total Marks:</span>{" "}
                                    {item.assignment?.marks}
                                </p>

                                <p className="text-sm text-gray-700">
                                    🎯 <span className="font-medium">Obtained Marks:</span>{" "}
                                    {item.givenMark ? item.givenMark : "Not marked yet"}
                                </p>

                                <p className="text-sm text-gray-700 mt-1">
                                    📝 <span className="font-medium">Feedback:</span>{" "}
                                    {item.feedback ? item.feedback : "No feedback yet"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="space-y-10 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {submittedAssignments.map((submission) => (
                        <AssignmentPreview key={submission._id} submission={submission} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MySubmission;
