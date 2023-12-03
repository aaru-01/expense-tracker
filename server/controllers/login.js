import User from "./../models/User.js";

const postApiLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || password) {
        res.json({
            success: true,
            message: "Please provide email and password."
        })
    }
    const user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")

    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login Sucessful"
        })
    } else {
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }

}

export { postApiLogin };