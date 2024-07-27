/*
  Warnings:

  - You are about to drop the column `details` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `dateIssued` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "details",
ADD COLUMN     "dateIssued" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "recipient" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT NOT NULL;
