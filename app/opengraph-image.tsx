import { ImageResponse } from "next/og";
import { loadBlackletter } from "#util/loadBlackletter";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Luke Clark";

export default async function OpengraphImage() {
  const fontData = await loadBlackletter();
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#07060a",
        color: "#ebe6e4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Pirata One",
      }}
    >
      <span style={{ fontSize: 360, lineHeight: 1 }}>{"lc"}</span>
      <span style={{ fontSize: 360, lineHeight: 1, color: "#9f0d17" }}>
        {"."}
      </span>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Pirata One",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
