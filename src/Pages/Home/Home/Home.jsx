import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Faq from "../Faq/Faq";
import Features from "../Features/Features/Features";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>StudySync | Home</title>
            </Helmet>
            <Banner />
            <Features />
            <Faq />
        </>
    );
};

export default Home;