import React from "react";
import { IoMdTime } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const BlogItem = () => {
    return(
        <div className="blogItem group">
            <div className="imgwrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg" className="w-full transition-all
                group-hover:rotate-1" alt="blog image"/>

                <span className="flex items-center justify-center text-white absolute bottom-[15px]
                right-[15px] z-15 bg-primary rounded-md p-1 text-[11px] font-[500] gap-1">
                    <IoMdTime className="text-[16px]"/> 5 April 2023
                </span>
            </div>

            <div className="info py-4">
                    <h2 className="text-[15px] font-[600] text-black">
                        <Link to="/" className="link">sustainable living through cutting-edge prefabricated homes</Link></h2>
                    <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4">Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by g...</p>

                    <Link className="link font-[500] text-[14px] flex items-center gap-1">Read More<IoIosArrowForward/></Link>
            </div>
        </div>
    );
}
export default BlogItem;