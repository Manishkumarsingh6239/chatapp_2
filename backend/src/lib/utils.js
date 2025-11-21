import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d",
    });
    res.cookie("jwt",token, {
        "maxAge": 7*24*60*60*1000, // in millisec
        httpOnly: true, // prevent XSS attacks means this token is only going to be available via HTTP, with a js no one can access the token and this is called the cross-site scripting
        sameSite: "strict", //CSRF attacks
        secure: process.env.NODE_ENV === 'development'? false : true,
    })
    return token;
}