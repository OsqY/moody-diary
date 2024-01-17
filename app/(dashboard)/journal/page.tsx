import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import JournalSearchBar from "@/components/JournalSearchBar"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { Prisma } from "@prisma/client"
import Link from "next/link"

const getEntries = async (search: string) => {
  const user = await getUserByClerkId()
  const query = typeof search === 'string' ? search : undefined
  console.log(search)
  console.log(query)
  let entries
  if (query) {
    entries = await prisma.$queryRaw`
    SELECT * 
    FROM JournalEntry
    JOIN Analysis ON JournalEntry.id = Analysisi.entryId
    WHERE JournalEntry.userId = ${user.id} AND JournalEntry.content LIKE CONCAT('%', ${Prisma.sql`${query}`}, '%')
    ORDER BY JournalEntry.createdAt DESC;
  `
  } else {
    entries = await prisma.$queryRaw(Prisma.sql`
      SELECT * 
      FROM JournalEntry
      JOIN Analysis ON Analysis.entryId = JournalEntry.id
      WHERE JournalEntry.userId = ${user.id}
      ORDER BY JournalEntry.createdAt DESC;
    `)
  }

  if (!entries) {
    throw new Error('Entries not found')
  }

  return entries
}

const JournalPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const entries = await getEntries(searchParams?.search)
  return (
    <div className="p-10">
      <h2 className="text-white font-bold text-3xl mb-8">Start journaling </h2>
      <div className=" justify-center w-full mb-4">
        <div className="w-full max-w-lg">
          <JournalSearchBar search={searchParams?.search} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        <NewEntryCard />
        {entries.map(entry => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>))}
      </div>
    </div>
  )
}

export default JournalPage
