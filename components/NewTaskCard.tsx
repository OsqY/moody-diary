'use client'

import { createNewTask } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewTaskCard = () => {
  const router = useRouter()
  const handleOnClick = async () => {
    const data = await createNewTask()
    router.push(`/tasks/${data.id}`)
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white duration-300 hover:bg-white/80 hover:shadow hover:shadow-white"
      onClick={handleOnClick}
    >
      <div className="px-2 py-4 sm:p-6 text-black font-semibold">
        <span className="text-2xl">New Task</span>
      </div>
    </div>
  )
}

export default NewTaskCard
