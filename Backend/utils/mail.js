const nodemailer = require("nodemailer")

async function sendMail(resetLink, recepient, callback) {
    let transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    const mailInfo = {
      from: process.env.MAIL_FROM,
      to: recepient, // list of receivers
      subject: `Forgot Your Password?`, // Subject line
      text: `Open this link to reset your password ${resetLink}`, // plain text body
      html: `<a href="${resetLink}" target="_blank">Click Here to reset your Password</a>`, // html body
    }
  
  
    // err.responseCode==550 : Not a valid domain
    let info = await transporter.sendMail(mailInfo, (err, info) => {
      if(err) {
        callback(false, err)
      } else {
        if(info.accepted.length>0){
          callback(true)
        } else {
          callback(false)
        }
      }
    });
  }

  exports.sendMail = sendMail