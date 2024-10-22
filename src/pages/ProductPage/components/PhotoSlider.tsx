import { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PhotoSlider = (props: {images: string[]}) => {
    const [nav1, setNav1] = useState<Slider | undefined>(undefined);
    const [nav2, setNav2] = useState<Slider | undefined>(undefined);
    const sliderRef1 = useRef<Slider | null>(null);
    const sliderRef2 = useRef<Slider | null>(null);

    useEffect(() => {
        if (sliderRef1.current) {
            setNav1(sliderRef1.current);
        }
        if (sliderRef2.current) {
            setNav2(sliderRef2.current);
        }
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
                ref={sliderRef2}
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
                    ref={sliderRef1}
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