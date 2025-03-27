import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function getPartners(query?: string) {
  const where: Prisma.PartnerWhereInput = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
        ],
      }
    : {}

  return prisma.partner.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          companies: true,
        },
      },
    },
  })
}

export async function getPartnerById(id: string) {
  return prisma.partner.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          companies: true,
        },
      },
    },
  })
}

export async function createPartner(data: Prisma.PartnerCreateInput) {
  return prisma.partner.create({
    data,
    include: {
      _count: {
        select: {
          companies: true,
        },
      },
    },
  })
}

export async function updatePartner(id: string, data: Prisma.PartnerUpdateInput) {
  return prisma.partner.update({
    where: { id },
    data,
    include: {
      _count: {
        select: {
          companies: true,
        },
      },
    },
  })
}

export async function deletePartner(id: string) {
  return prisma.partner.delete({
    where: { id },
  })
}
