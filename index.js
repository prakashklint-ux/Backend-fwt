const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fin-wise-tools.vercel.app",
      "https://finwisetools.online"
    ],
    credentials: true
  })
);


app.use(express.json());

// Routes 
app.get('/', (req, res) => {
  res.send('API is running...');
});


const formRoutes = require('./routes/formRoutes');

app.use('/api/forms', formRoutes);

const startCronJobs = require('./jobs/cronJobs');
startCronJobs();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
