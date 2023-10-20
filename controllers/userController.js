const User = require("../models/user");

module.exports.profile = function (req, res) {
    return res.render("user_profile", {
        title: "User Profile",
        profile_user: req.user,
    });
};

// update user Details
module.exports.updateUser = async function (req, res) {
    try {
        const user = await User.findById(req.user.id);
        const { username, password, confirm_password } = req.body;

        if (password != confirm_password) {
            return res.redirect("back");
        }

        if (!user) {
            return res.redirect("back");
        }

        user.username = username;
        user.password = password;

        user.save();
        return res.redirect("back");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

// render the sign In page
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/profile");
    }
    return res.render("signin.ejs");
};

// render the sign Up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/profile");
    }
    return res.render("signup.ejs");
};

// creating up a new user 
module.exports.create = async function (req, res) {
    try {
        const { username, email, password, confirm_password } = req.body;

        // if password doesn't match
        if (password != confirm_password) {
            return res.redirect("back");
        }

        // check if user already exist
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            await User.create({
                email,
                password,
                username,
            });

            console.log("User created successfully!");

            return res.redirect("/");
        } else {
            console.log("Email already registered!");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
    return res.redirect("/dashboard");
};

// clears the cookie
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.redirect("/");
    });
};