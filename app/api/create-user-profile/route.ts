import { createAdminClient } from "@/utils/supabase/admin-client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { userId, email, username } = await request.json()

        if (!userId || !email || !username) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Use admin client to bypass RLS for initial user profile creation
        const adminClient = createAdminClient()
        const { error: insertError } = await adminClient
            .from('users')
            .insert([{
                'id': userId,
                email: email,
                username: username
            }])

        if (insertError) {
            console.error('Database insert error:', insertError)
            return NextResponse.json(
                { error: insertError.message },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
