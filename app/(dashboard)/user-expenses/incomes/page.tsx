import IncomesPieChart from "@/components/IncomesPieChart"
import CreateIncomeForm from "@/components/CreateIncomeForm"
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

const Incomes = async () => {
  const incomes = await getIncomes()
  return (
    <div>
      <div className="mt-4 w-full h-64 p-4">
        {incomes.length ? (
          <IncomesPieChart data={incomes} />
        ) : (
          <h1 className="text-white"> You don't have incomes right now, make one to see a chart! </h1>
        )
        }
      </div>
      <CreateIncomeForm />
    </div>
  )
}

export default Incomes
