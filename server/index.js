const express = require('express');//////////
const PORT = 3000;
const app = express();/////////
const cors = require('cors'); ////////
const jobRoutes = require('./routes/jobroutes');
const postroutes =require('./routes/postroutes')


app.use(cors());//////

app.use(express.json());///////
app.use(express.static(__dirname + '/../client/dist'));

app.use('/posts', postroutes)

app.use('/jobs', jobRoutes)
app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
