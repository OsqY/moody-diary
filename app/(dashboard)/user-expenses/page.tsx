import UserCostsPieChart from "@/components/UserCostsPieChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getIncomes = async () => {
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findFirst({
    where: {
      userId: user.id
    }
  })
  return await prisma.incomes.findMany({
    where: {
      userCostsId: userCosts?.id
    }
  })
}

const getExpenses = async () => {
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findFirst({
    where: {
      userId: user.id
    }
  })
  return await prisma.expenses.findMany({
    where: {
      userCostsId: userCosts?.id
    }
  })
}
const UserCosts = async () => {
  const incomes = await getIncomes()
  const expenses = await getExpenses()
  const sum = () => {
    let incomesTotal = 0
    let expensesTotal = 0
    for (let i = 0; i < incomes.length; ++i) {
      incomesTotal += incomes[i].amount
    }
    for (let i = 0; i < expenses.length; ++i) {
      expensesTotal += expenses[i].amount
    }
    return incomesTotal - expensesTotal
  }
  const totalEconomy = sum()
  return (
    <div>
      <span className='flex my-4 justify-center animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent'>
        <h1 className="text-2xl font-semibold">
          User costs
        </h1>
      </span>

      <div>
        <div className="mt-4 w-full h-64 p-4">
          {incomes.length && expenses.length ? (
            <UserCostsPieChart incomes={incomes} expenses={expenses} />
          ) : (
            <h1 className="text-white"> You don't have costs right now, make one to see a chart! </h1>
          )
          }
        </div>
      </div>
      <span className='flex my-4 justify-center animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent'>
        <h1 className="text-xl font-semibold">
          User Economy: {totalEconomy}
        </h1>
      </span>
    </div>
  );
}

export default UserCosts
