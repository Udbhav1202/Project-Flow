const express = require('express')
const dotenv =  require('dotenv').config();
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes  = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express()
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();


app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
