import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const AddSubCategory = () => {

    const [productCat, setProductCat] = useState('');
    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
    };

    return (
        <section className='p-5 bg-gray-50'>
            <form className='form p-8 py-3'>
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">

                <div className="grid grid-cols-4 mb-3 gap-5">
                    <div className="col">
                        <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Category</h3>
                        <Select
                            labelId="demo-simple-select-label"
                            id="productCatDrop"
                            className='w-full'
                            size='small'
                            value={productCat}
                            label="Sub Category"
                            onChange={handleChangeProductCat}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={'S'}>S</MenuItem>
                            <MenuItem value={'M'}>M</MenuItem>
                            <MenuItem value={'L'}>L</MenuItem>
                        </Select>
                    </div>

                    <div className="col">
                        <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub Category Name</h3>
                        <textarea type="text" className='w-full h-[100px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                    focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' />
                    </div>
                
                </div>

                <br />
                
                </div>
                <div className="w-[250px]">
                <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
                    <FaCloudUploadAlt className='text-[25px] text-white ' />Publish And View</Button>
                    </div>
            </form>
        </section>
    );
}
export default AddSubCategory;