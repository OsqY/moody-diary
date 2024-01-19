import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const user = await getUserByClerkId()
  const { amount, description, category } = await request.json()
  const userCosts = await prisma.userCosts.upsert({
    where: {
      userId: user.id,
    },
    update: {},
    create: {
      userId: user.id,
    }
  })
  await prisma.expenses.create({
    data: {
      userCostsId: userCosts?.id,
      amount,
      description,
      category,
    }
  })

  return NextResponse.json({ status: "created" })

}
