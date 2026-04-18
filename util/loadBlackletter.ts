let cached: Promise<ArrayBuffer> | null = null;

const fetchBlackletter = async (): Promise<ArrayBuffer> => {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Pirata+One&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } },
  ).then((r) => {
    if (!r.ok) throw new Error(`Google Fonts CSS fetch failed: ${r.status}`);
    return r.text();
  });

  const urlMatch = css.match(/url\(\s*['"]?(https:\/\/[^'")\s]+)['"]?\s*\)/);
  if (!urlMatch) {
    throw new Error(
      `Could not extract woff2 URL from Google Fonts CSS. Response: ${css.slice(0, 200)}`,
    );
  }

  return fetch(urlMatch[1]).then((r) => {
    if (!r.ok) throw new Error(`Font file fetch failed: ${r.status}`);
    return r.arrayBuffer();
  });
};

export const loadBlackletter = (): Promise<ArrayBuffer> => {
  if (!cached) {
    cached = fetchBlackletter().catch((err) => {
      cached = null;
      throw err;
    });
  }
  return cached;
};
