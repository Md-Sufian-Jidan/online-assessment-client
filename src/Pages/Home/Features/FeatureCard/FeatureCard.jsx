
const FeatureCard = (feature) => {
    const { icon, title, description } = feature?.feature;
    return (
        <div className="bg-[#E0F2FE] rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center mb-4">
                <img src={icon} alt={title} className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-[#1E40AF] text-center">{title}</h3>
            <p className="text-gray-700 text-sm mt-2 text-center">{description}</p>
        </div>
    );
};

export default FeatureCard;