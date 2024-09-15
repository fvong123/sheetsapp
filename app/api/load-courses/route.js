import { NextResponse } from "next/server";
import { supabase } from "../../../libs/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("id, name, created_at, type, heading, link, description, features, skill_level, time_to_complete, projects, prerequisites, disabled")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading courses:", error);
    return NextResponse.json(
      { error: "Error loading courses" },
      { status: 500 },
    );
  }
}