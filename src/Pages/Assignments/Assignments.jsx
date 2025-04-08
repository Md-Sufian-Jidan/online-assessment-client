import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AssignmentCard from "./AssignmentCard";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const Assignments = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selected, setSelected] = useState("all");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/assignments?page=${currentPage}&limit=6&difficulty=${selected}`)
            .then(res => {
                setAssignments(res.data.data);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.log(err));
    }, [currentPage, selected]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
    };

    return (
        <>
            <Helmet>
                <title>StudySync | Assignments</title>
            </Helmet>
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                    Explore Assignments
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-6">
                    Browse through a variety of assignments designed to challenge your skills and enhance your learning.
                    Select one to get started and submit before the due date!
                </p>

            </div>
            {/* filter design */}
            <div className="mb-6 flex justify-center">
                <select
                    value={selected}
                    onChange={handleChange}
                    className="border border-gray-300 text-sm rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-300"
                >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            {/* assignments design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                {/* AssignmentCard goes here */}
                {
                    assignments?.map(assignment => <AssignmentCard
                        key={assignment?._id}
                        assignment={assignment}
                        currentUserEmail={user?.email}
                        setAssignments={setAssignments}
                        assignments={assignments}
                    />)
                }
            </div>
            {/* pagination design */}
            <div className="flex justify-center space-x-2 my-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages).keys()]?.map(num => (
                    <button
                        key={num}
                        onClick={() => setCurrentPage(num + 1)}
                        className={`px-3 py-1 rounded ${currentPage === num + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                    >
                        {num + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </>
    );
};

export default Assignments;