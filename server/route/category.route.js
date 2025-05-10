import express from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createCategory, deleteCategory, getCategories, getCategoriesCount,getSubCategoriesCount,removeImagefromCloudinary,updatedCategory,uploadImages } from '../controllers/category.controller.js';
const categoryRouter = express.Router();

categoryRouter.post('/uploadImages',auth,upload.array('images'),uploadImages);
categoryRouter.post('/create',auth,createCategory);
categoryRouter.get('/',getCategories);
categoryRouter.get('/get/count',getCategoriesCount);
categoryRouter.get('/get/count/subCat',getSubCategoriesCount);
categoryRouter.get('/:id',getCategories);
categoryRouter.delete('/deleteImage',auth,removeImagefromCloudinary);
categoryRouter.delete('/:id',auth,deleteCategory);
categoryRouter.put('/:id',auth,updatedCategory);

export default categoryRouter;