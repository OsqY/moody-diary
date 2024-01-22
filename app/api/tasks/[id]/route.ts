import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }) => {
  const { title, content, status, priority, finishedAt } = await request.json()
  const user = await getUserByClerkId()
  const updatedTask = await prisma.task.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      title,
      content,
      priority,
      status,
      finishedAt,
    }
  })
  revalidatePath('/tasks')
  return NextResponse.json({ data: { ...updatedTask } })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params
  const user = await getUserByClerkId()
  await prisma.task.delete({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    }
  })

  revalidatePath('/tasks')
  return NextResponse.json({ status: "deleted" })
}
