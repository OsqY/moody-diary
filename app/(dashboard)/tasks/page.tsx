import NewTaskCard from "@/components/NewTaskCard"
import TaskCard from "@/components/TaskCard"
import Link from "next/link"
import TasksSearchBar from "@/components/TasksSearchBar"
import { getTasks } from "@/utils/actions"
import PrevNextButtonsTasks from "@/components/PrevNextButtonsTasks"

const Tasks = async ({ searchParams }: { searchParams: string | undefined }) => {
  const tasks = await getTasks(searchParams?.search || undefined, 5, searchParams?.page || 1)
  return (
    <div className="p-10">
      <h2 className="text-white font-bold text-3xl mb-8">Start your objectives!</h2>
      <div className="flex justify-between w-full mb-4 flex-col-reverse md:flex-row">
        <div className="w-full text-sm md:text-base max-w-lg my-4 md:my-0">
          <TasksSearchBar search={searchParams?.search} page={searchParams?.page || 1} />
        </div>
        <div>
          <PrevNextButtonsTasks page={searchParams?.page || 1} search={searchParams?.search || undefined} />
        </div>
      </div>
      <div className="my-4"> </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        <NewTaskCard />
        {tasks.map(task => (
          <Link href={`/tasks/${task.id}`} key={task.id}>
            <TaskCard task={task} />
          </Link>
        ))}
      </div>
    </div >
  )
}

export default Tasks
