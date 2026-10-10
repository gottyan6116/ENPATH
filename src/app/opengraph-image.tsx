import { ImageResponse } from "next/og";
export const alt = "ENPATH — Your English. Your Path.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#E8F6F1",
        color: "#0F2D4A",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 100,
      }}
    >
      <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: 4 }}>
        ENPATH
      </div>
      <div
        style={{
          height: 6,
          width: 130,
          background: "#14B8A6",
          margin: "36px 0",
        }}
      />
      <div style={{ fontSize: 32, letterSpacing: 6 }}>
        YOUR ENGLISH. YOUR PATH.
      </div>
    </div>,
    size,
  );
}
