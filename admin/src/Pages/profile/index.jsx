import react from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { editData, fetchDataFromAPi, postData, uploadImage } from "../../../utils/api";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Collapse } from 'react-collapse';
import Radio from '@mui/material/Radio';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Profile = () => {
    const [previews, setPreviews] = useState([]);
    const [isUploading, setUploading] = useState(false);
    const context = useContext(MyContext);
    const history = useNavigate();
    const [loading, setIsLoading] = useState(false);
    const [loading2, setIsLoading2] = useState(false);
    const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false)
    const [userId, setUserId] = useState("");
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // if(event.target.checked === true){
    //     editData(`/api/address/selectAddress/${event.target.value}`,{selected: true})
    // }
    // else{
    //     editData(`/api/address/selectAddress/${event.target.value}`,{selected: false})
    // }
    
  };
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
            history("/login");
        }
    }, [context?.isLogin])

    useEffect(() => {
        if (context?.userAvatar?._id !== "" && context?.userData?._id !== undefined) {
            // userAvatar.push(context?.userAvatar?.avatar);

            fetchDataFromAPi(`/api/address/get?userId= ${context?.userData?._id}`).then((res) => {
                setAddress(res.data);
                context?.setAddress(res.data);
            })
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


    let img_arr = []
    let uniqueArray = []
    let selectedImages = []

    const formdata = new FormData();

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);
            setUploading(true);

            const files = e.target.files;
            const file = files[0]; // assuming only one avatar image

            if (
                file &&
                (file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/png" ||
                    file.type === "image/webp")
            ) {
                const formdata = new FormData();
                formdata.append("avatar", file);

                const res = await uploadImage("/api/user/user-avatar", formdata);
                setUploading(false);

                if (res?.data?.avatar) {
                    setPreviews([res.data.avatar]);
                } else {
                    context.alertBox("error", "Failed to upload image");
                }

            } else {
                context.alertBox("error", "Please select a valid JPG, PNG, or WEBP image file");
                setUploading(false);
            }
        } catch (error) {
            setUploading(false);
            console.log(error);
            context.alertBox("error", "Upload failed. Please try again.");
        }
    };


    return (
        <>
            <div className="card w-[65%] my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5">
                {/* <h2 className='text-[20px] font-[600]'>Users Profile</h2> */}

                <div className="flex items-center justify-between">
                    <h2 className='text-[18px] font-[600]'>Users Profile</h2>

                    <Button className="!ml-auto" onClick={() => setIsChangePasswordFormShow
                        (!isChangePasswordFormShow)}>Change Password</Button>
                </div>
                <br />
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group 
                                        flex items-center justify-center bg-gray-200">
                    {
                        isUploading === true ? <CircularProgress color="inherit" /> :
                            <>
                                {
                                    previews?.length !== 0 ? previews.map((img, index) => {
                                        return (
                                            <img src={img} key={index}
                                                className="w-full h-full object-cover" />)
                                    }) :
                                        <img src={"/user.png"} className="w-full h-full object-cover" />
                                }
                            </>

                    }

                    {/* {
                                                previews?.length === 0 && 
                                                
                                            } */}


                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]
                                            flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                        <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                        <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 " accept="image/*"
                            onChange={(e) =>
                                onChangeFile(e, "/api/user/user-avater")
                            } name="avatar"
                        />
                    </div>
                </div>


                <form className="form mt-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 flex-nowrap">
                        <div className="w-[50%]">
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'  name="name" placeholder='name'
                                onChange={onChangeInput} value={formFields.name} disabled={loading === true ? true : false} />

                        </div>

                        <div className="w-[50%]">
                            <input type="email" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'  name="email" placeholder='email'
                                onChange={onChangeInput} value={formFields.email} disabled={true}
                            />

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

                            {/* <input type="Number" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'  name="mobile" placeholder='mobile'
                    onChange={onChangeInput} value={formFields.mobile} disabled={loading === true ? true : false}
                            /> */}

                        </div>

                    </div>
                    <br />
                    <div className="flex items-center justify-center p-5 border rounded-md
                                border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] cursor-pointer 
                                hover:bg-[#e7f3f9]" onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: "Add New Address" })}>
                        <span className='text-[14px] font-[500]'>Add Address</span>
                    </div>

                    <div className="flex gap-2 flex-col mt-4 border border-[rgba(0,0,0,0.2)]">
                        {context?.address?.length > 0 && context?.address?.map((address, index) => {
                            return (
                                <>
                                    <label className="addressBox bg-[#f1f1f1] p-3 rounded-md cursor-pointer w-full flex items-center justify-center">
                                        <Radio {...label} name='address' onChange={handleChange} value={address?._id} 

                                        checked={selectedValue === (address?._id)
                                        } />
                                        <span className='text-[12px]'>{(address?.address_line1 + " " + 
                                            address?.city + " " + 
                                            address?.country + " " + 
                                            address?.state + " " + 
                                           address?.pincode + " " )}</span>
                                    </label>
                                </>
                            )
                        })}
                    </div>
                    {/* <label className="addressBox bg-[#f1f1f1] p-3 rounded-md cursor-pointer w-full flex items-center justify-center">
                        <Checkbox {...label} />
                    </label> */}
                    <br />
                    <div className="flex items-center gap-4">
                        <Button className="btn-lg btn-blue w-full btn-border" disabled={!valideValue} type="submit">
                            {
                                loading === true ? <CircularProgress color="inherit" /> : 'Update Profile'
                            }
                        </Button>
                        {/* <Button className="btn-org btn-lg w-[100px] btn-border">Cancel</Button> */}
                    </div>
                </form>

                <br />

            </div>


            <Collapse isOpened={isChangePasswordFormShow}>
                <div className="card w-[65%] bg-white p-5 shadow-md rounded-md ">
                    <div className="flex items-center pb-3">
                        <h2 className="pb-0 text-[18px] font-[600]">Change Password</h2>
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
                            <Button className="btn-blue btn-lg w-[100%] btn-border" disabled={!valideValue2} type="submit">
                                {
                                    loading2 === true ? <CircularProgress color="inherit" /> : 'Change Password'
                                }
                            </Button>
                            {/* <Button className="btn-org btn-lg w-[100px] btn-border">Cancel</Button> */}
                        </div>
                    </form>
                </div>
            </Collapse>
        </>
    );
}
export default Profile;