import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FiMinusSquare } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";


const CategoryCollapse = () => {
    const [subMenuIndex, setsubMenuIndex] = useState(null);
        const [innerSubMenuIndex, setinnerSubMenuIndex] = useState(null);
    
        // const toggleDrawer = (newOpen) => () => {
        //     // setOpen(newOpen);
        //     props.setIsOpenCatPanel(newOpen);
        // };
    
        const openSubmenu = (index) => {
            if (subMenuIndex === index) {
                setsubMenuIndex(null);
            } else {
                setsubMenuIndex(index);
            }
    
        }
    
        const openInnerSubmenu = (index) => {
            if (innerSubMenuIndex === index) {
                setinnerSubMenuIndex(null);
            } else {
                setinnerSubMenuIndex(index);
            }
    
        }
    
    return(
        <>
        <div className='scroll'>
                <ul className='w-full '>
                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button className='w-full !text-left !justify-start px-3 !text-rgba(0,0,0,0.8)'>Fashion </Button></Link>

                            {
                                subMenuIndex === 0 ? 
                                <FiMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} /> :
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} />
                            }

                        {
                            subMenuIndex === 0 && (
                                <ul className='submenu w-full pl-3'>
                                    <li className='list-non relative '>
                                        <Link to="/" className='w-full'>
                                            <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">Apparel</Button></Link>

                                            {
                                innerSubMenuIndex === 0 ? 
                                <FiMinusSquare className='cursor-pointer' onClick={() => openInnerSubmenu(0)} /> :
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                            }
                                        {/* <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} /> */}

                                            {
                                                innerSubMenuIndex === 0 && (
                                                    <ul className='inner_submenu absolute top-[100%] left-[0%] w-full pl-3'>
                                            <li className='list-non relative mb-1'>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Smart-Tablet</Link>
                                            </li>

                                            <li className='list-non relative mb-1 '>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Crepe T-Shirt</Link>
                                            </li>

                                            <li className='list-non relative mb-1'>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Lather Watch</Link>
                                            </li>

                                            <li className='list-non relative mb-1'>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Rolling Diamond</Link>
                                            </li>


                                        </ul>
                                                )
                                            }



                                        
                                    </li>

                                </ul>
                            )
                        }


                    </li>

                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button className='w-full !text-left !justify-start px-3 !text-rgba(0,0,0,0.8)'>Outerwear </Button></Link>

                            {
                                subMenuIndex === 1 ? 
                                <FiMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} /> :
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} />
                            }

                        {
                            subMenuIndex === 1 && (
                                <ul className='submenu w-full pl-3'>
                                    <li className='list-non relative '>
                                        <Link to="/" className='w-full'>
                                            <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">Apparel</Button></Link>

                                            {
                                innerSubMenuIndex === 1 ? 
                                <FiMinusSquare className='cursor-pointer' onClick={() => openInnerSubmenu(1)} /> :
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(1)} />
                            }
                                        {/* <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} /> */}

                                            {
                                                innerSubMenuIndex === 1 && (
                                                    <ul className='inner_submenu absolute top-[100%] left-[0%] w-full pl-3'>
                                            <li className='list-non relative mb-1'>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Smart-Tablet</Link>
                                            </li>

                                            <li className='list-non relative mb-1 '>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Crepe T-Shirt</Link>
                                            </li>

                                            <li className='list-non relative mb-1'>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Lather Watch</Link>
                                            </li>

                                            <li className='list-non relative mb-1'>
                                                <Link to="/" className="link w-full !text-left !justify-start !px-3 transition text-[14px]">Rolling Diamond</Link>
                                            </li>


                                        </ul>
                                                )
                                            }



                                        
                                    </li>

                                </ul>
                            )
                        }


                    </li>
                </ul>
            </div>
        </>
    );

}
export default CategoryCollapse;