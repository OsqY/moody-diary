import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }) => {
  const { title, content, status, priority } = await request.json()
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
    }
  })

  return NextResponse.json({ data: { ...updatedTask } })
}
