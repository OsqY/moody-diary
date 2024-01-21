'use client'

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    return (
      <div className="p-4 custom-tooltip bg-black shadow-md border border-black/10 rounded-lg relative text-white">
        <p className="intro text-sm font-bold">{payload[0].payload.amount}</p>
        <p className="intro text-sm font-bold">{payload[0].payload.category}</p>
      </div>
    )
  }
  return null
}

const renderLabel = (entry) => {
  return entry.description
}

const IncomesPieChart = ({ data, onPieClick }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
        <Pie
          dataKey={"amount"}
          isAnimationActive={false}
          data={data}
          cx={"50%"}
          cy={"50%"}
          outerRadius={56}
          fill="#1976D2"
          label={renderLabel}
          onClick={onPieClick} />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )

}

export default IncomesPieChart
