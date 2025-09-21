import { ShoppingCart, Users, DollarSign, TrendingUp } from "lucide-react";
import React from "react";

export default function Dashboard() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "₹50,000",
      icon: DollarSign,
      color: "success",
    },
    {
      title: "Total Orders",
      value: "120",
      icon: ShoppingCart,
      color: "primary",
    },
    {
      title: "Total Users",
      value: "75",
      icon: Users,
      color: "info",
    },
    {
      title: "Net Profit",
      value: "₹18,000",
      icon: TrendingUp,
      color: "warning",
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard
            key={idx}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      
    </div>
  );
}

const MetricCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-textSecondary mb-1">{title}</p>
        <p className="text-3xl font-bold text-textPrimary">{value}</p>
      </div>
      <div className={`p-4 rounded-full bg-${color}/20`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>
    </div>
  );
};
