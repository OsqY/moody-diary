import CreateExpenseForm from "@/components/CreateExpenseForm"
import ExpensesPieChart from "@/components/ExpensesPieChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getExpenses = async () => {
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findFirst({
    where: {
      userId: user.id,
    }
  })
  return await prisma.expenses.findMany({
    where: {
      userCostsId: userCosts?.id
    }
  })
}

const Expenses = async () => {
  const expenses = await getExpenses()
  return (
    <div>
      <div className="mt-4 w-full h-64 p-4">
        {expenses.length ? (
          <ExpensesPieChart data={expenses} />
        ) : (
          <h1 className="text-white">You dont't have expenses right now, make one to see a chart</h1>
        )
        }
      </div>
      <CreateExpenseForm />
    </div>
  )
}

export default Expenses
