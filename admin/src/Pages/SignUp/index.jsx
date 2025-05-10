import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import LoadingButton from "@mui/lab/LoadingButton";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../../utils/api";
import { MyContext } from "../../App";

const SignUp = () => {
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingFacebook, setLoadingFacebook] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: ""
    })
    const context = useContext(MyContext)
    const history = useNavigate();
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(formFields).every(el => el)

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert();
        setIsLoading(true);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter full name")
            setIsLoading(false);
            return false;
        }

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
        postData("/api/user/register", formFields).then((res) => {
            console.log(res);

            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("success", res?.message);
                localStorage.setItem("userEmail", formFields.email);
                setFormFields({
                    name: "",
                    email: "",
                    password: ""
                })

                history("/verify-account")
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
                    <NavLink
                        to="/login"
                        className={({ isActive }) => isActive ? 'isActive' : ''}
                    >
                        <Button className="!rounded-full !text-black !px-5 flex gap-3 !text-[800]">
                            <CgLogIn className="text-[18px]" /> Login</Button></NavLink>

                    <NavLink
                        to="/sign-up"
                        className={({ isActive }) => isActive ? 'isActive' : ''}
                    >
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
                <h1 className="text-center text-[35px] font-[800] mt-4">Join us today! Get special<br /> benefits and stay up-to-date.</h1>

                <div className="flex items-center w-full mt-5 justify-center gap-4">
                    <LoadingButton
                        size="small"
                        onClick={handleClickGoogle}
                        endIcon={<FcGoogle />}
                        loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                        sx={{
                            textTransform: "capitalize",
                            px: 2,
                            py: 1,
                            color: "rgba(0,0,0,0.7)",
                        }}
                    >
                        Sign In With Google
                    </LoadingButton>

                    <LoadingButton
                        size="small"
                        onClick={handleClickFacebook}
                        endIcon={<BsFacebook />}
                        loading={loadingFacebook ? true : undefined}
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
                        <h4 className="text-[14px] font-[500] mb-1">Full Name</h4>
                        <input type="text" className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
                             focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3" name="name"
                            onChange={onChangeInput} value={formFields.name} disabled={loading === true ? true : false} />
                    </div>

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

                        <Link to="/forgot-password" className="text-primary font-[700] text-[15px] hover:underline hover:text-gray-700">
                            Forgot Password?</Link>
                    </div>


                    <Button className="btn-blue btn-lg w-full" disabled={!valideValue} type="submit">
                        {
                            loading === true ? <CircularProgress color="inherit" /> : 'Sign Up'
                        }</Button>
                </form>
            </div>


        </section>
    );
}
export default SignUp;