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

        // Check if user already exists
        const { data: existingUser } = await adminClient
            .from('users')
            .select('id')
            .eq('id', userId)
            .single()

        if (existingUser) {
            // User already exists (likely from a previous signup)
            console.log('User profile already exists, skipping creation')
            return NextResponse.json({ success: true, existing: true })
        }

        const { error: insertError } = await adminClient
            .from('users')
            .insert([{
                'id': userId,
                email: email,
                username: username
            }])

        if (insertError) {
            console.error('Database insert error:', insertError)
            // Check if it's a duplicate key error
            if (insertError.code === '23505') {
                // Duplicate key - user already exists
                return NextResponse.json({ success: true, existing: true })
            }
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
