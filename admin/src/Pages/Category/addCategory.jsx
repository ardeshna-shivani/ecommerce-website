import React from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { useState } from "react";
import { deleteImages, postData } from "../../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';

const AddCategory = () => {
    const context = useContext(MyContext);
    const [previews, setPreviews] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        images: [],
        parentCatName: "",
        parentId: ""
    })

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const setPreviewsFun = (previewsArr) => {
        setPreviews(previewsArr)
        formFields.images = previewsArr
    }

    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/category/?img=${image}`).then((res) => {
            imageArr.splice(index, 1);
            setPreviews([]);
            setTimeout(() => {
                setFormFields(() => ({
                    ...previews,
                    images: imageArr
                }))

            }, 100)

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter category name");
            setIsLoading(false);
            return false;
        }

        if (previews?.length === 0) {
            context.alertBox("error", "Please select category image");
            setIsLoading(false);
            return false;
        }

        postData("/api/category/create", formFields).then((res) => {
            console.log(res);
            setIsLoading(false);
            setTimeout(() => {
                context.setIsOpenFullScreenPanel({
                    open: false,
                })
            },500)
        })
    }
    return (
        <section className='p-5 bg-gray-50'>
            <form className='form p-8 py-3' onSubmit={handleSubmit}>
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">

                    <div className="grid grid-cols-1 mb-3">
                        <div className="col w-[25%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Category Name</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' onChange={onChangeInput} name="name" value={formFields.name} />
                        </div>
                    </div>

                    <br />
                    <h3 className='text-[18px] font-[500] mb-1 text-black'>Category Image</h3>
                    <br />

                    <div className="grid grid-cols-7 gap-4 ">
                        {
                            previews?.length !== 0 && previews?.map((image, index) => {
                                return (
                                    <div className="uploadBoxWrapper relative" key={index}>
                                        <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] 
                            -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}>
                                            <IoMdClose className='text-white text-[17px]' /></span>
                                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] 
                                h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center
                                flex-col relative">
                                            {/* <LazyLoadImage
                                                className='w-full h-full object-cover'
                                                effect="blur"
                                                wrapperProps={{
                                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                                    style: { transitionDelay: "1s" },
                                                }}
                                                alt={"image"}
                                                src={image} // use normal <img> attributes as props
                                            /> */}

                                            <img src={image} className="w-100" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="uploadBoxWrapper relative" >
                            <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] 
                            -right-[5px] flex items-center justify-center z-50 cursor-pointer'>
                                <IoMdClose className='text-white text-[17px]' /></span>

                            {/* {
                                previews?.length !== 0 && previews?.map((image, index) => {
                                    return (
                                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] 
                                h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center
                                flex-col relative">
                                            <LazyLoadImage
                                                className='w-full h-full object-cover'
                                                effect="blur"
                                                wrapperProps={{
                                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                                    style: { transitionDelay: "1s" },
                                                }}
                                                alt={"image"}
                                                src={image} // use normal <img> attributes as props
                                            />
                                        </div>
                                    )
                                })
                            } */}


                        </div>
                        <UploadBox multiple={true} name="images" url="/api/category/uploadImages" setPreviews={setPreviews} />
                    </div>
                </div>
                <br />

                <br />
                <div className="w-[250px]">
                    <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
                        {
                            loading === true ? <CircularProgress color="inherit" /> : <>
                                <FaCloudUploadAlt className='text-[25px] text-white ' />Publish And View
                            </>
                        }
                    </Button>
                </div>
            </form>
        </section>
    );
}
export default AddCategory;