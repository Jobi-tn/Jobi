const express = require('express');//////////
const app = express();/////////
const cors = require('cors'); ////////
<<<<<<< HEAD
const employeeRoutes = require ('./routes/Routesemployee'); 
const PORT = 3000;/////////
const jwt = require('jsonwebtoken')
=======
const jobRoutes = require('./routes/jobroutes');
const postroutes =require('./routes/postroutes')
>>>>>>> 53afdb6035c1ac1ea8d63fa01e4fe63033cc2664


app.use(cors());//////

app.use(express.json());///////
app.use(express.static(__dirname + '/../client/dist'));
<<<<<<< HEAD
app.use('/api', employeeRoutes);
const jwtsecret = "jobiwebsite"
=======

app.use('/posts', postroutes)

app.use('/jobs', jobRoutes)
>>>>>>> 53afdb6035c1ac1ea8d63fa01e4fe63033cc2664
app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
