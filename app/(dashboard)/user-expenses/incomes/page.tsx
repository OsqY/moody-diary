import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import ClientSideIncomes from "@/components/ClientSideIncomes"

const getIncomes = async () => {
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findUnique({
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
      <ClientSideIncomes incomes={incomes} />
    </div>
  )
}

export default Incomes
