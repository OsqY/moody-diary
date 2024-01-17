'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const PrevNextButtonsEntries = ({ page }: { page?: number }, { search }: { search?: string }) => {
  const router = useRouter()
  const [queryPage, setPage] = useState(page || 1)

  useEffect(() => {
    if (!queryPage) {
      if (search) {
        router.push(`/journal?search=${search}`)
      } else {
        router.push('/journal')
      }
    } else {
      if (search) {
        router.push(`/journal?search=${search}&page=${queryPage}`)
      } else {
        router.push(`/journal?page=${queryPage}`)
      }
    }
  }, [queryPage, search, router])

  return (
    <div className="max-w-lg container flex">
      <div className="flex flex-row">
        <button onClick={() => setPage(queryPage => queryPage ? Number(queryPage) - 1 : queryPage)} type="button" className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3">
          <div className="flex flex-row align-middle">
            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <p className="ml-2">Prev</p>
          </div>
        </button>
        <button onClick={() => setPage(queryPage => queryPage ? Number(queryPage) + 1 : queryPage)} type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-blue-700 hover:text-white px-3">
          <div className="flex flex-row align-middle">
            <span className="mr-2">Next</span>
            <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>

  )
}
export default PrevNextButtonsEntries
