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
import Chip from '@mui/material/Chip';


const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
    // {id:"id",label: "Id", minWidth: 40},
    { id: "image", label: "Category Image", minWidth: 250 },
    { id: "catName", label: "Category Name", minWidth: 250 },
    { id: "subCatName", label: "Sub Category Name", minWidth: 400 },
    { id: "action", label: "ACTION", minWidth: 100 },]

const SubCategoryList = () => {
const context = useContext(MyContext);
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
                    <h2 className='text-[20px] font-[600]'>Sub Category List
                        <span className="font-[400] text-[14px]"> (Material Ui Table)</span></h2>

                        <div className="col w-[30%] ml-auto flex items-center gap-3 justify-end">
                    <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
                    <Button className="btn-blue !text-white btn-sm" onClick={() => context.setIsOpenFullScreenPanel({
                        open: true,
                        model: 'Add New Sub Category'
                    })}>Add New Sub Category</Button>
            </div>
                </div>
            {/* <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between">
                <h1 className="font-[700] text-[20px] text-gray-800">Products</h1>
                <Button className="btn-blue btn-sm ml-auto"><IoMdAdd className="text-white text-[20px]" />Add Product</Button>

            </div> */}

            

            <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
    
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={60}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                    width={column.minWidth }
                                        key={column.id}
                                        align={column.align}
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
                                <TableCell>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell width={100}>
                                    <div className='flex items-center gap-4 w-[80px]'>
                                        <div className="img w-full rounded-md overflow-hidden group">

                                            <Link to="/product/45745">
                                                <img src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                                                    className='w-full group-hover:scale-105 transition-all' />
                                            </Link>
                                        </div>
                                       
                                    </div>
                                </TableCell>

                                <TableCell>
                                <Chip label="fashion" />
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-3">
                                    <Chip label="Men" color="primary" />
                                    <Chip label="WoMen" color="primary" />
                                    <Chip label="Kids" color="primary"/>
                                    </div>
                                </TableCell>

                                <TableCell width={100}>
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                        </Button>
                                        {/* </Tooltip> */}

                                        {/* <Tooltip title="View Product Details" placement="top-start"> */}
                                        {/* <Button className='!w-[30px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba[0,0,0,0.1] !rounded-full hover:!bg-[#f1f1f1]'>
                                            <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                        </Button> */}
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
export default SubCategoryList;