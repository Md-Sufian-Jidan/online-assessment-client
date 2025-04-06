
const AssignmentCard = (assignment) => {
    const { title, description, difficulty, marks, image, dueDate } = assignment?.assignment;
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
            {/* Assignment Image */}
            <img
                src={image}
                alt="Assignment cover"
                className="w-full h-48 object-cover"
            />

            {/* Card Content */}
            <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-[#1E3A8A]">{title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {description}
                </p>

                {/* Details Row */}
                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span>Marks: <span className="font-medium text-gray-700">{marks}</span></span>
                    <span>Due: <span className="font-medium text-gray-700">{dueDate}</span></span>
                </div>

                {/* Difficulty Badge */}
                <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-700 font-medium rounded-full">
                    {difficulty}
                </span>

                {/* Button */}
                <div className="pt-4">
                    <button className="w-full bg-[#3B82F6] text-white font-semibold py-2 rounded-lg hover:bg-[#2563EB] transition">
                        View Assignment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentCard;