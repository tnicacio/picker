'use client'

import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createItemList } from "./actions"
import Uploader from "./uploader"

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null)
  const router = useRouter()

  const handleFormAction = async (formData: FormData) => {
    const data = await createItemList(formData)

    if (!data) {
      console.error('No data returned from server')
      return
    }

    router.push(`/${data.name}`)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <form
          action={handleFormAction}
          className="flex flex-col items-center max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4"
        >
          <Uploader fileName={fileName} setFileName={setFileName} />
          <Button
            type="submit"
            className={clsx(
              { 'pointer-events-none opacity-20': !fileName },
              { 'pointer-events-auto opacity-100': fileName },
              "cursor-pointer w-full rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 sm:px-5"
            )}
          >
            Upload
          </Button>
        </form>
      </main>
    </div>
  )
}
