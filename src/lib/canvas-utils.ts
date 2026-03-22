export type CropMode = "cover" | "contain"
export type OutputFormat = "png" | "jpeg"

export async function renderToCanvas(
  sourceImage: HTMLImageElement,
  width: number,
  height: number,
  cropMode: CropMode,
  outputFormat: OutputFormat,
  quality: number,
  paddingColor: string = "#000000"
): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")!

  if (cropMode === "cover") {
    const srcRatio = sourceImage.naturalWidth / sourceImage.naturalHeight
    const dstRatio = width / height
    let sx: number, sy: number, sw: number, sh: number

    if (srcRatio > dstRatio) {
      sh = sourceImage.naturalHeight
      sw = sh * dstRatio
      sx = (sourceImage.naturalWidth - sw) / 2
      sy = 0
    } else {
      sw = sourceImage.naturalWidth
      sh = sw / dstRatio
      sx = 0
      sy = (sourceImage.naturalHeight - sh) / 2
    }
    ctx.drawImage(sourceImage, sx, sy, sw, sh, 0, 0, width, height)
  } else {
    ctx.fillStyle = paddingColor
    ctx.fillRect(0, 0, width, height)
    const scale = Math.min(width / sourceImage.naturalWidth, height / sourceImage.naturalHeight)
    const dw = sourceImage.naturalWidth * scale
    const dh = sourceImage.naturalHeight * scale
    const dx = (width - dw) / 2
    const dy = (height - dh) / 2
    ctx.drawImage(sourceImage, dx, dy, dw, dh)
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Canvas toBlob failed"))
      },
      outputFormat === "jpeg" ? "image/jpeg" : "image/png",
      quality / 100
    )
  })
}

export function getFileExtension(format: OutputFormat): string {
  return format === "jpeg" ? "jpg" : "png"
}

export function getFilename(
  platform: string,
  formatName: string,
  width: number,
  height: number,
  format: OutputFormat
): string {
  const safePlatform = platform.replace(/[^a-zA-Z0-9]/g, "-")
  const safeName = formatName.replace(/[^a-zA-Z0-9]/g, "-")
  return `${safePlatform}-${safeName}-${width}x${height}.${getFileExtension(format)}`
}
