import { NextResponse } from "next/server";
import { supabase } from "../../../libs/supabase";

export async function POST(request) {
  try {
    const { id, name, data, formatting, check_data } = await request.json();
    console.log("api save");

    let result;

    const saveData = {
      name,
      data: JSON.stringify(data),
      formatting: JSON.stringify(formatting),
      check_data: JSON.stringify(check_data),
    };

    if (id) {
      // Overwrite existing save
      const { data: updateData, error } = await supabase
        .from("spreadsheets")
        .update(saveData)
        .eq("id", id)
        .select();

      if (error) throw error;
      result = updateData;
    } else {
      // Create new save
      const { data: insertData, error } = await supabase
        .from("spreadsheets")
        .insert([saveData])
        .select();

      if (error) throw error;
      result = insertData;
    }

    return NextResponse.json({
      message: id
        ? "Spreadsheet updated successfully"
        : "Spreadsheet saved successfully",
      id: result[0].id,
      name: result[0].name,  // Include the name in the response
    });
  } catch (error) {
    console.error("Error in save-spreadsheet route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}