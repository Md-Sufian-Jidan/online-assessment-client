import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ViewAssignment = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [assignment, setAssignment] = useState([]);
    const { title, description, difficulty, marks, image, dueDate } = assignment;

    useEffect(() => {
        axiosSecure.get(`/assignment/${id}`)
            .then(res => {
                setAssignment(res?.data);
                console.log(res);
            });
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const pdfLink = e.target.pdfLink.value;
        const note = e.target.note.value;

        if (!pdfLink || !note) {
            return toast.error("All fields are required.");
        }
        // Submitted assignment data
        const submittedAssignment = {
            assignment: assignment,
            submittedBy: user?.email,
            pdfLink,
            note,
            status: "pending",
        };

        // sending data to backend/database here
        axiosSecure.post(`/submit-assignment`, submittedAssignment)
            .then(res => {
                if (res.data.insertedId) {
                    setShowModal(false);
                    // console.log("Submitted Assignment:", submittedAssignment);
                    return toast.success("✅ Assignment submitted successfully!");
                }
            })
    };

    return (
        <>
            <div className="text-center my-6">
                <h1 className="text-3xl font-bold text-[#1E3A8A]">Assignment Overview</h1>
                <p className="text-gray-600 mt-2">
                    Here you’ll find all the details for your selected assignment. Read carefully and get ready to submit!
                </p>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex">
                    {/* Assignment Image */}
                    <div className="md:w-1/2">
                        <img
                            src={image}
                            alt="Assignment Visual"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    {/* Assignment Info */}
                    <div className="p-6 md:w-1/2 space-y-4">
                        <h2 className="text-2xl font-semibold text-[#1E40AF]">{title}</h2>
                        <p className="text-gray-600">
                            {description}
                        </p>

                        <div className="text-sm text-gray-700 space-y-1">
                            <p><span className="font-medium">Marks:</span> {marks}</p>
                            <p><span className="font-medium">Difficulty:</span> <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{difficulty}</span></p>
                            <p><span className="font-medium">Due Date:</span>{dueDate}</p>
                            <p><span className="font-medium">Instructor Email:</span>{user?.email}</p>
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg font-semibold transition">
                            Take assignment
                        </button>
                    </div>
                </div>
                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
                            <h2 className="text-xl font-bold mb-2 text-[#1E3A8A]">Submit Assignment</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">PDF/Doc Link</label>
                                    <input
                                        type="url"
                                        name="pdfLink"
                                        placeholder="https://drive.google.com/..."
                                        className="w-full px-4 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Note</label>
                                    <textarea
                                        name="note"
                                        rows="3"
                                        placeholder="Enter your note here..."
                                        className="w-full px-4 py-2 border rounded-md"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-3 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewAssignment;