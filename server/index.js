const express = require('express');//////////
const PORT = 3000;
const app = express();/////////
const cors = require('cors'); ////////
const jobRoutes = require('./routes/jobroutes');
const postroutes =require('./routes/postroutes')
const nodemailer = require('nodemailer');

app.use(cors());//////

app.use(express.json());///////
app.use(express.static(__dirname + '/../client/dist'));

app.use('/posts', postroutes)

app.use('/jobs', jobRoutes)
app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mejrisaif2020@gmail.com', 
    pass: 'hxqk duxl gtwz jyrw',  
  },
});

app.post('/send-email', (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  const mailOptions = {
    from: 'mejrisaif2020@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});






app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
