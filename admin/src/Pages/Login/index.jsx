import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { LoadingButton } from "@mui/lab";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { MyContext } from "../../App.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../../utils/api.js";

const Login = () => {
    const [loadingGoogle, setLoadingGoogle] = useState(true);
    const [loadingFacebook, setLoadingFacebook] = useState(true);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const context = useContext(MyContext);
    const [loading, setIsLoading] = useState(false);

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
                            history("/verify-account")
                        }else{
                            context.alertBox("error",res.message)
                        }
                        
                    })
                    history("/verify-account");
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
        postData("/api/user/login", formFields, { withCredential: true }).then((res) => {
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

    function handleClickGoogle() {
        setLoadingGoogle(true);
    }

    function handleClickFacebook() {
        setLoadingFacebook(true);
    }

    return (
        <section className="bg-white w-full">
            <header className="w-full px-4 py-3 flex items-center justify-between z-50 fixed top-0 left-0">
                <Link to="/">
                    <img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" className="w-[200px]" />
                </Link>

                <div className="flex items-center gap-0">
                    <NavLink to='/login' exact={true} activeClassName="isActive">
                        <Button className="!rounded-full !text-black !px-5 flex gap-3 !text-[800]">
                            <CgLogIn className="text-[18px]" /> Login</Button></NavLink>

                    <NavLink to='/sign-up' exact={true} activeClassName="isActive">
                        <Button className="!rounded-full !text-black !px-5 flex gap-3 !text-[800]">
                            <FaRegUser className="text-[14px]" /> Sign Up</Button>
                    </NavLink>
                </div>
            </header>
            <img src="https://cdn.pixabay.com/photo/2017/01/16/16/34/background-1984504_1280.jpg" className="w-full fixed top-0 left-0 opacity-5" />


            <div className="loginBox card w-[600px] h-[auto] pb-20  mx-auto mt-20 relative z-50">
                <div className="text-center ">
                    <img src="https://ecme-react.themenate.net/img/logo/logo-light-streamline.png" className="m-auto text-[50px] h-[50px]" />
                </div>
                <h1 className="text-center text-[35px] font-[800] mt-4">Welcome back! <br /> Sign in with your credentials.</h1>

                <div className="flex items-center w-full mt-5 justify-center gap-4">
                    <LoadingButton
                        size="small"
                        onClick={handleClickGoogle}
                        endIcon={<FcGoogle />}
                        // loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                        className="!bg-none !text-[16px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)] !py-2"
                    >
                        Sign In With Google
                    </LoadingButton>


                    <LoadingButton
                        size="small"
                        onClick={handleClickFacebook}
                        endIcon={<BsFacebook />}
                        // loading={loadingFacebook}
                        loadingPosition="end"
                        variant="outlined"
                        className="!bg-none !text-[16px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)] !py-2"
                    >
                        Sign In With Facebook
                    </LoadingButton>
                </div>


                <br />

                <div className="w-full flex items-center justify-center gap-3">
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
                    <span className="text-[15px] font-[500]">Or, Signin with your email</span>
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
                </div>

                <br />
                <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                        <input type="email" className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
                             focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                            name="email" onChange={onChangeInput} value={formFields.email} disabled={loading === true ? true : false} />
                    </div>


                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">Password</h4>
                        <div className="relative w-full">
                            <input type={isPasswordShow === false ? 'password' : 'text'} className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
                             focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                                name="password" onChange={onChangeInput} value={formFields.password} disabled={loading === true ? true : false} />
                            <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px]
                             !min-w-[35px] !text-gray-600" onClick={() => setIsPasswordShow(!isPasswordShow)}>

                                {
                                    isPasswordShow === false ? (<FaRegEye className="text-[18px] " />) : (<FaRegEyeSlash className="text-[18px] " />)
                                }
                            </Button>
                        </div>
                    </div>


                    <div className="form-group mb-4 w-full flex items-center justify-between">
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

                        <a className="text-primary font-[700] text-[15px] hover:underline hover:text-gray-700" onClick={forgotPassword}>
                            Forgot Password?</a>
                    </div>


                    <Button className="btn-blue btn-lg w-full" type="submit" disabled={!valideValue}>
                        {
                            loading === true ? <CircularProgress color="inherit" /> : 'Sign In'
                        }
                    </Button>
                </form>
            </div>


        </section>
    );
}
export default Login;