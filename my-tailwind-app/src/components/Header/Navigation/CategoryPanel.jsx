import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
// import { FaRegPlusSquare } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import { FiMinusSquare } from "react-icons/fi";
import CategoryCollapse from '../../CategoryCollapse';


const CategoryPanel = (props) => {

    // const [subMenuIndex, setsubMenuIndex] = useState(null);
    // const [innerSubMenuIndex, setinnerSubMenuIndex] = useState(null);

    const toggleDrawer = (newOpen) => () => {
        // setOpen(newOpen);
        props.setIsOpenCatPanel(newOpen);
    };

    // const openSubmenu = (index) => {
    //     if (subMenuIndex === index) {
    //         subMenuIndex(null);
    //     } else {
    //         setsubMenuIndex(index);
    //     }

    // }

    // const openInnerSubmenu = (index) => {
    //     if (innerSubMenuIndex === index) {
    //         innerSubMenuIndex(null);
    //     } else {
    //         setinnerSubMenuIndex(index);
    //     }

    // }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
            <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>Shop By Categories <IoCloseSharp onClick={toggleDrawer(false)}
                className='cursor-pointer text-[20px]' /></h3>

            {/* <div className='scroll'>
                <ul className='w-full '>
                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/" className='w-full'>
                            <Button className='w-full !text-left !justify-start px-3 !text-rgba(0,0,0,0.8)'>Fashion </Button></Link> */}

                            {/* {
                                subMenuIndex === 0 ? 
                                <FiMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} /> :
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} />
                            } */}

                        {/* {
                            subMenuIndex === 0 && (
                                <ul className='submenu w-full pl-3'>
                                    <li className='list-non relative '>
                                        <Link to="/" className='w-full'>
                                            <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">Apparel</Button></Link>

                                            {
                                innerSubMenuIndex === 0 ? 
                                <FiMinusSquare className='cursor-pointer' onClick={() => openInnerSubmenu(0)} /> :
                                <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                            } */}
                                        {/* <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} /> */}

                                            {/* {
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


                    </li> */}

                    {/* <li className='list-none flex items-center relative flex-col'>
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

                                            {/* {
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

                                </ul> */}
                            {/* )
                        } */}


                    {/* </li>
                </ul>
            </div> */} 

            <CategoryCollapse/>

        </Box>
    );

    return (
        <>
            <div>
                <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </div>
        </>
    )
}
export default CategoryPanel;