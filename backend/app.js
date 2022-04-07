const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

const cors = require("cors");
require("dotenv").config();

const app = express();

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connexion à MongoDB réussie !");

		// Force HTTPS
		// app.use(requireHttps);

		// Cors
		app.use(
			cors({
				origin: [process.env.FRONT_URL],
				optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
				credentials: true,
			})
		);

		// bodyParser
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		app.use(logger("dev"));
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(
			session({
				secret: "itum1p9",
				resave: false,
				saveUninitialized: false,
			})
		);

		//Routes
		app.use("/", routes);
	})
	.catch((e) => {
		console.log(e);
		console.log("Connexion à MongoDB échouée !");
	});

module.exports = app;
