import { Banknote, CalendarDays, Users, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getStats, listSubscriptions } from "../services/subscriptionsService";
import SubscriptionsTable from "../components/overview/SubscriptionsTable";
import PotentialSavingsChart from "../components/overview/PotentialSavingsChart";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [subs, setSubs] = useState([]);

  const fetchData = async () => {
    try {
      const statsRes = await getStats();
      const subsRes = await listSubscriptions();
      setStats(statsRes.data);
      setSubs(subsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <StatCard
            name="Monthly Spend"
            icon={Banknote}
            value={`${(stats?.total_monthly_cost || 0).toFixed(2)} SAR`}
            color="#6366F1"
          />
          <StatCard
            name="Yearly Spend"
            icon={Users}
            value={`${(stats?.projected_yearly || 0).toFixed(2)} SAR`}
            color="#8B5CF6"
          />
          <StatCard
            name="Active Subscriptions"
            icon={CalendarDays}
            value={subs.filter((s) => s.is_active).length}
            color="#EC4899"
          />
          <StatCard
            name="Upcoming Payments"
            icon={Bell}
            value={stats?.upcoming_renewals?.length || 0}
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
          <SalesOverviewChart subscriptions={subs} />
          <CategoryDistributionChart subscriptions={subs} />
          <SalesChannelChart subscriptions={subs} />
        </div>

        {/* TABLE */}
        <div className="grid gap-8 py-6">
          <PotentialSavingsChart subscriptions={subs} />

          <SubscriptionsTable subscriptions={subs} onRefresh={fetchData} />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
