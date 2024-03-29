import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
  const hours = new Date()
  hours.setHours(hours.getHours() + 2)
  const user = await getUserByClerkId()
  const task = await prisma.task.create({
    data: {
      userId: user.id,
      title: 'Task Title',
      content: 'Take Clifford to a walk',
      finishedAt: hours,
    },
  })
  revalidatePath('/tasks')
  return NextResponse.json({ data: task })
}
