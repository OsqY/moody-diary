import { UserButton } from "@clerk/nextjs"

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative bg-gray-950 text-white">
      <aside className="absolute top-0 left-0 w-[200px] h-full border-r border-white/60">
        Mood
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
