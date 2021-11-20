const express = require('express');
const router = express.Router();
const {getAccessToRoute,getAdminAccess} = require('../middlewares/authorization/auth');
const {blockUser,deleteUser} = require('../controllers/admin');
const {checkUserExist} = require('../middlewares/database/databaseErrorHelpers');

router.use([getAccessToRoute,getAdminAccess]);

router.get("/block/:id",checkUserExist,blockUser);
router.delete("/user/:id",checkUserExist,deleteUser);
//Block User
//Delete User

module.exports =router;