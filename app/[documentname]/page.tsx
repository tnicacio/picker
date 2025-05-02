import { Document } from "../api/document/document"
import Pick from "./pick"

export default async function Page({ params }: { params: Promise<{ documentname: string }> }) {
  const { documentname } = await params

  const res = await fetch(`${process.env.URL}/api/document/${documentname}`, {
    method: 'GET',
    cache: 'no-store',
  })
  const document = await res.json() as Document

  if (!document) {
    return <div className="text-center">No data found for {documentname}</div>
  }

  return (
    <div className="flex flex-row max-h-screen">
      <Pick document={document} />
    </div>
  )
}
