import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';
export const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(500).send({
            success: false,
            message: "User Not Authenticated"
        })
    }

    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);
    // console.log(req.user);
    // const id = req.user._id;
    // console.log(String(id));
    // const user = await userModel.findById(id);
    // console.log(user);

    // res.status(200).send({
    //     success: true,
    //     message: "User Found SuccessFully",
    //     user
    // })
    next();
}