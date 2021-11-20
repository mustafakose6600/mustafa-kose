const sendJwtToClient = (user,res)=>{
    // Generate JWT
    const token = user.generateJwtFromUser();
    const {JWT_COOKIE,NODE_ENV } = process.env; 
    
   return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly: true,
        expires : new Date(Date.now() + JWT_COOKIE * 1000 * 60),
        secure : NODE_ENV === "deveploment" ? false : true,
    })
    .json({
        success: true,
        access_token : token,
        data : {
            name : user.name,
            email : user.email,
        }
    });
    // Response
}
const isTokenIncluded = (req)=>{
    return (req.headers.authorization && req.headers.authorization.startsWith('Bearer'));
}
const getAccessTokenFromHeader = (req)=>{
    const authorization = req.headers.authorization;
    const access_token  = authorization.split(" ")[1];
    return access_token;
}


module.exports ={
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
};