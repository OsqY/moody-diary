'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewEntryCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white duration-300 hover:bg-white/80 hover:shadow hover:shadow-white"
      onClick={handleOnClick}
    >
      <div className="px-2 py-4 sm:p-6 text-black font-semibold">
        <span className="text-2xl">New Entry</span>
      </div>
    </div>
  )
}
export default NewEntryCard
