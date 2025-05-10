import React, { useContext, useEffect, useState } from "react";
import OtpBox from "../../../../admin/src/Components/OtpBox";
import { Button } from "@mui/material";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

const Verify = () => {
    const history = useNavigate();
    const actionType = localStorage.getItem("actionType");
    const context = useContext(MyContext);
    const [otp,setOtp] = useState("");
    const handleOtpChange = (value) => {
        setOtp(value);
    }

    const verifyOtp = (e) => {
            e.preventDefault();

            const actionType = localStorage.getItem("actionType");
            if(actionType !== 'forgot-password'){
                postData("/api/user/verifyEmail",{
                    email: localStorage.getItem("userEmail"),
                    otp
                }).then((res) => {
                    // console.log(res);
                    if(res?.error === false){
                        context.alertBox("success",res?.message)
                        localStorage.removeItem("userEmail")
                        history("/login")
                    }else{
                        context.alertBox("error",res?.message)
                    }
                    
                })
            }

            else{
                postData("/api/user/forgot-password",{
                    email: localStorage.getItem("userEmail"),
                    otp
                }).then((res) => {
                    // console.log(res);
                    if(res?.error === false){
                        context.alertBox("success",res?.message)
                        // localStorage.removeItem("userEmail")
                        history("/forgot-password")
                    }else{
                        context.alertBox("error",res?.message)
                    }
                    
                })
            }
            
            // alert(otp);
    }
    return(
        <>
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                        <div className="text-center flex items-center justify-center ">
                            <img src="/verify.png" width="80"/>
                        </div>
                    <h3 className="text-center text-[18px] text-black mt-4 mb-1">Verify OTP</h3>
                    <p className="text-center mt-0 mb-4">Otp send to <span className="text-primary font-bold">{localStorage.getItem("userEmail")}</span></p>
                    
                    <form onSubmit={verifyOtp}>
                    <OtpBox length={6} onChange={handleOtpChange}/>

                    <div className="flex items-center justify-center mt-5 px-3">
                        <Button type="submit" className="w-full btn-org btn-lg">Verify Otp</Button>

                    </div>
                    </form>
                </div>
            </div>

        </section>
        </>
    );
}
export default Verify;