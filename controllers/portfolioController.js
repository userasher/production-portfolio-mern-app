const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

//trasport
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    // what do you mean by destructring
    const { name, email, msg } = req.body;

    // validating
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please provide all feilds",
      });
    }

    // email structure to be sent
    // read documentation for nodemailer trasporter
    transporter.sendMail({
      to: "ashwdan@gmail.com",
      from: "ashwdan@gmail.com",
      subject: "Regarding Mernportfolio app",
      html: `
      <h5>Detail Information</h5>
      <ul>
      <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
      
      </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your message sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "send Email API error",
      error,
    });
  }
};

module.exports = {
  sendEmailController,
};
