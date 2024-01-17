'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"

const JournalSearchBar = ({ search }: { search?: string }) => {
  const router = useRouter()
  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const query = useDebounce(text, 400)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    if (!query) {
      router.push('/journal')
    } else {
      router.push(`/journal?search=${query}`)
    }
  }, [query, router])

  return (
    <div className='relative rounded-md shadow-sm'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <input
        value={text}
        placeholder='Search journal entries'
        onChange={e => setText(e.target.value)}
        className='block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
      />
    </div>
  )
}
export default JournalSearchBar
