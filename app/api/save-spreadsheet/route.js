import { NextResponse } from "next/server";
import { supabase } from "../../../libs/supabase";

export async function POST(request) {
  try {
    const { name, data } = await request.json();
    console.log("api save");

    const { data: insertData, error } = await supabase
      .from("spreadsheets")
      .insert([{ name, data: JSON.stringify(data) }])
      .select();

    if (error) throw error;

    return NextResponse.json({
      message: "Spreadsheet saved successfully",
      id: insertData.id,
    });
  } catch (error) {
    console.error("Error in save-spreadsheet route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
