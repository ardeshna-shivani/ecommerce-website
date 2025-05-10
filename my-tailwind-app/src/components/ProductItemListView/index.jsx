import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MyContext } from "../../App";

const ProductItemListView = () => {
    const context = useContext(MyContext);
    return(
        <div className="productsItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] mb-[8px] mt-[10px]
        flex items-center ">
            
            <div className="group imgWrapper w-[25%] h-[220px] overflow-hidden rounded-md relative">
            <span className="discount flex items-center absolute t-[10px] left-[10px] z-50 bg-primary text-white
                rounded-lg p-2 text-[12px] font-[500] mt-[10px]">10%</span>
                <Link to="/">
                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className="w-full 
                "></img>

                <div className="img overflow-hidden">
                <img src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg" className="w-full 
                absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-700
                group-hover:scale-105"></img>
                </div>
                </Link>


                <div className="actions absolute top-[-200px] right-[15px] z-50 flex items-center gap-2
                flex-col w-[50px] transition-all duration-300 group-hover:top-[10px] opacity-0 
                group-hover:opacity-100">
                    <Button className="!w-[35px] !h-[35px] !min-w[35px] !rounded-full !bg-white text-black 
                 hover:!bg-primary hover:text-white group" onClick={() => context.setOpenProductDetailsModel(true)}>
                        <MdZoomOutMap className="text-[18px] !text-black group-hover text-white group-hover:text-white 
                        hover:text-white" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w[35px] !rounded-full !bg-white text-black
                    hover:!bg-primary hover:text-white group">
                        <IoGitCompareOutline className="text-[18px] !text-black group-hover text-white group-hover:text-white 
                        hover:text-white" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w[35px] !rounded-full !bg-white text-black
                    hover:!bg-primary hover:text-white group">
                        <FaRegHeart className="text-[18px] !text-black group-hover text-white group-hover:text-white 
                        hover:text-white" />
                    </Button>
                </div>
            </div>

            <div className="info p-3 py-5  px-8 w-[75%]">
                <h6 className="text-[15px]"><Link to="/" className="link transition-all">CLAFOUTIS</Link></h6>
                <h3 className="text-[18px] title mt-1 font-[500] text-[#000] mb-1">
                    <Link to="/" className="link transition-all">Men Opaque Casual Shirt...</Link></h3>

                    <p className="text-[14px] mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                        took a galley of type and scrambled it to make a type specimen book.</p>

                <Rating name="size-small" defaultValue={4} size="small" readOnly />

                <div className="flex items-center gap-4">
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">₹1,650.00</span>
                    <span className="price text-primary font-[600] text-[15px]">₹1,450.00</span>
                </div>

                <div className="mt-3">
                <Button className="btn-org flex gap-2"><MdOutlineShoppingCart className="text-[20px]"/>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
}
export default ProductItemListView;