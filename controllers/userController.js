const user = require("../models/userSchema");
const { createHmac } = require("crypto");
const { setUser } = require("../util/auth");

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!(email && password))
            throw new Error("All fields are required");

        const userDetails = await user.findOne({ email: email })

        if (!userDetails)
            throw new Error("User does not exist");

        else {

            const salt = userDetails.salt;
            const hashedPassword = userDetails.password;

            const userProvidedHash = createHmac("sha256", salt)
                .update(password)
                .digest("hex");

            if (userProvidedHash != hashedPassword) {
                throw new Error("password is wrong");
            }
            const token = setUser(userDetails)
            res.cookie("authId", token);
            res.redirect('/url/dashboard');

        }

    } catch (err) {
        console.log(err)
    }
}

const handleSignup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!(username && email && password))
            throw new Error("All fields are required");

        const userDetails = await user.create({
            username: username,
            email: email,
            password: password
        })

        if (!userDetails) {
            throw new Error("Error while creating user ");
        }
        else {
            res.redirect('/')
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports = { handleLogin, handleSignup };