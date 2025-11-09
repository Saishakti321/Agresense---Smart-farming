import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  MapPin,
  RefreshCw,
  Search,
  Filter,
  Info,
  Download,
  Bell,
  Eye,
  Star,
  BarChart3,
  Activity,
} from "lucide-react";

const MarketAnalysis = () => {
  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [states, setStates] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [priceStats, setPriceStats] = useState(null);
  const [demoMode, setDemoMode] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-high");

  // -----------------------------
  // Generate sample data (fallback)
  // -----------------------------
  const generateSampleData = useCallback(() => {
    const sampleStates = [
      "Maharashtra",
      "Punjab",
      "Uttar Pradesh",
      "Karnataka",
      "Gujarat",
      "Haryana",
      "Madhya Pradesh",
      "Rajasthan",
    ];
    const sampleCommodities = [
      "Wheat",
      "Rice",
      "Onion",
      "Potato",
      "Tomato",
      "Cotton",
      "Soybean",
      "Sugarcane",
      "Maize",
      "Bajra",
    ];
    const districts = {
      Maharashtra: ["Mumbai", "Pune", "Nashik", "Nagpur", "Aurangabad"],
      Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
      "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
      Karnataka: ["Bangalore", "Mysore", "Hubli", "Belgaum", "Mangalore"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
      Haryana: ["Chandigarh", "Faridabad", "Gurgaon", "Karnal", "Panipat"],
      "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
      Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    };

    const basePrices = {
      Wheat: 2500,
      Rice: 3500,
      Onion: 2000,
      Potato: 1500,
      Tomato: 2500,
      Cotton: 6000,
      Soybean: 5000,
      Sugarcane: 3000,
      Maize: 2000,
      Bajra: 2200,
    };

    const data = [];
    sampleStates.forEach((state) => {
      const stateDistricts = districts[state];
      sampleCommodities.forEach((commodity) => {
        const numMarkets = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numMarkets; i++) {
          const district =
            stateDistricts[Math.floor(Math.random() * stateDistricts.length)];
          const basePrice = basePrices[commodity];
          const variation = 1 + (Math.random() - 0.5) * 0.3;
          const modalPrice = Math.round(basePrice * variation);
          const minPrice = Math.round(modalPrice * 0.9);
          const maxPrice = Math.round(modalPrice * 1.1);
          const arrivals = Math.floor(Math.random() * 500) + 100;
          const lastWeekPrice = Math.round(
            modalPrice * (0.95 + Math.random() * 0.1)
          );

          data.push({
            id: `${state}-${commodity}-${i}`,
            state,
            district,
            market: `${district} Mandi ${i + 1}`,
            commodity,
            variety: `${commodity} - Grade A`,
            min_price: minPrice.toString(),
            max_price: maxPrice.toString(),
            modal_price: modalPrice.toString(),
            last_week_price: lastWeekPrice.toString(),
            arrivals,
            arrival_date: new Date().toISOString().split("T")[0],
            trend: modalPrice > lastWeekPrice ? "up" : "down",
            change_percent: (
              ((modalPrice - lastWeekPrice) / lastWeekPrice) *
              100
            ).toFixed(2),
          });
        }
      });
    });
    return data;
  }, []);

  // -----------------------------
  // Fetch API data
  // -----------------------------
  const fetchMarketData = useCallback(async () => {
    setLoading(true);
    try {
      const apiKey =
        "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
      const response = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=200`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.records && data.records.length > 0) {
          setMarketData(data.records);
          setFilteredData(data.records);

          const uniqueStates = [
            ...new Set(data.records.map((item) => item.state)),
          ];
          const uniqueCommodities = [
            ...new Set(data.records.map((item) => item.commodity)),
          ];

          setStates(uniqueStates.sort());
          setCommodities(uniqueCommodities.sort());
          setDemoMode(false);
          setLoading(false);
          return;
        }
      }
      throw new Error("API unavailable");
    } catch (err) {
      console.warn("Falling back to sample data:", err);
      const sampleData = generateSampleData();
      setMarketData(sampleData);
      setFilteredData(sampleData);
      const uniqueStates = [...new Set(sampleData.map((i) => i.state))];
      const uniqueCommodities = [...new Set(sampleData.map((i) => i.commodity))];
      setStates(uniqueStates.sort());
      setCommodities(uniqueCommodities.sort());
      setDemoMode(true);
    } finally {
      setLoading(false);
    }
  }, [generateSampleData]);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  // -----------------------------
  // Stats calculation
  // -----------------------------
  const calculateStats = useCallback((data) => {
    if (data.length === 0) {
      setPriceStats(null);
      return;
    }
    const prices = data
      .map((i) => parseFloat(i.modal_price || 0))
      .filter((p) => p > 0);
    const minPrices = data
      .map((i) => parseFloat(i.min_price || 0))
      .filter((p) => p > 0);
    const maxPrices = data
      .map((i) => parseFloat(i.max_price || 0))
      .filter((p) => p > 0);
    if (prices.length > 0) {
      const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
      const min = Math.min(...minPrices);
      const max = Math.max(...maxPrices);
      const variation = ((max - min) / min) * 100;
      const upTrend = data.filter((i) => i.trend === "up").length;
      const trendPercent = ((upTrend / data.length) * 100).toFixed(0);
      setPriceStats({
        avgPrice: avg.toFixed(2),
        minPrice: min.toFixed(2),
        maxPrice: max.toFixed(2),
        totalMarkets: data.length,
        variationPercent: variation.toFixed(2),
        trendPercent,
      });
    }
  }, []);

  // -----------------------------
  // Filters & sorting
  // -----------------------------
  const processedData = useMemo(() => {
    let filtered = [...marketData];
    if (selectedState)
      filtered = filtered.filter((i) => i.state === selectedState);
    if (selectedCommodity)
      filtered = filtered.filter((i) => i.commodity === selectedCommodity);
    if (searchTerm)
      filtered = filtered.filter(
        (i) =>
          i.market?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.commodity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.district?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    switch (sortBy) {
      case "price-high":
        filtered.sort(
          (a, b) => parseFloat(b.modal_price) - parseFloat(a.modal_price)
        );
        break;
      case "price-low":
        filtered.sort(
          (a, b) => parseFloat(a.modal_price) - parseFloat(b.modal_price)
        );
        break;
      default:
        break;
    }
    return filtered;
  }, [marketData, selectedState, selectedCommodity, searchTerm, sortBy]);

  useEffect(() => {
    setFilteredData(processedData);
    calculateStats(processedData);
  }, [processedData, calculateStats]);

  // -----------------------------
  // Render Section
  // -----------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="text-green-600" /> Mandi Market Analysis
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time commodity insights across Indian mandis
          </p>
        </div>

        {demoMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Info className="text-blue-600 mt-1" />
            <p className="text-blue-700 text-sm">
              Showing demo data due to API limitation. Connect to{" "}
              <b>data.gov.in</b> for live mandi data.
            </p>
          </div>
        )}

        {priceStats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-5 text-center">
              <DollarSign className="text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">Avg Price</p>
              <h3 className="text-xl font-bold text-gray-800">
                ₹{priceStats.avgPrice}
              </h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-5 text-center">
              <Activity className="text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Price Range</p>
              <h3 className="text-xl font-bold text-gray-800">
                ₹{priceStats.minPrice} - ₹{priceStats.maxPrice}
              </h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-5 text-center">
              <MapPin className="text-purple-600 mx-auto mb-2" />
              <p className="text-gray-600">Markets</p>
              <h3 className="text-xl font-bold">{priceStats.totalMarkets}</h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-5 text-center">
              <TrendingUp className="text-orange-600 mx-auto mb-2" />
              <p className="text-gray-600">Trending Up</p>
              <h3 className="text-xl font-bold">{priceStats.trendPercent}%</h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-5 text-center">
              <Star className="text-yellow-500 mx-auto mb-2" />
              <p className="text-gray-600">Favorites</p>
              <h3 className="text-xl font-bold">{favorites.length}</h3>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Market Summary
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="commodity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="modal_price" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
