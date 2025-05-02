'use client'

import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { useState } from "react"
import { Document } from "../api/document/document"
import { Item } from "../api/document/item"
import ItemList from "./item-list"

interface PickProps {
  document: Document
}

export default function Pick({ document }: PickProps) {
  const [pickedItems, setPickedItems] = useState<Item[]>([])

  const remainingItems = document.items.filter(item => !pickedItems.includes(item))

  const handlePick = () => {
    if (remainingItems.length === 0) return

    const randomIndex = Math.floor(Math.random() * remainingItems.length)
    const randomItem = remainingItems[randomIndex]

    setPickedItems([...pickedItems, randomItem])
  }

  const lastPickedItem = pickedItems[pickedItems.length - 1]

  return (
    <div className="flex w-full h-screen max-h-screen overflow-hidden">
      <ItemList description="Remaining Values" items={remainingItems} />
      <div className="flex-2 p-4 text-center flex flex-col items-center justify-center">
        <Button
          onClick={handlePick}
          className={clsx(
            { 'pointer-events-none opacity-20': remainingItems.length === 0 },
            { 'pointer-events-auto opacity-100': remainingItems.length > 0 },
            "cursor-pointer sm:w-1/2 md:w-1/4 w-auto rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 sm:px-5"
          )}
        >
          Pick One
        </Button>
        <span className="text-2xl font-bold mt-4 flex items-center justify-center">
          {pickedItems.length > 0 ? lastPickedItem.name : "No item picked yet"}
        </span>
      </div>
      <ItemList description="Chosen Values" items={pickedItems} />
    </div>
  )
}
