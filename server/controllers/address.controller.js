import { error } from "console";
import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async(req,res) => {
        try{
            const {address_line1,city,state,pincode,country,mobile,status,userId, selected} = req.body

            // const userId = req.userId;
            // if(!address_line1 || !city || !state || !pincode || !country || !mobile || !userId){
            //     return res.status(500).json({
            //         message: "all the field required.",
            //         error: true,
            //         success: false
            //     })
            // }

            const address = new AddressModel({
                address_line1,city,state,pincode,country,mobile,status, userId,selected
            })

          const savedAddress = await address.save();

          const updateCartUse = await UserModel.updateOne({_id:userId},{
                $push: {
                    address_details : savedAddress?._id
                }
          })

          return res.status(200).json({
            data: savedAddress,
            message: "Address Add successfully",
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


export const getAddressController = async(req,res) => {
        try{
            const address = await AddressModel.find({userId: req?.query?.userId})
            if(!address){
                return res.status({
                    error:true,
                    success: false,
                    msg: "address not found"
                })
            }
            else{
                const updateUser = await UserModel.updateOne({_id: request?.query?.userId},{
                    $push:{
                        address: address?._id
                    }
                })
            }
            
            return res.status(200).json({
                address: address,
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

export const selectAddressController = async(req,res) => {
        
        try{
            const userId = req.userId
            const address = await AddressModel.find({
                    _id : req.params.id,
                    userId: userId
            })

            const updateAddress = await AddressModel.find(
                {
                    userId: userId
                }
            )


            if(!address){
                return res.status(500).json({
                    message: error.message || error,
                    error: true,
                    success: false
                })
            }
            else{
                const updateAddress = await AddressModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        selected: req?.body?.selected,
                    },
                    {new : true}
                )

                return res.json({
                    error: false,
                    success: true,
                    address: updateAddress
                })
    
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


export const deleteAddressController = async(req,res) => {
    try{
       const userId = req.userId;
       const _id = req.params.id

       if(!_id){
           return res.status(400).json({
               message: "provide_id",
               error: true,
               success: false
           })
       }

       const deleteItem = await AddressModel.deleteOne({_id: _id, userId: userId});
       if(!deleteItem){
           return res.status(404).json({
               message: "The address in the database is not found",
               error: true,
               success: false
           })
       }

       

       return res.json({
           message: "address Remove",
           error: false,
           success: true,
           data: deleteItem
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