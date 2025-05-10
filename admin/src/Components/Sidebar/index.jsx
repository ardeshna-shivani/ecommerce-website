import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import {Collapse} from 'react-collapse';
import { MyContext } from '../../App';


const Sidebar = () => {

    const context = useContext(MyContext);
    const [subMenuIndex, setSubMenuIndex] = useState(null);

    const isOpenSubMenu = (index) => {
        if(subMenuIndex === index){
            setSubMenuIndex(null);
        }
        else{
            setSubMenuIndex(index);
        }
        
    }

    

    return (
        <>
        <div className="sidebar fixed top-0 left-0 bg-[#fff] w-[15%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4">
                <div className="py-2 w-full">
                    <Link to="/"><img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" 
                    className='w-[120px]' /></Link>
                </div>

                <ul className='mt-4'> 
                    <li>
                        <Link to="/">
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-5
                        hover:!bg-[#f1f1f1]">
                            <RxDashboard className='text-[18px]'/><span>Dashboard</span></Button>
                            </Link>
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-5
                        hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(1)}>
                            <FaRegImage className='text-[18px]'/><span>Home Slides </span>
                            <span className='ml-auto block w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`transition-all ${subMenuIndex === 1 ? 'rotate-180': ''}`}/></span></Button>

                            <Collapse isOpened={subMenuIndex === 1 ? true : false}>
                            <ul className='w-full'>
                                <li className='w-full'><Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-8 flex gap-3'>
                                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>Home Banner List</Button></li>
                                <li className='w-full'><Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-8 flex gap-3'>
                                <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>Add Home Banner Slide</Button></li>
                            </ul>
                            </Collapse>
                            
                    </li>

                    <li>
                    <Link to="/users">
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-5
                        hover:!bg-[#f1f1f1]">
                            <FiUsers className='text-[18px]'/><span>Users</span></Button>
                            </Link>
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-5
                        hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(2)}>
                            <RiProductHuntLine className='text-[18px]'/><span>Products</span>
                            <span className='ml-auto block w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`transition-all ${subMenuIndex === 2 ? 'rotate-180': ''}`}/></span></Button>

                            <Collapse isOpened={subMenuIndex === 2 ? true : false}>
                            <ul className='w-full'>
                                <li className='w-full'>
                                <Link to="/products">
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-8 flex gap-3'>
                                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>Product List</Button></Link></li>
                                <li className='w-full'>
                                
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] 
                                    !pl-8 flex gap-3' onClick={() => context.setIsOpenFullScreenPanel({open:true,model:"Add Product"})}>
                                <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>
                                Product Upload</Button>
                            
                                </li>
                            </ul>
                            </Collapse>
                            
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-5
                        hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(3)}>
                            <TbCategory className='text-[18px]'/><span>Category</span>
                            <span className='ml-auto block w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`transition-all ${subMenuIndex === 3 ? 'rotate-180': ''}`}/></span></Button>

                            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
                            <ul className='w-full'>
                            <li className='w-full'>
                            <Link to="/category/list">
                                <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-8 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>Category List</Button></Link></li>
                                <li className='w-full'>
                                
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-8 flex gap-3'
                                    onClick={() => context.setIsOpenFullScreenPanel({open:true,model:'Add New Category'})}>
                                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>Add a Category</Button></li>
                                <li className='w-full'>

                                <Link to="/subCategory/list">
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-8 flex gap-3'>
                                <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>Sub category List</Button></Link></li>
                                
                                <li className='w-full'>
                                
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-8 flex gap-3'
                                    onClick={() => context.setIsOpenFullScreenPanel({
                                        open: true,
                                        model: 'Add New Category'
                                    })}>
                                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]'></span>Add a Sub Category</Button></li>
                            </ul>
                            </Collapse>
                            
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-5
                        hover:!bg-[#f1f1f1]">
                            <IoBagCheckOutline className='text-[20px]'/><span>Orders</span></Button>
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-5
                        hover:!bg-[#f1f1f1]">
                            <IoMdLogOut className='text-[20px]'/><span>Logout</span></Button>
                    </li>
                </ul>
        </div>
        </>
    );
}
export default Sidebar;