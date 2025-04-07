// components/AssignmentPreview.jsx
const AssignmentPreview = ({ submission }) => {
    const { assignment, pdfLink, note, status, feedback, givenMark } = submission;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-6">
            <h2 className="text-3xl font-bold text-[#1E40AF] dark:text-white">
                {assignment?.title} - Preview
            </h2>

            <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p><span className="font-semibold">Status:</span> <span className={`font-semibold ${status === "pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                    }`}>{status}</span></p>
                <p><span className="font-semibold">Note:</span> {note}</p>
                {status === 'completed' && (
                    <>
                        <p className="text-sm text-gray-700 mt-1">
                            📝 <span className="font-semibold">Feedback:</span>{" "}
                            {feedback ? feedback : "No feedback yet"}
                        </p>
                        <p><span className="font-semibold">Given Mark:</span> {givenMark} / {assignment?.marks}</p>
                    </>
                )}
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    📄 PDF Preview
                </h3>
                <div className="w-full aspect-[16/9] border rounded overflow-hidden shadow">
                    <iframe
                        src={pdfLink}
                        title="PDF Preview"
                        className="w-full h-full"
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default AssignmentPreview;
