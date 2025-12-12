'use server'

import { createClient } from "@/utils/supabase/server-client"
import { logInSchema } from "./schema"
import { z } from "zod"

export const LogIn = async (userdata: z.infer<typeof logInSchema>) => {
    const parsedData = logInSchema.parse(userdata)

    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.signInWithPassword(parsedData)

    if (error) return { error: error.message }

    if (!user) return { error: "Authentication failed" }

    // Fetch username from database
    const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single()

    if (dbError || !userData) {
        return { error: "Failed to fetch user data" }
    }

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email!,
            username: userData.username
        }
    }
}
