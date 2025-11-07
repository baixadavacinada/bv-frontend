/**
 * Detects if the user is on a mobile device
 * @returns true if the device is mobile, false otherwise
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  // Check user agent for mobile devices
  const userAgent =
    navigator.userAgent ||
    navigator.vendor ||
    (window as unknown as Record<string, string>).opera ||
    ''
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  return mobileRegex.test(userAgent.toLowerCase())
}

/**
 * Downloads a file by creating a temporary link and triggering a click
 * @param url - The URL of the file to download
 * @param filename - Optional filename for the downloaded file
 */
export function downloadFile(url: string, filename?: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Opens a URL in a new tab
 * @param url - The URL to open
 */
export function openInNewTab(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Handles smart download/open based on device type
 * Desktop: Opens URL in a new tab
 * Mobile: Attempts to download the file
 * @param url - The URL of the file to download/open
 * @param filename - Optional filename for the file
 */
export function handleSmartDownload(url: string, filename?: string): void {
  if (isMobileDevice()) {
    downloadFile(url, filename)
  } else {
    openInNewTab(url)
  }
}
