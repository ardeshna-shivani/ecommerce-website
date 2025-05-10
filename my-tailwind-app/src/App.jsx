import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components';
import Home from './Pages/Home';
import ProductListing from './Pages/ProductListing';
import Footer from './components/Footer';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login/Login';
import Register from './Pages/Register';
import { createContext, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ProductZoom from './components/ProductZoom';
import { IoCloseSharp } from "react-icons/io5";
import Button from '@mui/material/Button';
import ProductDetailsComponent from './components/ProductDetails';
import CartPage from './Pages/Cart';
import Verify from './Pages/Verify';
// import Drawer from '@mui/material/Drawer';
// import CartPanel from './components/CartPanel';
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './Pages/ForgotPassword';
import CheckOut from './Pages/Checkout';
import MyAccount from './Pages/MyAccount';
import MyList from './Pages/MyList';
import Order from './Pages/Order';
import Address from './Pages/MyAccount/address';


// const alertBox = (msg,type) => {
//       if(type === "success"){
//         toast.success(msg)
//       }
//       if(type === "error"){
//         toast.error(msg)
//       }
// }
// Context for sharing modal state
export const MyContext = createContext();

function App() {
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [isLogin,setIsLogin] = useState(false);
  const [userData,setUserData] = useState(null);

  const [openCartPanel, setOpenCartPanel] = useState(false);

  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel(false);
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  useEffect(() => {
        const token = localStorage.getItem('accesstoken');
        if(token !== undefined && token !== null && token !== ""){
          setIsLogin(true);

          fetchDataFromApi(`/api/user/user-details`).then((res) => {
            console.log(res);
            setUserData(res.data);
            // console.log(res?.response?.data?.error);
            if(res?.response?.data?.error === true){
              if(res?.response?.data?.message === "you have not login"){
                localStorage.removeItem("accesstoken", res?.data.accesstoken)
                localStorage.removeItem("refreshtoken", res?.data.refreshtoken)
                alertBox('error',"your session is closed please login Again");
                window.location.href = '/login'
                setIsLogin(false);
              }
            }
            
          })
        }else{
          setIsLogin(false);
        }
  },[isLogin])

  const alertBox = (status,message) => {
    // alert(status);
    console.log(status);
    
    if(status === "success"){
      toast.success(message)
    }

    if(status === "error"){
      toast.error(message)
    }
  }

  const values = {
    openProductDetailsModel,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    // openAlertBox,
    isLogin,
    setIsLogin,
    alertBox,
    setUserData,
    userData,
  };

  

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productListing" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/my-orders" element={<Order />} />
            <Route path="/address" element={<Address />} />
          </Routes>
          <Footer />
          <Toaster position="top-right" reverseOrder={false}/>
        </MyContext.Provider>
      </BrowserRouter>

      {/* <Toaster /> */}

      {/* Product Details Dialog */}
      <Dialog
        open={openProductDetailsModel}
        onClose={handleCloseProductDetailsModel}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModel'
      >
        <DialogContent>
          <div className="flex w-full productDetailsModelContainer relative">
            <Button
              className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg[#f1f1f1]'
              onClick={handleCloseProductDetailsModel}
            >
              <IoCloseSharp className='text-[20px]' />
            </Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
              <ProductDetailsComponent />
            </div>
            {/* Add more product detail sections here if needed */}
          </div>
        </DialogContent>
      </Dialog>

      
    </>
  );
}

export default App;
