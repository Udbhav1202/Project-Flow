const express = require('express')
const dotenv =  require('dotenv').config();
const cors = require("cors");
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes  = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();


app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
