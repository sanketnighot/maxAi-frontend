import React, { useState } from "react";
import { Tag } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const categories = [
  { name: "DeFi", percentage: 35, amount: 43586.51, color: "#A78BFA" }, // purple-500
  { name: "Gaming", percentage: 25, amount: 31133.22, color: "#3B82F6" }, // blue-500
  {
    name: "Infrastructure",
    percentage: 20,
    amount: 24906.58,
    color: "#10B981",
  }, // green-500
  { name: "AI", percentage: 15, amount: 18679.93, color: "#F97316" }, // orange-500
  { name: "Meme", percentage: 5, amount: 6226.64, color: "#EC4899" }, // pink-500
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
      </div>
    );
  }
  return null;
};

export function CategoryAnalysis() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Category Distribution</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Pie Chart */}
        <div className="w-full md:w-1/2 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="amount"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                    className="transition-opacity duration-200"
                    style={{
                      opacity:
                        activeIndex === null || activeIndex === index ? 1 : 0.6,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full md:w-1/2 space-y-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="flex items-center gap-3"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    $
                    {category.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="mt-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                      opacity:
                        activeIndex === null || activeIndex === index ? 1 : 0.6,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}