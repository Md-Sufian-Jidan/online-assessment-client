import React from 'react';

const Faq = () => {
    return (
        <div className='my-5'>
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                    Got questions? We have got answers. Whether you're new to StudySync or a returning learner,
                    check out some of the most common things students ask us.
                </p>
            </div>

            <div className='flex lg:flex-row flex-col items-center gap-5'>
                <div>
                    <img className='w-full max-w-2xl' src="https://i.ibb.co/m5V4j0mM/faq.png" alt="" />
                </div>
                <div>
                    <div className="collapse collapse-plus dark:bg-gray-50 border border-base-300">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title font-semibold">What is StudySync?</div>
                        <div className="collapse-content text-sm">StudySync is a collaborative assignment platform where students can create, submit, and evaluate assignments together in a peer-based learning environment.</div>
                    </div>
                    <div className="collapse collapse-plus dark:bg-gray-50 border border-base-300">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title font-semibold">How do I submit an assignment?</div>
                        <div className="collapse-content text-sm">Once logged in, navigate to the "Assignments" page, click on an active assignment, and upload your submission link along with your comments or notes.</div>
                    </div>
                    <div className="collapse collapse-plus dark:bg-gray-50 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold">Can I edit my assignment after submitting?</div>
                        <div className="collapse-content text-sm">Yes! You can update your submission anytime before the due date. Just go to your submitted assignments and click the "Edit" icon.</div>
                    </div>
                    <div className="collapse collapse-plus dark:bg-gray-50 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold">What is peer grading and how does it work?</div>
                        <div className="collapse-content text-sm">Peer grading allows you to review and provide feedback on your classmates submissions. It helps improve learning by encouraging critical thinking and collaboration.</div>
                    </div>
                    <div className="collapse collapse-plus dark:bg-gray-50 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold">Is StudySync free to use?</div>
                        <div className="collapse-content text-sm">Yes! StudySync is completely free to use for individual students and educators. No hidden fees, no premium accounts.</div>
                    </div>
                    <div className="collapse collapse-plus dark:bg-gray-50 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold">Do I need to install anything?</div>
                        <div className="collapse-content text-sm">Not at all. StudySync runs entirely in your browser. Just sign in and start syncing your study sessions!</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Faq;