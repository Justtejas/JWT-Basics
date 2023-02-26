//check username, password in post (login) request which is accessed through req.body
//if exist create a token and send it back to the frontend
//if not exist send error message
//setup authentication so only the request with the jwt token can access the dashboard route

const jwt = require("jsonwebtoken");
const {BadRequest} = require("../errors");
const login = async(req,res) =>{
    const {username,password} = req.body;
    //types of validation that can be done
    // 1. Joi validation
    // 2. Mongoose validation
    // 3. Custom validation
    if(!username || !password){
        throw new BadRequest ("Please provide username and password");
    }
    //just for demo purpose,generally provided by db
    const id = new Date().getDate()
    
    // keep payload small,avoid storing sensitive data in jwt token
    // in production use long,complex and secure secret 
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"7d"})
    res.status(200).json({msg:"user created",token})
}

const dashboard = async(req,res) =>{
    const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({msg:`Hello ${req.user.username}`,secret:`This is your lucky number ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}