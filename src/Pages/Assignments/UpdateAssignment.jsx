import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const assignment = useLoaderData();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { _id, title, description, difficulty, marks, image, dueDate } = assignment.data;

    const handleUpdate = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const marks = e.target.marks.value;
        const image = e.target.image.value;
        const difficulty = e.target.difficulty.value;
        const dueDate = e.target.dueDate.value;

        if (!title || !description || !marks || !image || !difficulty || !dueDate) {
            setError("All fields are required.");
            return;
        }

        const updatedAssignment = {
            title,
            description,
            marks,
            image,
            difficulty,
            dueDate,
            email: user?.email
        };

        axiosSecure.patch(`/update-assignment/${_id}`, updatedAssignment)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success",
                        text: "Assignment Updated Successfully?",
                        icon: "success"
                    });
                    return navigate('/assignments');
                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md my-5">
            <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">Update Assignment</h1>
            <p className="text-gray-600 mb-6">Make changes to your assignment and update it below.</p>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={title}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        defaultValue={description}
                        rows="3"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Marks</label>
                        <input
                            type="number"
                            name="marks"
                            defaultValue={marks}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            defaultValue={image}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Difficulty</label>
                        <select
                            name="difficulty"
                            defaultValue={difficulty}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            defaultValue={dueDate}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Update Assignment
                </button>
            </form>
        </div>
    );
};

export default UpdateAssignment;
