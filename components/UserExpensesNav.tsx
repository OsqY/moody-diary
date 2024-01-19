'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const UserExpensesNav = () => {
  const pathname = usePathname()
  return (
    <div>
      <Link href={'/user-expenses'}>
        {!pathname.includes('/expenses') && !pathname.includes('/incomes') ? (
          <button className='relative inline-flex py-2.5 px-5 me-2 mb-2 text-sm items-center justify-center rounded-md bg-white font-medium text-black transition-colors outline-none ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-50'>
            <div className='absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur' />
            User costs
          </button>
        ) : (
          <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">User costs</button>
        )}
      </Link>
      <Link href={'/user-expenses/expenses'}>
        {!pathname.includes('/incomes') && pathname.includes('/expenses') ? (

          <button className='relative inline-flex py-2.5 px-5 me-2 mb-2 text-sm items-center justify-center rounded-md bg-white font-medium text-black transition-colors outline-none ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-50'>
            <div className='absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur' />
            Expenses
          </button>
        ) : (
          <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Expenses</button>
        )}
      </Link>
      <Link href={'/user-expenses/incomes'}>
        {!pathname.includes('/expenses') && pathname.includes('/incomes') ? (
          <button className='relative inline-flex py-2.5 px-5 me-2 mb-2 text-sm items-center justify-center rounded-md bg-white font-medium text-black transition-colors outline-none ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-50'>
            <div className='absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur' />
            Incomes
          </button>
        ) : (
          <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Incomes</button>
        )}
      </Link>
    </div>
  )
}

export default UserExpensesNav
