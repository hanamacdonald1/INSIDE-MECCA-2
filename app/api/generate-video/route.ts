import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not configured." },
        { status: 500 }
      );
    }

    const { prompt, aspectRatio = "16:9", resolution = "720p" } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const validAspectRatio = aspectRatio === "9:16" ? "9:16" : "16:9";

    let operation;
    try {
      operation = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-preview",
        prompt,
        config: {
          numberOfVideos: 1,
          resolution: resolution === "1080p" ? "1080p" : "720p",
          aspectRatio: validAspectRatio,
        },
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      // If veo-3.1-fast-generate-preview is not available on this tier, fall back to veo-3.1-lite-generate-preview
      if (errMsg.includes("not found") || errMsg.includes("404") || errMsg.includes("unsupported")) {
        operation = await ai.models.generateVideos({
          model: "veo-3.1-lite-generate-preview",
          prompt,
          config: {
            numberOfVideos: 1,
            resolution: "720p",
            aspectRatio: validAspectRatio,
          },
        });
      } else {
        throw err;
      }
    }

    return NextResponse.json({
      operationName: operation.name,
      status: "started",
      aspectRatio: validAspectRatio,
    });
  } catch (error: unknown) {
    console.error("Video generation start error:", error);
    const message = error instanceof Error ? error.message : "Failed to initiate video generation.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
