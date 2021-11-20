const express = require('express');
const {register,login,getUser,logout,imageUpload,forgotPassword,resetpassword,editDetails}  = require('../controllers/auth');
const router = express.Router();
const profileImageUpload = require('../middlewares/libraries/profileImageUpload');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

router.post("/register",register);
router.post("/login",login);
router.get("/profile",getAccessToRoute,getUser);
router.get("/logout",getAccessToRoute,logout);
router.post("/forgotpassword",forgotPassword);
router.put("/resetpassword",resetpassword);
router.put("/edit",getAccessToRoute,editDetails);

router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);

module.exports = router;
