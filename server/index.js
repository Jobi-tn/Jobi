const express = require('express');//////////
const app = express();/////////
const cors = require('cors'); ////////
const authRoutes = require('./routes/authRoutes');
const PORT = 3000;/////////
const jobRoutes = require('./routes/jobroutes');
const postroutes =require('./routes/postroutes')


app.use(cors());

app.use(express.json());///////
app.use(express.static(__dirname + '/../client/dist'));
app.use('/auth', authRoutes);
app.use('/posts', postroutes)
app.use('/jobs', jobRoutes)
app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
