import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import JournalSearchBar from "@/components/JournalSearchBar"
import Link from "next/link"
import { getEntries } from "@/utils/actions"
import PrevNextButtonsEntries from "@/components/PrevNextButtonsEntries"


const JournalPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const entries = await getEntries(searchParams?.search, 5, searchParams?.page || 1)
  return (
    <div className="p-10">
      <h2 className="text-white font-bold text-3xl mb-8">Start journaling </h2>
      <div className="flex justify-between w-full mb-4 flex-col-reverse md:flex-row">
        <div className="w-full text-sm md:text-base max-w-lg my-4 md:my-0">
          <JournalSearchBar search={searchParams?.search} />
        </div>
        <div className="text-sm md:text-base">
          <PrevNextButtonsEntries page={searchParams?.page || 1} search={searchParams?.search || undefined} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        <NewEntryCard />
        {entries.map(entry => (
          <Link href={`/journal/${entry.entryId}`} key={entry.entryId}>
            <EntryCard entry={entry} />
          </Link>))}
      </div>
    </div >
  )
}

export default JournalPage
