const axios = require("axios");

const stocks = [
  "AAPL","MSFT","GOOGL","AMZN","TSLA",
  "META","NVDA","NFLX","AMD","INTC"
];

let stockData = [];

const fetchStockData = async () => {
  console.log("Fetching stock data...");

  for (let i = 0; i < stocks.length; i++) {
    try {
      const response = await axios.get(
        `https://api.twelvedata.com/price?symbol=${stocks[i]}&apikey=${process.env.TWELVE_API_KEY}`
      );

      stockData[i] = {
        symbol: stocks[i],
        price: response.data.price,
        updatedAt: new Date()
      };

      // 1 second delay (avoid 8/min limit)
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.log("Error fetching", stocks[i]);
    }
  }

  console.log("Stock update completed");
};

const getStockData = () => stockData;

module.exports = { fetchStockData, getStockData };
