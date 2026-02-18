// const axios = require("axios");

// const stocks = [
//   "RELIANCE:NSE",
//   "TCS:NSE",
//   "INFY:NSE",
//   "HDFCBANK:NSE",
//   "ICICIBANK:NSE",
//   "SBIN:NSE",
//   "BHARTIARTL:NSE",
//   "ITC:NSE",
//   "LT:NSE",
//   "HINDUNILVR:NSE"
// ];

// let stockData = [];

// const fetchStockData = async () => {
//   console.log("Fetching Indian stock data from Twelve Data...");

//   stockData = []; // clear old data

//   try {
//     for (let i = 0; i < stocks.length; i++) {

//       const response = await axios.get(
//         `https://api.twelvedata.com/quote?symbol=${stocks[i]}&apikey=${process.env.TWELVE_API_KEY}`
//       );

//       if (response.data && !response.data.code) {
//         stockData.push({
//           name: response.data.name,
//           price: response.data.close,
//           updatedAt: new Date()
//         });
//       } else {
//         console.log("API Error:", response.data);
//       }

//       // IMPORTANT: free plan limit = 8 requests per minute
//       await new Promise(resolve => setTimeout(resolve, 8000)); // 8 sec delay safe

//     }

  

//   } catch (error) {
//     console.log("Error fetching stock data:", error.message);
//   }
// };

// const getStockData = () => stockData;

// module.exports = { fetchStockData, getStockData };
