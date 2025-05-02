import { Item } from "./item"

export interface Document {
  id: string
  name: string
  items: Item[]
  createdAt: Date
  updatedAt: Date
}
