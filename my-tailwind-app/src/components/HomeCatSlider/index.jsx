import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation} from 'swiper/modules';
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
    return (
        <div className="homeCatSlider py-8 pt-4">
            <div className="container">
                <Swiper
                    slidesPerView={7}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Fashion</h3>
                        </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Electronics</h3>
                        </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Bags</h3>
                        </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Footwear</h3>
                        </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Groceries</h3>
                        </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Beauty</h3>
                        </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1741661105893_well.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Wellness</h3>
                        </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                        <div className="item py-7 px-3 bg-white rounded-sm mt-5 text-center flex items-center justify-center flex-col">
                            <img className="w-[60px] transition-all" src="https://serviceapi.spicezgold.com/download/1741661120743_jw.png"/>
                            <h3 className="text-[16px] font-[500] mt-3">Jewellery</h3>
                        </div>
                        </Link>
                    </SwiperSlide>
                    
                </Swiper>
            </div>
        </div>
    )
}
export default HomeCatSlider;