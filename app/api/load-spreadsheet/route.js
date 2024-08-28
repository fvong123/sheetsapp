import { NextResponse } from "next/server";
import { supabase } from "../../../libs/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("spreadsheets")
      .select("id, name, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading spreadsheets:", error);
    return NextResponse.json(
      { error: "Error loading spreadsheets" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { id } = await request.json();

    const { data, error } = await supabase
      .from("spreadsheets")
      .select("data, formatting, check_data, name")  // Add name to the select query
      .eq("id", id)
      .single();

    if (error) throw error;

    if (data) {
      return NextResponse.json({
        data: JSON.parse(data.data),
        formatting: JSON.parse(data.formatting || '{}'),
        check_data: JSON.parse(data.check_data || '{}'),
        name: data.name,  // Include the name in the response
      });
    } else {
      return NextResponse.json(
        { error: "Spreadsheet not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error loading spreadsheet data:", error);
    return NextResponse.json(
      { error: "Error loading spreadsheet data" },
      { status: 500 },
    );
  }
}