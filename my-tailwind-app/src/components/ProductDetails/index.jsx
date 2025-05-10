import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";
import QtyBox from "../QtyBox";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";

const ProductDetailsComponent = () => {
    const [productActionIndex, setProductActionIndex] = useState(null);
    return(
        <>
        <h1 className="text-[22px] font-[600] mb-2">Men Opaque Casual Shirt</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400">Brands: <span className="font-[500] text-black text-[13px] opacity-75">CLAFOUTIS</span></span>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                            <span className="text-[13px] cursor-pointer">Review (5)</span>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">₹1,650.00</span>
                            <span className="price text-primary font-[600] text-[18px]">₹1,450.00</span>

                            <span className="text-[14px]">Available In Stock: <span className="text-green-600 text-[14px] font-bold">147 Items</span></span>
                        </div>

                        <br />
                        <p className="mt-3 pr-10 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, laboriosam! Accusamus necessitatibus
                            voluptas in, ut officiis ipsa numquam voluptatibus quidem at quo corrupti. Quod nisi quibusdam in accusamus
                            suscipit ullam. Autem, sequi error.</p>

                        <div className="flex items-center gap-3">
                            <span className="text-[16px]">Size:</span>

                            <div className="flex items-center gap-1 actions">
                                <Button className={`${productActionIndex === 0 ? '!bg-primary !text-white' : ''}`} onClick={() => setProductActionIndex(0)}>S</Button>
                                <Button className={`${productActionIndex === 1 ? '!bg-primary !text-white' : ''}`} onClick={() => setProductActionIndex(1)}>M</Button>
                                <Button className={`${productActionIndex === 2 ? '!bg-primary !text-white' : ''}`} onClick={() => setProductActionIndex(2)}>L</Button>
                                <Button className={`${productActionIndex === 3 ? '!bg-primary !text-white' : ''}`} onClick={() => setProductActionIndex(3)}>XL</Button>
                            </div>


                        </div>
                        <p className="text-[14px] mt-4 mb-2">Free Shipping (Est. Delivery time 2-3 Days)</p>
                        <div className="flex items-center mt-4 gap-4">
                            <div className="qtyBoxWrapper w-[70px]">
                                <QtyBox />
                            </div>

                            <Button className="btn-org flex gap-2"><MdOutlineShoppingCart className="text-[22px]" /> Add To Cart</Button>
                        </div>

                        <div className="flex items-center gap-2 mt-6" >
                            <span className="flex items-center gap-3 text-[15px] link cursor-pointer font-[500]"><FaRegHeart className="text-[18px ]" /> Add to Wishlist</span>

                            <span className="flex items-center gap-3 text-[15px] link cursor-pointer font-[500]"><IoGitCompareOutline className="text-[18px ]" /> Add to Compare</span>
                        </div>
        </>
    );

}
export default ProductDetailsComponent;