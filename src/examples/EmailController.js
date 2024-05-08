import nodemailer from 'nodemailer';
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Route to handle incoming data
app.post('EmailContorller.js', (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);
  
  // Process the received data as needed
  
  // Send a response back to the client
  res.json({ message: 'Data received successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
//function EmailController(receiver, swishto) {
    // const transporter = nodemailer.createTransport({
    //     host: "mail.amra-amra.se",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'info@amra-amra.se',
    //         pass: 'AmraShobaiAdmin'
    //     },
    // });

    // transporter.sendMail({
    //     to: receiver,
    //     Subject: 'Test email from amra-amra',
    //     html: '<h1>This email sent from amra-amra.se</h1>' 
    // }).then(() => {
    //     console.log('Email sent');
    // }).catch(err => {
    //     console.error(err);
    // });
// }
// export default EmailController;