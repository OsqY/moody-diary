import HamburgerMenu from "@/components/HamburgerMenu"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'Mood History' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/journal/ai-ask', label: 'Ask AI' }
]

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative bg-gray-950 text-white">
      <HamburgerMenu links={links} />
      <div className="ml-0">
        <div className="h-[calc(100vh-60px)] overflow-auto">{children}</div>
      </div>
    </div>
  )
}
export default DashboardLayout
