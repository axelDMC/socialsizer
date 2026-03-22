"use client"

import { useState, useCallback, useRef } from "react"
import { ImageUp, Download, X } from "lucide-react"
import { renderToCanvas, type CropMode, type OutputFormat } from "@/lib/canvas-utils"

export function OgImageTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null)
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null)
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null)
  const [cropMode, setCropMode] = useState<CropMode>("cover")
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png")
  const [jpegQuality, setJpegQuality] = useState(90)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generatePreview = useCallback(async (img: HTMLImageElement, mode: CropMode) => {
    const blob = await renderToCanvas(img, 800, 419, mode, "png", 90)
    const url = URL.createObjectURL(blob)
    setPreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return url })
  }, [])

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setSourceDataUrl(dataUrl)
      setSourceFile(file)
      const img = new Image()
      img.onload = () => {
        setSourceImage(img)
        generatePreview(img, cropMode)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [cropMode, generatePreview])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) loadFile(file)
  }, [loadFile])

  const changeCropMode = (mode: CropMode) => {
    setCropMode(mode)
    if (sourceImage) generatePreview(sourceImage, mode)
  }

  const download = async () => {
    if (!sourceImage) return
    setIsDownloading(true)
    try {
      const blob = await renderToCanvas(sourceImage, 1200, 630, cropMode, outputFormat, jpegQuality)
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `og-image-1200x630.${outputFormat === "jpeg" ? "jpg" : "png"}`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsDownloading(false)
    }
  }

  const reset = () => {
    setSourceFile(null)
    setSourceDataUrl(null)
    setSourceImage(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
  }

  // suppress unused warning — sourceDataUrl used for reset tracking
  void sourceDataUrl

  if (!sourceFile) {
    return (
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        className="cursor-pointer rounded-[20px] border transition-all duration-300 flex flex-col items-center justify-center gap-4 py-20 px-8 text-center"
        style={{
          borderColor: isDragging ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.15)",
          borderStyle: "dashed",
          background: isDragging ? "rgba(37,99,235,0.05)" : "rgba(255,255,255,0.02)",
        }}
      >
        <ImageUp size={48} strokeWidth={1.5} style={{ color: "#86868b" }} />
        <div>
          <p className="text-white font-semibold text-lg">Drop your image here</p>
          <p className="text-[#86868b] text-sm mt-1">JPG, PNG, WebP — outputs 1200×630 OG image</p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[#86868b] text-sm">{sourceFile.name}</p>
        <button onClick={reset} className="text-[#86868b] hover:text-white transition-colors">
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {previewUrl && (
        <div className="rounded-[20px] overflow-hidden border border-white/10" style={{ aspectRatio: "1200/630" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="OG preview" className="w-full h-full object-cover" />
        </div>
      )}

      <p className="text-center text-xs text-[#86868b]">Preview at 800×419 — exports at 1200×630</p>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {(["cover", "contain"] as CropMode[]).map((mode) => (
            <button key={mode} onClick={() => changeCropMode(mode)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ background: cropMode === mode ? "rgba(37,99,235,0.8)" : "transparent", color: cropMode === mode ? "#fff" : "#86868b" }}>
              {mode === "cover" ? "Crop to Fill" : "Fit with Padding"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {(["png", "jpeg"] as OutputFormat[]).map((fmt) => (
            <button key={fmt} onClick={() => setOutputFormat(fmt)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ background: outputFormat === fmt ? "rgba(37,99,235,0.8)" : "transparent", color: outputFormat === fmt ? "#fff" : "#86868b" }}>
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
        {outputFormat === "jpeg" && (
          <div className="flex items-center gap-3">
            <label className="text-xs uppercase tracking-widest text-[#86868b]">Quality: {jpegQuality}%</label>
            <input type="range" min={70} max={100} value={jpegQuality}
              onChange={(e) => setJpegQuality(Number(e.target.value))} className="w-24" />
          </div>
        )}
      </div>

      <button onClick={download} disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 rounded-[14px] font-semibold transition-all duration-300 disabled:opacity-60"
        style={{ background: "#2563eb", color: "#fff", height: 52 }}>
        <Download size={18} strokeWidth={1.5} />
        {isDownloading ? "Processing..." : "Download OG Image (1200×630)"}
      </button>
    </div>
  )
}
