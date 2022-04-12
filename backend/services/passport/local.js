const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
	},
	function (email, password, done) {
		User.findOne(
			{ email: email },
			"email hashed_password",
			function (err, user) {
				if (err) return done(err);
				// Find user by email
				if (!user) {
					console.log("Authenticate", "User not found");
					return done(null, false, {
						message: "User not found or Invalid password",
					});
				}

				// Decrypt
				// Verify password
				if (user.hashed_password !== password) {
					console.log("Authenticate", "Invalid password");
					return done(null, false, {
						message: "User not found or Invalid password",
					});
				}

				// If authenticated
				return done(null, user);
			}
		);
	}
);
