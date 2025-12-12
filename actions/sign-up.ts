'use server'

import { createClient } from "@/utils/supabase/server-client"
import { createAdminClient } from "@/utils/supabase/admin-client"
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

    if (!user || !user.email) return { error: "Signup failed" }

    // Use admin client to bypass RLS for initial user profile creation
    const adminClient = createAdminClient()
    const { error: insertError } = await adminClient
        .from('users')
        .insert([{
            'id': user.id,
            email: user.email,
            username: parsedData.username
        }])

    if (insertError) return { error: insertError.message }

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            username: parsedData.username
        }
    }
}
