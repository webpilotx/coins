import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [timeRange, setTimeRange] = useState("hourly");

  useEffect(() => {
    // Fetch cryptocurrency data based on the selected time range
    async function fetchCoins() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=${timeRange}`
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    }
    fetchCoins();
  }, [timeRange]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
              <h1 className="text-4xl font-bold mb-6">Crypto Prices</h1>
              <div className="mb-4">
                <label htmlFor="timeRange" className="mr-2">
                  Select Time Range:
                </label>
                <select
                  id="timeRange"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                >
                  <option value="1h">Hourly</option>
                  <option value="24h">Daily</option>
                  <option value="7d">Weekly</option>
                  <option value="30d">Monthly</option>
                  <option value="1y">Year to Date</option>
                </select>
              </div>
              <div className="w-full max-w-4xl">
                <table className="table-auto w-full text-left bg-gray-800 rounded-lg">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Coin</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coins.map((coin, index) => (
                      <tr key={coin.id} className="border-t border-gray-700">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 flex items-center">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="h-6 w-6 mr-2"
                          />
                          {coin.name}
                        </td>
                        <td className="px-4 py-2">${coin.current_price}</td>
                        <td
                          className={`px-4 py-2 ${
                            coin.price_change_percentage_24h > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
