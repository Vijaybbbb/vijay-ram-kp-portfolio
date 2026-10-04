const folderId = "13xxXaP-VbX_ijKsgMNWS1vOK9xOD027I";
const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;

function findPdfIds(html) {
  const ids = new Set();
  for (const row of html.matchAll(/<tr\b[^>]*data-id="([A-Za-z0-9_-]+)"[^>]*>[\s\S]*?<\/tr>/g)) {
    if (/data-tooltip="[^"]+\.pdf PDF"/i.test(row[0]) || /aria-label="[^"]+\.pdf PDF(?: Shared)?"/i.test(row[0])) {
      ids.add(row[1]);
    }
  }
  return [...ids];
}

export default {
  async fetch() {
    let destination = folderUrl;
    try {
      const response = await fetch(folderUrl, {
        headers: { Accept: "text/html" },
        signal: AbortSignal.timeout(7000),
      });
      if (response.ok) {
        const ids = findPdfIds(await response.text());
        if (ids.length === 1) {
          destination = `https://drive.google.com/file/d/${ids[0]}/view?usp=sharing`;
        }
      }
    } catch {
      // If Drive is unavailable, show the folder instead of a stale PDF.
    }

    return new Response(null, {
      status: 302,
      headers: { Location: destination, "Cache-Control": "no-store" },
    });
  },
};
