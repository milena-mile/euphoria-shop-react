import { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PhotoSlider = (props: {images: string[]}) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    const settings = {
        vertical: true,
        slidesToShow: 3,
        swipeToSlide: true,
        focusOnSelect: true,
        draggable: true,
        responsive: [
            {
              breakpoint: 850,
              settings: {
                vertical: false
              }
            },
        ]
    }
    return (
        <div className="b-product_slider"> 
            <Slider
                asNavFor={nav1}
                ref={slider => (sliderRef2 = slider)}
                {...settings}
                className="b-slider_thumb"
            >
                {props.images.map((item, key) => (
                    <div className="b-slider_thumb-img" key={key}>
                        <img src={item} alt="" />
                    </div>
                ))}
            </Slider>
            <Slider asNavFor={nav2} 
                    ref={slider => (sliderRef1 = slider)}
                    arrows={false}
                    className="b-slider_main"
            >
                {props.images.map((item, key) => (
                    <div className="b-slider_main-img" key={key}>
                        <img src={item} alt="" />
                    </div>
                ))} 
            </Slider>
                    </div>
    )
}

export default PhotoSlider;