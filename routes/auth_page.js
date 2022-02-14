const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const authController = require('../controller/control');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const { route } = require('express/lib/application');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./static');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        req.myfile = file.originalname;
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage});

router.post('/register',urlencodedParser,authController.register);
router.post('/login',urlencodedParser,authController.login);
router.post('/changepassword',urlencodedParser,authController.changepassword);
router.post('/forgot',urlencodedParser,authController.forgot);
router.get('/profile', authController.isLogIn ,authController.renderProfile);
router.get('/logout',authController.logout);
router.post('/profileupdate',urlencodedParser, authController.isLogIn ,authController.profileupdate);
router.post("/addCategory",urlencodedParser,upload.single('myfile'),authController.isOwnerIsThere,authController.addCategory)
router.post('/registerEmployee',urlencodedParser,authController.registerEmployee);
router.post('/loginEmployee',urlencodedParser,authController.loginEmployee);
router.get('/adminPanel',authController.isOwnerIsThere,authController.renderAdminPanel);
router.get('/editCategory',authController.isOwnerIsThere,authController.editCategory);
router.post('/removeCategory',urlencodedParser,authController.isOwnerIsThere,authController.removeCategory);
router.get("/addCategoryPage",authController.isOwnerIsThere,authController.addCategoryPage);
router.get('/removeCategoryPage',authController.isOwnerIsThere,authController.removeCategoryPage)
router.get('/addFoodItemPage',authController.isOwnerIsThere,authController.addFoodItemPage)
router.get('/removeFoodItemPage',authController.isOwnerIsThere,authController.removeFoodItemPage)
router.get('/editCategory/showFoodItem',authController.isOwnerIsThere,authController.showFoodItem)
router.post('/addFoodItem',urlencodedParser,upload.single('myfile'),authController.isOwnerIsThere,authController.addFoodItem);
router.post('/removeFoodItem',urlencodedParser,authController.isOwnerIsThere,authController.removeFoodItem);
router.get('/editCategory/showFoodItemProfile',authController.isLogIn,authController.showFoodItemProfile);
router.post('/addToCart',urlencodedParser,authController.isLogIn,authController.addToCart);
router.get('/editFoodItem/addToCartPage',authController.isLogIn,authController.addToCartPage)
router.get('/editCategory/editFoodItemDetails',authController.isLogIn,authController.editFoodItemDetails)
router.post('/editFoodItemForm',urlencodedParser,authController.isLogIn,authController.editFoodItemForm);
router.get('/viewCart',authController.isLogIn,authController.viewCart);
router.post('/updateQuantityValue',urlencodedParser,authController.isLogIn,authController.updateQuantityValue);
router.get('/deleteCartItem',authController.isLogIn,authController.deleteCartItem);
router.get('/email',authController.isLogIn,authController.email);
router.get('/viewEmployee',authController.isLogIn,authController.viewEmployee);
router.get('/viewCustomer',authController.isLogIn,authController.viewCustomer);

module.exports = router;