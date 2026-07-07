const driveRegex = /drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;

/**
 * Resolves a given image URL (could be a Google Drive share link, Google Photos share link,
 * or direct image URL) to a direct image representation (Base64 Data URL or direct embed link).
 * 
 * @param {string} url
 * @returns {Promise<string>}
 */
const resolveImageUrl = async (url) => {
  if (!url || typeof url !== 'string') return url;

  const trimmedUrl = url.trim();

  // 1. Google Drive Sharing Link Check
  // e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // e.g. https://drive.google.com/open?id=FILE_ID
  const driveMatch = trimmedUrl.match(driveRegex);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // 2. Google Photos or other share pages (contains og:image metadata)
  // e.g. photos.app.goo.gl, photos.google.com, share.google, etc.
  const isGoogleShare = /photos\.app\.goo\.gl|photos\.google\.com|share\.google|google\.com\/share/i.test(trimmedUrl);

  try {
    let targetUrl = trimmedUrl;

    if (isGoogleShare) {
      const response = await fetch(trimmedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        redirect: 'follow'
      });

      if (response.ok) {
        const html = await response.text();
        const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                             html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
                             html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
                             html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

        if (ogImageMatch && ogImageMatch[1]) {
          targetUrl = ogImageMatch[1];
        }
      }
    }

    // 3. Convert direct image url to base64 Data URL so it never expires/breaks
    if (targetUrl.startsWith('http')) {
      const imgResponse = await fetch(targetUrl);
      if (imgResponse.ok) {
        const arrayBuffer = await imgResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = imgResponse.headers.get('content-type') || 'image/jpeg';
        const base64 = buffer.toString('base64');
        return `data:${contentType};base64,${base64}`;
      }
    }

    return targetUrl;
  } catch (error) {
    console.error('Error resolving image URL:', error);
    // Fallback to original URL if anything fails
    return trimmedUrl;
  }
};

module.exports = { resolveImageUrl };
