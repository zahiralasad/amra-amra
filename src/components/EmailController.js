import nodemailer from 'nodemailer';

// function EmailController(receiver, swishto) {
//     const transporter = nodemailer.createTransport({
//         host: "mail.amra-amra.se",
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'info@amra-amra.se',
//             pass: 'AmraShobaiAdmin'
//         },
//     });

//     transporter.sendMail({
//         to: receiver,
//         Subject: 'Test email from amra-amra',
//         html: '<h1>This email sent from amra-amra.se</h1>' 
//     }).then(() => {
//         console.log('Email sent');
//     }).catch(err => {
//         console.error(err);
//     });
// }
// export default EmailController;