import User from "../models/User.js";

const postApiSignup = async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender: gender
    });

    try {
        const savedUser = await user.save();

        res.json({
            sucess: true,
            data: savedUser,
            message: "Signup Sucessfully.."
        })
    }
    catch (e) {
        res.json({
            sucess: false,
            message: e.message
        })
    }
}

export {postApiSignup}