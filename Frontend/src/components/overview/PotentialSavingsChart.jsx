import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const PotentialSavingsChart = () => {
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/subscriptions/stats/");
        const savings = res.data.potential_savings.map((item) => ({
          name: item.name,
          saving: item.potential_yearly_saving,
          isSaving: item.potential_yearly_saving > 0,
        }));
        setSavingsData(savings);
      } catch (err) {
        console.error("Error fetching savings:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Potential Yearly Savings
      </h2>
      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              formatter={(value) =>
                value > 0
                  ? [`${value} SAR saved`, "Saving"]
                  : [`${Math.abs(value)} SAR loss`, "Loss"]
              }
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Bar dataKey="saving">
              {savingsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isSaving ? "#10B981" : "#EF4444"} // أخضر توفير، أحمر خسارة
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PotentialSavingsChart;
