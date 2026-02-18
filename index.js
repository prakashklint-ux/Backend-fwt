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

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Form Routes
const formRoutes = require('./routes/formRoutes');
app.use('/api/forms', formRoutes);

// Stock Routes
const stockRoutes = require('./routes/formRoutes');
app.use('/api/stocks', stockRoutes);

// Stock Auto Update
const { fetchStockData } = require('./Service/services');

// Run once on server start
fetchStockData();

// Run every 19 minutes
setInterval(fetchStockData, 19 * 60 * 1000);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
