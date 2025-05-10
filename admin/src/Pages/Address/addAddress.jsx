import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useState } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { fetchDataFromAPi, postData } from "../../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useEffect } from "react";

const AddAddress = () => {
    const context = useContext(MyContext);
    const [phone, setPhone] = useState('');
    const [loading, setIsLoading] = useState(false);

    const [status, setStatus] = useState(false);
    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        mobile: '',
        status: '',
        userId: '',
        selected: false

    })

    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            userId: context?.userData?._id
        }))
    }, [context?.userData]);



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

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert();
        setIsLoading(false);

        if (formFields.address_line1 === "") {
            context.alertBox("error", "Please enter address line 1")
            setIsLoading(false);
            return false;
        }

        if (formFields.city === "") {
            context.alertBox("error", "Please enter your city name")
            setIsLoading(false);
            return false;
        }

        if (formFields.state === "") {
            context.alertBox("error", "Please enter state")
            setIsLoading(false);
            return false;
        }

        if (formFields.pinCode === "") {
            context.alertBox("error", "Please enter pincode")
            setIsLoading(false);
            return false;
        }

        if (formFields.country === "") {
            context.alertBox("error", "Please enter your country name")
            setIsLoading(false);
            return false;
        }

        if (phone === "") {
            context.alertBox("error", "Please enter 10 digit phone number.")
            setIsLoading(false);
            return false;
        }

        if (formFields.state === "") {
            context.alertBox("error", "Please enter state")
            setIsLoading(false);
            return false;
        }
        postData(`/api/address/add`, formFields, { withCredential: true }).then((res) => {
            console.log(res);

            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("success", res?.message);
                context?.setIsOpenFullScreenpanel({
                    open: false
                })
                fetchDataFromAPi(`/api/address/get?userId= ${context?.userData?._id}`).then((res) => {
                    context?.setAddress(res.data);
                })
                
            } else {
                context.alertBox("error", res?.message);
                setIsLoading(false);
            }

        })
    }

    return (
        <section className='p-5 bg-gray-50'>
            <form className='form p-8 py-3' onSubmit={handleSubmit}>
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">

                    <div className="grid grid-cols-2 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Address Line 1</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'  onChange={onChangeInput} name="address_line1" value={formFields.address_line1} />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>City</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' onChange={onChangeInput} name="city" value={formFields.city} />
                        </div>
                    </div>



                    <div className="grid grid-cols-3 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>State</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' onChange={onChangeInput} name="state" value={formFields.state} />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>PinCode</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' onChange={onChangeInput} name="pincode" value={formFields.pinCode} />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Country</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' onChange={onChangeInput} name="country" value={formFields.country} />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Mobile</h3>
                            <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                disabled={loading === true ? true : false}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields((prevState) => ({
                                        ...prevState,
                                        mobile: phone
                                    }))

                                }}
                            />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Status</h3>
                            <Select
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                size="small"
                                className="w-full"
                            >

                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <br />

                </div>
                <br />

                <br />
                <div className="w-[250px]">
                    <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
                        <FaCloudUploadAlt className='text-[25px] text-white ' />Publish And View</Button>
                </div>
            </form>
        </section>
    );
}
export default AddAddress;