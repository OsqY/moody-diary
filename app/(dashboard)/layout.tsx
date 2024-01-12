import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative bg-gray-950 text-white">
      <aside className="absolute top-0 left-0 w-[200px] h-full border-r border-white/60 font-semibold text-xl">
        <div className="mb-2 text-2xl p-4">
          Moody
        </div>
        <ul>
          {links.map(link => (
            <li key={link.href} className="p-4">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px]">
        <header className="h-[60px] border-b border-white/60">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
