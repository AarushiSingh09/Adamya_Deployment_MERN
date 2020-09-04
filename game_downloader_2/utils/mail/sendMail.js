import nodemailer from 'nodemailer';

let sendMail = async (userId,content) => {

  let transporter = nodemailer.createTransport({
    host: "mail.simplem.in",
    port: 25,
    secure: false, 
    tls: {rejectUnauthorized: false},
    auth: {
      user: "prashant", 
      pass: "poiuytre2W!Q", 
    },
  });

  let info = await transporter.sendMail({
    from: '"Prashant Choudhary" <prashant@simplem.in>', 
    to: userId,
    ...content
  });

  console.log(`Message sent: ${info.messageId}`);
}

export default sendMail;