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

    const isDone = !!updated.done;
    const errorMessage = updated.error ? JSON.stringify(updated.error) : null;
    const videoUri = updated.response?.generatedVideos?.[0]?.video?.uri;

    return NextResponse.json({
      done: isDone,
      error: errorMessage,
      hasVideo: !!videoUri,
    });
  } catch (error: unknown) {
    console.error("Video status check error:", error);
    const message = error instanceof Error ? error.message : "Failed to check video status.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
