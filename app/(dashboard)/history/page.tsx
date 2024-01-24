import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const History = async () => {
  const { avg, analyses } = await getData()
  return (
    <div className="w-full h-full p-4 md:p-8">
      <div className="font-bold text-xl">{`Avg. Sentiment ${avg}`}</div>
      <div className="w-full h-full mt-3">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
