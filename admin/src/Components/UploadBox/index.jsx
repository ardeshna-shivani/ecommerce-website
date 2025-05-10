import React from "react";
import { useState } from "react";
import { FaRegImages } from "react-icons/fa6";
import { uploadImage } from "../../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';

const UploadBox = (props) => {
    const [previews,setPreviews] = useState([]);
    const [isUploading, setUploading] = useState(false);

        let selectedImages = []
    
        const formdata = new FormData();
    
        const onChangeFile = async (e, apiEndPoint) => {
            try {
                setPreviews([]);
                const files = e.target.files;
                setUploading(true);
    
                
                const file = files[i]; // assuming only one avatar image
                selectedImages.push(file);
                formdata.append(props?.name,file);
                if (
                    file &&
                    (file.type === "image/jpeg" ||
                        file.type === "image/jpg" ||
                        file.type === "image/png" ||
                        file.type === "image/webp")
                ) {
                    const formdata = new FormData();
                    formdata.append("avatar", file);
    
                    const res = await uploadImage(apiEndPoint, formdata);
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

                uploadImage(apiEndPoint,formdata).then((res) => {
                    setUploading(false)
                    // props.setPreviews(res?.data?.images)
                    props.setPreviewsFun(res?.data?.images);
                    })
                
            } catch (error) {
                setUploading(false);
                console.log(error);
                context.alertBox("error", "Upload failed. Please try again.");
            }
        };
    return(
        <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] 
        h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center
        flex-col relative">
            {
                uploading === true ? <CircularProgress/> : 
                <>
                <FaRegImages className="text-[40px] opacity-35 pointer-events-none"/>
            <h4 className="text-[14px] pointer-events-none">Image Upload</h4>

            <input type="file" className="absolute top-0 left-0 h-full w-full z-50 opacity-0" 
            multiple={props.multiple !== undefined ? props.multiple: false} accept="images/*" onChange={(e) => 
                onChangeFile(e,props?.url)
            }
            name={props.name}/>
                </>
            }
            
            
        </div>
    );
}
export default UploadBox;