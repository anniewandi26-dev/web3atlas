/** True Apple Safari (iOS / iPadOS / macOS). Excludes Chrome, Edge, Firefox, in-app browsers. */
export function isAppleSafari(ua = typeof navigator !== "undefined" ? navigator.userAgent : ""): boolean {
  if (!ua) return false;

  // Explicit alternate / in-app browsers
  if (
    /CriOS|FxiOS|EdgiOS|OPiOS|Chrome\/|Chromium|Edg\/|OPR\/|Firefox\/|FxiOS|Android|MicroMessenger|WeChat|FBAN|FBAV|Line\/|Instagram|Twitter|TikTok|QQ\//i.test(
      ua,
    )
  ) {
    return false;
  }

  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  // iOS: non-Chrome/Firefox WebKit browser is Safari
  if (isIOS) {
    return /Safari/i.test(ua);
  }

  // macOS / desktop Safari
  return /Safari/i.test(ua) && /Version\//i.test(ua);
}

export function isAppleDevice(ua = typeof navigator !== "undefined" ? navigator.userAgent : ""): boolean {
  return /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(ua);
}

/** Build x-safari-http(s) URL so iOS can hand off to Safari (http & https). */
export function buildSafariOpenUrl(href = typeof window !== "undefined" ? window.location.href : ""): string {
  try {
    const u = new URL(href);
    const scheme = u.protocol === "http:" ? "x-safari-http" : "x-safari-https";
    return `${scheme}://${u.host}${u.pathname}${u.search}${u.hash}`;
  } catch {
    return href;
  }
}
