import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const LeaderBoard = () => {
    const axiosSecure = useAxiosSecure();
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        axiosSecure.get("/leaderboard")
            .then((res) => {
                setLeaders(res.data);
                console.log(res.data);
            });
    }, [axiosSecure]);

    return (
        <>
            <Helmet>
                <title>StudySync | Leader Board</title>
            </Helmet>
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-2">🏆 Leaderboard</h1>
                <p className="text-gray-600 mb-6">Top performers across all completed assignments</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead>
                            <tr className="bg-blue-100 text-blue-800">
                                <th className="py-3 px-4">Rank</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                {/* <th className="py-3 px-4">Avg. Marks</th> */}
                                {/* <th className="py-3 px-4">Completed</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((user, index) => (
                                <tr key={index} className="border-t hover:bg-gray-100">
                                    <td className="py-2 px-4 font-semibold">{index + 1}</td>
                                    <td className="py-2 px-4">{user.name || "Unknown"}</td>
                                    <td className="py-2 px-4">{user.submittedBy}</td>
                                    {/* <td className="py-2 px-4 text-green-700 font-bold">{user.averageMark.toFixed(2)}</td>
                                <td className="py-2 px-4">{user.completedAssignments}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LeaderBoard;
