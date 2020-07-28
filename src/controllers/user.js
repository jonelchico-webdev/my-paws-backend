const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("users");
const keys = require("../config/keys");

// *********** SIGN UP *********** //

module.exports.signup = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    try {
        User.findOne({ email })
            .then(async (existingUser) => {
                if (existingUser) {
                    return res.status(400).send({ message: "Email already exist" });
                } else {
                    const user = new User({ firstName, lastName, email, password });
                    await user.save();

                    const token = jwt.sign({ userId: user._id }, keys.secretKey);

                    res.send({ token });
                }
            })
    } catch (err) {
        return res.status(422).send(err.message);
    }
    // try {
    //     const user = new User({ firstName, lastName, email, password });
    //     await user.save();

    //     const token = jwt.sign({ userId: user._id }, keys.secretKey);

    //     res.send({ token });
    // } catch (err) {
    //     return res.status(422).send(err.message);
    // }
};


// *********** SIGN IN *********** //

module.exports.signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: "Must provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(422).send({ error: "Invalid password or email" });
    }

    try {
        await user.comparePassword(password);

        const token = jwt.sign({ userId: user._id }, keys.secretKey);

        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: "Invalid password or email" });
    }
};

