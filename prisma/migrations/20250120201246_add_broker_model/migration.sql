/*
  Warnings:

  - The values [PARTNER,SUBPARTNER] on the enum `PartnerType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "BrokerStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterEnum
BEGIN;
CREATE TYPE "PartnerType_new" AS ENUM ('BANK', 'EXCHANGE', 'AGENT');
ALTER TABLE "partners" ALTER COLUMN "type" TYPE "PartnerType_new" USING ("type"::text::"PartnerType_new");
ALTER TYPE "PartnerType" RENAME TO "PartnerType_old";
ALTER TYPE "PartnerType_new" RENAME TO "PartnerType";
DROP TYPE "PartnerType_old";
COMMIT;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "brokerId" TEXT;

-- CreateTable
CREATE TABLE "brokers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commissionRate" DECIMAL(10,2) NOT NULL DEFAULT 0.5,
    "status" "BrokerStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brokers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brokers_userId_key" ON "brokers"("userId");

-- AddForeignKey
ALTER TABLE "brokers" ADD CONSTRAINT "brokers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "brokers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
