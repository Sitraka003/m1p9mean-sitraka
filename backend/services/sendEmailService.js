const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
	port: process.env.SMTP_PORT || 465, // true for 465, false for other ports
	host: process.env.SMTP_HOST || "smtp.gmail.com",
	auth: {
		user: process.env.SMTP_USER || "ekaly@gmail.com",
		pass: process.env.SMTP_PASSWORD || "",
	},
	secure: process.env.SMTP_SECURE || false,
});

module.exports.send = (from, to, subject, text, html, file, cc) =>
	new Promise((resolve, reject) => {
		const mailData = {
			from: from,
			to: to,
			subject: subject,
			text: text,
			html: html,
			attachments: file || null,
			cc: cc || null,
		};

		transporter.sendMail(mailData, (error, info) => {
			if (error) {
				reject(error);
			} else {
				resolve(info);
			}
		});
	});
