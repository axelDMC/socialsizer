"use client"

import { useState, useCallback, useRef } from "react"
import { ImageUp, Download, X, Check } from "lucide-react"
import { renderToCanvas, getFilename, type CropMode, type OutputFormat } from "@/lib/canvas-utils"

interface Preset {
  id: string
  platform: string
  name: string
  width: number
  height: number
}

const PRESETS: Preset[] = [
  { id: "ig-square",     platform: "Instagram", name: "Square Post",     width: 1080, height: 1080 },
  { id: "ig-portrait",   platform: "Instagram", name: "Portrait Post",   width: 1080, height: 1350 },
  { id: "ig-story",      platform: "Instagram", name: "Story / Reel",    width: 1080, height: 1920 },
  { id: "ig-landscape",  platform: "Instagram", name: "Landscape Post",  width: 1080, height:  566 },
  { id: "tw-post",       platform: "Twitter/X", name: "Post Image",      width: 1200, height:  675 },
  { id: "tw-header",     platform: "Twitter/X", name: "Header / Banner", width: 1500, height:  500 },
  { id: "tw-profile",    platform: "Twitter/X", name: "Profile Photo",   width:  400, height:  400 },
  { id: "li-post",       platform: "LinkedIn",  name: "Post Image",      width: 1200, height:  627 },
  { id: "li-cover",      platform: "LinkedIn",  name: "Cover Photo",     width: 1584, height:  396 },
  { id: "li-banner",     platform: "LinkedIn",  name: "Profile Banner",  width: 1128, height:  191 },
  { id: "fb-post",       platform: "Facebook",  name: "Post Image",      width: 1200, height:  630 },
  { id: "fb-cover",      platform: "Facebook",  name: "Cover Photo",     width:  851, height:  315 },
  { id: "fb-story",      platform: "Facebook",  name: "Story",           width: 1080, height: 1920 },
  { id: "fb-event",      platform: "Facebook",  name: "Event Cover",     width: 1920, height: 1005 },
  { id: "yt-thumb",      platform: "YouTube",   name: "Thumbnail",       width: 1280, height:  720 },
  { id: "yt-banner",     platform: "YouTube",   name: "Channel Art",     width: 2560, height: 1440 },
  { id: "yt-community",  platform: "YouTube",   name: "Community Post",  width: 1080, height: 1080 },
  { id: "web-og",        platform: "Web",       name: "OG Image",        width: 1200, height:  630 },
  { id: "web-pinterest", platform: "Web",       name: "Pinterest Pin",   width: 1000, height: 1500 },
  { id: "web-tiktok",    platform: "Web",       name: "TikTok Cover",    width: 1080, height: 1920 },
]

const PLATFORMS = Array.from(new Set(PRESETS.map((p) => p.platform)))

export function ImageResizerTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null)
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null)
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null)
  const [sourceSize, setSourceSize] = useState<{ w: number; h: number } | null>(null)
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(new Set())
  const [cropMode, setCropMode] = useState<CropMode>("cover")
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png")
  const [jpegQuality, setJpegQuality] = useState(90)
  const [previews, setPreviews] = useState<Map<string, string>>(new Map())
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [warning, setWarning] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    if (file.size > 20 * 1024 * 1024) setWarning("File is larger than 20MB — processing may be slow.")
    else setWarning(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setSourceDataUrl(dataUrl)
      setSourceFile(file)

      const img = new Image()
      img.onload = () => {
        setSourceImage(img)
        setSourceSize({ w: img.naturalWidth, h: img.naturalHeight })
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) loadFile(file)
  }, [loadFile])

  const generatePreview = useCallback(async (preset: Preset, img: HTMLImageElement, mode: CropMode) => {
    const maxW = 200
    const scale = maxW / preset.width
    const pw = Math.round(preset.width * scale)
    const ph = Math.round(preset.height * scale)
    const blob = await renderToCanvas(img, pw, ph, mode, "png", 90)
    return URL.createObjectURL(blob)
  }, [])

  const toggleFormat = useCallback(async (id: string) => {
    setSelectedFormats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
        if (sourceImage) {
          const preset = PRESETS.find((p) => p.id === id)
          if (preset) {
            generatePreview(preset, sourceImage, cropMode).then((url) => {
              setPreviews((p) => new Map(p).set(id, url))
            })
          }
        }
      }
      return next
    })
  }, [sourceImage, cropMode, generatePreview])

  const togglePlatform = useCallback((platform: string, checked: boolean) => {
    const ids = PRESETS.filter((p) => p.platform === platform).map((p) => p.id)
    setSelectedFormats((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => checked ? next.add(id) : next.delete(id))
      return next
    })
  }, [])

  const downloadSingle = useCallback(async (preset: Preset) => {
    if (!sourceImage) return
    const blob = await renderToCanvas(sourceImage, preset.width, preset.height, cropMode, outputFormat, jpegQuality)
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = getFilename(preset.platform, preset.name, preset.width, preset.height, outputFormat)
    a.click()
    URL.revokeObjectURL(url)
  }, [sourceImage, cropMode, outputFormat, jpegQuality])

  const downloadAll = useCallback(async () => {
    if (!sourceImage || selectedFormats.size === 0) return
    setIsProcessing(true)
    try {
      const JSZip = (await import("jszip")).default
      const zip = new JSZip()
      for (const id of selectedFormats) {
        const preset = PRESETS.find((p) => p.id === id)
        if (!preset) continue
        const blob = await renderToCanvas(sourceImage, preset.width, preset.height, cropMode, outputFormat, jpegQuality)
        zip.file(getFilename(preset.platform, preset.name, preset.width, preset.height, outputFormat), blob)
      }
      const zipBlob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = "socialsizer-export.zip"
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsProcessing(false)
    }
  }, [sourceImage, selectedFormats, cropMode, outputFormat, jpegQuality])

  const reset = () => {
    setSourceFile(null)
    setSourceDataUrl(null)
    setSourceImage(null)
    setSourceSize(null)
    setSelectedFormats(new Set())
    setPreviews(new Map())
    setWarning(null)
  }

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
          <p className="text-[#86868b] text-sm mt-1">or click to browse — JPG, PNG, WebP supported</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
        />
      </div>
    )
  }

  const platformGroups = PLATFORMS.map((platform) => {
    const presets = PRESETS.filter((p) => p.platform === platform)
    const allSelected = presets.every((p) => selectedFormats.has(p.id))
    return { platform, presets, allSelected }
  })

  return (
    <div className="space-y-6">
      {/* Source image preview */}
      <div className="flex items-start gap-4 p-4 rounded-[20px] border border-white/10 bg-white/[0.02]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sourceDataUrl!} alt="Source" className="rounded-xl object-contain" style={{ maxWidth: 160, maxHeight: 120 }} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate">{sourceFile.name}</p>
          {sourceSize && (
            <p className="text-[#86868b] text-sm mt-1">{sourceSize.w} × {sourceSize.h} px</p>
          )}
          {warning && <p className="text-yellow-400 text-sm mt-2">{warning}</p>}
        </div>
        <button onClick={reset} className="text-[#86868b] hover:text-white transition-colors">
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {(["cover", "contain"] as CropMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setCropMode(mode)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: cropMode === mode ? "rgba(37,99,235,0.8)" : "transparent",
                color: cropMode === mode ? "#fff" : "#86868b",
              }}
            >
              {mode === "cover" ? "Crop to Fill" : "Fit with Padding"}
            </button>
          ))}
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {(["png", "jpeg"] as OutputFormat[]).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setOutputFormat(fmt)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: outputFormat === fmt ? "rgba(37,99,235,0.8)" : "transparent",
                color: outputFormat === fmt ? "#fff" : "#86868b",
              }}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>

        {outputFormat === "jpeg" && (
          <div className="flex items-center gap-3">
            <label className="text-xs uppercase tracking-widest text-[#86868b]">Quality: {jpegQuality}%</label>
            <input
              type="range"
              min={70}
              max={100}
              value={jpegQuality}
              onChange={(e) => setJpegQuality(Number(e.target.value))}
              className="w-28"
            />
          </div>
        )}

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setSelectedFormats(new Set(PRESETS.map((p) => p.id)))}
            className="text-sm text-[#86868b] hover:text-white transition-colors underline"
          >
            Select All
          </button>
          <button
            onClick={() => setSelectedFormats(new Set())}
            className="text-sm text-[#86868b] hover:text-white transition-colors underline"
          >
            Deselect All
          </button>
        </div>
      </div>

      {selectedFormats.size > 0 && (
        <p className="text-sm text-[#86868b]">{selectedFormats.size} format{selectedFormats.size !== 1 ? "s" : ""} selected</p>
      )}

      {/* Platform groups */}
      <div className="space-y-6">
        {platformGroups.map(({ platform, presets, allSelected }) => (
          <div key={platform}>
            <div className="flex items-center gap-3 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => togglePlatform(platform, e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-xs uppercase tracking-widest text-[#86868b] font-medium">{platform}</span>
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {presets.map((preset) => {
                const selected = selectedFormats.has(preset.id)
                const preview = previews.get(preset.id)
                const maxBoxW = 60
                const ratio = preset.width / preset.height
                const boxW = ratio >= 1 ? maxBoxW : Math.round(maxBoxW * ratio)
                const boxH = ratio >= 1 ? Math.round(maxBoxW / ratio) : maxBoxW

                return (
                  <div
                    key={preset.id}
                    onClick={() => toggleFormat(preset.id)}
                    className="relative cursor-pointer rounded-[20px] border transition-all duration-300 p-4 group"
                    style={{
                      borderColor: selected ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.08)",
                      background: selected ? "rgba(37,99,235,0.06)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="rounded"
                        style={{
                          width: boxW,
                          height: boxH,
                          background: selected ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          flexShrink: 0,
                        }}
                      />
                      {selected ? (
                        <Check size={16} strokeWidth={2} style={{ color: "#2563eb" }} />
                      ) : (
                        <div className="w-4 h-4 rounded border border-white/20" />
                      )}
                    </div>

                    {preview && selected && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={preview} alt={preset.name} className="w-full rounded-lg mb-3 object-contain" style={{ maxHeight: 80 }} />
                    )}

                    <p className="text-white text-sm font-semibold leading-tight">{preset.name}</p>
                    <p className="text-[#86868b] text-xs mt-1">{preset.width} × {preset.height}</p>

                    <button
                      onClick={(e) => { e.stopPropagation(); downloadSingle(preset) }}
                      className="absolute top-3 right-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white/10"
                      title="Download this format"
                    >
                      <Download size={14} strokeWidth={1.5} style={{ color: "#86868b" }} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky bottom bar */}
      {selectedFormats.size > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-[#86868b] text-sm">{selectedFormats.size} format{selectedFormats.size !== 1 ? "s" : ""} selected</span>
          <button
            onClick={downloadAll}
            disabled={isProcessing}
            className="px-6 py-3 rounded-[14px] font-semibold text-sm transition-all duration-300 disabled:opacity-60"
            style={{ background: "#2563eb", color: "#fff", minWidth: 200 }}
          >
            {isProcessing ? "Processing..." : `Download All (${selectedFormats.size})`}
          </button>
        </div>
      )}

      {/* Bottom padding to avoid sticky bar overlap */}
      {selectedFormats.size > 0 && <div className="h-20" />}
    </div>
  )
}
