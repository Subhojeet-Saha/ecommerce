import express from 'express';
import { isadmin, requiresignin } from '../middlewares/authmiddleware.js';
import { categorycontroller, createcategorycontroller, deletecategory, singlecategorycontroller, updatecategorycontroller } from '../controllers/categorycontroller.js';

const router = express.Router()

// routes
// create category
router.post('/create-category', requiresignin, isadmin, createcategorycontroller);

// update category
router.put("/update-category/:id",requiresignin,isadmin,updatecategorycontroller);

// getall category
router.get('/get-category',categorycontroller);

// single category
router.get('/single-category/:slug',singlecategorycontroller);

// delete category
router.delete('/delete-category/:id',requiresignin,isadmin,deletecategory);

export default router;