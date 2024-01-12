import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-950 flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
      </div>
    </div>
  )
}

export default SignUpPage
