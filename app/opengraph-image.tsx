import { ImageResponse } from "next/og";

export const alt = "DoctorBox – Heimtests in Berlin abholen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0E4D2F 0%, #0b3e26 55%, #0E834B 130%)",
          padding: "72px",
          color: "#F7F1E9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            DOCTORBOX
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: 999,
              border: "1px solid rgba(247,241,233,0.4)",
              padding: "6px 16px",
              fontSize: 22,
              color: "rgba(247,241,233,0.85)",
            }}
          >
            Pick-up
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Dein Test. Heute abholen.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "rgba(247,241,233,0.82)",
            }}
          >
            Heimtests abholen in Berlin-Mitte · Taubenstrasse 26
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px", fontSize: 26 }}>
          <span>0 € Versand</span>
          <span>Ergebnis in 72 h</span>
          <span>Akkreditierte Labore</span>
        </div>
      </div>
    ),
    size,
  );
}
