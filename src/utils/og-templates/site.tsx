import satori from "satori";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

export default async () => {
  return satori(
    <div
      style={{
        background: "#0f0f0f",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          border: "1px solid rgba(255,255,255,0.06)",
          margin: "32px",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
              }}
            >
              Personal Blog
            </span>
          </div>

          <p
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "#fff",
              lineHeight: 1.1,
              margin: "0",
            }}
          >
            {SITE.title}
          </p>
          <p
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
              marginTop: "16px",
              lineHeight: 1.5,
              maxWidth: "600px",
            }}
          >
            {SITE.desc}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.3)",
              fontWeight: "bold",
              letterSpacing: "0.08em",
            }}
          >
            {new URL(SITE.website).hostname}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6366f1",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#8b5cf6",
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        SITE.title +
          SITE.desc +
          SITE.website +
          "PERSONAL BLOG" +
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      )) as FontOptions[],
    },
  );
};
