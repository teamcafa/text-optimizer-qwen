import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";
import type { OptimizeRequestBody } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OptimizeRequestBody;
    const inputText = body?.inputText?.trim();
    const values = body?.values || {};

    if (!inputText) {
      return NextResponse.json(
        { error: "Missing inputText" },
        { status: 400 }
      );
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    const baseURL =
      process.env.QWEN_BASE_URL ||
      "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
    const model = process.env.QWEN_MODEL || "qwen-plus";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing DASHSCOPE_API_KEY" },
        { status: 500 }
      );
    }

    const boosted = Object.fromEntries(
      Object.entries(values || {}).map(([k, v]) => [k, Math.min(100, Math.round(v * 1.2))])
    );

    const prompt = buildPrompt(inputText, boosted);


    const resp = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 1.1,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return NextResponse.json(
        {
          error: "Qwen request failed",
          detail: data,
        },
        { status: resp.status }
      );
    }

    const text = data?.choices?.[0]?.message?.content?.trim?.() || "";

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Optimize failed",
        detail: String(error),
      },
      { status: 500 }
    );
  }
}