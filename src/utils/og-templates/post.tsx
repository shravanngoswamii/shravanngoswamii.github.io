import satori from "satori";
import type { AnyPost } from "@types";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

export default async (post: AnyPost) => {
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
          top: "-80px",
          right: "-40px",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "40%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
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
          alignItems: "center",
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
            alignItems: "center",
            textAlign: "center" as const,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6366f1",
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
              Blog Post
            </span>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6366f1",
              }}
            />
          </div>

          <p
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: "#fff",
              lineHeight: 1.15,
              margin: "0",
              maxHeight: "280px",
              overflow: "hidden",
            }}
          >
            {post.data.title}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            by
          </span>
          <span
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.7)",
              fontWeight: "bold",
            }}
          >
            {post.data.author}
          </span>
          <span
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            ·
          </span>
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
        post.data.title +
          post.data.author +
          SITE.title +
          "by" +
          "BLOG POST" +
          SITE.website +
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      )) as FontOptions[],
    },
  );
};
