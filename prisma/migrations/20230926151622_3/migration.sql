/*
  Warnings:

  - The primary key for the `Busket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Busket` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BusketToItem" DROP CONSTRAINT "_BusketToItem_A_fkey";

-- AlterTable
ALTER TABLE "Busket" DROP CONSTRAINT "Busket_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Busket_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "_BusketToItem" ADD CONSTRAINT "_BusketToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Busket"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
