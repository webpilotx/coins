import { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./index.css";

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [timeRange, setTimeRange] = useState("hourly");
  const navigate = useNavigate();

  useEffect(() => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Crypto Prices</h1>
      <div className="mb-4">
        <label htmlFor="timeRange" className="mr-2">
          Select Time Range:
        </label>
        <select
          id="timeRange"
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
              <tr
                key={coin.id}
                className="border-t border-gray-700 cursor-pointer hover:bg-gray-700"
                onClick={() => navigate(`/${coin.id}`)}
              >
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
  );
}

function CoinDetail() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    }
    fetchCoinData();
  }, [coinId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Back to Coins List
      </button>
      <h1 className="text-4xl font-bold mb-6">Coin Price Chart</h1>
      {coinData ? (
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg">
          {/* Placeholder for chart */}
          <p className="text-center text-gray-400">Chart data for {coinId}</p>
          {/* You can integrate a chart library like Chart.js or Recharts here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/:coinId" element={<CoinDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
