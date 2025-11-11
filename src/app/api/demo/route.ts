import { NextResponse } from "next/server";
import demo from "@/models/Demo";
import { connectToDatabase } from "../../../../utils/db";

export async function GET() {
  try {
    const res = await connectToDatabase();

    const demos = await demo.find({});
    console.log("demos", demos);
    return NextResponse.json(demos);
  } catch (error) {
    console.error("API /api/demo error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
