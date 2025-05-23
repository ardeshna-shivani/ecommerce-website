import express from 'express';
import auth from '../middleware/auth.js';
import { addAddressController, deleteAddressController, getAddressController, selectAddressController } from '../controllers/address.controller.js';

const addressRouter = express.Router();

addressRouter.post('/add',auth,addAddressController);
addressRouter.get('/get',auth,getAddressController);
addressRouter.put('/selectAddress/:id',auth,selectAddressController);
addressRouter.delete('/:id',auth,deleteAddressController);

export default addressRouter;