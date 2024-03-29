import TaskEditor from "@/components/TaskEditor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getTask = async (id) => {
  const user = await getUserByClerkId()
  const task = await prisma.task.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      }
    }
  })
  return task
}


const TaskPage = async ({ params }) => {
  const task = await getTask(params.id)
  return (
    <div className="h-full w-full">
      <TaskEditor task={task} />
    </div>
  )
}

export default TaskPage
