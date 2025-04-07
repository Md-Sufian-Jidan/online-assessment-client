import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const ViewAssignment = () => {
    const { user } = useAuth();
    const assignment = useLoaderData();
    const { title, description, difficulty, marks, image, dueDate } = assignment.data;
    console.log(assignment);

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

                        <button className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg font-semibold transition">
                            Submit Assignment
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewAssignment;