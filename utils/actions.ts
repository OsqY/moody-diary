import { Prisma } from "@prisma/client"
import { prisma } from "./db"
import { getUserByClerkId } from "./auth"

export const getEntries = async (search: string, limit: number, page: number) => {
  const user = await getUserByClerkId()
  const query = typeof search === 'string' ? search : undefined
  const limitQuery = typeof limit === 'number' ? limit : undefined
  const pageQuery = typeof page === 'number' ? page : undefined
  const offset = (page - 1) * limit
  let entries
  if (query || limitQuery || pageQuery) {
    if (!query) {
      entries = await prisma.$queryRaw(Prisma.sql`
      SELECT * 
      FROM JournalEntry
      JOIN Analysis ON Analysis.entryId = JournalEntry.id
      WHERE JournalEntry.userId = ${user.id}
    ORDER BY JournalEntry.createdAt DESC LIMIT ${limit} OFFSET ${offset} ;
    `)

    } else {
      entries = await prisma.$queryRaw`
    SELECT * 
    FROM JournalEntry
    JOIN Analysis ON JournalEntry.id = Analysis.entryId
    WHERE JournalEntry.userId = ${user.id} AND JournalEntry.content LIKE CONCAT('%', ${Prisma.sql`${query}`}, '%')
    ORDER BY JournalEntry.createdAt DESC LIMIT ${limit} OFFSET ${offset} ;
  `

    }
  } else {
    entries = await prisma.$queryRaw(Prisma.sql`
      SELECT * 
      FROM JournalEntry
      JOIN Analysis ON Analysis.entryId = JournalEntry.id
      WHERE JournalEntry.userId = ${user.id}
    ORDER BY JournalEntry.createdAt DESC LIMIT 5 ;
    `)
  }

  if (!entries) {
    throw new Error('Entries not found')
  }

  return entries
}

export const getTasks = async (search: string | undefined, limit: number, page: number) => {
  const user = await getUserByClerkId();
  const query = typeof search === 'string' ? search : undefined;
  const limitQuery = typeof limit === 'number' ? limit : undefined;
  const pageQuery = typeof page === 'number' ? page : undefined;
  const offset = (page - 1) * limit
  let tasks;

  if (query || pageQuery || limitQuery) {
    if (!query) {
      tasks = await prisma.$queryRaw`
      SELECT * 
      FROM Task
      WHERE userId = ${user.id}
      ORDER BY Task.finishedAt DESC LIMIT ${limit ?? 5} OFFSET ${offset};
    `;

    } else {

      tasks = await prisma.$queryRaw`
      SELECT * 
      FROM Task
      WHERE userId = ${user.id} AND Task.title LIKE CONCAT ('%', ${Prisma.sql`${search}`},  '%')
      ORDER BY Task.finishedAt DESC LIMIT ${limit ?? 5} OFFSET ${offset};
    `;
    }
  } else {
    tasks = await prisma.$queryRaw`
      SELECT * 
      FROM Task
      WHERE userId = ${user.id}
      ORDER BY Task.finishedAt DESC LIMIT 5;
    `;
  }

  return tasks;
};
