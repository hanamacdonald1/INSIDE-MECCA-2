import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not configured." },
        { status: 500 }
      );
    }

    const { operationName } = await req.json();

    if (!operationName) {
      return NextResponse.json({ error: "Operation name is required." }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return NextResponse.json(
        { error: "Video URI not found or video is still processing." },
        { status: 404 }
      );
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": apiKey },
    });

    if (!videoRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch video stream from source: ${videoRes.statusText}` },
        { status: videoRes.status }
      );
    }

    const contentType = videoRes.headers.get("content-type") || "video/mp4";
    const arrayBuffer = await videoRes.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": 'inline; filename="word-video.mp4"',
      },
    });
  } catch (error: unknown) {
    console.error("Video download error:", error);
    const message = error instanceof Error ? error.message : "Failed to download video.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
