import NewTaskCard from "@/components/NewTaskCard"
import TaskCard from "@/components/TaskCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"

const getTasks = async () => {
  const user = await getUserByClerkId()
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return tasks
}

const Tasks = async () => {
  const tasks = await getTasks()
  return (
    <div className="p-10">
      <h2 className="text-white font-bold text-3xl mb-8">Start your objectives!</h2>
      <div className="my-4">
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        <NewTaskCard />
        {tasks.map(task => (
          <Link href={`/tasks/${task.id}`} key={task.id}>
            <TaskCard task={task} />
          </Link>))}
      </div>
    </div>
  )
}

export default Tasks
