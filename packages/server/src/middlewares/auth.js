import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants";

export const auth = async (req, res, next) => {
    try{
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
        console.log(user);
        if(user){
            req.user = user;
            return next();
        }else{
            throw new Error("Couldn't verify the user.");
        }
    } catch (err) {
        console.log(err);
        return res.status(403).json({
            error: "User not authenticated",
        })
    }
}