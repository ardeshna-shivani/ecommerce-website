import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import banner1 from '../../assets/banner1.webp';
// import banner2 from '../../assets/banner2.webp';
// import banner3 from '../../assets/banner3.webp';
// import banner4 from '../../assets/banner4.webp';
// import banner5 from '../../assets/banner5.webp';

import { Autoplay, Navigation } from 'swiper/modules';
import BannerBoxV2 from "../BannerBoxV2";

const AdsBannerSliderV2 = (props) => {
    return (
        <div className="py-5 w-full">        <Swiper
            slidesPerView={props.items}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation,Autoplay]}
            className="smlBtn"
        >
            <SwiperSlide>
                <BannerBoxV2 image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} link={'/'} info="left"/>
            </SwiperSlide>

            <SwiperSlide>
                <BannerBoxV2 image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} link={'/'} info="left"/>
            </SwiperSlide>

            <SwiperSlide>
                <BannerBoxV2 image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} link={'/'} info="left"/>
            </SwiperSlide>

            <SwiperSlide>
                <BannerBoxV2 image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} link={'/'} info="left"/>
            </SwiperSlide>

            <SwiperSlide>
                <BannerBoxV2 image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} link={'/'} info="left"/>
            </SwiperSlide>
        </Swiper>
        </div>

    );
}
export default AdsBannerSliderV2;