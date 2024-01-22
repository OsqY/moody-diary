'use client'

import { useState } from "react"
import IncomesPieChart from "./IncomesPieChart"
import CreateIncomeForm from "./CreateIncomeForm"

const ClientSideIncomes = ({ incomes }) => {
  const [selectedIncome, setSelectedIncome] = useState(null)

  const onPieClick = (data) => {
    setSelectedIncome(data)
  }

  return (
    <div>
      <span className='flex my-4 justify-center animate-background-shine bg-[linear-gradient(110deg,#1976d2,45%,#D1D1D1,55%,#1976d2)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent'>
        <h1 className="text-2xl font-semibold">
          User Incomes
        </h1>
      </span>
      <div className="mt-4 w-full h-64 p-4">
        {incomes.length ? (
          <IncomesPieChart data={incomes} onPieClick={onPieClick} />
        ) : (
          <h1 className="text-white">You dont't have incomes right now, make one to see a chart</h1>
        )
        }
      </div>
      <CreateIncomeForm defaultIncome={selectedIncome} />
    </div>
  )
}

export default ClientSideIncomes
