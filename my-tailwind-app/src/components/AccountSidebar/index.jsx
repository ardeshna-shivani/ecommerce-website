import React, { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { editData } from "../../utils/api";
import { LuMapPinCheck } from "react-icons/lu";

const AccountSideBar = () => {

    const [previews,setPreviews] = useState([]);
    const [isUploading, setUploading] = useState(false);
    const context = useContext(MyContext);

    useEffect(() => {
        const userAvatar = [];

        if(context?. userAvatar?. avatar!== "" && context?.userData?.avatar !== undefined){
        userAvatar.push(context?.userAvatar?.avatar);
        setPreviews(userAvatar);
        }
    },[context?.userData])
    let img_arr = []
    let uniqueArray = []
    let selectedImages = []

    const formdata = new FormData();

    const onChangeFile = async(e,apiEndPoint) => {
        try{
            setPreviews([]);
            const files = e.target.files;
            setUploading(true);
            // console.log(files);

            for(var i = 0; i< files.length; i++){
                if(files[i] &&
                    files[i].type === "image/jpeg" ||
                    files[i].type === "image/jpg" ||
                    files[i].type === "image/png" ||
                    files[i].type === "image/webp" 
                ){
                    const file = files[i];
                    selectedImages.push(file);
                    FormData.append(`avatar`, file);

                    uploadImage("/api/user/user-avatar",formdata).then((res) => {
                        // console.log(res);
                        setUploading(false);
                        let avatar=[];
                        avatar.push(res?.data?.avatar);
                        setPreviews(avatar);
                    })
                    
                }
                else {
                    context.alertBox("error","Please select valid JPG or PNG image file");
                    setUploading(false);
                    return false;
                }
            }
            
        }
        catch(error){
            console.log(error);
            
        }
    }
    return(
        <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
                        <div className="w-full p-5 flex items-center justify-center flex-col">
                            <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group 
                            flex items-center justify-center bg-gray-200">
                                 {
                                    isUploading === true ? <CircularProgress color="inherit" /> : 
                                    <>
                                    {
                                        previews?.length !== 0 ? previews.map((img,index) => {
                                            return(
                                            <img src={img} key={index} 
                                className="w-full h-full object-cover"/>)
                                        }):
                                    <img src={"/user.png"} className="w-full h-full object-cover"/>
                                    }
                                    </>
                                    
                                 }

                                {/* {
                                    previews?.length === 0 && 
                                    
                                } */}


                                <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]
                                flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                                    <FaCloudUploadAlt className="text-[#fff] text-[25px]"/>
                                    <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 " accept="image/*"
                                    onChange={(e) => 
                                        onChangeFile(e,"/api/user/user-avater")
                                    } name="avatar"
                                     />
                                </div>
                            </div>

                            <h3>{context?.userData?.name}</h3>
                           <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>
                        </div>

                        <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
                            <li className="w-full">
                            <NavLink to='/my-account' exact={true} activeClassName = "isActive">
                                <Button className="flex items-center gap-2  w-full !rounded-none !text-[rgba(0,0,0,0.8)] !capitalize
                                !text-left !justify-start !px-5">
                                    <FaRegUser className="text-[17px]"/>My Profile</Button>
                                    </NavLink>
                            </li>

                            <li className="w-full">
                            <NavLink to='/address' exact={true} activeClassName = "isActive">
                                <Button className="flex items-center gap-2  w-full !rounded-none !text-[rgba(0,0,0,0.8)] !capitalize
                                !text-left !justify-start !px-5">
                                    <LuMapPinCheck className="text-[17px]"/>Address</Button>
                                    </NavLink>
                            </li>

                            <li className="w-full">
                            <NavLink to='/my-list' exact={true} activeClassName = "isActive">
                                <Button className="flex items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !capitalize
                                !text-left !justify-start !px-5">
                                    <FaRegHeart className="text-[17px]"/>My List</Button>
                                    </NavLink>
                            </li>


                            <li className="w-full">
                            <NavLink to='/my-orders' exact={true} activeClassName = "isActive">
                                <Button className="flex items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !capitalize
                                !text-left !justify-start !px-5">
                                    <IoBagCheckOutline className="text-[17px]"/>My Orders</Button>
                                    </NavLink>
                            </li>


                            <li className="w-full">
                            {/* <NavLink to='/my-account' exact={true} activeClassName = "isActive"> */}
                                <Button className="flex items-center gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)] !capitalize
                                !text-left !justify-start !px-5">
                                    <IoMdLogOut className="text-[17px]"/>Logout</Button>
                                    {/* </NavLink> */}
                            </li>

                        </ul>
                    </div>
    );
}

export default AccountSideBar;