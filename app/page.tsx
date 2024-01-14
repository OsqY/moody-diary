import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen bg-gray-950 flex justify-center items-center text-white px-4 sm:px-0">
      <div className="w-full max-w-[600px] mx-auto px-4 sm:px-0">
        <h1 className="text-2xl sm:text-4xl mb-4 md:text-8xl"> Moody Diary</h1>
        <p className="text-sm sm:text-xl text-white/70 mb-4 md:text-2xl">Want to know how your mood and feelings have been the last couple days? Want to have control of your feelings and track
          humor? If that's the case, you should start here, only be honest with your self, it's the first step!</p>
        <div>
          <Link href={href}>
            <button className="w-full sm:w-auto bg-white text-black font-semibold duration-300 rounded-lg p-3 hover:bg-white/80 md:text-xl md:p-4" >Start writing here! </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
