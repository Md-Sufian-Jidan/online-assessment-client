import useFeatures from "../../../../Hooks/useFeatures";
import FeatureCard from "../FeatureCard/FeatureCard";

const Features = () => {
    const { features } = useFeatures();

    return (
        <div className="my-5">
            <div className="text-center max-w-2xl mx-auto mb-5">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">Empower Your Study Sessions</h2>
                <p className="text-gray-600 text-base md:text-lg">Discover powerful features designed to streamline group assignments,
                    enhance peer collaboration, and keep your academic workflow organized
                    and efficient.</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {
                    features?.map(feature => <FeatureCard key={feature?._id} feature={feature} />)
                }
            </div>
        </div>
    );
};

export default Features;