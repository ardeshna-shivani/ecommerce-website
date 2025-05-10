import { Button } from "@mui/material";
import React, { useContext, useState } from 'react';
import { IoMdAdd } from "react-icons/io";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import ProgressBar from '../../Components/ProgressBar';
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from '../../App';


const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
    // {id:"id",label: "Id", minWidth: 40},
    { id: "product", label: "PRODUCT", minWidth: 150 },
    { id: "category", label: "CATEGORY", minWidth: 100 },
    { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
    { id: "price", label: "PRICE", minWidth: 100 },
    { id: "sales", label: "SALES", minWidth: 80 },
    { id: "action", label: "ACTION", minWidth: 120 },]

const Products = () => {
const {setIsOpenFullScreenPanel } = useContext(MyContext);
    const [categoryFilterVal, setCategoryFilterVal] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    

    const handleCatFilter = (event) => {
        setCategoryFilterVal(event.target.value);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    
    return (
        <>

<div className='flex items-center justify-between px-5 py-5 '>
                    <h2 className='text-[20px] font-[600]'>Products{""}
                        <span className="font-[400] text-[14px]"> (Material Ui Table)</span></h2>

                        <div className="col w-[25%] ml-auto flex items-center gap-3 justify-end">
                    <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
                    <Button className="btn-blue !text-white btn-sm" onClick={() => setIsOpenFullScreenPanel({
                        open: true,
                        model: 'Add Product'
                    })}>Add Product</Button>
            </div>
                </div>
            {/* <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between">
                <h1 className="font-[700] text-[20px] text-gray-800">Products</h1>
                <Button className="btn-blue btn-sm ml-auto"><IoMdAdd className="text-white text-[20px]" />Add Product</Button>

            </div> */}

            

            <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">

                <div className="flex items-center w-full px-5 justify-between">
                    <div className="col w-[20%]">
                        <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
                        <Select 
                        className="w-full" 
                        size="small"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={categoryFilterVal}
                        onChange={handleCatFilter}
                        label="Category">

                            <MenuItem value="">
                                <em>none</em>
                            </MenuItem>

                            <MenuItem value="">
                                <em>Men's</em>
                            </MenuItem>

                            <MenuItem value="">
                                <em>Women's</em>
                            </MenuItem>

                            <MenuItem value="">
                                <em>Kids</em>
                            </MenuItem>

                        </Select>
                    </div>
                    <div className="col w-[20%] ml-auto">
                            <SearchBox/>
                    </div>
                </div>
            

            <br />

                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size='small' />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow> */}

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[300px]'>
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">

                                            <Link to="/product/45745">
                                                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
                                                    className='w-full group-hover:scale-105 transition-all' />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">

                                            <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                <Link to="/product/45745">
                                                    Men Opaque Casual Shirt</Link></h3>
                                            <span className='text-[12px]'>CLAFOUTIS</span>

                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Shirts
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men's
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">₹1,650.00</span>
                                        <span className="price text-primary font-[600] text-[14px]">₹1,450.00</span>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                                    <ProgressBar value={40} type="success" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                        </Button>
                                        {/* </Tooltip> */}

                                        {/* <Tooltip title="View Product Details" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                        </Button>
                                        {/* </Tooltip> */}

                                        {/* <Tooltip title="Remove Product" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <GoTrash className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                        </Button>
                                        {/* </Tooltip> */}
                                    </div>
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[300px]'>
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">

                                            <Link to="/product/45745">
                                                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
                                                    className='w-full group-hover:scale-105 transition-all' />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">

                                            <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                <Link to="/product/45745">
                                                    Men Opaque Casual Shirt</Link></h3>
                                            <span className='text-[12px]'>CLAFOUTIS</span>

                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Shirts
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men's
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">₹1,650.00</span>
                                        <span className="price text-primary font-[600] text-[14px]">₹1,450.00</span>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                                    <ProgressBar value={40} type="success" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                        </Button>
                                        {/* </Tooltip> */}

                                        {/* <Tooltip title="View Product Details" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                        </Button>
                                        {/* </Tooltip> */}

                                        {/* <Tooltip title="Remove Product" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <GoTrash className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                        </Button>
                                        {/* </Tooltip> */}
                                    </div>
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[300px]'>
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">

                                            <Link to="/product/45745">
                                                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
                                                    className='w-full group-hover:scale-105 transition-all' />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">

                                            <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                <Link to="/product/45745">
                                                    Men Opaque Casual Shirt</Link></h3>
                                            <span className='text-[12px]'>CLAFOUTIS</span>

                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Shirts
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men's
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">₹1,650.00</span>
                                        <span className="price text-primary font-[600] text-[14px]">₹1,450.00</span>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                                    <ProgressBar value={40} type="success" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                        </Button>
                                        {/* </Tooltip> */}

                                        {/* <Tooltip title="View Product Details" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                        </Button>
                                        {/* </Tooltip> */}

                                        {/* <Tooltip title="Remove Product" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <GoTrash className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                        </Button>
                                        {/* </Tooltip> */}
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={20}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    );
}
export default Products;