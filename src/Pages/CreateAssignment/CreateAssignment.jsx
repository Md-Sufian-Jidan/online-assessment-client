import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { VscLoading } from "react-icons/vsc";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const CreateAssignment = () => {
    const { user, loading } = useAuth();
    const [difficulty, setDifficulty] = useState('');
    const axiosSecure = useAxiosSecure();

    const createAssignment = (e) => {
        e.preventDefault();
        const email = user?.email;
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const image = form.photoUrl.value;
        const dueDate = form.date.value;
        const assignment = { title, description, difficulty, marks, image, dueDate, email };
        // console.log(assignment);
        axiosSecure.post('/create-assignment', assignment)
            .then(res => {
                console.log(res);
                if (res.data.insertedId) {
                    form.reset();
                    return toast.success('Assignment Created Successfully');
                }
            })
            .catch(error => {
                console.log(error);
                return toast.error(error.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>StudySync | Create Assignment</title>
            </Helmet>
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                    Create a New Assignment
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                    Fill in the details below to assign a new task to your class or group. Share deadlines, instructions, and let the learning begin!
                </p>
            </div>
            <form onSubmit={createAssignment} className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 space-y-6 mb-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="title"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        rows="4"
                        placeholder="Describe the assignment..."
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="description"
                    ></textarea>
                </div>

                {/* Marks */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                    <input
                        type="number"
                        placeholder="e.g. 100"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="marks"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="url"
                        placeholder="Paste image URL here"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="photoUrl"
                    />
                </div>

                {/* Difficulty Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {/* Due Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="date"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    {
                        loading ? <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-xl transition duration-300r">
                            <VscLoading className=" animate-spin" size={20} />
                        </button> :
                            <button
                                type="submit"
                                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-xl transition duration-300"
                            >
                                Create Assignment
                            </button>
                    }
                </div>
            </form>
        </>
    );
};

export default CreateAssignment;