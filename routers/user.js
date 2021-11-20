const express = require('express');
const router = express.Router();
const {getSingleUser,getAllUsers} = require('../controllers/user.js');
const {checkUserExist} = require('../middlewares/database/databaseErrorHelpers');
const userQueryMiddlware = require('../middlewares/query/userQueryMiddlware');
const User = require('../models/user');

router.get("/",userQueryMiddlware(User),getAllUsers);
router.get("/:id", checkUserExist , getSingleUser);


module.exports =router;