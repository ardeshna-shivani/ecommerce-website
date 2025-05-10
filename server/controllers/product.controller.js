import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import ProductModel from '../models/product.model.js';
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

export async function createProduct(req,res) {
        try{
            let product = new ProductModel({
                name: req.body.name,
                description: req.body.description,
                images: imagesArr,
                brand: req.body.brand,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                catName: req.body.catName,
                catId: req.body.catId,
                subCatId: req.body.subCatId,
                subCat: req.body.subCat,
                thirdSubCat: req.body.thirdSubCat,
                thirdSubCatId: req.body.thirdSubCatId,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured,
                discount: req.body.discount,
                productRam: req.body.productRam,
                size: req.body.size,
                productWeight: req.body.productWeight,
            });

            product = await product.save();
            if(!product){
                return res.status(500).json({
                        error: true,
                        success: false,
                        message: "product not created"
                    })     
                }
                imagesArr = [];

             return   res.status(200).json({
                    message:"Product Creted Successfully",
                    error: false,
                    success: true,
                    product: product
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

//get all product

export async function getAllProducts(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }
        const products = await ProductModel.find().populate("Category").skip((page - 1)* perPage).limit(perPage).exec();



        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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

//get all product by catId
export async function getAllProductsByCatId(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }
        const products = await ProductModel.find({catId: req.params.id}).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();



        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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


//get all product by cat name
export async function getAllProductsByCatName(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }
        const products = await ProductModel.find({catId: req.query.catName}).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();



        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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



//get all product by sub catId
export async function getAllProductsBySubCatId(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }
        const products = await ProductModel.find({subCatId: req.params.id}).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();



        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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


//get all product by  sub cat name
export async function getAllProductsBySubCatName(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }
        const products = await ProductModel.find({subCat: req.query.subCat}).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();



        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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


//get all product by third catId
export async function getAllProductsByThirdLavelCatId(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }
        const products = await ProductModel.find({thirdSubCatId: req.params.id}).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();



        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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


//get all product by  third cat name
export async function getAllProductsByThirdLavelCatName(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }
        const products = await ProductModel.find({thirdSubCat: req.query.thirdSubCat}).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();



        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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

//get All product by price
export async function getAllProductsByPrice(req,res){
        let productList = [];

        if(req.query.catId !== "" && req.query.catId !== undefined){
            const productListArr = await ProductModel.find({
                catId: req.query.catId,
            }).populate("category");

            productList = productListArr;
        }

        if(req.query.subCatId !== "" && req.query.subCatId !== undefined){
            const productListArr = await ProductModel.find({
                subCatId: req.query.subCatId,
            }).populate("category");

            productList = productListArr;
        }

        if(req.query.thirdSubCatId !== "" && req.query.thirdSubCatId !== undefined){
            const productListArr = await ProductModel.find({
                thirdSubCatId: req.query.thirdSubCatId,
            }).populate("category");

            productList = productListArr;
        }


        const filteredProducts = productList.filter((product) => {
            if(req.query.minPrice && product.price < parseInt(+req.query.minPrice)){
                return false;
            }
            if(req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)){
                return false;
            }
            return true;
        })

        return res.status(200).json({
            products: filteredProducts,
            totalPages: 0,
            page: 0,
            error: false,
            success: true
        })
}

//get all products by rating
export async function getAllProductsByRating(req,res){
    try{

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); 
        

        if(page > totalPages){
           return res.status(404).json({
            message:" Page not found",
            success: false,
            error: true
        });
        }

        let products = [];
        if(req.query.catId !== undefined){
            products = await ProductModel.find({
                rating: req.query.rating,
                catId: req.query.catId,
                }).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();
        }

        if(req.query.subCatId !== undefined){
            products = await ProductModel.find({
                rating: req.query.rating,
                subCatId: req.query.subCatId,
                }).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();
        }

        if(req.query.thirdSubCatId !== undefined){
            products = await ProductModel.find({
                rating: req.query.rating,
                thirdSubCatId: req.query.thirdSubCatId,
                }).populate("Category").skip((page - 1)* perPage).limit(perPage).exec();
        }
        
        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
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


//get all product count
export async function getProductsCount(req,res){
    try{
        const productsCount = await ProductModel.countDocuments();
        if(!productsCount){
            res.status(500).json({
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            productCount: productsCount
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

//get all feature products 
export async function getAllFeatureProducts(req,res){
    try{
        const products = await ProductModel.find({isFeatured: true}).populate("Category");
        if(!products){
          res.status(200).json({
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            products: products
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

//delete product
export async function deleteProduct(req,res){
    const product = await ProductModel.findById(req.params.id).populate("category");
    if(!product){
        return res.status(404).json({
            message:"product not found",
            error: true,
            success: false
        })
    }

    const images = product.images;
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

        const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);

        if(!deleteProduct){
            return res.status(404).json({
                message:"product not deleted",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message:"product Deleted!",
            success: true,
            error: false
        })
}

//get single product
export async function getProduct(req,res){
        try{
            const product = await ProductModel.findById(req.params.id).populate("category");

            if(!product){
                return res.status(404).json({
                    message:"The product is not found",
                    error: false,
                    success: true
                })
            }

            return res.status(200).json({
                error:false,
                success: true,
                product: product
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

//update product
export async function updateProduct(req,res){
    try{
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,{
                name: req.body.name,
                description: req.body.description,
                images: imagesArr,
                brand: req.body.brand,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                catName: req.body.catName,
                catId: req.body.catId,
                subCatId: req.body.subCatId,
                subCat: req.body.subCat,
                thirdSubCat: req.body.thirdSubCat,
                thirdSubCatId: req.body.thirdSubCatId,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured,
                discount: req.body.discount,
                productRam: req.body.productRam,
                size: req.body.size,
                productWeight: req.body.productWeight,
            },
            {new: true}
        )

        if(!product){
          return  res.status(404).json({
                message: "the product cannot be updated!",
                status: false
            })
        }

        imagesArr= [];
        return  res.status(200).json({
            message: "the product isupdated!",
            error: false,
            success: true
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
