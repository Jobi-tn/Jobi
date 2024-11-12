const express = require('express');//////////
const app = express();/////////
const cors = require('cors'); ////////
const employeeRoutes = require ('./routes/Routesemployee'); 
const PORT = 3000;/////////
const jwt = require('jsonwebtoken')


app.use(cors());//////

app.use(express.json());///////
app.use(express.static(__dirname + '/../client/dist'));
app.use('/api', employeeRoutes);
const jwtsecret = "jobiwebsite"
app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
