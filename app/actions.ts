'use server'

import { Document } from "./api/document/document"

export async function createItemList(formData: FormData) {
  const baseUrl = process.env.URL

  const file = formData.get('file') as File
  if (!file) {
    console.error('No file selected')
    return
  }

  const res = await fetch(`${baseUrl}/api/document`, {
    method: 'POST',
    body: formData,
  })

  console.log('res', res)

  const data = await res.json() as Document

  return data
}
