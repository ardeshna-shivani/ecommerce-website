import React from "react";
import AccountSideBar from "../../components/AccountSidebar";
import Radio from '@mui/material/Radio';
import { useContext } from "react";
import { MyContext } from "../../App";
import { useState } from "react";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { deleteData, fetchDataFromAPi, postData } from "../../utils/api";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Address = () => {
    const context = useContext(MyContext);
    const [address, setAddress] = useState([]);
    const [status, setStatus] = useState(false);
    const [phone, setPhone] = useState('');
    const [isOpenModel,setIsOpenModel] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };

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
    // const { onClose, selectedValue, open } = props;
    useEffect(() => {
        if(context?.userData?._id === undefined){
        setFormFields((prevState) => ({
            ...prevState,
            userId: context?.userData?._id
        }))
    }
    }, [context?.userData]);

    useEffect(() => {
        if (context?.userAvatar?._id !== "" && context?.userData?._id !== undefined) {
            // userAvatar.push(context?.userAvatar?.avatar);

            fetchDataFromAPi(`/api/address/get?userId= ${context?.userData?._id}`).then((res) => {
                setAddress(res.data);
            })
            
        }
    }, [context?.userData])

    const handleClose = () => {
        setIsOpenModel(false);
    };

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
                    
                    setIsOpenModel(false);
                    fetchDataFromAPi(`/api/address/get?userId= ${context?.userData?._id}`).then((res) => {
                        context?.setAddress(res.data);
                    })
                    
                } else {
                    context.alertBox("error", res?.message);
                    setIsLoading(false);
                }
    
            })
        }

        const onChangeInput = (e) => {
            const { name, value } = e.target;
            setFormFields(() => {
                return {
                    ...formFields,
                    [name]: value
                }
            })
        }


        const removeAddress = (id) => {
            deleteData(`/api/address/${id}`).then((res) => {
                fetchDataFromAPi(`/api/address/get?userId= ${context?.userData?._id}`).then((res) => {
                    context?.setAddress(res.data);
                })
                
            })
        }
    return (
        <>
            <section className="py-10 w-full">
                <div className="container flex gap-5">
                    <div className="col1 w-[20%]">
                        <AccountSideBar />
                    </div>

                    <div className="col2 w-[50%]">
                        <div className="card bg-white p-5 shadow-md rounded-md mb-5">
                            <div className="flex items-center pb-3">
                                <h2 className="pb-0">Address</h2>
                            </div>
                            <hr />

                            <div className="flex items-center justify-center p-5 border rounded-md
                                border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] cursor-pointer 
                                hover:bg-[#e7f3f9]" onClick={() => setIsOpenModel(true)}>
                                <span className='text-[14px] font-[500]'>Add Address</span>
                            </div>

                            <div className="flex gap-2 flex-col mt-4 border border-[rgba(0,0,0,0.2)]">
                                {address?.length > 0 && address?.map((address, index) => {
                                    return (
                                        <>
                                            <div className="addressBox bg-[#f1f1f1] p-3 rounded-md cursor-pointer w-full flex items-center justify-center group">
                                                <label className="mr-auto">
                                                <Radio {...label} name='address'  onChange={handleChange} value={address?._id}

                                                    checked={selectedValue === (address?._id)
                                                    } 
                                                     />

<span className='text-[12px]'>{(address?.address_line1 + " " +
                                                    address?.city + " " +
                                                    address?.country + " " +
                                                    address?.state + " " +
                                                    address?.pincode + " ")}</span>
                                                     </label>
                                                

                                                    <span className="hidden group-hover:flex items-center w-[30px] h-[30px] rounded-full bg-gray text-white justify-center z-50 "
                                                    onClick={() => removeAddress(address?._id)}>
                                                        <FaRegTrashAlt /></span>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            <Dialog open={isOpenModel}>
                <DialogTitle>Add Address</DialogTitle>
                <form className="p-8 py-3 pb-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[100%]">
                            <TextField className="w-full" label="Address Line 1" variant="outlined" size="small" 
                            onChange={onChangeInput} name="address_line1" value={formFields.address_line1}/>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                            <TextField className="w-full" label="City" variant="outlined" size="small" 
                            onChange={onChangeInput} name="city" value={formFields.city} />
                        </div>
                        <div className="col w-[50%]">
                            <TextField className="w-full" label="State" variant="outlined" size="small" 
                            onChange={onChangeInput} name="state" value={formFields.state} />
                        </div>

                    </div>


                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                            <TextField className="w-full" label="Pincode" variant="outlined" size="small"
                             onChange={onChangeInput} name="pincode" value={formFields.pinCode}  />
                        </div>
                        <div className="col w-[50%]">
                            <TextField className="w-full" label="Country" variant="outlined" size="small" 
                            onChange={onChangeInput} name="country" value={formFields.country} />
                        </div>

                    </div>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                        <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                // disabled={loading === true ? true : false}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields({
                                        mobile: phone
                                    })
                                }}
                            />
                        </div>
                        <div className="col w-[50%]">
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

                    <div className="flex items-center gap-5">
                    <Button className="btn-org btn-lg mb-5 w-full flex gap-2 items-center " type="submit">Save</Button>
                    <Button className="btn-org btn-border btn-lg mb-5 w-full flex gap-2 items-center " onClick={handleClose}>Cancel</Button>
                    </div>
                </form>
            </Dialog>
        </>
    );
}
export default Address;