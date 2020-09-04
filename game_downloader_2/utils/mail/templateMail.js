const config = require("config");
const clientOrigin = config.get("clientOrigin");

const resMsgs = {
    confirm: 'Email sent, please check your inbox to confirm',
    confirmed: 'Your email is confirmed!',
    resend: 'Confirmation email resent, maybe check your spam?',
    couldNotFind: 'Could not find you!',
    alreadyConfirmed: 'Your email was already confirmed'
};

const confirm = id => ({
    subject: 'Game confirmation Link',
    html: `
      <a href='${clientOrigin}/confirm/${id}'>
        Click here to verify your Email!
      </a>
    `,      
    text: `Copy and paste this link: ${clientOrigin}/confirm/${id}`
});

const forgot = id => ({
  subject: 'Forgot Password?',
  html: `
    <a href='${clientOrigin}/confirm/${id}'>
      Click here to verify your Email!
    </a>
  `,      
  text: `Copy and paste this link: ${clientOrigin}/confirm/${id}`
});


  
export {confirm,forgot,resMsgs};
