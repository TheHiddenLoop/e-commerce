import { ShoppingCart, Users, DollarSign, TrendingUp } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { analyticalData } from "../../features/admin/adminSlice";
import { selectAnalysticalData } from "../../features/admin/adminSelectores";
import { AgCharts } from "ag-charts-react"

export default function Dashboard() {


  const dispatch = useDispatch();
  const data = useSelector(selectAnalysticalData);
  useEffect(() => {
    dispatch(analyticalData());
  }, [dispatch])
  console.log(data);
  const metrics = [
    {
      title: "Total Revenue",
      value: data.totalAmount,
      icon: DollarSign,
      color: "success",
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
      color: "primary",
    },
    {
      title: "Total Users",
      value: data.totalUser,
      icon: Users,
      color: "info",
    },
    {
      title: "Net Profit",
      value: data.netProfit,
      icon: TrendingUp,
      color: "warning",
    },
  ];

  const options = {
    data: data.category,
    title: {
      text: "Category of Products",
      fontSize: 20,
      fontWeight: "bold",
      color: "#8B5CF6",
    },
    legend: {
      item: {
        label: {
          color: "#8B5CF6"
        }
      }
    },
    series: [
      {
        type: "pie",
        angleKey: "count",
        legendItemKey: "category",
      },
    ],
    background: {
      fill: "transparent",
    },
  };

  const optionsSale = {
    autoSize: true,
    title: {
      text: 'Last 30 Days Sales & Orders',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#8B5CF6',
    },
    background: {
      fill: 'transparent',
    },
    data: data.last30Chart,
    series: [
      {
        type: 'column',
        xKey: 'date',
        yKey: 'totalSales',
        yName: 'Total Sales',
        fill: '#6366F1',
        tooltip: {
          renderer: ({ yValue }) => `$${yValue}`,
        },
      },
      {
        type: 'line',
        xKey: 'date',
        yKey: 'orderCount',
        yName: 'Order Count',
        stroke: '#F97316',
        strokeWidth: 2,
        marker: {
          size: 6,
          stroke: '#F97316',
          fill: '#8B5CF6',
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Date', color: '#8B5CF6' },
        label: { color: '#8B5CF6' }, 
        line: { color: '#8B5CF6' }, 
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Total Sales ($)', color: '#8B5CF6' },
        label: { color: '#8B5CF6' }, 
        line: { color: '#8B5CF6' },  
      },
      {
        type: 'number',
        position: 'right',
        title: { text: 'Order Count', color: '#8B5CF6' },
        label: { color: '#8B5CF6' }, 
        line: { color: '#8B5CF6' },
      },
    ],
    legend: {
      position: 'bottom',
      item: {
        label: { color: '#8B5CF6', fontWeight: 'bold' },
      },
    },
    tooltip: { enabled: true },
  };



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

      <div className="flex flex-col md:flex-row gap-6 w-full p-4 mt-10">
        <div className="flex-1 bg-[radial-gradient(circle_at_20%_70%,rgba(124,58,237,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.1)_0%,transparent_50%)] rounded-xl shadow-skin border border-border p-4 hover:shadow-md transition-shadow">
          <AgCharts options={options} />
        </div>

        <div className="flex-1 bg-[radial-gradient(circle_at_20%_70%,rgba(124,58,237,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.1)_0%,transparent_50%)] rounded-xl shadow-skin border border-border p-4 hover:shadow-md transition-shadow">
          <AgCharts options={optionsSale} />
        </div>
      </div>

    </div>
  );
}

const MetricCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-[radial-gradient(circle_at_20%_70%,rgba(124,58,237,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.1)_0%,transparent_50%)] rounded-xl shadow-skin border border-border p-6 hover:shadow-md transition-shadow flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-textPrimary mb-1">{title}</p>
        <p className="text-3xl font-bold text-textPrimary">{value}</p>
      </div>
      <div className={`p-4 rounded-full bg-${color}/20`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>

    </div>
  );
};
