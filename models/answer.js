const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('../models/question');

const AnswerSchema = new Schema({
    content : {
        type : String,
        required : [true,"Please provide a content"],
        minLength :[10,"Please  provide a content at least 10 chracters"]
    },
    createdAt : {
        type : Date,
        default :Date.now
    },
    likes : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user"
        }
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true
    },
    question : {
        type : mongoose.Schema.ObjectId,
        ref : "question",
        required : true
    }
});

AnswerSchema.pre("save",async function(next) {
    if(!this.isModified("user")) return next();

    try{
        const question = await Question.findById(this.question);
        question.answers.push(this._id);
        question.answerCount = question.answers.length;

        await question.save();
        next();
    }
    catch(error){
        return next(error);
    }
  
});
module.exports = mongoose.model("answer",AnswerSchema);