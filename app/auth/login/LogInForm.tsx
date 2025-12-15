'use client'

import { LogIn } from "@/actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "@/actions/schema"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"

const LogInForm = () => {
  const { t } = useLanguage();
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(logInSchema)
  })

  const { mutate, isPending, data } = useMutation({
    mutationFn: LogIn,
    onSuccess: (data) => {
      if (data?.success && data?.user) {
        // Store user data in localStorage
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('isLoggedIn', 'true')

        // Dispatch event to notify other components
        window.dispatchEvent(new Event('userLoggedIn'))

        // Redirect to home page
        router.push('/')
      }
    }
  })

  return (
    <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col gap-6">

      <fieldset className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium text-gray-700">
          {t('login.emailLabel')}
        </label>
        <input
          {...register("email")}
          id="email"
          placeholder={t('login.emailPlaceholder')}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <ErrorMessage message={errors.email.message!} />}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <label htmlFor="password" className="font-medium text-gray-700">
          {t('login.passwordLabel')}
        </label>
        <input
          type="password"
          {...register("password")}
          id="password"
          placeholder={t('login.passwordPlaceholder')}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <ErrorMessage message={errors.password.message!} />}
      </fieldset>

      <button
        type="submit"
        className="mt-4 w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? t('login.submittingButton') : t('login.submitButton')}
      </button>

      {data?.error && <ErrorMessage message={data.error} />}
    </form>
  )
}

export default LogInForm
