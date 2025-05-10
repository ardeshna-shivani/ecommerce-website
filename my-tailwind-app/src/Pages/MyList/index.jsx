import React, { useState } from "react";
import { Button } from "@mui/material";
import { IoBagCheckOutline } from "react-icons/io5";
import MyListItems from "./MyListItems";
import AccountSideBar from "../../components/AccountSidebar";

const MyList = () => {
   
    return (
        <>

<section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar/>
                </div>

                <div className="col2 w-[70%]">
                    <h2>My List</h2>
                        <p className="mt-0">There are <span className="font-bold text-primary">2</span> products in your My List</p>
                        <div className="shadow-md rounded-md bg-white">
                            <MyListItems/>
                            <MyListItems/>
                            <MyListItems/>
                            <MyListItems/>
                            <MyListItems/>
                            <MyListItems/>
                        </div>
                </div>
            </div>
        </section>
        </>
    );
}
export default MyList;