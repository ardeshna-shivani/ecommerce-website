import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../HomeSlider/style.css';

import { Autoplay, Navigation } from 'swiper/modules';

const HomeSlider  = () => {
    return(
    
    <div className="homeSlider mt-5">
        <div className="container">
        <Swiper navigation={true} modules={[Navigation,Autoplay]} autoplay={{delay: 2500,disableOnInteraction: false}} className="sliderHome"  spaceBetween={10}
        loop={true}>
         <SwiperSlide>
             <div className="item rounded-[20px] overflow-hidden">
             <img src="https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg" alt="Banner Slide" className="w-full"></img>
         </div>
         </SwiperSlide>

         <SwiperSlide>
         <div className="item rounded-[20px] overflow-hidden">
             <img src="https://serviceapi.spicezgold.com/download/1741660862304_NewProject(8).jpg" alt="Banner Slide" className="w-full"></img>
             </div>
         </SwiperSlide>

         <SwiperSlide>
         <div className="item rounded-[20px] overflow-hidden">
             <img src="https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg" alt="Banner Slide" className="w-full"></img>
         </div>
         </SwiperSlide>

         <SwiperSlide>
         <div className="item rounded-[20px] overflow-hidden">
             <img src="https://serviceapi.spicezgold.com/download/1741660907985_NewProject.jpg" alt="Banner Slide" className="w-full"></img>
         </div>
         </SwiperSlide>

       </Swiper>
        </div>
    </div>
    )
}
export default HomeSlider;