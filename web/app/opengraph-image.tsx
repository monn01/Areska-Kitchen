import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Areska Kitchen — a taste of home";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5EEE0",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: "50%",
            backgroundColor: "#1F4D3A",
            marginBottom: 36,
          }}
        />
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#173B2C" }}>
          Areska Kitchen
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#E0A24B",
          }}
        >
          a taste of home
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: "#2C6E52" }}>
          Catering Rumahan Pangkalpinang, Bangka Belitung
        </div>
      </div>
    ),
    { ...size },
  );
}
