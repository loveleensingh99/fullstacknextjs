import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../utils/db";
import Video from "../../../../models/Video";
import { IVideo } from "../../../../models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth].js/route";

//getallVideos

export async function GET() {
  try {
    await connectToDatabase();
    const video = await Video.find({}).sort({ createdAt: -1 });

    lean();

    if (!video || video.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(video, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { title, description, videoUrl, thumbnailUrl }: IVideo =
      await request.json();

    if (!title || !description || !videoUrl || !thumbnailUrl) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

  const newVideo=  await Video.create({ ...body, controls: body?.controls || true,transformation:height:1920,width:1080  ,quality:body.transformation?.quality || 100 });
return NextResponse.json(newVideo, { status: 201 });
    

} catch (error) {
    return NextResponse.json(
      { message: "Failed to create video" },
      { status: 500 })
}
}
