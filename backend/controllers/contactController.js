const sendMail = require("../services/sendEmailService");
const ajvContactService = require("../services/ajv/ajvContact");
const ajvService = require("../services/ajvService");
const moment = require("moment");

module.exports = {
  async sendEmailContact(req, res) {
    // Validate the input from user
    try {
      const ajvContact = ajvContactService.getSchemaContact();
      ajvService.checkWithAjv(ajvContact, req.body);
    } catch (e) {
      return res.status(400).send(e);
    }
    const destination = "joelandriatiana@gmail.com";
    const { email, name, title, message } = req.body;
    const date = moment().format("DD/MM/YYYY hh:mm:ss");

    const subject = `E-kaly - ${title}`;
    const html =
      `<h3>E-kaly</h3>
       <p>Message de: ${name}</p>
       <p>Envoyer le: ${date}</p>
       <p></p>
       <hr>
       <h4>${title}</h4>
       <p>${message}</p>
       <hr>
       <p>Vous n’avez pas demandé à recevoir cet e-mail ? Veuillez contacter l’assistance</p>`;


    await sendMail
      .send(email, destination, subject, subject, html, null, [email])
      .then((info) => {
        console.log(info);
        // Todo save to database
        return res.status(200).json({
          code: "SEND_EMAIL_SUCCESS",
          message: "Email sent successfully"
        });
      })
      .catch((error) => {
        return res.status(500).json({
          code: "SEND_EMAIL_FAILED",
          message: "Sending email failed",
          data: error
        });
      });
  }
};
