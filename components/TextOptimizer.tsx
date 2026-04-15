"use client";

import { useMemo, useState } from "react";
import { DIMENSIONS, PRESETS } from "@/lib/config";
import type { OptimizeResponseBody } from "@/lib/types";

function SliderRow({
  label,
  emoji,
  color,
  value,
  onChange,
}: {
  label: string;
  emoji: string;
  color: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0" }}>
      <div style={{ width: 120, flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>{emoji}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#E8E0D4" }}>{label}</span>
      </div>

      <div style={{ flex: 1, position: "relative", height: 28, display: "flex", alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            height: 4,
            borderRadius: 2,
            width: `${value}%`,
            background: color,
            opacity: 0.85,
            transition: "width 0.15s ease",
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            left: -4,
            right: -4,
            width: "calc(100% + 8px)",
            height: 28,
            opacity: 0,
            margin: 0,
            cursor: "pointer",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${value}%`,
            transform: "translateX(-50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}66`,
            transition: "left 0.15s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          width: 40,
          textAlign: "right",
          fontSize: 13,
          fontWeight: 700,
          color,
          fontFamily: "monospace",
          flexShrink: 0,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function TextOptimizer() {
  const initialValues = useMemo(() => {
    return Object.fromEntries(DIMENSIONS.map((d) => [d.key, 0]));
  }, []);

  const [values, setValues] = useState<Record<string, number>>(initialValues);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [error, setError] = useState("");

  const activeDims = useMemo(() => {
    return DIMENSIONS.filter((d) => values[d.key] > 0).sort(
      (a, b) => values[b.key] - values[a.key]
    );
  }, [values]);

  const vibeSummary =
    activeDims.length > 0
      ? activeDims
          .slice(0, 3)
          .map((d) => d.label.replace("指数", ""))
          .join(" × ")
      : "调制你的文字风格";

  function handleSliderChange(key: string, value: number) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    const newValues = Object.fromEntries(DIMENSIONS.map((d) => [d.key, 0]));
    Object.entries(preset.values).forEach(([k, v]) => {
      newValues[k] = v;
    });
    setValues(newValues);
    setActivePreset(preset.name);
  }

  function resetAll() {
    setValues(initialValues);
    setActivePreset(null);
    setError("");
  }

  async function handleOptimize() {
    if (!inputText.trim()) return;
    if (activeDims.length === 0) return;

    setLoading(true);
    setError("");
    setOutputText("");

    try {
      const response = await fetch("https://api.i-wild.com/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputText,
          values,
        }),
      });

      const data = (await response.json()) as OptimizeResponseBody;

      if (!response.ok) {
        throw new Error(data.error || "请求失败");
      }

      setOutputText(data.text || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F0F0F",
        color: "#E8E0D4",
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          padding: "32px 24px 20px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6B6356",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Ðong Philosophy Lab
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            background: "linear-gradient(135deg, #E8E0D4, #C9A96E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          文字调制器
        </h1>

        <div style={{ fontSize: 13, color: "#6B6356", marginTop: 8 }}>{vibeSummary}</div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ marginTop: 20 }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在此输入你想要优化改写的文字……"
            rows={6}
            style={{
              width: "100%",
              padding: "14px 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              color: "#E8E0D4",
              fontSize: 15,
              lineHeight: 1.8,
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "#6B6356",
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            预设模板
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  border:
                    activePreset === preset.name
                      ? "1px solid #C9A96E"
                      : "1px solid rgba(255,255,255,0.1)",
                  background:
                    activePreset === preset.name
                      ? "rgba(201,169,110,0.15)"
                      : "rgba(255,255,255,0.04)",
                  color: activePreset === preset.name ? "#C9A96E" : "#8A8072",
                  cursor: "pointer",
                }}
              >
                {preset.name}
              </button>
            ))}

            <button
              onClick={resetAll}
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "#666",
                cursor: "pointer",
              }}
            >
              归零
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
            padding: "16px 16px 10px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "#6B6356",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            维度调节
          </div>

          {DIMENSIONS.map((dim) => (
            <SliderRow
              key={dim.key}
              label={dim.label}
              emoji={dim.emoji}
              color={dim.color}
              value={values[dim.key]}
              onChange={(value) => handleSliderChange(dim.key, value)}
            />
          ))}
        </div>

        {activeDims.length > 0 && (
          <div
            style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "#6B6356", marginRight: 4 }}>配方：</span>
            {activeDims.map((d) => (
              <span
                key={d.key}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: d.color,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: Math.max(10, values[d.key] / 4),
                    height: 8,
                    borderRadius: 99,
                    background: d.color,
                    opacity: 0.85,
                  }}
                />
                {d.label.replace("指数", "")}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleOptimize}
          disabled={loading || !inputText.trim() || activeDims.length === 0}
          style={{
            width: "100%",
            marginTop: 20,
            padding: "14px 0",
            borderRadius: 12,
            border: "none",
            fontSize: 15,
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
            background:
              !inputText.trim() || activeDims.length === 0
                ? "rgba(255,255,255,0.06)"
                : loading
                ? "rgba(201,169,110,0.2)"
                : "linear-gradient(135deg, #C9A96E, #A07D3F)",
            color:
              !inputText.trim() || activeDims.length === 0 ? "#555" : "#0F0F0F",
            letterSpacing: "0.05em",
          }}
        >
          {loading ? "调制中..." : "开始调制"}
        </button>

        {error && (
          <div
            style={{
              marginTop: 14,
              padding: "12px 14px",
              borderRadius: 12,
              background: "rgba(255,68,68,0.08)",
              border: "1px solid rgba(255,68,68,0.18)",
              color: "#ff8d8d",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {outputText && (
          <div
            style={{
              marginTop: 18,
              padding: "20px",
              background: "rgba(201,169,110,0.04)",
              borderRadius: 16,
              border: "1px solid rgba(201,169,110,0.12)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                color: "#C9A96E",
                marginBottom: 12,
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>调制结果</span>
              <button
                onClick={() => navigator.clipboard.writeText(outputText)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 8,
                  fontSize: 11,
                  border: "1px solid rgba(201,169,110,0.2)",
                  background: "transparent",
                  color: "#C9A96E",
                  cursor: "pointer",
                }}
              >
                复制
              </button>
            </div>

            <div
              style={{
                fontSize: 15,
                lineHeight: 1.9,
                color: "#E8E0D4",
                whiteSpace: "pre-wrap",
              }}
            >
              {outputText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}