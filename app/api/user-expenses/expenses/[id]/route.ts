import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }) => {
  const { amount, description, category } = await request.json()
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findUnique({
    where: {
      userId: user.id
    }
  })
  await prisma.expenses.update({
    where: {
      userCostsId_id: {
        userCostsId: userCosts?.id,
        id: params.id,
      }
    },
    data: {
      amount,
      description,
      category,
    }
  })

  return NextResponse.json({ status: "updated" })
}

export const DELETE = async ({ params }) => {
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findUnique({
    where: {
      userId: user.id
    }
  })
  await prisma.expenses.delete({
    where: {
      userCostsId_id: {
        userCostsId: userCosts?.id,
        id: params.id,
      }
    }
  })

  return NextResponse.json({ status: "deleted" })
}
