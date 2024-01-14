
const TaskCard = ({ task }) => {
  const date = new Date(task.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white text-black font-semibold shadow">
      <div className="px-4 py-5 sm:p-6">{task.title}</div>
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{task.status}</div>
      <div className="px-4 py-4 sm:px-6">{task.priority}</div>
    </div >
  )
}

export default TaskCard
