import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const data = await req.json(); // ✅ KHAI BÁO data

    const { error } = await supabase
      .from("volunteers")
      .insert({
        support_types: data.support_types,
        district: data.district,
        phone: data.phone ?? null,
        lat: data.lat,
        lng: data.lng,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 500 }
    );
  }
}
