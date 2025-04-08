import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AssignmentCard = ({ assignment, currentUserEmail, setAssignments, assignments }) => {
    const axiosSecure = useAxiosSecure();
    const { _id, title, description, difficulty, marks, image, dueDate, email } = assignment;

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-assignment/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = assignments.filter(ass => ass?._id !== _id);
                            setAssignments(remaining);
                        }
                    })
            }
        });
    };

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg dark:bg-gray-200 transition-all duration-300 relative text-center">
            <img
                src={image}
                alt="Assignment cover"
                className="w-full h-48 object-cover"
            />

            <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-[#1E3A8A]">{title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

                <div className="flex justify-between text-sm text-gray-500">
                    <span>Marks: <strong>{marks}</strong></span>
                    <span>Due: <strong>{dueDate}</strong></span>
                </div>

                <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-700 font-medium rounded-full">
                    {difficulty}
                </span>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 gap-2">
                    <Link to={`/view/${_id}`} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium transition" >
                        <button>
                            View
                        </button>
                    </Link>
                    <Link to={`/update/${_id}`} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg font-medium transition">
                        <button>
                            Update
                        </button>
                    </Link>

                    {email === currentUserEmail && (
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-medium transition"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentCard;
