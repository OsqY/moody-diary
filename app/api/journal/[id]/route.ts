import { analyze } from "@/utils/ai"
import { updateEntry } from "@/utils/api"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id
    },
    create: {
      ...(await analyze(updatedEntry.content)),
    },
  })
  return NextResponse.json({ data: updatedEntry })
}
