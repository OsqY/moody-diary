import UserExpensesNav from "@/components/UserExpensesNav"

const UserExpensesLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen mx-auto my-4 relative">
      <div className="flex justify-center">
        <UserExpensesNav />
      </div>
      <div className="ml-0">
        <div className="h-[calc(100vh-60px)] overflow-auto">{children}</div>
      </div>
    </div>
  )
}

export default UserExpensesLayout
