import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }) => {
  const user = await getUserByClerkId()
  const { amount, description, category } = await request.json()
  const userCosts = await prisma.userCosts.findUnique({
    where: {
      userId: user.id
    }
  })
  await prisma.incomes.update({
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

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params
  const user = await getUserByClerkId()
  const userCosts = await prisma.userCosts.findUnique({
    where: {
      userId: user.id
    }
  })
  await prisma.incomes.delete({
    where: {
      userCostsId_id: {
        userCostsId: userCosts?.id,
        id,
      }
    }
  })

  return NextResponse.json({ status: "deleted" })
}
