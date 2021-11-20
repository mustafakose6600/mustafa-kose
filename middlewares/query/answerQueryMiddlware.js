const asyncErrorWrapper = require('express-async-handler');
const {paginationHelper, populateHelper} = require('./queryMiddlewareHelpers');


const answerQueryMiddlware = function(model,options) {

    return asyncErrorWrapper(async function(req,res,next){
        const {id} = req.params;
        const arrayName = "answers";

        const total = (await model.findById(id))["answerCount"];
        const paginationResult = await paginationHelper(total,undefined,req);
        const startIndex = paginationResult.startIndex;
        const limit = paginationResult.limit;

        let queryObjet = {};
        queryObjet[arrayName] ={$slice : [startIndex, limit]};

        let query = model.find({_id : id},queryObjet);
        const queryResults = await query;

        query = populateHelper(query,options.population);

        res.queryResults = {
            success:true,
            pagination : paginationResult.pagination,
            data : queryResults
        }
        next();
    })
}

module.exports = answerQueryMiddlware;
