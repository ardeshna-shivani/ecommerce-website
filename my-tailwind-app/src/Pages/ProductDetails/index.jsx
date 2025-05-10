import React, { useState } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
// import Rating from '@mui/material/Rating';
// import { Button } from "@mui/material";
// import QtyBox from "../../components/QtyBox";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa6";
// import { IoGitCompareOutline } from "react-icons/io5";
import ProductDetailsComponent from "../../components/ProductDetails";

const ProductDetails = () => {

    
    const [activeTab,setActiveTab] = useState(0);
    return (
        <>

            <div className="container">
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/" className="link transition">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            className="link transition !text-[14px]"
                        >
                            Fashion
                        </Link>


                        <Link
                            underline="hover"
                            color="inherit"
                            className="link transition !text-[14px]"
                        >
                            Men Opaque Casual Shirt
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>

            <section className="bg-white py-5 ">

                <div className="container flex gap-8 items-center">
                    <div className="productZoomContainer w-[40%]">
                        <ProductZoom />
                    </div>

                    <div className="productContent w-[60%] pr-10">
                        <ProductDetailsComponent/>


                    </div>


                </div>

                <div className="container pt-10 ">
                    <div className="flex items-center gap-8 mb-5 ">
                        <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 0 && 'text-primary'}`} onClick={() => setActiveTab(0)}>Description</span>
                        <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 1 && 'text-primary'}`} onClick={() => setActiveTab(1)}>Product Details</span>
                        <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 2 && 'text-primary'}`} onClick={() => setActiveTab(2)}>Reviews (5)</span>
                    </div>

                    {
                        activeTab === 0 && (
                            <div className="shadow-md w-full px-8 py-5 rounded-md">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                                scrambled it to make a type specimen book.</p>
                             <h4>Leight Weight Design</h4>

                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                                scrambled it to make a type specimen book.</p>

                                <h4>Free Shipping & Return</h4> 
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>  
                                <h4>Money Back Guarantee</h4>
                                <p>Lorem Ipsum has been the 
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                                scrambled it to make a type specimen book.</p>

                                <h4>Online Support</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
               
                        )
                    }

</div>
            </section>

        </>
    );
}

export default ProductDetails;