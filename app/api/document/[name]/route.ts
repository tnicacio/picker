import { PrismaClient } from '@/lib/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function GET(req: NextRequest) {
    const documentName = req.nextUrl.pathname.split('/').pop() || ''

    const document = await prisma.document.findFirst({
        where: { name: documentName },
        include: { items: true }
    })

    if (!document) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    return NextResponse.json(document, { status: 200 })
}