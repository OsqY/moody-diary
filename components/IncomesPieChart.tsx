'use client'

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    return (
      <div className="p-2 bg-white shadow rounded">
        <p className="label text-black">{`${payload[0].payload.category} : ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

const renderLabel = (entry) => {
  return entry.description
}

const IncomesPieChart = ({ data }) => {
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
          label={renderLabel} />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )

}

export default IncomesPieChart