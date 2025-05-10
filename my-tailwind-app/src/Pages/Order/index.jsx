import React, { useState } from "react";
import AccountSideBar from "../../components/AccountSidebar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { FaAngleUp } from "react-icons/fa6";

const Order = () => {

    const [isOpenOrderedProduct,setIsOpenOrderedProduct] = useState(null);
    const isShowOrderdProduct = (index) => {
        if(isOpenOrderedProduct === index){
            setIsOpenOrderedProduct(null);
        }
        else{
        setIsOpenOrderedProduct(index);
        }
    }
    return(
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar/>
                </div>

                <div className="col2 w-[80%]">
                    <h2>My Orders</h2>
                        <p className="mt-0">There are <span className="font-bold text-primary">2</span>{""} Orders</p>
                        <div className="relative overflow-x-auto mt-5">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400 ">
                                    <tr>
                                        &nbsp;

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                            Order Id
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                            Payment Id
                                        </th>

                                        {/* <th scope="col" className="px-6 py-3">
                                        Products
                                        </th> */}

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Name
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Phone Number
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Address
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        pincode
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Total Amount
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Email
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        User Id
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Order Status
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-[500]">
                                    <th scope="col" className="px-6 py-3">
                                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg[#f1f1f1]" onClick={() => isShowOrderdProduct(0)}>
                                            {
                                                isOpenOrderedProduct === 0 ? <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]"/> : <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]"/> 
                                            }
                                            
                                            </Button>
                                        </th>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            <span className="text-primary">1234567890</span>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            Pay_Ptowfdgffdysgygs
                                        </td>
                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                            test
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            0987654321
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            <span className="block w-[300px]">csafcg bhjba njan krkemwk</span>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            110053
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            3800
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            test@gmail.com
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                        <span className="text-primary">1234567890</span>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            <Badge status="pending"/>
                                        </td>
                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                            2024-12-04
                                        </td>
                                    </tr>

                                

                                {
                                    isOpenOrderedProduct === 0 && 
                                    (
                                        <tr>
                                    <td className="pl-20" colSpan="6">

                                    <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                            Product Id
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                            Product Title
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Image
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                       Quantity
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Price
                                        </th>

                                        <th scope="col" className="px-6 py-3 whitespace-noewrap">
                                        Sub Total
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-[500]">
                                            <span className="text-primary">1234567890</span>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                        Men Opaque Casual Shirt
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className="w-[40px] h-[40px] object-cover rounded-md" />
                                        </td>
                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                           2
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            1000
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            1000
                                        </td>
                                    </tr>

                                
                                <tr>
                                    <td className="bg-[#f1f1f1]" colSpan="12"></td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                                    </td>
                                </tr>
                                    )
                                }
                                

                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </section>
    );
}

export default Order;