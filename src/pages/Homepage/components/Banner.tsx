import info from '../../../../public/data.json';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
    const data = info.banner;

    return (
        <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='b-banner'
        >
            {Object.entries(data).map(([key, value]) => (
                <SwiperSlide style={{ backgroundColor: value.color }} key={key}>
                    <img className='b-banner_image' src={`images/${value.image}`} alt={value.title} loading="lazy"/>
                    <div className='b-banner_info'>
                        <span className='b-banner_category'>{value.category}</span>
                        <h2 className='b-banner_title'>{value.title}</h2>
                        <span className='b-banner_description'>{value.description}</span>
                        <Link to={value.link} className='button-link'>Shop Now</Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Banner;