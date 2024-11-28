const jwt = require('jsonwebtoken')

const verifyAdmin = (req,res,next) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(200).json({message: "Token Missing"})
    }
    else{
        jwt.verify(token, process.env.ADMIN_SECRET_KEY, (err,verifyToken) =>{
            if(err){
                return res.status(200).json({message: "Invalid Token"})
            }
            else{
                req.username = verifyToken.username
                req.role = verifyToken.role
                next()
            }
        })
        
    }
}

module.exports = verifyAdmin