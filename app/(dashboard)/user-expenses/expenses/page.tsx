import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import ClientSideExpenses from "@/components/ClientSideExpenses"

const getExpenses = async () => {
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findUnique({
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
      <ClientSideExpenses expenses={expenses} />
    </div>
  )
}

export default Expenses
