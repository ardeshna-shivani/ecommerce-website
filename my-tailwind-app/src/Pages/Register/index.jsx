import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';

const Register  = () => {

    const [loading,setIsLoading] = useState(false);
    const [isShowPassword,setIsShowPassword] = useState(false);
    const [formFields,setFormFields] = useState({
        name:"",
        email:"",
        password:""
    })

    const context = useContext(MyContext)
    const history = useNavigate();

    const onChangeInput = (e) => {
            const {name, value} = e.target;
            setFormFields(()=>{
                return{
                    ...formFields,
                    [name] : value
                }
            })
    }

    const valideValue = Object.values(formFields).every(el => el)
   const handleSubmit =(e) => {
        e.preventDefault();
        // alert();
        setIsLoading(true);
        
        if(formFields.name === ""){
            context.alertBox("error","Please enter full name")
            setIsLoading(false); 
            return false;
        }

        if(formFields.email === ""){
            context.alertBox("error","Please enter email id")
            setIsLoading(false); 
            return false;
        }

        if(formFields.password === ""){
            context.alertBox("error","Please enter password")
            setIsLoading(false); 
            return false;
        }
        postData("/api/user/register",formFields).then((res) => {
             console.log(res);

             if(res?.error!== true){
                setIsLoading(false);
                context.alertBox("success",res?.message);
                localStorage.setItem("userEmail",formFields.email);
                setFormFields({
                    name: "",
                    email: "",
                    password: ""
                })
                
                history("/verify")
             }else{
                context.alertBox("error",res?.message);
                setIsLoading(false);
             }
            
        })
   }

    console.log(formFields);
    return (
        <>
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[18px] text-black">Register With a New Account</h3>
                    <form className="w-full mt-5" onSubmit={handleSubmit}>
                    <div className="form-group w-full mb-5 ">
                        <TextField type ="name" id="name" label="Full Name *" variant="outlined" className="w-full" name="name" onChange={onChangeInput} value={formFields.name} disabled={loading === true? true: false}/>
                        </div>
                        <div className="form-group w-full mb-5 ">
                        <TextField type ="email" id="email" label="Email Id *" variant="outlined" className="w-full" name="email" onChange={onChangeInput} value={formFields.email} disabled={loading === true? true: false}/>
                        </div>

                        <div className="form-group w-full mb-5 relative">
                        <TextField  type ={isShowPassword === false ? 'password' : 'text'} id="password" label="Password *" variant="outlined" className="w-full" name="password" 
                        onChange={onChangeInput} value={formFields.password} disabled={loading === true? true: false}/>
                        <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                        onClick={()=> setIsShowPassword(!isShowPassword)}>
                            
                            {
                                isShowPassword === true ? <IoMdEye className="text-[20px] opacity-75"/> : <IoMdEyeOff className="text-[20px] opacity-75"/>
                            }
                            </Button>
                        </div>

                        <div className="flex items-center w-full mt-3 mb-3">
                                <Button className="btn-org btn-lg w-full flex gap-3" type="submit" disabled ={!valideValue}>
                                   {
                                    loading === true ? <CircularProgress color="inherit" />: 'Register'
                                   }
                                   
                                   </Button>
                        </div>

                        <p className="text-center ">Already have an Account?<Link className="link text-[14px] font-[600] text-primary" to="/login"> Login</Link></p>

                        <p className="text-center font-[500]">Or continue with social account</p>

                        <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black"><FcGoogle className="text-[20px]"/> Login With Google</Button>
                    </form>
                </div>
            </div>

        </section>
        </>
    );
}

export default Register;