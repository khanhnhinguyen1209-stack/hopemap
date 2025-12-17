import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const data = await req.json(); // ✅ data ĐƯỢC KHAI BÁO

    const { error } = await supabase
      .from("support_requests")
      .insert({
        support_level: data.support_level,
        district: data.district,
        contact_methods: data.contact_methods,
        description: data.description,
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
