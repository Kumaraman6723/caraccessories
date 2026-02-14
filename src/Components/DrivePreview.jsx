import React from "react";

/**
 * Lightweight wrapper to show a Google Drive file preview in an iframe.
 * Accepts optional width/height/className overrides so it can be used as a logo.
 */
export default function DrivePreview({
  src = "https://drive.google.com/file/d/1jtotcBRC1AqjVhveEwj3lgl4Cb0gzMTv/preview",
  width = "100%",
  height = "600",
  className = "",
  title = "Drive Preview",
}) {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      className={className}
      style={{ border: "none" }}
      allowFullScreen
      title={title}
    />
  );
}

