import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are not configured.");
      return NextResponse.json({ error: "Supabase configuration missing." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { userId, personality } = await req.json();

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, personality: personality })
      .select();

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Profile saved successfully.", data });
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}