import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { permittedCrossDomainPolicies } from "helmet";
import jwt from "jsonwebtoken"
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../Utils/verifyEmailTemplate.js";
import { response } from "express";
import generatedAccessToken from "../Utils/generateAccessToken.js";
import generatedRefreshToken from "../Utils/generateRefreshToken.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { error, log } from "console";

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});

var imagesArr = [];

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email, and password.",
                error: true,
                success: false,
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered with this email.",
                error: true,
                success: false,
            });
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            otp: verifyCode,
            otpExpires: Date.now() + 600000, // 10 minutes
        });

        await newUser.save(); 

        await sendEmailFun({
            to: email,
            subject: "Verify Email for ecommerce app",
            text: "",
            html: VerificationEmail(name, verifyCode),
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        console.log("JWT Secret:", process.env.JSON_WEB_TOKEN_SECRET_KEY);
        

        return res.status(200).json({
            success: true,
            error: false,
            message: "User registered successfully! Please verify your email.",
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({ email});

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
                error: true
            })


        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExpires > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return res.status(200).json({ success: true, message: "Email Verified Successfully", error: false })
        } else if (!isCodeValid) {
            return res.status(400).json({ success: false, message: "Invalid Otp", error: true })
        } else {
            return res.status(400).json({ success: false, message: "Otp Expired", error: true })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User not Registered",
                error: true,
                success: false
            })
        }

        if (user.status !== 'Active') {
            return res.status(400).json({
                message: "Contact to Admin",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Check your Password",
                error: true,
                success: false
            })
        }

        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', accessToken, cookiesOption);
        response.cookie('refreshToken', refreshToken, cookiesOption);

        return res.json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export async function logoutController(req, res) {
    try {
        const userId = req.userId;
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.clearCookie('accessToken', cookiesOption);
        response.clearCookie('refreshToken', cookiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: ""
        })

        return res.json({
            message: "Logout Successfully",
            error: false,
            success: true
        })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}



//image upload

export async function userAvatarController(req, res) {
    try {
        imagesArr = [];
        
        const userId = req.userId;
        const image = req.files;
        console.log(image);

        if (!user) {
            return res.status(500).json({
                message: "user not found",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ _id: userId });
        // const userAvatar = user.avatar;
 
        //first remove img from cloudinary
        const imgUrl = user.avatar;
        const urlArr = imgUrl.split("/");

        const avatar_image = urlArr[urlArr.length - 1];

        const imageName = avatar_image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(imageName,
                (error, result) => {
                    // console.log(error,res);

                }
            );
        }


        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < req?.files?.length; i++) {

            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    console.log(result);
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${req.files[i].filename}`);
                    console.log(req.files[i].filename);

                }
            )
        }
        user.avatar = imagesArr[0];
        await user.save();

        return res.status(200).json({
            _id: userId,
            avtar: imagesArr[0]
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


export async function removeImagefromCloudinary(req, res) {
    const imgUrl = req.query.img;
    const urlArr = imgUrl.split("/");

    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(imageName,
            (error, result) => {
                // console.log(error,res);

            }
        );

        if (res) {
            res.status(200).send(res);
        }
    }

}


export async function updateUserDetails(req,res) {
        try{
            const userId = req.userId;
            const {name,email,mobile,password} = req.body;
            const userExist = await UserModel.findById(userId);

            if(!userExist)
                return res.status(400).send("The User Cannot be Updated!")
            

            let varifyCode = "";
            if(email !== userExist.email){
                varifyCode = Math.floor(100000 + Math.random()* 900000).toString();
            }

            let hashPassword = "";
            if(password){
                const salt = await bcrypt.genSalt(10);
                hashPassword = await bcrypt.hash(password,salt);
            }
            else{
                hashPassword = userExist.password;
            }

            const updateUser = await UserModel.findByIdAndUpdate(
                userId,
                {
                    name: name,
                    mobile: mobile,
                    email: email,
                    verify_email: email !== userExist.email? false: true,
                    password: hashPassword,
                    otp: varifyCode!== "" ? varifyCode : null,
                    otpExpires: varifyCode !== "" ? Date.now() + 600000 : ''
                },
                {new : true}
            )

            if(email !== userExist.email){
                //send verification email
                await sendEmailFun({
                    sendTo: email,
                    subject: "Verify email for ecommerce-app",
                    text:"",
                    html: VerificationEmail(name,varifyCode)
                })
            }

            return response.json({
                message: "User Updated Successfully",
                error: false,
                success:true,
                user: {
                    name: updateUser?.name,
                    _id: updateUser?._id,
                    email: updateUser?.email,
                    mobile: updateUser?.mobile,
                    avatar: updateUser?.avatar
                }
            })
            
        }

        catch(error){
                return res.status(500).json({
                    message: error.message || error,
                    error: true,
                    success: false
                })
        }
}
 

//forgot password
export async function forgotPasswordController(req,res){
    try{
        const email = req.body;

        const user = await UserModel.findOne({email: email})

        if(!user){
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        else{
            let varifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = varifyCode;
            user.otpExpires = Date.now() + 600000;

            await user.save();

        await sendEmailFun({
            sendTo: email,
            subject: "Verify Otp for ecommerce app",
            text: "",
            html: VerificationEmail(user.name, varifyCode),
        });
        return res.json({
            success: true,
            error: false,
            message: "check your email",
            
        });
        }
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function verifyforgotPasswordOtp(req,res){
    try{
        const {email,otp} = req.body;
        const user = await UserModel.findOne({email: email})
    
            if(!user){
                return res.status(400).json({
                    message: "Email not available",
                    error: true,
                    success: false
                })
            }
    
            if(!email || !otp){
                return res.status(400).json({
                    message: "Provide required field email,otp.",
                    error: true,
                    success: false
                })
            }
    
            if(otp !== user.otp){
                return res.status(400).json({
                    message: "Invalid Otp",
                    error: true,
                    success: false
                })
            }
    
            const currentTime = new Date().toISOString();
    
            if(user.otpExpires < currentTime){
                return res.status(400).json({
                    message: "Otp is Expired",
                    error: true,
                    success: false
                })
            }
    
            user.otp = "";
            user.otpExpires = "";
            
            await user.save();
    
            return res.status(200).json({
                message: "Verify otp successfully",
                error: false,
                success: true
            })
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


//reset password
export async function resetPassword(req,res) {
        try{
            const {email ,oldPassword, newPassword, confirmPassword} = req.body;

            if(!email || !newPassword || !confirmPassword){
                return res.status(400).json({
                    error: true,
                    success:false,
                    message: "provide required fieldes email, newPassword,confirmPassword "
                })
            }

            const user = await UserModel.findOne({email})
            if(!user){
                return res.status(400).json({
                    message: "Email not available",
                    error: true,
                    success: false
                })
        }

        const checkPassword = await bcrypt.compare(oldPassword, user.password);
        if(!checkPassword){
            return res.status(400).json({
                message: "your old password is wrong",
                error: true,
                success: false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: "newPassword and ConfirmPassword must be same",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(confirmPassword,salt);

        user.password = hashPassword;
        await user.save();

        // const update = await UserModel.findOneAndUpdate(user._id,{password: hashPassword})

        return res.status(400).json({
            message: "Password update successfully",
            error: false,
            success: true
        })
    }
        catch(error){
            return res.status(500).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
}


export async function refreshToken(req,res){
    try{
        const refreshToken = req.cookie.refreshToken || req?.headers?.authorization?.split(" ")[1];
        if(!refreshToken){
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verifyToken){
            return res.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id;
        const newAccessToken = await generatedAccessToken(userId);
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('accessToken',newAccessToken,cookiesOption);

        return res.status(400).json({
            message: "New access token generated",
            error: false,
            success: true,
            data: {
                accessToken : newAccessToken
            }
        })
    }
    catch(error){
        return res.status(400).json({
            message: "Password update successfully",
            error: false,
            success: true
        })
    }
}

export async function userDetails(req,res){
    try{
        const userId = req.userId;
        console.log(userId);

        const user = await UserModel.findById(userId).select('-password -refresh-token').populate('address_details')

        return res.status(400).json({
            message: "user details",
            data: user,
            error: false,
            success: true
        })
    }
    catch(error){
        return res.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}