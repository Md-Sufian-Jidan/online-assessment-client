import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AssignmentCard from "./AssignmentCard";

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get('/assignments')
            .then(res => setAssignments(res.data));
    }, []);
    
    return (
        <>
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                    Explore Assignments
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-6">
                    Browse through a variety of assignments designed to challenge your skills and enhance your learning.
                    Select one to get started and submit before the due date!
                </p>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                {/* AssignmentCard goes here */}
                {
                    assignments?.map(assignment => <AssignmentCard key={assignment?._id} assignment={assignment} />)
                }
            </div>
        </>
    );
};

export default Assignments;