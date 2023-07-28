const express = require('express');
const mongoose = require('mongoose');
const taskRoute = require('./routes/taskRoute');
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1',
    'https://todo-app-frontend-six-lilac.vercel.app'
  ],  
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const uri = process.env.DB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'todoDB'
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/tasks", taskRoute);
app.use("/api/users", userRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});