import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import AccountSideBar from "../../components/AccountSidebar";
import { MyContext } from "../../App";
import { Collapse } from 'react-collapse';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { editData, postData } from "../../utils/api";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const MyAccount = () => {

    const context = useContext(MyContext);
    const history = useNavigate();
    const [loading, setIsLoading] = useState(false);
    const [loading2, setIsLoading2] = useState(false);
    const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false)
    const [userId, setUserId] = useState("");
     const [phone, setPhone] = useState('');
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: ''
    })

    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token === null) {
            history("/");
        }
    }, [context?.isLogin])

    useEffect(() => {
        if (context?.userAvatar?._id !== "" && context?.userData?._id !== undefined) {
            // userAvatar.push(context?.userAvatar?.avatar);
            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            })
            const ph = `${context?.userData?.mobile}`;
            setPhone(ph);

            setChangePassword({
                email: context?.userData?.email
            })
        }
    }, [context?.userData])

    const valideValue = Object.values(formFields).every(el => el)
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })


        setChangePassword(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert();
        setIsLoading(false);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter name")
            setIsLoading(false);
            return false;
        }

        if (formFields.email === "") {
            context.alertBox("error", "Please enter email id")
            setIsLoading(false);
            return false;
        }

        if (formFields.mobile === "") {
            context.alertBox("error", "Please enter mobile number")
            setIsLoading(false);
            return false;
        }
        editData(`/api/user/${userId}`, formFields, { withCredential: true }).then((res) => {
            console.log(res);

            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("success", res?.data?.message);
                localStorage.setItem("userEmail", formFields.email);
                setFormFields({
                    name: "",
                    email: "",
                    mobile: ""
                })
                // localStorage.setItem("accesstoken", res?.data.accesstoken)
                // localStorage.setItem("refreshtoken", res?.data.refreshtoken)
                context.setIsLogin(true);

                history("/")
            } else {
                context.alertBox("error", res?.data?.message);
                setIsLoading(false);
            }

        })
    }

    const valideValue2 = Object.values(formFields).every(el => el)

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        // alert();
        setIsLoading2(false);

        if (changePassword.oldPassword === "") {
            context.alertBox("error", "Please enter oldPassword")
            setIsLoading2(false);
            return false;
        }

        if (changePassword.newPassword === "") {
            context.alertBox("error", "Please enter newPassword")
            setIsLoading2(false);
            return false;
        }

        if (changePassword.confirmPassword === "") {
            context.alertBox("error", "Please enter confirmPassword")
            setIsLoading2(false);
            return false;
        }

        if (changePassword.confirmPassword !== changePassword.newPassword) {
            context.alertBox("error", "password and confirmPassword not match")
            setIsLoading2(false);
            return false;
        }
        postData(`/api/user/reset-password`, changePassword, { withCredential: true }).then((res) => {
            if (res?.error !== true) {
                setIsLoading2(false);
                context.alertBox("success", res?.message);
                // localStorage.setItem("accesstoken", res?.data.accesstoken)
                // localStorage.setItem("refreshtoken", res?.data.refreshtoken)

            } else {
                context.alertBox("error", res?.message);
                setIsLoading(false);
            }

        })
    }
    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>

                <div className="col2 w-[50%]">
                    <div className="card bg-white p-5 shadow-md rounded-md mb-5">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">My Profile</h2>
                            <Button className="!ml-auto" onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}>Change Password</Button>
                        </div>
                        <hr />

                        <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="flex items-center gap-5 flex-nowrap">
                                <div className="w-[50%]">
                                    <TextField label="Full Name" variant="outlined" size="small" className="w-full" name="name"
                                        onChange={onChangeInput} value={formFields.name} disabled={loading === true ? true : false} />
                                </div>

                                <div className="w-[50%]">
                                    <TextField label="Email" variant="outlined" size="small" className="w-full" name="email" type="email"
                                        onChange={onChangeInput} value={formFields.email} disabled={true} />
                                </div>
                            </div>


                            <div className="flex items-center gap-5 mt-4 flex-nowrap">
                                <div className="w-[50%]">
                                    <PhoneInput
                                        defaultCountry="in"
                                        value={phone}
                                        disabled={loading === true ? true : false}
                                        onChange={(phone) => {
                                            setPhone(phone);
                                            setFormFields({
                                                mobile: phone
                                            })
                                        }}
                                    />
                                </div>

                            </div>

                            <br />
                            <div className="flex items-center gap-4">
                                <Button className="btn-org btn-lg w-[150px] btn-border" disabled={!valideValue} type="submit">
                                    {
                                        loading === true ? <CircularProgress color="inherit" /> : 'Update Profile'
                                    }
                                </Button>
                                {/* <Button className="btn-org btn-lg w-[100px] btn-border">Cancel</Button> */}
                            </div>
                        </form>
                    </div>

                    <Collapse isOpened={isChangePasswordFormShow}>
                        <div className="card bg-white p-5 shadow-md rounded-md ">
                            <div className="flex items-center pb-3">
                                <h2 className="pb-0">Change Password</h2>
                            </div>
                            <hr />

                            <form className="mt-8" onSubmit={handleSubmitChangePassword}>
                                <div className="flex items-center gap-5 flex-nowrap">
                                    <div className="w-[50%]">
                                        <TextField label="Old Password" variant="outlined" size="small" className="w-full" name="oldPassword"
                                            onChange={onChangeInput} value={changePassword.oldPassword} disabled={loading2 === true ? true : false} />
                                    </div>

                                    <div className="w-[50%]">
                                        <TextField label="New Password" variant="outlined" size="small" className="w-full" name="newPassword" type="text"
                                            onChange={onChangeInput} value={changePassword.newPassword} />
                                    </div>
                                </div>


                                <div className="flex items-center gap-5 mt-4 flex-nowrap">
                                    <div className="w-[50%]">
                                        <TextField label="Confirm Password" variant="outlined" size="small" className="w-full" name="confirmPassword"
                                            onChange={onChangeInput} value={changePassword.confirmPassword} />
                                    </div>

                                </div>

                                <br />
                                <div className="flex items-center gap-4">
                                    <Button className="btn-org btn-lg w-[200px] btn-border" disabled={!valideValue2} type="submit">
                                        {
                                            loading2 === true ? <CircularProgress color="inherit" /> : 'Change Password'
                                        }
                                    </Button>
                                    {/* <Button className="btn-org btn-lg w-[100px] btn-border">Cancel</Button> */}
                                </div>
                            </form>
                        </div>
                    </Collapse>


                </div>



            </div>
        </section>
    );
}

export default MyAccount;