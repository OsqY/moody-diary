import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-950 flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <SignIn />
      </div>
    </div>
  )
}

export default SignInPage
