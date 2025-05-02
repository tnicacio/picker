'use client'

import clsx from 'clsx'
import { DragEvent, useRef, useState } from 'react'

interface UploaderProps {
  fileName: string | null
  setFileName: (fileName: string | null) => void
}

export default function Uploader({ fileName, setFileName }: UploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [highlight, setHighlight] = useState(false)

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setHighlight(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setFileName(file.name)
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        fileInputRef.current.files = dataTransfer.files
      }
      e.dataTransfer.clearData()
    }
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setHighlight(true)
      }}
      onDragLeave={() => setHighlight(false)}
      onDrop={handleDrop}
      className={clsx(
        `border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors`,
        `flex flex-col gap-1 items-center justify-center`,
        { 'bg-blue-100 border-blue-500': highlight },
        { 'border-gray-300 hover:bg-gray-50': !highlight },
      )}
    >
      <FileIcon className="w-12 h-12" />
      <span className="text-sm font-medium text-gray-500">Drag and drop a text file or click to browse</span>
      <span className={clsx(
        { 'text-black': fileName },
        { 'text-gray-500': !fileName },
        'text-xs font-medium transition-colors',
      )}>
        {fileName ? `Selected file: ${fileName}` : 'No file selected'}
      </span>
      <input
        type="file"
        name="file"
        hidden
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name)
          }
        }}
      />
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}
