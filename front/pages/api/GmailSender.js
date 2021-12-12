export default async function handler(req, res) {
	require('dotenv').config()
	let nodemailer = require('nodemailer')

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: req.body.from,
			clientID: "297024806589-igr7j5qh2l2jbd5vt10ok0goj5ghevbn.apps.googleusercontent.com",//TODO process env
			clientSecret: "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",//TODO process env
			refreshToken: "" || "",//TODO process env
			accessToken: req.body.token,
		}
	});
	const mailOptions = {
		from: "<" + req.body.from + ">",
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.message,
		html: "<p>" + req.body.message + "</p>"
	};
	await transport.sendMail(mailOptions)
		.then(result => {
			res.status(200).send(result)
		})
		.catch(err => {
			res.status(err.status || 500).send(err)
		})
}