const express = require('express');
const PORT = 3000;
const app = express();
const cors = require('cors'); 
app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from the server!');
})



const employeeRoutes = require('./routes/employeeroutes');
const employerRoutes = require('./routes/employerroutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/employers', employerRoutes);


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
