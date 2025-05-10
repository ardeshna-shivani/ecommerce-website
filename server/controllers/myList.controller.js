
import MyListModel from "../models/myList.model.js";


export const addToMyListController = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, productTitle, image, rating, price, oldPrice, brand, discount } = req.body

        const item = await MyListModel.findOne({
            userId: userId,
            productId: productId
        })

        if (item) {
            return res.status(400).json({
                message: "Item already in my List",
            })
        }
        const myList = new MyListModel({
            productId,
            productTitle,
            image,
            rating,
            price,
            oldPrice,
            brand,
            discount,
            userId
        })

        const save = await myList.save();

        return res.status(200).json({
            message: "The product saved in my List",
            error: false,
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteToMyListController = async (req, res) => {

    try{
        const myListItems = await MyListModel.findById(req.params.id);

        if(!myListItems){
            return res.status(404).json({
                message: "The item with this given id was not found",
                error:true,
                success: false
            })
        }

        const deletedItem = await MyListModel.findByIdAndDelete(req.params.id);
        if(!deletedItem){
            return res.status(404).json({
                message: "The item is not deleted",
                error:true,
                success: false
            })
        }

        return res.status(200).json({
            message: "The item remove from my list",
            error:false,
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

export const getMyListController = async (req, res) => {
    try{
        const userId = req.userId;

        const myListItems = await MyListModel.find({
            userId: userId
        })
        return res.status(200).json({
            error:false,
            success: true,
            data: myListItems 
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