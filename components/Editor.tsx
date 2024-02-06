'use client'

import { deleteEntry, updateEntry } from "@/utils/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAutosave } from "react-autosave"

const Editor = ({ entry }) => {
  const router = useRouter()
  const [value, setValue] = useState(entry?.content ?? "Write about your day")
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, summary, color, subject, negative } = analysis ?? {}
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setAnalysis(updated.analysis)
      setIsLoading(false)
    },
  })

  const handleDelete = async () => {
    const status = await deleteEntry(entry.id)
    if (status) {
      router.push('/journal')
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-2 p-4">
        <div className="col-span-2 p-4">
          {isLoading && <div role="status ">
            <svg aria-hidden="true" className="inline w-4 h-4 animate-spin text-gray-600 fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>}
          <label htmlFor="value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write about your day or how are you feeling!</label>
          <textarea value={value} onChange={e => setValue(e.target.value)} id="message" rows={7} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="I found garfield eating my lasagna >:("></textarea>
          <button id="dropdownDefaultButton" onClick={handleDelete} className="text-white ml-4 my-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center " type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
        <div className="border-l border-white/80 mt-4 md:mt-0 md:border-t-0">
          <div className="px-4 py-8 md:px-6 md:py-10" style={{ backgroundColor: color }}>
            <h2 className="text-lg font-semibold md:text-xl">
              Analysis
            </h2>
          </div>
          <div>
            <ul>
              {analysisData.map(item => (
                <li key={item.name} className="p-2 md:p-3 flex items-center justify-between border border-white/80">
                  <span className="ml-2 text-base font-semibold md:text-lg"> {item.name} </span>
                  <span className="text-white"> {item.value} </span>
                </li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
