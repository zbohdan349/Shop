/*
  Warnings:

  - You are about to drop the `Busket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BusketToItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Busket" DROP CONSTRAINT "Busket_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BusketToItem" DROP CONSTRAINT "_BusketToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusketToItem" DROP CONSTRAINT "_BusketToItem_B_fkey";

-- DropTable
DROP TABLE "Busket";

-- DropTable
DROP TABLE "_BusketToItem";

-- CreateTable
CREATE TABLE "Basket" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "_BasketToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Basket_userId_key" ON "Basket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToItem_AB_unique" ON "_BasketToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToItem_B_index" ON "_BasketToItem"("B");

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToItem" ADD CONSTRAINT "_BasketToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Basket"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToItem" ADD CONSTRAINT "_BasketToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
