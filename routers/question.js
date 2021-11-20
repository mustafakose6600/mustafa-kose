const express = require('express');
const answer = require('./answer');
const Question = require("../models/question");
const {
askNewQuestion,
getAllQuestions,
getSingleQuestion,
editQuestion,
deleteQuestion,
likeQuestion,
undoLikeQuestion
} =require('../controllers/question');
const router = express.Router();
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');
const {getAccessToRoute,getQuestionOwnerAccess} =require('../middlewares/authorization/auth');

const questionQueryMiddleware = require('../middlewares/query/questionQueryMiddleware');
const answerQueryMiddlware = require('../middlewares/query/answerQueryMiddlware');

router.get('/:id/like',[getAccessToRoute,checkQuestionExist],likeQuestion);
router.get('/:id/undo_like',[getAccessToRoute,checkQuestionExist],undoLikeQuestion);

router.get("/",questionQueryMiddleware(Question,{
    population : {
        path : "user",
        select : "name profile_image"
    }
}),getAllQuestions);

router.get("/:id",checkQuestionExist,answerQueryMiddlware(Question,{
    population : [
        {
            path : "user",
            select : "name profile_image"
        },
        {
            path : "answers",
            select : "content"
        }
    ]
}),getSingleQuestion);
router.post("/ask",getAccessToRoute,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);

router.use("/:question_id/answers",checkQuestionExist,answer);

module.exports = router;
