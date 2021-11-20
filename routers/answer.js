const express = require('express');
const router = express.Router({mergeParams : true});
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer,editAnswer,deleteAnswer,likeAnswer,undoLikeAnswer} = require('../controllers/answer');
const {checkQuestionAnswerExist} = require('../middlewares/database/databaseErrorHelpers');
const {getAnswerOwnerAccess} = require('../middlewares/authorization/auth');

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAllAnswersByQuestion);
router.get("/:answer_id",checkQuestionAnswerExist,getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);
router.get("/:answer_id/like",[checkQuestionAnswerExist,getAccessToRoute],likeAnswer);
router.get("/:answer_id/undo_like",[checkQuestionAnswerExist,getAccessToRoute],undoLikeAnswer);
module.exports = router;