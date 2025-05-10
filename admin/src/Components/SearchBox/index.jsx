import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
    <div className="w-full h-auto  bg-[#f1f1f1] relative overflow-hidden">
        <IoSearch className="absolute top-[13px] left-[10px] z-50 pointer-events-none opacity-80"/>  
        <input type="text" className="w-full h-[40px] bg-[#f1f1f1] p-2 focus:outline-none border border-[rgba(0,0,0,0.1)]
        focus:border-[rgba(0,0,0,0.5)] rounded-md text-[13px] pl-8" placeholder="Search here..." />
    </div>
}
export default SearchBox;