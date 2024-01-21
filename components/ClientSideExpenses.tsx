'use client'
import { useState } from "react"
import ExpensesPieChart from "./ExpensesPieChart"
import CreateExpenseForm from "./CreateExpenseForm"

const ClientSideExpenses = ({ expenses }) => {
  const [selectedExpense, setSelectedExpense] = useState(null)

  const onPieClick = (data) => {
    setSelectedExpense(data)
  }

  return (
    <div>
      <span className='flex my-4 justify-center animate-background-shine bg-[linear-gradient(110deg,#D32F2F,45%,#D1D1D1,55%,#D32F2F)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent'>
        <h1 className="text-2xl font-semibold">
          User Expenses
        </h1>
      </span>
      <div className="mt-4 w-full h-64 p-4">
        {expenses.length ? (
          <ExpensesPieChart data={expenses} onPieClick={onPieClick} />
        ) : (
          <h1 className="text-white">You dont't have expenses right now, make one to see a chart</h1>
        )
        }
      </div>
      <CreateExpenseForm defaultExpense={selectedExpense} />
    </div>
  )
}

export default ClientSideExpenses
