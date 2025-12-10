'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { signUpSchema } from "./schema"
import { z } from "zod"

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userdata)

    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.signUp({
        email: parsedData.email,
        password: parsedData.password,
    })

    if (error) return { error: error.message }

    if (user && user.email) {
        const { error: insertError } = await supabase
            .from('users')
            .insert([{
                'id': user.id,
                email: user.email,
                username: parsedData.username
            }])

        if (insertError) return { error: insertError.message }
    }

    redirect("/")
}
