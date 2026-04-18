import { ImageResponse } from "next/og";
import { loadBlackletter } from "#util/loadBlackletter";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = await loadBlackletter();
  return new ImageResponse(
    <div
      style={{
        width: 64,
        height: 64,
        background: "#07060a",
        color: "#ebe6e4",
        fontFamily: "Pirata One",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        fontSize: 56,
        lineHeight: 1,
        paddingBottom: 0,
      }}
    >
      {"lc"}
      <span style={{ color: "#9f0d17" }}>{"."}</span>
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
