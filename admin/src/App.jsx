import React, { createContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Products from './Pages/Products';
import AddProduct from './Pages/Products/addProduct';

export const MyContext = createContext();


import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import Slide from '@mui/material/Slide';
import HomeSliderBanners from './Pages/HomeSliderBanners';
import AddHomeSlide from './Pages/HomeSliderBanners/addHomeSlide';
import Category from './Pages/Category';
import AddCategory from './Pages/Category/addCategory';
import SubCategoryList from './Pages/Category/subCatList';
import AddSubCategory from './Pages/Category/addSubCategory';
import Users from './Pages/Users';
import toast, { Toaster } from 'react-hot-toast';
import VerifyAccount from './Pages/verifyAccount';
import { useEffect } from 'react';
import { fetchDataFromAPi } from '../utils/api';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/profile';
import AddAddress from './Pages/Address/AddAddress.jsx';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: null,
  });

  const handleCloseFullScreenPanel = () => {

  }


  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <>
        <section className='main'>
          <Header />
          <div className="containentMain flex">
            <div className="sidebarWrapper w-[15%]">
              <Sidebar />
            </div>
            <div className="contentRight py-4 px-5 w-[82%]">
              <Dashboard />
            </div>
          </div>

        </section>
      </>
    },


    {
      path: "/verify-account",
      exact: true,
      element: <>
        <VerifyAccount />
      </>
    },



    {
      path: "/login",
      exact: true,
      element: <>
        <Login />
      </>
    },


    {
      path: "/sign-up",
      exact: true,
      element: <>
        <SignUp />
      </>
    },

    {
      path: "/forgot-password",
      exact: true,
      element: <>
        <ForgotPassword />
      </>
    },

    {
      path: "/products",
      exact: true,
      element: <>
        <section className='main'>
          <Header />
          <div className="containentMain flex">
            <div className="sidebarWrapper w-[15%]">
              <Sidebar />
            </div>
            <div className="contentRight py-4 px-5 w-[82%]">
              <Products />
            </div>
          </div>

        </section>
      </>
    },



    {
      path: "/profile",
      exact: true,
      element: <>
        <section className='main'>
          <Header />
          <div className="containentMain flex">
            <div className="sidebarWrapper w-[15%]">
              <Sidebar />
            </div>
            <div className="contentRight py-4 px-5 w-[82%]">
              <Profile />
            </div>
          </div>

        </section>
      </>
    },


    {
      path: "/homeSlider/list",
      exact: true,
      element: <>
        <section className='main'>
          <Header />
          <div className="containentMain flex">
            <div className="sidebarWrapper w-[15%]">
              <Sidebar />
            </div>
            <div className="contentRight py-4 px-5 w-[82%]">
              <HomeSliderBanners />
            </div>
          </div>

        </section>
      </>
    },


    {
      path: "/category/list",
      exact: true,
      element: <>
        <section className='main'>
          <Header />
          <div className="containentMain flex">
            <div className="sidebarWrapper w-[15%]">
              <Sidebar />
            </div>
            <div className="contentRight py-4 px-5 w-[82%]">
              <Category />
            </div>
          </div>

        </section>
      </>
    },

    {
      path: "/subCategory/list",
      exact: true,
      element: <>
        <section className='main'>
          <Header />
          <div className="containentMain flex">
            <div className="sidebarWrapper w-[15%]">
              <Sidebar />
            </div>
            <div className="contentRight py-4 px-5 w-[82%]">
              <SubCategoryList />
            </div>
          </div>

        </section>
      </>
    },


    {
      path: "/users",
      exact: true,
      element: <>
        <section className='main'>
          <Header />
          <div className="containentMain flex">
            <div className="sidebarWrapper w-[15%]">
              <Sidebar />
            </div>
            <div className="contentRight py-4 px-5 w-[82%]">
              <Users />
            </div>
          </div>

        </section>
      </>
    },



  ])


  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromAPi(`/api/user/user-details`).then((res) => {
        console.log(res);
        setUserData(res.data);
        // console.log(res?.response?.data?.error);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "you have not login") {
            localStorage.removeItem("accesstoken", res?.data.accesstoken)
            localStorage.removeItem("refreshtoken", res?.data.refreshtoken)
            alertBox('error', "your session is closed please login Again");
            window.location.href = '/login'
            setIsLogin(false);
          }
        }

      })
    } else {
      setIsLogin(false);
    }
  }, [isLogin])

  const alertBox = (status, message) => {
    // alert(status);
    console.log(status);

    if (status === "success") {
      toast.success(message)
    }

    if (status === "error") {
      toast.error(message)
    }
  }

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    alertBox,
    setUserData,
    userData,
    setAddress,
    address

  }
  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() => setIsOpenFullScreenPanel({
            open: false
          })}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsOpenFullScreenPanel({
                  open: false
                })}
                aria-label="close"
              >
                < IoMdClose className='text-gray-800' />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

                <span className='text-gray-800'>{isOpenFullScreenPanel?.model}</span>
              </Typography>

            </Toolbar>
          </AppBar>
          {
            isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />
          }

          {
            isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />
          }

          {
            isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />
          }

          {
            isOpenFullScreenPanel?.model === "Add New Sub Category" && <AddSubCategory />
          }

          {
            isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />
          }
        </Dialog>
        <Toaster position="top-right" reverseOrder={false} />
      </MyContext.Provider>

    </>
  )
}

export default App
