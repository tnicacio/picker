import clsx from "clsx"
import { Item } from "../api/document/item"

interface ItemListProps {
  description: string
  items: Item[]
  onItemClick?: (itemId: string) => void
}

export default function ItemList({ description, items, onItemClick }: ItemListProps) {
  return (
    <div className="flex-1 p-4 ">
      <h2 className="text-lg font-semibold mb-4">{description} ({items.length})</h2>
      <ul
        className={clsx(
          "space-y-2 overflow-y-auto max-h-[calc(100vh-50px)]",
          items.length > 0
            ? "scrollbar-thins scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700"
            : "scrollbar-none"
        )}
      >
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className="cursor-pointer p-3 border rounded-lg shadow-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
