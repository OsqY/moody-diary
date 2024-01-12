import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen bg-gray-950 flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-8xl mb-4"> Moody Diary</h1>
        <p className="text-2xl text-white/70 mb-4">Want to know how your mood and feelings have been the last couple days? Want to have control of your feelings and track
          humor? If that's the case, you should start here, only be honest with your self, it's the first step!</p>
        <div>
          <Link href={href}>
            <button className="bg-white text-black font-semibold duration-300 rounded-lg p-3 hover:bg-white/80" >Start writing here! </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
