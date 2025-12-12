'use server'

import { createClient } from "@/utils/supabase/server-client"
import { createAdminClient } from "@/utils/supabase/admin-client"
import { signUpSchema } from "./schema"
import { z } from "zod"

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userdata)

    // Use admin client for signup to auto-confirm email
    const adminClient = createAdminClient()

    // Create user with admin client (bypasses email confirmation)
    const { data: authData, error: signUpError } = await adminClient.auth.admin.createUser({
        email: parsedData.email,
        password: parsedData.password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
            username: parsedData.username
        }
    })

    if (signUpError) {
        // Check if user already exists
        if (signUpError.message.includes('already registered')) {
            return { error: "An account with this email already exists. Please login instead." }
        }
        return { error: signUpError.message }
    }
    if (!authData.user) return { error: "Signup failed" }

    const user = authData.user

    // Create user profile in database
    const { error: insertError } = await adminClient
        .from('users')
        .insert([{
            'id': user.id,
            email: user.email,
            username: parsedData.username
        }])

    if (insertError) {
        // If user already exists, that's okay
        if (insertError.code !== '23505') {
            return { error: insertError.message }
        }
    }

    // Now sign in the user to create a session
    const supabase = await createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: parsedData.email,
        password: parsedData.password,
    })

    if (signInError) {
        return {
            error: "Account created but couldn't log you in. Please try logging in manually.",
            accountCreated: true
        }
    }

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email!,
            username: parsedData.username
        }
    }
}
