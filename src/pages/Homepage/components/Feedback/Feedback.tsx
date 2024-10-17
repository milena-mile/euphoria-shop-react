import FeedbackItem from './FeedbackItem';
import info from '../../../../../public/data.json';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Feedback = () => {
    const feedback = info.feedback;

    return (
        <section className="b-feedback">
            <h2 className="b-feedback_title">Feedback</h2>
            <Swiper
                modules={[Pagination]}
                breakpoints={{
                    200: {
                      slidesPerView: 1
                    },
                    700: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 25
                    }
                  }}
                loop={true}
                pagination={{ clickable: true }}
                className='b-feedback_list'
            >
                {Object.entries(feedback).map(([key, value]) => (
                    <SwiperSlide className="b-feedback_slide" key={key}>
                       <FeedbackItem name={key} info={value} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
    
}

export default Feedback;