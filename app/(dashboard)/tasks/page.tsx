import NewTaskCard from "@/components/NewTaskCard"
import TaskCard from "@/components/TaskCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { Prisma } from "@prisma/client"
import TasksSearchBar from "@/components/TasksSearchBar"

const getTasks = async (search: string) => {
  const user = await getUserByClerkId();
  const query = typeof search === 'string' ? search : undefined;
  let entries;

  if (query) {
    entries = await prisma.$queryRaw`
      SELECT * 
      FROM Task
      WHERE userId = ${user.id} AND Task.title LIKE CONCAT ('%', ${Prisma.sql`${search}`},  '%')
      ORDER BY Task.finishedAt DESC;
    `;
  } else {
    entries = await prisma.$queryRaw`
      SELECT * 
      FROM Task
      WHERE userId = ${user.id}
      ORDER BY Task.finishedAt DESC;
    `;
  }

  return entries;
};
const Tasks = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const tasks = await getTasks(searchParams?.search)
  const modelToSearch = {
    name: 'tasks'
  }
  return (
    <div className="p-10">
      <h2 className="text-white font-bold text-3xl mb-8">Start your objectives!</h2>
      <div className=" justify-center w-full mb-4">
        <div className="w-full max-w-lg">
          <TasksSearchBar search={searchParams?.search} />
        </div>
      </div>
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
