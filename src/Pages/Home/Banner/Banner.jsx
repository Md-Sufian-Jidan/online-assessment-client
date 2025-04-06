// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Fade } from 'react-awesome-reveal';

const Banner = () => {
    return (
        <Fade duration={2000}>
            <div className='my-5'>
                <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                    <SwiperSlide>
                        <div className="h-[70vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/PZw7FMJB/pexels-fauxels-3184328.jpg')]">
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="h-[70vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/j9kdZ3v3/jeshoots-com-x-Gt-Hj-C-QNJM-unsplash-1.jpg')]">
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="h-[70vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/zhzDNghJ/pexels-hillaryfox-1595385.jpg')]">
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="h-[70vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/6cRG0FxM/education.png')]">
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="h-[70vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/vvdDLknf/learning.png')]">
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/HTLJYVxk/hands.png')]">
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </Fade>
    );
};

export default Banner;