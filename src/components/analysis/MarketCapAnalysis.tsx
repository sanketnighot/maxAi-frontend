import React, { useState } from "react";
import { CircleDollarSign } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

const marketCapCategories = [
  {
    name: "Blue Chip",
    percentage: 60,
    amount: 75000.0,
    tokens: ["BTC", "ETH"],
    color: "#4287f5", // bright blue
  },
  {
    name: "Mid Cap",
    percentage: 30,
    amount: 37500.0,
    tokens: ["SOL", "AVAX"],
    color: "#34c065", // green
  },
  {
    name: "Small Cap",
    percentage: 10,
    amount: 12500.0,
    tokens: ["ARB", "OP"],
    color: "#ff7b4d", // orange
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <p className="font-medium text-sm">{data.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          ${data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.percentage}%
        </p>
        <div className="flex gap-1 mt-1">
          {data.tokens.map((token: string) => (
            <span
              key={token}
              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded"
            >
              {token}
            </span>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, payload } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <line
        x1={cx + outerRadius * Math.cos(-midAngle * RADIAN)}
        y1={cy + outerRadius * Math.sin(-midAngle * RADIAN)}
        x2={x}
        y2={y}
        stroke="#fff"
        strokeWidth={1}
      />
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm"
        fill="#fff"
      >
        {`${payload.name} ${payload.percentage}%`}
      </text>
    </g>
  );
};

export function MarketCapAnalysis() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <CircleDollarSign className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Market Cap Distribution</h2>
      </div>

      <div className="space-y-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={marketCapCategories}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="percentage"
              label={renderCustomizedLabel}
            >
              {marketCapCategories.map((category) => (
                <Cell key={category.name} fill={category.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
