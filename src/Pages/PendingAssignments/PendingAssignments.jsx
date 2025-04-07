import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PendingAssignments = () => {
    const axiosSecure = useAxiosSecure();
    const assignments = useLoaderData();
    const submissions = assignments.data;
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // Filter only pending assignments
    const pendingList = submissions?.filter((s) => s.status === "pending");
    const [pending, setPending] = useState(pendingList);

    const openModal = (submission) => {
        setSelectedSubmission(submission);
        setShowModal(true);
    };

    const onMarkSubmit = (e) => {
        e.preventDefault();
        const givenMark = e.target.marks.value;
        const feedback = e.target.feedback.value;

        if (!givenMark || !feedback) return;

        const updatedSubmission = {
            ...selectedSubmission,
            givenMark,
            feedback,
            status: "completed",
        };

        axiosSecure.patch(`/complete-assignment/${selectedSubmission?._id}`, updatedSubmission)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    setShowModal(false);
                    Swal.fire({
                        title: "Success",
                        text: "Assignment mark given successful",
                        icon: "success"
                    });
                    const pendingList = submissions?.filter((s) => s.status === "pending");
                    setPending(pendingList);
                }
            });
    };


    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">Pending Assignments</h1>
            <p className="text-gray-600 mb-6">Review and mark assignments submitted by students.</p>

            {pendingList.length === 0 ? (
                <p className="text-gray-500">No pending assignments to mark.</p>
            ) : (
                <div className="space-y-4">
                    {pending.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-lg p-4 flex justify-between items-center shadow"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-[#1E40AF]">{item.assignment?.title}</h2>
                                <p className="text-gray-700">Marks: {item.assignment?.marks}</p>
                                <p className="text-sm text-gray-500">Submitted by: {item.submittedBy}</p>
                            </div>
                            <button
                                onClick={() => openModal(item)}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Give Mark
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Marking Modal */}
            {showModal && selectedSubmission && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-xl relative">
                        <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">Mark Assignment</h2>
                        <form onSubmit={onMarkSubmit} className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">📎 PDF/Doc Link:</p>
                                <a
                                    href={selectedSubmission.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {selectedSubmission.pdfLink}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm font-medium">📝 Note:</p>
                                <p className="text-gray-700">{selectedSubmission.note}</p>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Marks</label>
                                <input
                                    name="marks"
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Feedback</label>
                                <textarea
                                    name="feedback"
                                    rows="3"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Write feedback here..."
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Submit Mark
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingAssignments;
