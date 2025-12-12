'use client'

import { signUpSchema } from "@/actions/schema"
import { SignUp } from "@/actions/sign-up"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const SignUpForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const { mutate, isPending, data } = useMutation({
    mutationFn: SignUp,
    onSuccess: async (data) => {
      if (data?.success && data?.user) {
        // Manually set localStorage to show user immediately
        // useAuthSync will also set it, but this ensures immediate update
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('isLoggedIn', 'true')

        // Dispatch event to notify components
        window.dispatchEvent(new Event('userLoggedIn'))

        // Small delay to ensure state updates propagate
        await new Promise(resolve => setTimeout(resolve, 100))

        // Redirect to home page
        router.push('/')
      }
    }
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(values => mutate(values))}
        className="flex flex-col gap-6"
      >
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-gray-700">Enter your email</label>
          <input
            {...register("email")}
            id="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="username" className="font-medium text-gray-700">Enter username</label>
          <input
            {...register("username")}
            id="username"
            placeholder="Enter username"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <ErrorMessage message={errors.username.message!} />}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-gray-700">Enter your password</label>
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <ErrorMessage message={errors.password.message!} />}
        </fieldset>

        <button
          type="submit"
          className="mt-4 w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Signing you in!" : "Sign In"}
        </button>
      </form>

      {data?.error && <ErrorMessage message={data.error} />}
    </>
  )
}

export default SignUpForm
