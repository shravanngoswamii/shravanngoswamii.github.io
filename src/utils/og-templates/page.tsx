import satori from "satori";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

export default async (title: string, description?: string) => {
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
          top: "-100px",
          left: "50%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-40px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
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
            flex: "1",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
              }}
            >
              {SITE.title}
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
            {title}
          </p>
          {description && (
            <p
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.45)",
                marginTop: "16px",
                lineHeight: 1.5,
                maxWidth: "700px",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
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
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        title +
          (description ?? "") +
          SITE.title +
          SITE.website +
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      )) as FontOptions[],
    },
  );
};
