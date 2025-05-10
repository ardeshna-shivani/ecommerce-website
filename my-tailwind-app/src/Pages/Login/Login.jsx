import React, { useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../utils/api";

const Login = () => {

    const context = useContext(MyContext);
    const [loading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    })

    const history = useNavigate();

    const forgotPassword = () => {
        // context.alertBox("Success", "OTP send");
        
            if(formFields.email === ""){
                context.alertBox("error", "Please enter email id");
                return false;
            }
            else{
                context.alertBox("success", `Otp Send to ${formFields.email}`);
                localStorage.setItem("userEmail",formFields.email);
                localStorage.setItem("actionType",'forgot-password');


                postData("/api/user/forgot-password",{
                    email: formFields.email,
                }).then((res) => {
                    // console.log(res);
                    if(res?.error === false){
                        context.alertBox("success",res.message)
                        localStorage.removeItem("userEmail")
                        history("/verify")
                    }else{
                        context.alertBox("error",res.message)
                    }
                    
                })
                history("/verify");
            }
        
        
    }
    const valideValue = Object.values(formFields).every(el => el)
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert();
        setIsLoading(true);

        if (formFields.email === "") {
            context.alertBox("error", "Please enter email id")
            setIsLoading(false);
            return false;
        }

        if (formFields.password === "") {
            context.alertBox("error", "Please enter password")
            setIsLoading(false);
            return false;
        }
        postData("/api/user/login", formFields,{withCredential: true}).then((res) => {
            console.log(res);

            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("success", res?.message);
                localStorage.setItem("userEmail", formFields.email);
                setFormFields({
                    email: "",
                    password: ""
                })
                // localStorage.setItem("accesstoken", res?.data.accesstoken)
                // localStorage.setItem("refreshtoken", res?.data.refreshtoken)
                // context.setIsLogin(true);
                history("/")
            } else {
                context.alertBox("error", res?.message);
                setIsLoading(false);
            }

        })
    }
    return (
        <>
            <section className="section py-10">
                <div className="container">
                    <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                        <h3 className="text-center text-[18px] text-black">Login to your Account</h3>
                        <form className="w-full mt-5" onSubmit={handleSubmit}>
                            <div className="form-group w-full mb-5 ">
                                <TextField type="email" id="email" label="Email Id *" variant="outlined" className="w-full" name="email" onChange={onChangeInput} value={formFields.email} disabled={loading === true ? true : false} />
                            </div>

                            <div className="form-group w-full mb-5 relative">
                                <TextField type={isShowPassword === false ? 'password' : 'text'} id="password" label="Password *" variant="outlined" className="w-full" name="password"
                                    onChange={onChangeInput} value={formFields.password} disabled={loading === true ? true : false} />
                                <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                                    onClick={() => setIsShowPassword(!isShowPassword)}>

                                    {
                                        isShowPassword === true ? <IoMdEye className="text-[20px] opacity-75" /> : <IoMdEyeOff className="text-[20px] opacity-75" />
                                    }
                                </Button>
                            </div>

                            <a className="link cursor-pointer font-[500] text-[14px]" onClick={forgotPassword}>Forgot Password?</a>

                            <div className="flex items-center w-full mt-3 mb-3">
                                <Button className="btn-org btn-lg w-full flex gap-3" type="submit" disabled={!valideValue}>
                                    {
                                        loading === true ? <CircularProgress color="inherit" /> : 'Login'
                                    }

                                </Button>
                            </div>

                            <p className="text-center ">Not Register?<Link className="link text-[14px] font-[600] text-primary" to="/register"> Sign Up</Link></p>

                            <p className="text-center font-[500]">Or continue with social account</p>

                            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black"><FcGoogle className="text-[20px]" /> Login With Google</Button>
                        </form>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Login;