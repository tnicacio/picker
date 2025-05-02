import { PrismaClient } from '@/lib/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function GET(_req: NextRequest) {
  const allDocuments = await prisma.document.findMany({
    include: { items: true }
  })

  return NextResponse.json(allDocuments, { status: 200 })
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || file.type !== 'text/plain') {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const text = await file.text()

  const items = text
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(item => item.length > 0)

  const fileName = file.name.trim()
  const filePath = fileName
    .replace(/\s+/g, '-')
    .replace('.txt', '')
    .toLowerCase()

  const documentAlreadyExistent = await prisma.document.findFirst({
    where: { name: filePath }
  })

  let newDocument = null

  if (documentAlreadyExistent) {
    newDocument = await prisma.document.update({
      where: { id: documentAlreadyExistent.id },
      data: {
        items: {
          deleteMany: {},
          create: items.map(item => ({ name: item }))
        },
        updatedAt: new Date()
      }
    })
  } else {
    newDocument = await prisma.document.create({
      data: {
        name: filePath,
        items: {
          create: items.map(item => ({ name: item }))
        }
      }
    })
  }

  return NextResponse.json(newDocument, { status: 201 })
}
