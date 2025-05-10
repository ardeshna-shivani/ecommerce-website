import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import CategoryModel from '../models/category.model.js';
import { error } from 'console';


cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});

var imagesArr = [];
export async function uploadImages(req, res) {
    try {
        imagesArr = [];
        
        const image = req.files;
        console.log(image);
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
        

        return res.status(200).json({
            images: imagesArr
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

export async function createCategory(req,res){
    try{
        let category = new CategoryModel({
            name: req.body.name,
            images: imagesArr,
            parentId: req.body.parentId,
            parentCatName: req.body.parentCatName,
        })

        if(!category){
            return res.status(500).json({
                message: "Category not created",
                error: true,
                success: false,
            })
        }

        category = await category.save();
        imagesArr = [];

        return res.status(200).json({
            message: "category created",
            error: false,
            success: true,
            category: category
        })
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

//get all category

export async function getCategories(req,res) {
    try{
        const categories = await CategoryModel.find();
        const categoryMap = {};

        categories.forEach(cat => {
            categoryMap[cat._id] = {...cat._doc, children:[]}
        });

        const rootCategories = [];
        categories.forEach(cat => {
            if(cat.parentId){
                categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
            }
            else{
                rootCategories.push(categoryMap[cat._id]);
            }
        });

        return res.status(200).json({
            error: false,
            success: true,
            data: rootCategories
        })
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

//get category count
export async function getCategoriesCount(req,res) {
    try{
        const categoryCount = await Category.countDocuments({parentId:undefined})
        if(!categoryCount){
            res.status(500).json({success: false, error: true});
        }
        else{
            res.send({
                categoryCount: categoryCount,
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


//get sub category count
export async function getSubCategoriesCount(req,res) {
    try{
        const categories = await Category.find()
        if(!categories){
            res.status(500).json({success: false, error: true});
        }
        else{
            const subcatArr= [];

            for(let cat of categoryCount){
                if(cat.parentId !== undefined){
                    subCatList.push(cat);
                }
            }
            res.send({
                SubcategoryCount: subCatList.length,
            })
        }

        
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

//get single category

export async function getCategory(req,res){
    try{
        const category = await CategoryModel.findById(req.params.id);

        if(!category){
            res.status(500).json({
                message: "The Category with the given Id was not found.",
                error: true,
                success:false
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            category: category
        })
    }
    catch(error){
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

export async function deleteCategory(req,res){
    try{
        const category = await CategoryModel.findById(req.body.id);
        const images = category.images;
        let img = "";
        for(img of images){
            const imgUrl = img;
            const urlArr = imgUrl.split("/");
            const image = urlArr[urlArr.length - 1];
            const imageName = image.split(".")[0];

            if(imageName){
                cloudinary.uploader.destroy(imageName,(error,result) => {

                })
            }
            

        }

        const subCategory = await CategoryModel.find({parentId: req.params.id})

        for(let i=0 ; i < subCategory.length;i++){
            console.log(subCategory[i]._id);

            const thirdSubCategory = await CategoryModel.find({
                parentId: subCategory[i]._id
            });

            for(let i = 0; i < thirdSubCategory.length; i++){
                const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdSubCategory[i]._id)
            }
            const deletedSubCat = await CategoryModel.findByIdAndDelete(subCategory[i].id);          
        }

        const deletedSubCat = await CategoryModel.findByIdAndDelete(req.params.id);
        if(!deletedSubCat){
            return res.status(404).json({
                message: "Category not found!",
                error: true,
                success: false,
            })
        }
        res.status(200).json({
            message: "Category Deleted",
            success: true,
            error: false
        })
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export async function updatedCategory(req,res){
    const category = await CategoryModel.findByIdAndUpdate(
        req.params.id,{
            name: req.body.name,
            images: imagesArr.length>0 ? imagesArr[0] : req.body.images,
            parentId: req.body.parentId,
            parentCatName: req.body.parentCatName
        },
        {new: true}
    );

    if(!category){
        return res.status(500).json({
            message: "Category cannot be updated!",
            error: true,
            success: false,
        })
    }

    imagesArr = [];

    return res.status(500).json({
        error: false,
        success: true,
        category: category
    })
}