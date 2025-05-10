import React, { useState } from "react";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const ProductZoom = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [thumbSwiper, setThumbSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);

    const goto = (index) => {
        setSlideIndex(index);
        if (thumbSwiper && mainSwiper) {
            thumbSwiper.slideTo(index);
            mainSwiper.slideTo(index);
        }
    };

    const images = [
        "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg",
        "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg",
        "https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg",
        "https://serviceapi.spicezgold.com/download/1742463096961_hbhb4.jpg"
    ];

    return (
        <div className="flex gap-3">
            <div className="slider w-[15%]">
                <Swiper
                    onSwiper={setThumbSwiper}
                    direction={'vertical'}
                    slidesPerView={4}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className="zoomProductSliderThumbs h-[500px] overflow-hidden"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group transition-opacity duration-300 ${slideIndex === index ? 'opacity-100' : 'opacity-30'}`}
                                onClick={() => goto(index)}
                            >
                                <img src={img} className="w-full transition-all group-hover:scale-105" alt="" />
                            </div>
                        </SwiperSlide>
                        
                    ))}
                </Swiper>
            </div>

            <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md">
                <Swiper
                    onSwiper={setMainSwiper}
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={false}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <InnerImageZoom zoomType="hover" zoomScale={1} src={img} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductZoom;